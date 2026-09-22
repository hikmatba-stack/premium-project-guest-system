/* Premium Project — Guest Attendance System
   Demo mode is enabled until GOOGLE_APPS_SCRIPT_URL is filled.
*/
const CONFIG = {
  GOOGLE_APPS_SCRIPT_URL: "", // Paste deployed Apps Script Web App URL here later.
  REFRESH_MS: 15000
};

const DEMO_GUESTS = [
  {id:"001",name:"Budi Santoso",from:"Keluarga Mempelai Pria",type:"VIP",invitation:2,status:"BELUM HADIR",checkIn:"",checkOut:""},
  {id:"002",name:"Andi Wijaya",from:"Rekan Kerja",type:"REG",invitation:1,status:"DI VENUE",checkIn:"19:14:03",checkOut:""},
  {id:"003",name:"Siti Aminah",from:"Keluarga Mempelai Wanita",type:"REG",invitation:2,status:"SUDAH KELUAR",checkIn:"18:18:42",checkOut:"21:20:11"},
  {id:"004",name:"Rina Agustina",from:"Keluarga",type:"VIP",invitation:2,status:"BELUM HADIR",checkIn:"",checkOut:""},
  {id:"005",name:"Joko Suprapto",from:"Teman",type:"REG",invitation:1,status:"DI VENUE",checkIn:"19:16:27",checkOut:""},
  {id:"006",name:"Dewi Lestari",from:"Keluarga Mempelai Pria",type:"VIP",invitation:3,status:"BELUM HADIR",checkIn:"",checkOut:""},
  {id:"007",name:"Ahmad Fauzi",from:"Rekan Kerja",type:"VIP",invitation:2,status:"DI VENUE",checkIn:"19:10:21",checkOut:""},
  {id:"008",name:"Maya Sari",from:"Keluarga Mempelai Wanita",type:"REG",invitation:2,status:"BELUM HADIR",checkIn:"",checkOut:""},
  {id:"009",name:"Fajar Ramadhan",from:"Teman",type:"REG",invitation:1,status:"DI VENUE",checkIn:"18:59:10",checkOut:""},
  {id:"010",name:"Nadia Putri",from:"Keluarga",type:"VIP",invitation:2,status:"SUDAH KELUAR",checkIn:"18:35:10",checkOut:"21:02:18"}
];

let guests = [...DEMO_GUESTS];
let selectedGuest = null;
let attendance = JSON.parse(localStorage.getItem("pp_attendance") || "[]");
let view = location.hash.replace("#","") || "dashboard";

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));

function nowParts(){
  const n=new Date();
  return {
    date:n.toLocaleDateString("id-ID",{weekday:"long",day:"2-digit",month:"long",year:"numeric"}),
    time:n.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false}),
    iso:n.toISOString()
  };
}
function statusClass(s){
  if(s==="DI VENUE") return "status-venue";
  if(s==="SUDAH KELUAR") return "status-out";
  if(s==="BELUM HADIR") return "status-none";
  return "status-in";
}
function typePill(t){ return `<span class="pill ${t==="VIP"?"vip":"reg"}">${t}</span>`; }
function setView(v){ view=v; location.hash=v; render(); }
function toast(msg,type="success"){const t=$("#toast");t.textContent=msg;t.className=`toast show ${type}`;setTimeout(()=>t.className="toast",2500)}
function clockLoop(){
  const p=nowParts(); const d=$("#liveDate"),tm=$("#liveTime");
  if(d)d.textContent=p.date;if(tm)tm.textContent=p.time+" WIB";
}
setInterval(clockLoop,1000);

function metrics(){
  const base=guests;
  const totalInv=base.reduce((a,g)=>a+(Number(g.invitation)||1),0);
  const checkedIn=base.filter(g=>g.checkIn).reduce((a,g)=>a+(Number(g.invitation)||1),0);
  const venue=base.filter(g=>g.checkIn && !g.checkOut).reduce((a,g)=>a+(Number(g.invitation)||1),0);
  const checkedOut=base.filter(g=>g.checkOut).reduce((a,g)=>a+(Number(g.invitation)||1),0);
  const present=checkedIn;
  const vip=base.filter(g=>g.type==="VIP"&&g.checkIn).reduce((a,g)=>a+(Number(g.invitation)||1),0);
  return {totalInv,checkedIn,venue,checkedOut,present,vip,reg:Math.max(0,present-vip)};
}

