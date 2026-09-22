/* =========================================================
   PREMIUM PROJECT
   GOOGLE APPS SCRIPT
   GUEST ATTENDANCE API
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

  /*
    MASUKKAN ID GOOGLE SHEET
  */

  SPREADSHEET_ID:
    "MASUKKAN_ID_GOOGLE_SHEET_DI_SINI",


  /*
    Nama Sheet
  */

  MASTER_SHEET:
    "MASTER TAMU",

  ATTENDANCE_SHEET:
    "ABSENSI"

};


/* =========================================================
   GET
========================================================= */

function doGet(e){

  try{

    const action =
      e.parameter.action
      || "guests";


    if(
      action === "guests"
    ){

      return jsonResponse(
        getGuests()
      );

    }


    if(
      action === "attendance"
    ){

      return jsonResponse(
        getAttendance()
      );

    }


    if(
      action === "ping"
    ){

      return jsonResponse({

        success:true,

        message:
          "Premium Project API is active.",

        time:
          new Date().toISOString()

      });

    }


    return jsonResponse({

      success:false,

      message:
        "Action tidak dikenal."

    });

  }

  catch(error){

    return jsonResponse({

      success:false,

      message:
        error.message

    });

  }

}


/* =========================================================
   POST
========================================================= */

function doPost(e){

  try{

    const data =
      JSON.parse(
        e.postData.contents
      );


    const action =
      data.action;


    if(
      action === "CHECK IN"
    ){

      return jsonResponse(
        checkInGuest(data)
      );

    }


    if(
      action === "CHECK OUT"
    ){

      return jsonResponse(
        checkOutGuest(data)
      );

    }


    return jsonResponse({

      success:false,

      message:
        "Action tidak dikenal."

    });

  }

  catch(error){

    return jsonResponse({

      success:false,

      message:
        error.message

    });

  }

}


/* =========================================================
   GET GUESTS
========================================================= */

function getGuests(){

  const sheet =
    getSheet(
      CONFIG.MASTER_SHEET
    );


  const attendanceSheet =
    getSheet(
      CONFIG.ATTENDANCE_SHEET
    );


  const masterData =
    sheet.getDataRange()
      .getValues();


  const attendanceData =
    attendanceSheet
      ? attendanceSheet
          .getDataRange()
          .getValues()
      : [];


  if(
    masterData.length < 2
  ){

    return {

      success:true,

      guests:[]

    };

  }


  const headers =
    masterData.shift()
      .map(
        x =>
          String(x)
            .trim()
            .toUpperCase()
      );


  const col =
    headerIndex(
      headers
    );


  const guests =
    masterData
      .filter(
        row =>
          row[col.id] !== ""
          ||
          row[col.name] !== ""
      )
      .map(
        row=>({

          id:
            String(
              row[col.id]
              || ""
            ),

          name:
            String(
              row[col.name]
              || ""
            ),

          from:
            String(
              row[col.from]
              || ""
            ),

          type:
            normalizeType(
              row[col.type]
            ),

          checkIn:"",
          checkOut:""

        })
      );


  /*
    Gabungkan status absensi
    terakhir setiap tamu.
  */

  applyAttendanceStatus(
    guests,
    attendanceData
  );


  return {

    success:true,

    guests

  };

}


/* =========================================================
   ATTENDANCE STATUS
========================================================= */

function applyAttendanceStatus(
  guests,
  data
){

  if(
    !data ||
    data.length < 2
  ){

    return;

  }


  const headers =
    data[0]
      .map(
        x =>
          String(x)
            .trim()
            .toUpperCase()
      );


  const idCol =
    findColumn(
      headers,
      [
        "ID",
        "ID TAMU"
      ]
    );


  const actionCol =
    findColumn(
      headers,
      [
        "AKSI",
        "ACTION"
      ]
    );


  const timeCol =
    findColumn(
      headers,
      [
        "JAM",
        "TIME"
      ]
    );


  if(
    idCol === -1
    ||
    actionCol === -1
  ){

    return;

  }


  /*
    Buat map status terakhir
  */

  const statusMap =
    {};


  for(
    let i=1;
    i<data.length;
    i++
  ){

    const row =
      data[i];


    const id =
      String(
        row[idCol] || ""
      );


    if(!id){

      continue;

    }


    const action =
      String(
        row[actionCol] || ""
      )
      .toUpperCase();


    const time =
      timeCol >= 0
        ? String(
            row[timeCol] || ""
          )
        : "";


    if(
      action === "CHECK IN"
    ){

      statusMap[id] =
        statusMap[id]
        || {};


      statusMap[id]
        .checkIn =
          time;

    }


    if(
      action === "CHECK OUT"
    ){

      statusMap[id] =
        statusMap[id]
        || {};


      statusMap[id]
        .checkOut =
          time;

    }

  }


  guests.forEach(
    guest=>{

      const status =
        statusMap[
          guest.id
        ];


      if(
        status
      ){

        guest.checkIn =
          status.checkIn
          || "";

        guest.checkOut =
          status.checkOut
          || "";

      }

    }
  );

}


