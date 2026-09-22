/* =========================================================
   PREMIUM PROJECT — GOOGLE APPS SCRIPT BRIDGE
   Sheets:
     MASTER TAMU : ID | NAMA | TAMU DARI | KETERANGAN
     ABSENSI     : TIMESTAMP | ID | NAMA | TAMU DARI | KETERANGAN | AKSI | TANGGAL | JAM | SUMBER
   ========================================================= */

const SPREADSHEET_ID = ''; // Isi dengan Spreadsheet ID. Kosongkan bila script bound ke spreadsheet.
const MASTER_SHEET = 'MASTER TAMU';
const LOG_SHEET = 'ABSENSI';

function ss_(){
  return SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function sh_(name){
  const s = ss_().getSheetByName(name);
  if(!s) throw new Error('Sheet tidak ditemukan: ' + name);
  return s;
}

function json_(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e){
  try{
    const action = (e && e.parameter && e.parameter.action) || 'guests';
    if(action === 'guests') return json_({ok:true, guests:getGuests_(), stats:getStats_()});
    if(action === 'ping') return json_({ok:true,message:'Premium Project API aktif',time:new Date().toISOString()});
    return json_({ok:false,error:'Unknown action'});
  }catch(err){
    return json_({ok:false,error:String(err.message || err)});
  }
}

function doPost(e){
  try{
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const action = String(data.action || '').toUpperCase();
    if(!['CHECK IN','CHECK OUT'].includes(action)) throw new Error('Action harus CHECK IN atau CHECK OUT.');
    writeAttendance_(data, action);
    return json_({ok:true,message:action+' tersimpan'});
  }catch(err){
    return json_({ok:false,error:String(err.message || err)});
  }
}

function getGuests_(){
  const sheet = sh_(MASTER_SHEET);
  const values = sheet.getDataRange().getValues();
  if(values.length < 2) return [];
  const headers = values.shift().map(h=>String(h).trim().toUpperCase());
  const idx = name => headers.indexOf(name);
  const id = idx('ID'), nm = idx('NAMA'), fr = idx('TAMU DARI'), tp = idx('KETERANGAN');

  const logs = getLogs_();
  const latest = {};
  logs.forEach(r=>{
    latest[r.id] = latest[r.id] || {};
    if(String(r.action).toUpperCase() === 'CHECK IN') latest[r.id].checkIn = r.time;
    if(String(r.action).toUpperCase() === 'CHECK OUT') latest[r.id].checkOut = r.time;
  });

  return values.filter(row=>String(row[nm] || '').trim()).map(row=>{
    const key = String(row[id] || '').trim();
    return {
      id:key,
      name:String(row[nm] || '').trim(),
      from:String(row[fr] || '').trim(),
      type:String(row[tp] || 'REG').trim().toUpperCase(),
      checkIn:latest[key]?.checkIn || '',
      checkOut:latest[key]?.checkOut || ''
    };
  });
}

function getLogs_(){
  const sheet = sh_(LOG_SHEET);
  const values = sheet.getDataRange().getValues();
  if(values.length < 2) return [];
  const headers = values.shift().map(h=>String(h).trim().toUpperCase());
  const idx = name => headers.indexOf(name);
  const id=idx('ID'), action=idx('AKSI'), time=idx('JAM');
  return values.map(r=>({
    id:String(r[id] || ''),
    action:String(r[action] || ''),
    time:String(r[time] || '')
  }));
}

function getStats_(){
  const guests = getGuests_();
  const total = guests.length;
  const attendance = guests.filter(g=>g.checkIn).length;
  const venue = guests.filter(g=>g.checkIn && !g.checkOut).length;
  const out = guests.filter(g=>g.checkOut).length;
  return {total,checkIn:venue,venue,checkOut:out,attendance,rate:total?Math.round(attendance/total*100):0};
}

function writeAttendance_(data, action){
  const sheet = sh_(LOG_SHEET);
  const n = new Date();
  const date = Utilities.formatDate(n, Session.getScriptTimeZone(), 'dd/MM/yyyy');
  const time = Utilities.formatDate(n, Session.getScriptTimeZone(), 'HH:mm:ss');
  sheet.appendRow([
    n,
    data.id || '',
    data.name || '',
    data.from || '',
    data.type || 'REG',
    action,
    date,
    time,
    data.source || 'DATABASE'
  ]);
}

function setupSheets(){
  const ss = ss_();
  let master = ss.getSheetByName(MASTER_SHEET) || ss.insertSheet(MASTER_SHEET);
  let logs = ss.getSheetByName(LOG_SHEET) || ss.insertSheet(LOG_SHEET);
  if(master.getLastRow() === 0) master.appendRow(['ID','NAMA','TAMU DARI','KETERANGAN']);
  if(logs.getLastRow() === 0) logs.appendRow(['TIMESTAMP','ID','NAMA','TAMU DARI','KETERANGAN','AKSI','TANGGAL','JAM','SUMBER']);
}