function shell(content){
  return `<div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="brand"><div class="brand-mark">P</div><div class="brand-name">PREMIUM PROJECT</div><div class="brand-sub">WEDDING ORGANIZER</div></div>
      <nav class="nav">
        ${navBtn("dashboard","⌂","Dashboard")}
        ${navBtn("guests","♙","Data Tamu")}
        ${navBtn("checkin","↪","Check In")}
        ${navBtn("checkout","↩","Check Out")}
        ${navBtn("attendance","▣","Absensi")}
        ${navBtn("reports","▤","Rekap & Laporan")}
        ${navBtn("settings","⚙","Pengaturan")}
      </nav>
      <div class="sidebar-footer"><b>Guest Attendance System</b><br>Premium Project • Digital Event Operations</div>
    </aside>
    <main class="main">
      <header class="topbar">
        <button class="mobile-menu" onclick="toggleSidebar()">☰</button>
        <div class="search-global"><span>⌕</span><input placeholder="Cari nama tamu... (Ctrl + K)" onkeydown="if(event.key==='Enter') quickSearch(this.value)"></div>
        <div class="top-actions"><div class="clock"><div class="clock-date" id="liveDate"></div><div class="clock-time" id="liveTime"></div></div><div class="avatar">PP</div></div>
      </header>
      <div class="content">${content}</div>
    </main>
  </div>`;
}
function navBtn(id,icon,label){return `<button class="${view===id?"active":""}" onclick="setView('${id}')"><span class="nav-icon">${icon}</span>${label}</button>`}
function toggleSidebar(){$("#sidebar")?.classList.toggle("open")}
function quickSearch(q){setView("checkin");setTimeout(()=>{const i=$("#guestSearch");if(i){i.value=q;searchGuests(q)}},50)}

function render(){
  let body="";
  if(view==="dashboard") body=dashboardView();
  else if(view==="checkin") body=attendanceView("CHECK IN");
  else if(view==="checkout") body=attendanceView("CHECK OUT");
  else if(view==="guests") body=guestsView();
  else if(view==="attendance") body=logsView();
  else if(view==="reports") body=reportsView();
  else body=settingsView();
  $("#app").innerHTML=shell(body);
  clockLoop();
  bindView();
}
window.addEventListener("hashchange",()=>{view=location.hash.replace("#","")||"dashboard";render()});