/* =========================================================
   CHECK IN
========================================================= */

function checkInGuest(data){

  const lock =
    LockService
      .getScriptLock();


  lock.waitLock(
    10000
  );


  try{

    const sheet =
      getSheet(
        CONFIG.ATTENDANCE_SHEET
      );


    const values =
      sheet
        .getDataRange()
        .getValues();


    const headers =
      values[0]
        .map(
          x =>
            String(x)
              .trim()
              .toUpperCase()
        );


    const idCol =
      findColumn(
        headers,
        ["ID"]
      );


    const actionCol =
      findColumn(
        headers,
        ["AKSI","ACTION"]
      );


    /*
      Jangan double Check In
    */

    if(
      idCol >= 0 &&
      actionCol >= 0
    ){

      for(
        let i=1;
        i<values.length;
        i++
      ){

        const id =
          String(
            values[i][idCol]
            || ""
          );


        const action =
          String(
            values[i][actionCol]
            || ""
          )
          .toUpperCase();


        if(
          id === String(data.id)
          &&
          action === "CHECK IN"
        ){

          /*
            Cek apakah belum Check Out
          */

          let checkedOut =
            false;


          for(
            let j=i+1;
            j<values.length;
            j++
          ){

            const nextId =
              String(
                values[j][idCol]
                || ""
              );


            const nextAction =
              String(
                values[j][actionCol]
                || ""
              )
              .toUpperCase();


            if(
              nextId === String(data.id)
              &&
              nextAction === "CHECK OUT"
            ){

              checkedOut =
                true;

            }

          }


          if(
            !checkedOut
          ){

            lock.releaseLock();

            return {

              success:false,

              message:
                "Tamu sudah Check In."

            };

          }

        }

      }

    }


    appendAttendance(
      sheet,
      data
    );


    lock.releaseLock();


    return {

      success:true,

      message:
        "Check In berhasil.",

      time:
        data.time

    };

  }

  catch(error){

    lock.releaseLock();

    throw error;

  }

}


/* =========================================================
   CHECK OUT
========================================================= */

function checkOutGuest(data){

  const lock =
    LockService
      .getScriptLock();


  lock.waitLock(
    10000
  );


  try{

    const sheet =
      getSheet(
        CONFIG.ATTENDANCE_SHEET
      );


    const values =
      sheet
        .getDataRange()
        .getValues();


    const headers =
      values[0]
        .map(
          x =>
            String(x)
              .trim()
              .toUpperCase()
        );


    const idCol =
      findColumn(
        headers,
        ["ID"]
      );


    const actionCol =
      findColumn(
        headers,
        ["AKSI","ACTION"]
      );


    let hasOpenCheckIn =
      false;


    if(
      idCol >= 0 &&
      actionCol >= 0
    ){

      /*
        Cari transaksi terakhir
      */

      for(
        let i=values.length-1;
        i>=1;
        i--
      ){

        const id =
          String(
            values[i][idCol]
            || ""
          );


        if(
          id !==
          String(data.id)
        ){

          continue;

        }


        const action =
          String(
            values[i][actionCol]
            || ""
          )
          .toUpperCase();


        if(
          action === "CHECK IN"
        ){

          hasOpenCheckIn =
            true;

          break;

        }


        if(
          action === "CHECK OUT"
        ){

          hasOpenCheckIn =
            false;

          break;

        }

      }

    }


    if(
      !hasOpenCheckIn
    ){

      lock.releaseLock();


      return {

        success:false,

        message:
          "Tamu tidak sedang berada di venue."

      };

    }


    appendAttendance(
      sheet,
      data
    );


    lock.releaseLock();


    return {

      success:true,

      message:
        "Check Out berhasil.",

      time:
        data.time

    };

  }

  catch(error){

    lock.releaseLock();

    throw error;

  }

}


/* =========================================================
   APPEND ATTENDANCE
========================================================= */

