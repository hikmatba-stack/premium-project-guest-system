/***** PREMIUM PROJECT — GOOGLE APPS SCRIPT BACKEND *****
 * Spreadsheet structure:
 *
 * Sheet 1: MASTER TAMU
 * A ID | B NAMA | C TAMU DARI | D KETERANGAN | E UNDANGAN
 *
 * Sheet 2: ABSENSI
 * A ID | B TIMESTAMP | C TANGGAL | D JAM | E AKSI | F NAMA |
 * G TAMU DARI | H KETERANGAN | I UNDANGAN | J SUMBER
 *
 * IMPORTANT:
 * 1) Put this script in the Google Sheet: Extensions > Apps Script.
 * 2) Change SPREADSHEET_ID only if script is not bound to the sheet.
 * 3) Deploy as Web app: Execute as Me, Who has access: Anyone.
 *******************************************************/

const SPREADSHEET_ID = ""; // Leave blank if this script is bound to the spreadsheet.
const MASTER_SHEET = "MASTER TAMU";
const LOG_SHEET = "ABSENSI";

function getSpreadsheet_() {
  return SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : "";
  if (action === "guests") return json_({ ok: true, guests: readGuests_() });
  if (action === "dashboard") return json_({ ok: true, dashboard: dashboard_() });
  return json_({ ok: true, message: "Premium Project Guest API aktif." });
}

function doPost(e) {
  try {
    const data = JSON.parse((e.postData && e.postData.contents) || "{}");
    if (data.action === "CHECK IN" || data.action === "CHECK OUT") {
      return json_(saveAttendance_(data));
    }
    if (data.action === "ADD_GUEST") {
      return json_(addGuest_(data));
    }
    return json_({ ok: false, message: "Action tidak dikenal." });
  } catch (err) {
    return json_({ ok: false, message: err.message });
  }
}

function readGuests_() {
  const sh = getSpreadsheet_().getSheetByName(MASTER_SHEET);
  if (!sh) throw new Error("Sheet MASTER TAMU tidak ditemukan.");
  const values = sh.getDataRange().getValues();
  if (values.length <= 1) return [];
  return values.slice(1).filter(r => r[1]).map(r => ({
    id: String(r[0] || ""),
    name: String(r[1] || ""),
    from: String(r[2] || ""),
    type: String(r[3] || "REG").toUpperCase(),
    invitation: Number(r[4] || 1),
    status: "BELUM HADIR",
    checkIn: "",
    checkOut: ""
  }));
}

function saveAttendance_(d) {
  const ss = getSpreadsheet_();
  let sh = ss.getSheetByName(LOG_SHEET);
  if (!sh) {
    sh = ss.insertSheet(LOG_SHEET);
    sh.appendRow(["ID","TIMESTAMP","TANGGAL","JAM","AKSI","NAMA","TAMU DARI","KETERANGAN","UNDANGAN","SUMBER"]);
  }
  const now = new Date();
  const tz = ss.getSpreadsheetTimeZone() || "Asia/Jakarta";
  const date = Utilities.formatDate(now, tz, "dd/MM/yyyy");
  const time = Utilities.formatDate(now, tz, "HH:mm:ss");
  sh.appendRow([
    String(d.id || ""),
    now,
    date,
    time,
    String(d.action || ""),
    String(d.name || ""),
    String(d.from || ""),
    String(d.type || "REG").toUpperCase(),
    Number(d.invitation || 1),
    String(d.source || "DATABASE")
  ]);
  return { ok:true, message:"Absensi tersimpan.", date, time, id:String(d.id||"") };
}

function addGuest_(d) {
  const ss = getSpreadsheet_();
  const sh = ss.getSheetByName(MASTER_SHEET);
  if (!sh) throw new Error("Sheet MASTER TAMU tidak ditemukan.");
  const id = "M" + new Date().getTime();
  sh.appendRow([id, String(d.name||""), String(d.from||""), String(d.type||"REG").toUpperCase(), Number(d.invitation||1)]);
  return {ok:true,id};
}

function dashboard_() {
  const guests = readGuests_();
  const total = guests.reduce((a,g)=>a+g.invitation,0);
  return {totalInv:total};
}