function dashboardView(){
  const m=metrics();
  const latest=[...attendance].reverse().slice(0,6);
  const demoLatest = latest.length?latest:guests.filter(g=>g.checkIn).slice(0,6).map(g=>({name:g.name,type:g.type,time:g.checkIn,action:"CHECK IN"}));
  return `<div class="page-head"><div><div class="eyebrow">Premium Project</div><h1 class="page-title">Dashboard</h1><div class="page-desc">Guest Attendance System • Monitoring kehadiran secara realtime.</div></div><button class="btn btn-gold" onclick="exportCSV()">⇩ Export</button></div>
  <section class="hero-strip"><span class="hero-tag">SPECIAL MOMENTS • LASTING MEMORIES</span><h2>Selamat Datang</h2><p>Setiap kehadiran adalah bagian dari cerita indah.</p></section>
  <section class="kpis">
    ${kpi("♙","i-green",m.totalInv,"Tamu Undangan","Database tamu")}
    ${kpi("↪","i-blue",m.checkedIn,"Check In",pct(m.checkedIn,m.totalInv))}
    ${kpi("♙","i-orange",m.venue,"Sedang di Venue","Belum check out")}
    ${kpi("↩","i-red",m.checkedOut,"Check Out","Sudah keluar")}
    ${kpi("♥","i-purple",m.present,"Kehadiran Tamu",pct(m.present,m.totalInv))}
  </section>
  <section class="grid-2">
    <div class="card"><div class="card-head"><div><div class="card-title">Grafik Kehadiran</div><div class="card-sub">Aktivitas per jam</div></div><div class="legend"><span><i class="dot in"></i>Check In</span><span><i class="dot out"></i>Check Out</span><span><i class="dot venue"></i>Venue</span></div></div>${chart()}</div>
    <div class="card"><div class="card-head"><div><div class="card-title">Check In Terbaru</div><div class="card-sub">Transaksi terbaru</div></div><button class="btn btn-soft" onclick="setView('attendance')">Lihat Semua</button></div><div class="activity">${demoLatest.length?demoLatest.map(a=>activity(a)).join(""):`<div class="empty">Belum ada transaksi.</div>`}</div></div>
  </section>
  <section class="section grid-2">
    <div class="card"><div class="card-head"><div><div class="card-title">Komposisi Kehadiran</div><div class="card-sub">VIP vs REG</div></div></div>${donut(m.vip,m.reg)}</div>
    <div class="card"><div class="card-head"><div><div class="card-title">Aksi Cepat</div><div class="card-sub">Operasional venue</div></div></div><div class="action-row" style="display:flex;gap:10px"><button class="btn btn-primary" style="flex:1;height:58px" onclick="setView('checkin')">↪ CHECK IN TAMU</button><button class="btn btn-soft" style="flex:1;height:58px" onclick="setView('checkout')">↩ CHECK OUT TAMU</button></div></div>
  </section>`;
}
function pct(a,b){return b?`${Math.round(a/b*100)}%`:"0%"}
function kpi(icon,cls,value,label,meta){return `<div class="kpi"><div class="kpi-top"><div class="kpi-icon ${cls}">${icon}</div></div><div class="kpi-value">${value}</div><div class="kpi-label">${label}</div><div class="kpi-meta">${meta}</div></div>`}
function chart(){
  const vals=[12,18,28,35,48,62,85,95,72,52,29,14];return `<div class="chart">${vals.map((v,i)=>`<div class="bar-group"><div class="bar in" style="height:${v}%"></div><div class="bar out" style="height:${Math.max(4,v*.55)}%"></div><div class="bar venue" style="height:${Math.max(4,v*.32)}%"></div><span class="bar-label">${14+i}:00</span></div>`).join("")}</div>`
}
function activity(a){return `<div class="activity-row"><div class="person">♙</div><div><div class="person-name">${esc(a.name)}</div><div class="person-meta">${esc(a.type||"REG")} • ${esc(a.action||"CHECK IN")}</div></div><div class="activity-time">${esc(a.time||"—")}</div></div>`}
function donut(vip,reg){const total=vip+reg||1;const vp=Math.round(vip/total*100);return `<div style="display:flex;align-items:center;gap:35px;padding:15px 5px"><div style="width:150px;height:150px;border-radius:50%;background:conic-gradient(#d4a947 0 ${vp}%,#2b9a70 ${vp}% 100%);display:grid;place-items:center;position:relative"><div style="width:100px;height:100px;border-radius:50%;background:#fffdf8;display:grid;place-items:center;font:600 28px 'Playfair Display';color:var(--green-900)">${total}</div></div><div style="display:grid;gap:12px;font-size:11px"><div><i class="dot" style="background:#d4a947"></i>VIP <b>${vip}</b> (${vp}%)</div><div><i class="dot" style="background:#2b9a70"></i>REG <b>${reg}</b> (${100-vp}%)</div></div></div>`}