function appendAttendance(
  sheet,
  data
){

  const headers =
    sheet
      .getRange(
        1,
        1,
        1,
        sheet.getLastColumn()
      )
      .getValues()[0]
      .map(
        x =>
          String(x)
            .trim()
            .toUpperCase()
      );


  const row =
    new Array(
      headers.length
    ).fill("");


  setValue(
    row,
    headers,
    ["TIMESTAMP"],
    new Date()
  );


  setValue(
    row,
    headers,
    ["ID"],
    data.id
  );


  setValue(
    row,
    headers,
    ["NAMA"],
    data.name
  );


  setValue(
    row,
    headers,
    ["TAMU DARI"],
    data.from
  );


  setValue(
    row,
    headers,
    [
      "KETERANGAN",
      "TYPE",
      "TIPE"
    ],
    data.type
  );


  setValue(
    row,
    headers,
    [
      "AKSI",
      "ACTION"
    ],
    data.action
  );


  setValue(
    row,
    headers,
    [
      "TANGGAL",
      "DATE"
    ],
    data.date
  );


  setValue(
    row,
    headers,
    [
      "JAM",
      "TIME"
    ],
    data.time
  );


  setValue(
    row,
    headers,
    [
      "SOURCE",
      "SUMBER"
    ],
    data.source
  );


  setValue(
    row,
    headers,
    ["ISO"],
    data.iso
  );


  sheet.appendRow(
    row
  );

}


/* =========================================================
   GET ATTENDANCE
========================================================= */

function getAttendance(){

  const sheet =
    getSheet(
      CONFIG.ATTENDANCE_SHEET
    );


  const data =
    sheet
      .getDataRange()
      .getValues();


  if(
    data.length < 2
  ){

    return {

      success:true,

      attendance:[]

    };

  }


  const headers =
    data.shift()
      .map(
        x =>
          String(x)
            .trim()
            .toUpperCase()
      );


  const result =
    data.map(
      row=>({

        id:
          getRowValue(
            row,
            headers,
            ["ID"]
          ),

        name:
          getRowValue(
            row,
            headers,
            ["NAMA"]
          ),

        from:
          getRowValue(
            row,
            headers,
            ["TAMU DARI"]
          ),

        type:
          getRowValue(
            row,
            headers,
            [
              "KETERANGAN",
              "TYPE",
              "TIPE"
            ]
          ),

        action:
          getRowValue(
            row,
            headers,
            ["AKSI","ACTION"]
          ),

        date:
          getRowValue(
            row,
            headers,
            ["TANGGAL","DATE"]
          ),

        time:
          getRowValue(
            row,
            headers,
            ["JAM","TIME"]
          ),

        source:
          getRowValue(
            row,
            headers,
            ["SOURCE","SUMBER"]
          )

      })
    );


  return {

    success:true,

    attendance:result

  };

}


/* =========================================================
   SHEET HELPERS
========================================================= */

function getSheet(
  sheetName
){

  const spreadsheet =
    SpreadsheetApp.openById(
      CONFIG.SPREADSHEET_ID
    );


  const sheet =
    spreadsheet.getSheetByName(
      sheetName
    );


  if(!sheet){

    throw new Error(
      `Sheet "${sheetName}" tidak ditemukan.`
    );

  }


  return sheet;

}


function headerIndex(
  headers
){

  return {

    id:
      findColumn(
        headers,
        ["ID"]
      ),

    name:
      findColumn(
        headers,
        ["NAMA"]
      ),

    from:
      findColumn(
        headers,
        ["TAMU DARI","FROM"]
      ),

    type:
      findColumn(
        headers,
        [
          "KETERANGAN",
          "TYPE",
          "TIPE"
        ]
      )

  };

}


function findColumn(
  headers,
  names
){

  for(
    const name of names
  ){

    const index =
      headers.indexOf(
        name
      );


    if(
      index >= 0
    ){

      return index;

    }

  }


  return -1;

}


function setValue(
  row,
  headers,
  possibleNames,
  value
){

  const index =
    findColumn(
      headers,
      possibleNames
    );


  if(
    index >= 0
  ){

    row[index] =
      value;

  }

}


function getRowValue(
  row,
  headers,
  names
){

  const index =
    findColumn(
      headers,
      names
    );


  if(
    index < 0
  ){

    return "";

  }


  const value =
    row[index];


  if(
    value instanceof Date
  ){

    return Utilities.formatDate(
      value,
      Session.getScriptTimeZone(),
      "dd/MM/yyyy HH:mm:ss"
    );

  }


  return String(
    value ?? ""
  );

}


function normalizeType(
  value
){

  const type =
    String(
      value || ""
    )
    .trim()
    .toUpperCase();


  return type === "VIP"
    ? "VIP"
    : "REG";

}


/* =========================================================
   JSON RESPONSE
========================================================= */

function jsonResponse(
  data
){

  return ContentService
    .createTextOutput(
      JSON.stringify(
        data
      )
    )
    .setMimeType(
      ContentService
        .MimeType
        .JSON
    );

}