function attendanceView(action){
  return `<div class="page-head"><div><div class="eyebrow">Operasional Venue</div><h1 class="page-title">${action==="CHECK IN"?"Check In Tamu":"Check Out Tamu"}</h1><div class="page-desc">${action==="CHECK IN"?"Cari nama, pilih data tamu, lalu catat kedatangan.":"Cari tamu yang sedang berada di venue lalu catat kepulangan."}</div></div></div>
  <div class="form-layout">
    <div class="card search-panel">
      <div class="search-large"><span style="font-size:20px;color:var(--gold)">⌕</span><input id="guestSearch" placeholder="Ketik nama tamu..." autocomplete="off"><button class="btn btn-primary" onclick="searchGuests($('#guestSearch').value)">CARI</button></div>
      <div id="results" class="results"><div class="empty">Ketik nama tamu untuk memulai pencarian.</div></div>
      <div id="manualBox"></div>
    </div>
    <div class="card detail-card" id="detail"><div class="detail-empty">Pilih nama tamu dari hasil pencarian untuk melihat data.</div></div>
  </div>`;
}
function searchGuests(q){
  const term=(q||"").trim().toLowerCase();const r=$("#results");const mb=$("#manualBox");
  if(!term){r.innerHTML=`<div class="empty">Ketik nama tamu untuk memulai pencarian.</div>`;mb.innerHTML="";return}
  const found=guests.filter(g=>g.name.toLowerCase().includes(term)).slice(0,8);
  if(!found.length){r.innerHTML=`<div class="empty">Nama tidak ditemukan dalam database.</div>`;mb.innerHTML=manualForm(q);return}
  mb.innerHTML="";r.innerHTML=found.map(g=>`<div class="result-row" onclick="selectGuest('${g.id}')"><div class="result-main"><div class="result-avatar">♙</div><div><div class="result-name">${esc(g.name)}</div><div class="result-meta">${esc(g.from)} • ${typePill(g.type)}</div></div></div><span>›</span></div>`).join("");
}
function selectGuest(id){
  selectedGuest=guests.find(g=>g.id===id);document.querySelectorAll(".result-row").forEach(x=>x.classList.remove("selected"));
  event?.currentTarget?.classList.add("selected");renderDetail();
}
function renderDetail(){
  const d=$("#detail"),g=selectedGuest;if(!d||!g)return;
  const action=view==="checkout"?"CHECK OUT":"CHECK IN";
  const can = action==="CHECK IN" ? !g.checkIn : !!g.checkIn && !g.checkOut;
  d.innerHTML=`<div class="detail-avatar">♙</div><div class="detail-name">${esc(g.name)}</div><div style="margin-top:6px">${typePill(g.type)}</div>
    <div style="margin-top:18px"><div class="detail-line"><span class="detail-label">Tamu Dari</span><span class="detail-value">${esc(g.from)}</span></div><div class="detail-line"><span class="detail-label">Jumlah Undangan</span><span class="detail-value">${g.invitation} Orang</span></div><div class="detail-line"><span class="detail-label">Status</span><span class="detail-value"><span class="pill ${statusClass(g.status)}">${esc(g.status)}</span></span></div>${g.checkIn?`<div class="detail-line"><span class="detail-label">Check In</span><span class="detail-value">${g.checkIn}</span></div>`:""}${g.checkOut?`<div class="detail-line"><span class="detail-label">Check Out</span><span class="detail-value">${g.checkOut}</span></div>`:""}</div>
    ${action==="CHECK IN"?`<div style="margin-top:18px"><div class="label">Keterangan</div><div class="segmented"><button class="${g.type==="VIP"?"active vip-btn":""}" onclick="changeType('VIP')">♛ VIP</button><button class="${g.type==="REG"?"active reg-btn":""}" onclick="changeType('REG')">♙ REG</button></div></div>`:""}
    <div style="margin-top:18px"><button class="btn btn-primary" style="width:100%;height:48px" ${can?"":"disabled style='width:100%;height:48px;opacity:.45;cursor:not-allowed'"} onclick="doAttendance('${action}')">✓ ${action} TAMU</button></div>
    ${!can?`<div class="notice" style="margin-top:10px">${action==="CHECK IN"?"Tamu sudah tercatat Check In.":"Tamu belum Check In atau sudah Check Out."}</div>`:""}`;
}
function changeType(t){if(selectedGuest){selectedGuest.type=t;guests=guests.map(g=>g.id===selectedGuest.id?selectedGuest:g);renderDetail();}}
function manualForm(q){return `<div class="manual"><h4>Nama tidak ditemukan?</h4><p>Tamu ini dapat dicatat sebagai tamu manual.</p><div class="grid-form"><div><div class="label">Nama Tamu</div><input id="manualName" class="input" value="${esc(q)}"></div><div><div class="label">Tamu Dari</div><select id="manualFrom" class="select"><option>Keluarga Mempelai Pria</option><option>Keluarga Mempelai Wanita</option><option>Teman</option><option>Rekan Kerja</option><option>Lainnya</option></select></div><div><div class="label">Keterangan</div><div class="segmented"><button id="manualVip" class="reg-btn active" onclick="manualType('REG')">♙ REG</button><button id="manualVip" class="vip-btn" onclick="manualType('VIP')">♛ VIP</button></div></div><button class="btn btn-primary" style="margin-top:4px" onclick="manualCheckIn()">✓ CHECK IN TAMU MANUAL</button></div></div>`}
let manualTypeValue="REG";function manualType(t){manualTypeValue=t;document.querySelectorAll(".manual .segmented button").forEach(b=>b.classList.remove("active","vip-btn","reg-btn"));const btn=[...document.querySelectorAll(".manual .segmented button")].find(b=>b.textContent.includes(t));if(btn){btn.classList.add("active",t==="VIP"?"vip-btn":"reg-btn")}}
async function doAttendance(action){if(!selectedGuest)return;await recordAttendance(selectedGuest,action,"DATABASE");}
async function manualCheckIn(){
  const name=$("#manualName")?.value.trim();if(!name){toast("Nama wajib diisi","error");return}
  const g={id:"M"+Date.now(),name,from:$("#manualFrom").value,type:manualTypeValue,invitation:1,status:"DI VENUE",checkIn:nowParts().time,checkOut:"",manual:true};
  guests.push(g);selectedGuest=g;await recordAttendance(g,"CHECK IN","MANUAL");
}
async function recordAttendance(g,action,source){
  const p=nowParts();
  if(action==="CHECK IN"){g.checkIn=p.time;g.status="DI VENUE"}else{g.checkOut=p.time;g.status="SUDAH KELUAR"}
  const log={id:g.id,name:g.name,type:g.type,from:g.from,action,time:p.time,date:p.date,source};
  attendance.push(log);localStorage.setItem("pp_attendance",JSON.stringify(attendance));
  guests=guests.map(x=>x.id===g.id?g:x);
  if(CONFIG.GOOGLE_APPS_SCRIPT_URL){
    try{await fetch(CONFIG.GOOGLE_APPS_SCRIPT_URL,{method:"POST",body:JSON.stringify({action,name:g.name,from:g.from,type:g.type,invitation:g.invitation,source,date:p.date,time:p.time,iso:p.iso,id:g.id})})}catch(e){toast("Tersimpan lokal; koneksi database gagal","error")}
  }
  toast(`${action} berhasil • ${g.name}`);
  selectedGuest=g;render();setTimeout(()=>{if(view==="checkin"||view==="checkout")renderDetail()},50);
}
function guestsView(){
  return `<div class="page-head"><div><div class="eyebrow">Database</div><h1 class="page-title">Data Tamu</h1><div class="page-desc">Daftar tamu undangan dari Google Sheets.</div></div><button class="btn btn-gold" onclick="showAddGuest()">＋ Tambah Tamu</button></div>
  <div class="card table-card"><div class="table-toolbar"><input class="input search-inline" id="guestTableSearch" placeholder="Cari nama tamu..." oninput="filterGuestTable(this.value)"><span class="pill vip">VIP ${guests.filter(g=>g.type==="VIP").length}</span><span class="pill reg">REG ${guests.filter(g=>g.type==="REG").length}</span></div><div class="table-wrap"><table class="table"><thead><tr><th>No</th><th>Nama</th><th>Tamu Dari</th><th>Keterangan</th><th>Undangan</th><th>Status</th></tr></thead><tbody id="guestTableBody">${guestRows(guests)}</tbody></table></div></div>`;
}
function guestRows(arr){return arr.map((g,i)=>`<tr><td>${i+1}</td><td class="name-cell">${esc(g.name)}</td><td>${esc(g.from)}</td><td>${typePill(g.type)}</td><td>${g.invitation}</td><td><span class="pill ${statusClass(g.status)}">● ${esc(g.status)}</span></td></tr>`).join("")||`<tr><td colspan="6"><div class="empty">Data tidak ditemukan.</div></td></tr>`}
function filterGuestTable(q){const a=guests.filter(g=>g.name.toLowerCase().includes(q.toLowerCase()));$("#guestTableBody").innerHTML=guestRows(a)}
function showAddGuest(){toast("Fitur tambah tamu akan menulis ke MASTER TAMU Google Sheets setelah koneksi API aktif.")}
function logsView(){
  const logs=[...attendance].reverse();return `<div class="page-head"><div><div class="eyebrow">Audit Trail</div><h1 class="page-title">Absensi</h1><div class="page-desc">Riwayat Check In dan Check Out.</div></div><button class="btn btn-gold" onclick="exportCSV()">⇩ Export CSV</button></div>
  <div class="card table-card"><div class="table-toolbar"><input class="input search-inline" placeholder="Cari nama..." oninput="filterLogs(this.value)"></div><div class="table-wrap"><table class="table"><thead><tr><th>Waktu</th><th>Nama</th><th>Tamu Dari</th><th>Ket.</th><th>Aksi</th><th>Sumber</th></tr></thead><tbody id="logBody">${logRows(logs)}</tbody></table></div></div>`;
}
function logRows(a){return a.map(x=>`<tr><td>${esc(x.date||"")} ${esc(x.time||"")}</td><td class="name-cell">${esc(x.name)}</td><td>${esc(x.from)}</td><td>${typePill(x.type)}</td><td><span class="pill ${x.action==="CHECK IN"?"status-in":"status-out"}">${x.action}</span></td><td>${esc(x.source)}</td></tr>`).join("")||`<tr><td colspan="6"><div class="empty">Belum ada transaksi.</div></td></tr>`}
function filterLogs(q){const a=attendance.filter(x=>x.name.toLowerCase().includes(q.toLowerCase())).reverse();$("#logBody").innerHTML=logRows(a)}
function reportsView(){const m=metrics();return `<div class="page-head"><div><div class="eyebrow">Laporan</div><h1 class="page-title">Rekap & Laporan</h1><div class="page-desc">Ringkasan operasional tamu dan kehadiran.</div></div><button class="btn btn-gold" onclick="exportCSV()">⇩ Export CSV</button></div><div class="kpis">${kpi("♙","i-green",m.totalInv,"Tamu Undangan","")} ${kpi("♥","i-purple",m.present,"Kehadiran","")} ${kpi("♛","i-orange",m.vip,"VIP","")} ${kpi("♙","i-blue",m.reg,"REG","")}</div><div class="card"><div class="card-title">Ringkasan</div><p class="muted" style="font-size:11px;line-height:1.8">Data laporan akan mengikuti MASTER TAMU dan ABSENSI di Google Sheets setelah API diaktifkan. Export saat ini mengambil data yang tersedia di browser.</p></div>`}
function settingsView(){return `<div class="page-head"><div><div class="eyebrow">System</div><h1 class="page-title">Pengaturan</h1><div class="page-desc">Konfigurasi koneksi dan tampilan.</div></div></div><div class="card"><div class="card-title">Google Apps Script</div><p class="muted" style="font-size:11px;line-height:1.7">Tempel URL Web App pada <b>CONFIG.GOOGLE_APPS_SCRIPT_URL</b> di app.js. Jangan menaruh kredensial Google di website.</p><div class="notice">Status koneksi: ${CONFIG.GOOGLE_APPS_SCRIPT_URL?"URL API sudah diisi.":"Demo Mode — database Google Sheets belum dihubungkan."}</div></div>`}
function exportCSV(){
  const rows=[["ID","Nama","Tamu Dari","Keterangan","Undangan","Status","Check In","Check Out"],...guests.map(g=>[g.id,g.name,g.from,g.type,g.invitation,g.status,g.checkIn,g.checkOut])];
  const csv=rows.map(r=>r.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="premium-project-guest-report.csv";a.click();URL.revokeObjectURL(a.href);
}
function bindView(){
  if(view==="checkin"||view==="checkout"){const i=$("#guestSearch");i?.addEventListener("input",()=>searchGuests(i.value));i?.addEventListener("keydown",e=>{if(e.key==="Enter")searchGuests(i.value)});}
}
render();
