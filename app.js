/* =========================================================
   PREMIUM PROJECT
   GUEST ATTENDANCE SYSTEM
   FINAL VERSION
========================================================= */

const CONFIG = {

  /*
    MASUKKAN URL WEB APP GOOGLE APPS SCRIPT
    CONTOH:
    https://script.google.com/macros/s/XXXXXXXXXXXX/exec

    Untuk sementara kosong = DEMO MODE
  */
  GOOGLE_APPS_SCRIPT_URL: "",

  /*
    refresh dashboard dari Google Sheets
  */
  REFRESH_MS: 15000

};


/* =========================================================
   SVG ICON SYSTEM
========================================================= */

const ICON = {

  dashboard: `
    <svg viewBox="0 0 24 24">
      <path d="M4 13.5 12 6l8 7.5"/>
      <path d="M6 12v7h12v-7"/>
      <path d="M9.5 19v-4h5v4"/>
    </svg>
  `,

  guests: `
    <svg viewBox="0 0 24 24">
      <circle cx="9" cy="8.2" r="3"/>
      <path d="M3.5 19c.6-3.3 2.5-5 5.5-5s4.9 1.7 5.5 5"/>
      <path d="M16 5.5a3 3 0 0 1 0 5.8"/>
      <path d="M16.5 14c2.4.5 3.8 2 4.2 5"/>
    </svg>
  `,

  checkin: `
    <svg viewBox="0 0 24 24">
      <path d="M11 4.5H5v15h6"/>
      <path d="M13 12h7"/>
      <path d="m16.5 8.5 3.5 3.5-3.5 3.5"/>
    </svg>
  `,

  checkout: `
    <svg viewBox="0 0 24 24">
      <path d="M13 4.5h6v15h-6"/>
      <path d="M11 12H4"/>
      <path d="m7.5 8.5-3.5 3.5 3.5 3.5"/>
    </svg>
  `,

  attendance: `
    <svg viewBox="0 0 24 24">
      <rect x="5" y="4" width="14" height="17" rx="2"/>
      <path d="M8 8h8"/>
      <path d="M8 12h4"/>
      <path d="M8 16h3"/>
      <path d="m14 15 1.5 1.5 3-3"/>
    </svg>
  `,

  report: `
    <svg viewBox="0 0 24 24">
      <path d="M5 20V10"/>
      <path d="M12 20V5"/>
      <path d="M19 20v-7"/>
      <path d="M3 20h18"/>
    </svg>
  `,

  settings: `
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.9 1.9 0 0 0 .3 2l.1.1-1.8 1.8-.1-.1a1.9 1.9 0 0 0-2-.3 1.9 1.9 0 0 0-1.1 1.7v.1h-2.5v-.1a1.9 1.9 0 0 0-1.1-1.7 1.9 1.9 0 0 0-2 .3l-.1.1-1.8-1.8.1-.1a1.9 1.9 0 0 0 .3-2 1.9 1.9 0 0 0-1.7-1.1H6v-2.5h.1a1.9 1.9 0 0 0 1.7-1.1 1.9 1.9 0 0 0-.3-2l-.1-.1 1.8-1.8.1.1a1.9 1.9 0 0 0 2 .3A1.9 1.9 0 0 0 12.4 6v-.1h2.5V6a1.9 1.9 0 0 0 1.1 1.7 1.9 1.9 0 0 0 2-.3l.1-.1 1.8 1.8-.1.1a1.9 1.9 0 0 0-.3 2 1.9 1.9 0 0 0 1.7 1.1h.1v2.5h-.1a1.9 1.9 0 0 0-1.8 1.2Z"/>
    </svg>
  `,

  search: `
    <svg viewBox="0 0 24 24">
      <circle cx="10.8" cy="10.8" r="6.2"/>
      <path d="m16 16 4.5 4.5"/>
    </svg>
  `,

  calendar: `
    <svg viewBox="0 0 24 24">
      <rect x="4" y="5.5" width="16" height="15" rx="2"/>
      <path d="M8 3v5"/>
      <path d="M16 3v5"/>
      <path d="M4 10h16"/>
    </svg>
  `,

  users: `
    <svg viewBox="0 0 24 24">
      <circle cx="9" cy="8" r="2.8"/>
      <circle cx="16.5" cy="8.8" r="2.2"/>
      <path d="M3.7 19c.5-3.2 2.4-4.8 5.3-4.8s4.8 1.6 5.3 4.8"/>
      <path d="M14.2 14.5c2.5-.2 4.5 1.3 5 4.5"/>
    </svg>
  `,

  heart: `
    <svg viewBox="0 0 24 24">
      <path d="M20.5 8.7c0 5.1-8.5 10.3-8.5 10.3S3.5 13.8 3.5 8.7A4.4 4.4 0 0 1 12 6.4a4.4 4.4 0 0 1 8.5 2.3Z"/>
    </svg>
  `,

  export: `
    <svg viewBox="0 0 24 24">
      <path d="M12 4v10"/>
      <path d="m8 10 4 4 4-4"/>
      <path d="M5 20h14"/>
    </svg>
  `,

  arrow: `
    <svg viewBox="0 0 24 24">
      <path d="M5 12h13"/>
      <path d="m13 6 6 6-6 6"/>
    </svg>
  `

};


/* =========================================================
   DEMO DATABASE
========================================================= */

const DEMO_GUESTS = [

  {
    id:"001",
    name:"Budi Santoso",
    from:"Keluarga Mempelai Pria",
    type:"VIP",
    checkIn:"",
    checkOut:""
  },

  {
    id:"002",
    name:"Andi Wijaya",
    from:"Rekan Kerja",
    type:"REG",
    checkIn:"",
    checkOut:""
  },

  {
    id:"003",
    name:"Siti Aminah",
    from:"Keluarga Mempelai Wanita",
    type:"REG",
    checkIn:"",
    checkOut:""
  },

  {
    id:"004",
    name:"Rina Agustina",
    from:"Keluarga Mempelai Wanita",
    type:"VIP",
    checkIn:"",
    checkOut:""
  },

  {
    id:"005",
    name:"Joko Suprapto",
    from:"Teman",
    type:"REG",
    checkIn:"",
    checkOut:""
  },

  {
    id:"006",
    name:"Dewi Lestari",
    from:"Keluarga Mempelai Pria",
    type:"VIP",
    checkIn:"",
    checkOut:""
  },

  {
    id:"007",
    name:"Ahmad Fauzi",
    from:"Rekan Kerja",
    type:"VIP",
    checkIn:"",
    checkOut:""
  },

  {
    id:"008",
    name:"Maya Sari",
    from:"Keluarga Mempelai Wanita",
    type:"REG",
    checkIn:"",
    checkOut:""
  },

  {
    id:"009",
    name:"Fajar Ramadhan",
    from:"Teman",
    type:"REG",
    checkIn:"",
    checkOut:""
  },

  {
    id:"010",
    name:"Nadia Putri",
    from:"Keluarga",
    type:"VIP",
    checkIn:"",
    checkOut:""
  }

];


let guests = [];
let attendance = [];

let selectedGuest = null;

let currentView =
  location.hash.replace("#","")
  || "dashboard";


let manualTypeValue = "REG";


/* =========================================================
   STORAGE
========================================================= */

function loadLocal(){

  const savedGuests =
    localStorage.getItem(
      "pp_guests"
    );

  const savedAttendance =
    localStorage.getItem(
      "pp_attendance"
    );


  guests =
    savedGuests
      ? JSON.parse(savedGuests)
      : DEMO_GUESTS.map(x=>({...x}));


  attendance =
    savedAttendance
      ? JSON.parse(savedAttendance)
      : [];

}


function saveLocal(){

  localStorage.setItem(
    "pp_guests",
    JSON.stringify(guests)
  );

  localStorage.setItem(
    "pp_attendance",
    JSON.stringify(attendance)
  );

}


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value){

  return String(
    value ?? ""
  ).replace(
    /[&<>"']/g,
    char=>({
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#039;"
    }[char])
  );

}


function now(){

  const date =
    new Date();


  return {

    date:
      date.toLocaleDateString(
        "id-ID",
        {
          weekday:"long",
          day:"2-digit",
          month:"long",
          year:"numeric"
        }
      ),

    shortDate:
      date.toLocaleDateString(
        "id-ID",
        {
          day:"2-digit",
          month:"2-digit",
          year:"numeric"
        }
      ),

    time:
      date.toLocaleTimeString(
        "id-ID",
        {
          hour:"2-digit",
          minute:"2-digit",
          second:"2-digit",
          hour12:false
        }
      ),

    iso:
      date.toISOString()

  };

}


function percentage(value,total){

  if(!total){
    return 0;
  }

  return Math.round(
    (value / total) * 100
  );

}


function initials(name){

  return String(
    name || "PP"
  )
  .split(" ")
  .filter(Boolean)
  .slice(0,2)
  .map(
    item=>item.charAt(0)
  )
  .join("")
  .toUpperCase();

}


function statusClass(status){

  if(
    status === "DI VENUE"
  ){
    return "status-venue";
  }

  if(
    status === "SUDAH KELUAR"
  ){
    return "status-out";
  }

  return "status-none";

}


function typePill(type){

  return `
    <span class="pill ${type === "VIP" ? "vip" : "reg"}">
      ${escapeHTML(type)}
    </span>
  `;

}


function guestStatus(guest){

  if(
    guest.checkIn &&
    !guest.checkOut
  ){
    return "DI VENUE";
  }

  if(
    guest.checkIn &&
    guest.checkOut
  ){
    return "SUDAH KELUAR";
  }

  return "BELUM HADIR";

}


/* =========================================================
   CORE METRICS
========================================================= */

function getMetrics(){

  const totalGuests =
    guests.length;


  /*
    MASTER LOGIC:

    Check In
    = orang yang sudah check in
      DAN masih di venue

    Sedang di Venue
    = sama persis dengan Check In

    Check Out
    = orang yang sudah check out

    Kehadiran
    = semua orang yang pernah check in
  */

  const checkedInGuests =
    guests.filter(
      guest =>
        guest.checkIn &&
        !guest.checkOut
    );


  const checkedOutGuests =
    guests.filter(
      guest =>
        guest.checkIn &&
        guest.checkOut
    );


  const attendanceCount =
    guests.filter(
      guest =>
        !!guest.checkIn
    );


  const venueCount =
    checkedInGuests.length;


  const checkInCount =
    checkedInGuests.length;


  const checkOutCount =
    checkedOutGuests.length;


  const vipPresent =
    attendanceCount.filter(
      guest =>
        guest.type === "VIP"
    ).length;


  const regPresent =
    attendanceCount.filter(
      guest =>
        guest.type === "REG"
    ).length;


  return {

    totalGuests,

    checkInCount,

    venueCount,

    checkOutCount,

    attendanceCount,

    vipPresent,

    regPresent,

    checkInPercent:
      percentage(
        checkInCount,
        totalGuests
      ),

    venuePercent:
      percentage(
        venueCount,
        totalGuests
      ),

    attendancePercent:
      percentage(
        attendanceCount.length,
        totalGuests
      )

  };

}


/* =========================================================
   NAVIGATION
========================================================= */

function navButton(
  id,
  icon,
  label
){

  return `

    <button
      class="${currentView === id ? "active" : ""}"
      onclick="go('${id}')"
    >

      <span class="nav-icon">
        ${ICON[icon]}
      </span>

      <span class="nav-label">
        ${label}
      </span>

    </button>

  `;

}


function go(view){

  currentView = view;

  location.hash = view;

  render();

}


window.addEventListener(
  "hashchange",
  ()=>{
    currentView =
      location.hash.replace("#","")
      || "dashboard";

    render();
  }
);


/* =========================================================
   SIDEBAR
========================================================= */

function toggleSidebar(){

  document
    .getElementById("sidebar")
    ?.classList
    .toggle("open");

}


/* =========================================================
   TOP SHELL
========================================================= */

function shell(content){

  return `

    <div class="app-shell">

      <aside
        class="sidebar"
        id="sidebar"
      >

        <div class="brand">

          <div class="brand-mark">
            P
          </div>

          <div class="brand-name">
            PREMIUM PROJECT
          </div>

          <div class="brand-sub">
            WEDDING ORGANIZER
          </div>

        </div>


        <nav class="nav">

          ${navButton(
            "dashboard",
            "dashboard",
            "Dashboard"
          )}

          ${navButton(
            "guests",
            "guests",
            "Data Tamu"
          )}

          ${navButton(
            "checkin",
            "checkin",
            "Check In"
          )}

          ${navButton(
            "checkout",
            "checkout",
            "Check Out"
          )}

          ${navButton(
            "attendance",
            "attendance",
            "Absensi"
          )}

          ${navButton(
            "reports",
            "report",
            "Rekap & Laporan"
          )}

          ${navButton(
            "settings",
            "settings",
            "Pengaturan"
          )}

        </nav>


        <div class="sidebar-footer">

          <strong>
            Guest Attendance System
          </strong>

          <br>

          Premium Project
          <br>

          Digital Event Operations

        </div>

      </aside>


      <main class="main">

        <header class="topbar">

          <button
            class="mobile-menu"
            onclick="toggleSidebar()"
          >
            ☰
          </button>


          <div class="search-global">

            ${ICON.search}

            <input
              id="globalSearch"
              placeholder="Cari nama tamu, keluarga, atau kode..."
              onkeydown="globalSearchKey(event)"
            >

            <span class="keyboard">
              Ctrl + K
            </span>

          </div>


          <div class="top-actions">

            <div class="clock">

              <div
                class="clock-date"
                id="liveDate"
              >
              </div>

              <div
                class="clock-time"
                id="liveTime"
              >
              </div>

            </div>


            <div class="profile">

              <div class="avatar">
                PP
              </div>

              <div>

                <div class="profile-name">
                  Premium Project
                </div>

                <div class="profile-role">
                  Administrator
                </div>

              </div>

              <div class="profile-arrow">
                ⌄
              </div>

            </div>

          </div>

        </header>


        <section class="content">

          ${content}

        </section>

      </main>

    </div>

  `;

}


/* =========================================================
   DASHBOARD
========================================================= */

function dashboard(){

  const m =
    getMetrics();


  const recent =
    [...attendance]
      .sort(
        (a,b)=>
          new Date(b.iso)
          -
          new Date(a.iso)
      )
      .slice(0,6);


  return `

    <div class="page-head">

      <div>

        <div class="eyebrow">
          Premium Project
        </div>

        <h1 class="page-title">
          Dashboard
        </h1>

        <div class="page-desc">
          Guest Attendance System • Monitoring kehadiran secara realtime.
        </div>

      </div>


      <button
        class="btn btn-gold"
        onclick="exportCSV()"
      >

        ${ICON.export}

        Export

      </button>

    </div>


    <section class="hero">

      <div class="hero-border"></div>


      <div class="hero-content">

        <div class="hero-tag">
          SPECIAL MOMENTS • LASTING MEMORIES
        </div>


        <div class="hero-title-small">
          Welcome to
        </div>


        <div class="hero-title">
          Premium Project
        </div>


        <div class="hero-subtitle">
          Guest Attendance System
        </div>


        <div class="hero-caption">
          Setiap Kehadiran Adalah Bagian Dari Cerita Indah
        </div>

      </div>

    </section>


    <section class="kpis">

      ${metricCard(
        ICON.users,
        "i-green",
        m.totalGuests,
        "Tamu Undangan",
        "Total Database",
        100,
        "var(--green)"
      )}


      ${metricCard(
        ICON.checkin,
        "i-blue",
        m.checkInCount,
        "Check In",
        `${m.checkInPercent}% dari undangan`,
        m.checkInPercent,
        "var(--blue)"
      )}


      ${metricCard(
        ICON.users,
        "i-orange",
        m.venueCount,
        "Sedang di Venue",
        "Saat ini berada di venue",
        m.venuePercent,
        "var(--orange)"
      )}


      ${metricCard(
        ICON.checkout,
        "i-red",
        m.checkOutCount,
        "Check Out",
        "Sudah keluar",
        percentage(
          m.checkOutCount,
          m.totalGuests
        ),
        "var(--red)"
      )}


      ${metricCard(
        ICON.heart,
        "i-purple",
        m.attendanceCount.length,
        "Kehadiran Tamu",
        `${m.attendancePercent}% hadir`,
        m.attendancePercent,
        "var(--purple)"
      )}

    </section>


    <section class="dashboard-grid">


      <div class="card chart-card">

        <div class="card-head">

          <div>

            <div class="card-title">
              Grafik Kehadiran Tamu
            </div>

            <div class="card-sub">
              Aktivitas kehadiran berdasarkan waktu
            </div>

          </div>


          <div class="legend">

            <span>
              <i class="dot in"></i>
              Check In
            </span>

            <span>
              <i class="dot out"></i>
              Check Out
            </span>

            <span>
              <i class="dot venue"></i>
              Di Venue
            </span>

          </div>

        </div>


        ${attendanceChart()}

      </div>


      <div class="card">

        <div class="card-head">

          <div>

            <div class="card-title">
              Check In Terbaru
            </div>

            <div class="card-sub">
              Aktivitas tamu terbaru
            </div>

          </div>


          <button
            class="card-link"
            onclick="go('attendance')"
          >
            Lihat Semua →
          </button>

        </div>


        <div class="activity">

          ${
            recent.length
              ? recent
                  .map(
                    item=>activityRow(item)
                  )
                  .join("")
              : emptyState(
                  "Belum ada aktivitas check in."
                )
          }

        </div>

      </div>


      <div class="side-stack">


        <div class="card">

          <div class="card-head">

            <div>

              <div class="card-title">
                Komposisi Tamu
              </div>

              <div class="card-sub">
                VIP vs REG
              </div>

            </div>

          </div>


          ${donutChart(
            m.vipPresent,
            m.regPresent
          )}

        </div>


        <div class="card venue-card">

          <div class="card-head">

            <div>

              <div class="card-title">
                Status Venue
              </div>

              <div class="card-sub"
                style="color:#9fc2b5">
                Tamu saat ini
              </div>

            </div>

            ${ICON.users}

          </div>


          <div class="venue-number">
            ${m.venueCount}
          </div>


          <div class="venue-meta">
            Tamu masih berada di dalam venue
          </div>


          <div class="venue-progress">

            <span
              style="width:${m.venuePercent}%"
            ></span>

          </div>


          <button
            class="venue-action"
            onclick="go('checkout')"
          >
            Lihat Detail →
          </button>

        </div>


        <div class="card">

          <div class="weather">

            <div>

              <div class="card-title">
                Status Sistem
              </div>

              <div class="weather-place">
                Guest Attendance System
              </div>

            </div>


            <div class="weather-icon">
              ✦
            </div>


            <div class="weather-temp">
              LIVE
            </div>

          </div>

        </div>


      </div>

    </section>


    <section
      class="bottom-grid"
      style="margin-top:14px"
    >


      <div class="card">

        <div class="card-head">

          <div>

            <div class="card-title">
              Quick Action
            </div>

            <div class="card-sub">
              Akses cepat fitur utama
            </div>

          </div>

        </div>


        <div class="quick-actions">


          <button
            class="quick-action quick-green"
            onclick="go('checkin')"
          >

            <span class="quick-icon">
              ${ICON.checkin}
            </span>

            Check In Tamu

          </button>


          <button
            class="quick-action quick-gold"
            onclick="go('checkout')"
          >

            <span class="quick-icon">
              ${ICON.checkout}
            </span>

            Check Out Tamu

          </button>


          <button
            class="quick-action quick-light"
            onclick="go('guests')"
          >

            <span class="quick-icon">
              ${ICON.guests}
            </span>

            Data Tamu

          </button>


          <button
            class="quick-action quick-light"
            onclick="go('reports')"
          >

            <span class="quick-icon">
              ${ICON.report}
            </span>

            Rekap & Laporan

          </button>


        </div>

      </div>


      <div class="card">

        <div class="card-head">

          <div>

            <div class="card-title">
              Informasi
            </div>

            <div class="card-sub">
              Update sistem dan notifikasi
            </div>

          </div>

        </div>


        ${informationPanel(m)}

      </div>


      <div class="image-card">

        <div>

          <small>
            PREMIUM PROJECT
          </small>

          <h3>
            Together<br>
            We Create<br>
            Beautiful Moments
          </h3>

          <div class="image-line"></div>

        </div>

      </div>


    </section>

  `;

}


function metricCard(
  icon,
  iconClass,
  value,
  label,
  meta,
  progress,
  color
){

  return `

    <div class="kpi">

      <div class="kpi-top">

        <div class="kpi-icon ${iconClass}">
          ${icon}
        </div>

      </div>


      <div class="kpi-value">
        ${value}
      </div>


      <div class="kpi-label">
        ${label}
      </div>


      <div class="kpi-meta">
        ${meta}
      </div>


      <div class="progress">

        <span
          style="
            width:${Math.min(100,progress)}%;
            background:${color};
          "
        ></span>

      </div>

    </div>

  `;

}


/* =========================================================
   CHART
========================================================= */

function attendanceChart(){

  const hours =
    [
      "14","15","16","17",
      "18","19","20","21",
      "22","23","00","01"
    ];


  const checkInValues =
    [
      6,10,17,25,
      34,47,64,74,
      56,39,24,11
    ];


  const checkOutValues =
    [
      2,5,8,12,
      18,27,36,42,
      33,22,12,7
    ];


  const venueValues =
    [
      1,3,5,8,
      12,17,23,29,
      21,15,8,4
    ];


  return `

    <div class="chart">

      ${
        hours.map(
          (hour,index)=>`

            <div class="bar-group">

              <div
                class="bar in"
                style="
                  height:${checkInValues[index]}%;
                "
              ></div>

              <div
                class="bar out"
                style="
                  height:${checkOutValues[index]}%;
                "
              ></div>

              <div
                class="bar venue"
                style="
                  height:${venueValues[index]}%;
                "
              ></div>

              <span class="bar-label">
                ${hour}:00
              </span>

            </div>

          `
        ).join("")
      }

    </div>

  `;

}


/* =========================================================
   ACTIVITY
========================================================= */

function activityRow(item){

  return `

    <div class="activity-row">

      <div class="person">
        ${initials(item.name)}
      </div>


      <div>

        <div class="person-name">
          ${escapeHTML(item.name)}
        </div>

        <div class="person-meta">
          ${escapeHTML(item.type)}
          •
          ${escapeHTML(item.action)}
        </div>

      </div>


      <div class="activity-right">

        <div class="activity-time">
          ${escapeHTML(item.time)}
        </div>

        <div class="activity-action">
          ${typePill(item.type)}
        </div>

      </div>

    </div>

  `;

}


/* =========================================================
   DONUT
========================================================= */

function donutChart(vip,reg){

  const total =
    vip + reg;


  const vipPercent =
    percentage(vip,total);


  const regPercent =
    100 - vipPercent;


  return `

    <div class="donut-wrap">

      <div
        class="donut"
        style="
          background:
          conic-gradient(
            #d6ae58 0 ${vipPercent}%,
            #15966c ${vipPercent}% 100%
          );
        "
      >

        <div class="donut-center">

          <div class="donut-number">
            ${total}
          </div>

          <div class="donut-label">
            HADIR
          </div>

        </div>

      </div>


      <div class="donut-legend">

        <div class="legend-row">

          <span
            class="legend-dot"
            style="background:#d6ae58"
          ></span>

          <div>

            <strong>VIP</strong>

            <br>

            ${vip}
            (${vipPercent}%)

          </div>

        </div>


        <div class="legend-row">

          <span
            class="legend-dot"
            style="background:#15966c"
          ></span>

          <div>

            <strong>REG</strong>

            <br>

            ${reg}
            (${regPercent}%)

          </div>

        </div>

      </div>

    </div>

  `;

}


/* =========================================================
   INFORMATION
========================================================= */

function informationPanel(m){

  const items = [

    {
      text:
        `Kehadiran saat ini ${m.attendancePercent}% dari undangan`,
      time:"Live"
    },

    {
      text:
        `${m.venueCount} tamu masih berada di venue`,
      time:"Live"
    },

    {
      text:
        `${m.checkOutCount} tamu sudah melakukan Check Out`,
      time:"Live"
    },

    {
      text:
        "Sistem siap menerima transaksi tamu",
      time:"Ready"
    }

  ];


  return `

    <div class="info-list">

      ${
        items.map(
          (item,index)=>`

            <div class="info-row">

              <div
                class="info-icon"
                style="
                  background:${
                    [
                      "#15966c",
                      "#357fe8",
                      "#d99a25",
                      "#15966c"
                    ][index]
                  };
                "
              ></div>


              <div class="info-text">
                ${escapeHTML(item.text)}
              </div>


              <div class="info-time">
                ${item.time}
              </div>

            </div>

          `
        ).join("")
      }

    </div>

  `;

}


/* =========================================================
   CHECK IN / OUT PAGE
========================================================= */

function attendancePage(mode){

  const isCheckIn =
    mode === "CHECK IN";


  return `

    <div class="page-head">

      <div>

        <div class="eyebrow">
          Operasional Venue
        </div>

        <h1 class="page-title">
          ${isCheckIn ? "Check In Tamu" : "Check Out Tamu"}
        </h1>

        <div class="page-desc">

          ${
            isCheckIn
              ? "Cari nama tamu, pilih data, lalu catat kedatangan."
              : "Cari tamu yang berada di venue lalu catat kepulangannya."
          }

        </div>

      </div>

    </div>


    <div class="form-layout">


      <div class="card search-panel">

        <div class="search-large">

          ${ICON.search}


          <input
            id="guestSearch"
            placeholder="Ketik nama tamu..."
            autocomplete="off"
          >


          <button
            class="btn btn-primary"
            onclick="searchGuests()"
          >
            CARI
          </button>

        </div>


        <div
          id="results"
          class="results"
        >

          ${emptyState(
            "Ketik nama tamu untuk memulai pencarian."
          )}

        </div>


        <div id="manualBox"></div>

      </div>


      <div
        class="card detail-card"
        id="detail"
      >

        ${emptyState(
          "Pilih nama tamu dari hasil pencarian untuk melihat data."
        )}

      </div>


    </div>

  `;

}


function searchGuests(){

  const input =
    document.getElementById(
      "guestSearch"
    );


  const query =
    input.value
      .trim()
      .toLowerCase();


  const results =
    document.getElementById(
      "results"
    );


  const manualBox =
    document.getElementById(
      "manualBox"
    );


  if(!query){

    results.innerHTML =
      emptyState(
        "Ketik nama tamu untuk memulai pencarian."
      );

    manualBox.innerHTML = "";

    return;

  }


  let found =
    guests.filter(
      guest=>{

        const haystack =
          [
            guest.id,
            guest.name,
            guest.from,
            guest.type
          ]
          .join(" ")
          .toLowerCase();


        return haystack.includes(
          query
        );

      }
    );


  /*
    Untuk halaman Check Out,
    hanya tampilkan tamu yang
    masih berada di venue.
  */

  if(
    currentView === "checkout"
  ){

    found =
      found.filter(
        guest =>
          guest.checkIn &&
          !guest.checkOut
      );

  }


  if(!found.length){

    results.innerHTML =
      emptyState(
        "Nama tidak ditemukan."
      );


    if(
      currentView === "checkin"
    ){

      manualBox.innerHTML =
        manualForm(
          input.value
        );

    }else{

      manualBox.innerHTML="";

    }

    return;

  }


  manualBox.innerHTML="";


  results.innerHTML =
    found
      .slice(0,8)
      .map(
        guest=>`

          <div
            class="result-row"
            onclick="selectGuest('${guest.id}', this)"
          >

            <div class="result-main">

              <div class="result-avatar">

                ${ICON.guests}

              </div>


              <div>

                <div class="result-name">
                  ${escapeHTML(guest.name)}
                </div>


                <div class="result-meta">

                  ${escapeHTML(guest.from)}

                  •

                  ${typePill(guest.type)}

                </div>

              </div>

            </div>


            <span>
              →
            </span>

          </div>

        `
      )
      .join("");

}


function selectGuest(
  id,
  element
){

  selectedGuest =
    guests.find(
      guest=>guest.id===id
    );


  document
    .querySelectorAll(
      ".result-row"
    )
    .forEach(
      row=>
        row.classList.remove(
          "selected"
        )
    );


  element
    ?.classList
    .add("selected");


  renderGuestDetail();

}


function renderGuestDetail(){

  if(!selectedGuest){

    return;

  }


  const detail =
    document.getElementById(
      "detail"
    );


  if(!detail){

    return;

  }


  const guest =
    selectedGuest;


  const isCheckIn =
    currentView === "checkin";


  const canCheckIn =
    !guest.checkIn;


  const canCheckOut =
    !!guest.checkIn &&
    !guest.checkOut;


  detail.innerHTML = `

    <div class="detail-avatar">

      ${ICON.guests}

    </div>


    <div class="detail-name">
      ${escapeHTML(guest.name)}
    </div>


    <div style="margin-top:7px">
      ${typePill(guest.type)}
    </div>


    <div style="margin-top:16px">


      <div class="detail-line">

        <span class="detail-label">
          Tamu Dari
        </span>

        <span class="detail-value">
          ${escapeHTML(guest.from)}
        </span>

      </div>


      <div class="detail-line">

        <span class="detail-label">
          ID Tamu
        </span>

        <span class="detail-value">
          ${escapeHTML(guest.id)}
        </span>

      </div>


      <div class="detail-line">

        <span class="detail-label">
          Status
        </span>

        <span class="detail-value">

          <span
            class="pill ${statusClass(
              guestStatus(guest)
            )}"
          >
            ${guestStatus(guest)}
          </span>

        </span>

      </div>


      ${
        guest.checkIn
          ? `

            <div class="detail-line">

              <span class="detail-label">
                Check In
              </span>

              <span class="detail-value">
                ${escapeHTML(guest.checkIn)}
              </span>

            </div>

          `
          : ""
      }


      ${
        guest.checkOut
          ? `

            <div class="detail-line">

              <span class="detail-label">
                Check Out
              </span>

              <span class="detail-value">
                ${escapeHTML(guest.checkOut)}
              </span>

            </div>

          `
          : ""
      }

    </div>


    ${
      isCheckIn
        ? `

          <div style="margin-top:16px">

            <div class="label">
              Keterangan
            </div>


            <div class="segmented">

              <button
                class="${
                  guest.type==="VIP"
                    ? "active vip-btn"
                    : ""
                }"
                onclick="changeGuestType('VIP')"
              >
                VIP
              </button>


              <button
                class="${
                  guest.type==="REG"
                    ? "active reg-btn"
                    : ""
                }"
                onclick="changeGuestType('REG')"
              >
                REG
              </button>

            </div>

          </div>

        `
        : ""
    }


    <div style="margin-top:16px">


      ${
        isCheckIn
          ? `

            <button
              class="btn btn-primary"
              style="width:100%"
              ${
                canCheckIn
                  ? ""
                  : "disabled"
              }
              onclick="performAttendance('CHECK IN')"
            >
              ${ICON.checkin}
              CHECK IN TAMU
            </button>

          `
          : `

            <button
              class="btn btn-danger"
              style="width:100%"
              ${
                canCheckOut
                  ? ""
                  : "disabled"
              }
              onclick="performAttendance('CHECK OUT')"
            >
              ${ICON.checkout}
              CHECK OUT TAMU
            </button>

          `

      }


    </div>


    ${
      isCheckIn && !canCheckIn
        ? `

          <div
            class="notice"
            style="margin-top:10px"
          >
            Tamu ini sudah melakukan Check In.
          </div>

        `
        : ""
    }


    ${
      !isCheckIn && !canCheckOut
        ? `

          <div
            class="notice"
            style="margin-top:10px"
          >
            Tamu ini tidak sedang berada di venue.
          </div>

        `
        : ""
    }

  `;

}


function changeGuestType(type){

  if(!selectedGuest){

    return;

  }


  selectedGuest.type =
    type;


  guests =
    guests.map(
      guest =>
        guest.id === selectedGuest.id
          ? selectedGuest
          : guest
    );


  saveLocal();

  renderGuestDetail();

}


/* =========================================================
   MANUAL GUEST
========================================================= */

function manualForm(name){

  manualTypeValue = "REG";


  return `

    <div class="manual">

      <h4>
        Tamu tidak ditemukan?
      </h4>

      <p>
        Tambahkan sebagai tamu manual dan langsung lakukan Check In.
      </p>


      <div class="grid-form">


        <div>

          <div class="label">
            Nama Tamu
          </div>

          <input
            id="manualName"
            class="input"
            value="${escapeHTML(name)}"
          >

        </div>


        <div>

          <div class="label">
            Tamu Dari
          </div>

          <select
            id="manualFrom"
            class="select"
          >

            <option>
              Keluarga Mempelai Pria
            </option>

            <option>
              Keluarga Mempelai Wanita
            </option>

            <option>
              Teman
            </option>

            <option>
              Rekan Kerja
            </option>

            <option>
              Lainnya
            </option>

          </select>

        </div>


        <div>

          <div class="label">
            Keterangan
          </div>


          <div class="segmented">

            <button
              id="manualReg"
              class="active reg-btn"
              onclick="setManualType('REG')"
            >
              REG
            </button>


            <button
              id="manualVip"
              class="vip-btn"
              onclick="setManualType('VIP')"
            >
              VIP
            </button>

          </div>

        </div>


        <button
          class="btn btn-primary"
          onclick="manualCheckIn()"
        >
          ${ICON.checkin}
          CHECK IN TAMU MANUAL
        </button>


      </div>

    </div>

  `;

}


function setManualType(type){

  manualTypeValue =
    type;


  const reg =
    document.getElementById(
      "manualReg"
    );


  const vip =
    document.getElementById(
      "manualVip"
    );


  reg?.classList.remove(
    "active"
  );


  vip?.classList.remove(
    "active"
  );


  if(type==="VIP"){

    vip?.classList.add(
      "active"
    );

  }else{

    reg?.classList.add(
      "active"
    );

  }

}


async function manualCheckIn(){

  const name =
    document
      .getElementById(
        "manualName"
      )
      ?.value
      .trim();


  if(!name){

    showToast(
      "Nama tamu wajib diisi.",
      "error"
    );

    return;

  }


  const from =
    document
      .getElementById(
        "manualFrom"
      )
      ?.value
      || "Lainnya";


  const time =
    now();


  const guest = {

    id:
      "MANUAL-"+Date.now(),

    name,

    from,

    type:
      manualTypeValue,

    checkIn:
      time.time,

    checkOut:"",

    manual:true

  };


  guests.push(
    guest
  );


  await saveAttendance(
    guest,
    "CHECK IN",
    "MANUAL"
  );


  selectedGuest =
    guest;


  showToast(
    `Check In berhasil • ${name}`
  );


  render();

}


/* =========================================================
   ATTENDANCE TRANSACTION
========================================================= */

async function performAttendance(
  action
){

  if(!selectedGuest){

    return;

  }


  const guest =
    guests.find(
      item =>
        item.id ===
        selectedGuest.id
    );


  if(!guest){

    return;

  }


  const timestamp =
    now();


  if(action === "CHECK IN"){

    if(guest.checkIn){

      showToast(
        "Tamu sudah Check In.",
        "error"
      );

      return;

    }


    guest.checkIn =
      timestamp.time;

    guest.checkOut =
      "";

  }


  if(action === "CHECK OUT"){

    if(
      !guest.checkIn ||
      guest.checkOut
    ){

      showToast(
        "Tamu tidak sedang berada di venue.",
        "error"
      );

      return;

    }


    guest.checkOut =
      timestamp.time;

  }


  const log = {

    id:
      guest.id,

    name:
      guest.name,

    from:
      guest.from,

    type:
      guest.type,

    action,

    time:
      timestamp.time,

    date:
      timestamp.shortDate,

    iso:
      timestamp.iso,

    source:
      guest.manual
        ? "MANUAL"
        : "DATABASE"

  };


  attendance.push(
    log
  );


  saveLocal();


  /*
    Coba kirim ke Google Sheets
  */

  if(
    CONFIG.GOOGLE_APPS_SCRIPT_URL
  ){

    try{

      await sendToGoogle(
        log,
        guest
      );

    }

    catch(error){

      console.error(
        error
      );

      showToast(
        "Transaksi lokal tersimpan, tetapi Google Sheets gagal diperbarui.",
        "error"
      );

    }

  }


  selectedGuest =
    guest;


  showToast(
    `${action} berhasil • ${guest.name}`
  );


  render();

}


async function saveAttendance(
  guest,
  action,
  source
){

  const timestamp =
    now();


  const log = {

    id:
      guest.id,

    name:
      guest.name,

    from:
      guest.from,

    type:
      guest.type,

    action,

    time:
      timestamp.time,

    date:
      timestamp.shortDate,

    iso:
      timestamp.iso,

    source

  };


  attendance.push(
    log
  );


  saveLocal();


  if(
    CONFIG.GOOGLE_APPS_SCRIPT_URL
  ){

    try{

      await sendToGoogle(
        log,
        guest
      );

    }

    catch(error){

      console.error(
        error
      );

    }

  }

}


/* =========================================================
   GOOGLE APPS SCRIPT
========================================================= */

async function sendToGoogle(
  log,
  guest
){

  const response =
    await fetch(
      CONFIG.GOOGLE_APPS_SCRIPT_URL,
      {

        method:"POST",

        headers:{
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body:
          JSON.stringify({

            action:
              log.action,

            id:
              guest.id,

            name:
              guest.name,

            from:
              guest.from,

            type:
              guest.type,

            time:
              log.time,

            date:
              log.date,

            iso:
              log.iso,

            source:
              log.source

          })

      }
    );


  if(!response.ok){

    throw new Error(
      "Google Apps Script request failed."
    );

  }


  return response;

}


async function loadFromGoogle(){

  if(
    !CONFIG.GOOGLE_APPS_SCRIPT_URL
  ){

    return;

  }


  try{

    const response =
      await fetch(
        CONFIG.GOOGLE_APPS_SCRIPT_URL
        + "?action=guests&t="
        + Date.now()
      );


    const data =
      await response.json();


    if(
      data &&
      data.success &&
      Array.isArray(
        data.guests
      )
    ){

      guests =
        data.guests.map(
          guest=>({
            ...guest,
            checkIn:
              guest.checkIn || "",
            checkOut:
              guest.checkOut || ""
          })
        );


      /*
        Riwayat lokal tetap dipertahankan
      */

      saveLocal();

      render();

    }

  }

  catch(error){

    console.warn(
      "Google load failed:",
      error
    );

  }

}


/* =========================================================
   GUESTS PAGE
========================================================= */

function guestsPage(){

  return `

    <div class="page-head">

      <div>

        <div class="eyebrow">
          Database
        </div>

        <h1 class="page-title">
          Data Tamu
        </h1>

        <div class="page-desc">
          Master database tamu undangan.
        </div>

      </div>


      <button
        class="btn btn-gold"
        onclick="go('checkin')"
      >
        ${ICON.checkin}
        Check In
      </button>

    </div>


    <div class="card table-card">

      <div class="table-toolbar">

        <input
          id="guestTableSearch"
          class="input search-inline"
          placeholder="Cari nama tamu..."
          oninput="filterGuestTable(this.value)"
        >


        <span class="pill vip">
          VIP
          ${
            guests.filter(
              x=>x.type==="VIP"
            ).length
          }
        </span>


        <span class="pill reg">
          REG
          ${
            guests.filter(
              x=>x.type==="REG"
            ).length
          }
        </span>

      </div>


      <div class="table-wrap">

        <table class="table">

          <thead>

            <tr>

              <th>
                No
              </th>

              <th>
                Nama
              </th>

              <th>
                Tamu Dari
              </th>

              <th>
                Keterangan
              </th>

              <th>
                Status
              </th>

            </tr>

          </thead>


          <tbody
            id="guestTableBody"
          >

            ${guestRows(guests)}

          </tbody>

        </table>

      </div>

    </div>

  `;

}


function guestRows(list){

  if(!list.length){

    return `

      <tr>

        <td colspan="5">
          ${emptyState(
            "Data tamu tidak ditemukan."
          )}
        </td>

      </tr>

    `;

  }


  return list
    .map(
      (guest,index)=>`

        <tr>

          <td>
            ${index+1}
          </td>

          <td class="name-cell">
            ${escapeHTML(guest.name)}
          </td>

          <td>
            ${escapeHTML(guest.from)}
          </td>

          <td>
            ${typePill(guest.type)}
          </td>

          <td>

            <span
              class="pill ${statusClass(
                guestStatus(guest)
              )}"
            >
              ${guestStatus(guest)}
            </span>

          </td>

        </tr>

      `
    )
    .join("");

}


function filterGuestTable(value){

  const query =
    value
      .toLowerCase()
      .trim();


  const result =
    guests.filter(
      guest=>
        [
          guest.name,
          guest.from,
          guest.type,
          guest.id
        ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );


  const body =
    document.getElementById(
      "guestTableBody"
    );


  if(body){

    body.innerHTML =
      guestRows(result);

  }

}


/* =========================================================
   ATTENDANCE LOG
========================================================= */

function attendancePageLogs(){

  const logs =
    [...attendance]
      .sort(
        (a,b)=>
          new Date(b.iso)
          -
          new Date(a.iso)
      );


  return `

    <div class="page-head">

      <div>

        <div class="eyebrow">
          Audit Trail
        </div>

        <h1 class="page-title">
          Absensi
        </h1>

        <div class="page-desc">
          Riwayat seluruh transaksi Check In dan Check Out.
        </div>

      </div>


      <button
        class="btn btn-gold"
        onclick="exportCSV()"
      >

        ${ICON.export}

        Export CSV

      </button>

    </div>


    <div class="card table-card">

      <div class="table-toolbar">

        <input
          id="logSearch"
          class="input search-inline"
          placeholder="Cari nama..."
          oninput="filterLogs(this.value)"
        >

      </div>


      <div class="table-wrap">

        <table class="table">

          <thead>

            <tr>

              <th>
                Waktu
              </th>

              <th>
                Nama
              </th>

              <th>
                Tamu Dari
              </th>

              <th>
                Ket.
              </th>

              <th>
                Aksi
              </th>

              <th>
                Sumber
              </th>

            </tr>

          </thead>


          <tbody id="logBody">

            ${logRows(logs)}

          </tbody>

        </table>

      </div>

    </div>

  `;

}


function logRows(list){

  if(!list.length){

    return `

      <tr>

        <td colspan="6">

          ${emptyState(
            "Belum ada transaksi."
          )}

        </td>

      </tr>

    `;

  }


  return list
    .map(
      log=>`

        <tr>

          <td>

            ${escapeHTML(log.date || "")}

            <br>

            ${escapeHTML(log.time || "")}

          </td>

          <td class="name-cell">
            ${escapeHTML(log.name)}
          </td>

          <td>
            ${escapeHTML(log.from)}
          </td>

          <td>
            ${typePill(log.type)}
          </td>

          <td>

            <span
              class="pill ${
                log.action === "CHECK IN"
                  ? "status-in"
                  : "status-out"
              }"
            >
              ${escapeHTML(log.action)}
            </span>

          </td>

          <td>
            ${escapeHTML(log.source)}
          </td>

        </tr>

      `
    )
    .join("");

}


function filterLogs(value){

  const query =
    value
      .toLowerCase()
      .trim();


  const result =
    attendance
      .filter(
        log=>
          [
            log.name,
            log.from,
            log.type,
            log.action
          ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
      .sort(
        (a,b)=>
          new Date(b.iso)
          -
          new Date(a.iso)
      );


  const body =
    document.getElementById(
      "logBody"
    );


  if(body){

    body.innerHTML =
      logRows(result);

  }

}


/* =========================================================
   REPORT PAGE
========================================================= */

function reportsPage(){

  const m =
    getMetrics();


  return `

    <div class="page-head">

      <div>

        <div class="eyebrow">
          Laporan
        </div>

        <h1 class="page-title">
          Rekap & Laporan
        </h1>

        <div class="page-desc">
          Ringkasan kehadiran dan operasional tamu.
        </div>

      </div>


      <button
        class="btn btn-gold"
        onclick="exportCSV()"
      >

        ${ICON.export}

        Export CSV

      </button>

    </div>


    <section class="kpis">

      ${metricCard(
        ICON.users,
        "i-green",
        m.totalGuests,
        "Tamu Undangan",
        "Database",
        100,
        "var(--green)"
      )}


      ${metricCard(
        ICON.heart,
        "i-purple",
        m.attendanceCount.length,
        "Kehadiran",
        `${m.attendancePercent}%`,
        m.attendancePercent,
        "var(--purple)"
      )}


      ${metricCard(
        ICON.users,
        "i-orange",
        m.vipPresent,
        "VIP Hadir",
        "VIP",
        percentage(
          m.vipPresent,
          Math.max(
            1,
            m.attendanceCount.length
          )
        ),
        "var(--orange)"
      )}


      ${metricCard(
        ICON.users,
        "i-blue",
        m.regPresent,
        "REG Hadir",
        "REG",
        percentage(
          m.regPresent,
          Math.max(
            1,
            m.attendanceCount.length
          )
        ),
        "var(--blue)"
      )}


      ${metricCard(
        ICON.users,
        "i-green",
        m.venueCount,
        "Masih di Venue",
        "Sedang berada di venue",
        m.venuePercent,
        "var(--green)"
      )}

    </section>


    <div class="card">

      <div class="card-title">
        Ringkasan Operasional
      </div>

      <div
        class="info-list"
        style="margin-top:10px"
      >

        <div class="info-row">
          <div class="info-icon"></div>
          <div class="info-text">
            Total tamu undangan:
            ${m.totalGuests}
          </div>
          <div class="info-time">
            DATABASE
          </div>
        </div>


        <div class="info-row">
          <div class="info-icon"></div>
          <div class="info-text">
            Tamu yang masih berada di venue:
            ${m.venueCount}
          </div>
          <div class="info-time">
            LIVE
          </div>
        </div>


        <div class="info-row">
          <div class="info-icon"></div>
          <div class="info-text">
            Tamu yang sudah keluar:
            ${m.checkOutCount}
          </div>
          <div class="info-time">
            LIVE
          </div>
        </div>

      </div>

    </div>

  `;

}


/* =========================================================
   SETTINGS
========================================================= */

function settingsPage(){

  const connected =
    !!CONFIG.GOOGLE_APPS_SCRIPT_URL;


  return `

    <div class="page-head">

      <div>

        <div class="eyebrow">
          System
        </div>

        <h1 class="page-title">
          Pengaturan
        </h1>

        <div class="page-desc">
          Konfigurasi sistem Guest Attendance.
        </div>

      </div>

    </div>


    <div class="card">

      <div class="card-title">
        Google Apps Script
      </div>


      <div
        class="notice"
        style="margin-top:13px"
      >

        Status:

        <strong>

          ${
            connected
              ? " CONNECTED"
              : " DEMO MODE"
          }

        </strong>

      </div>


      <div
        style="
          margin-top:16px;
          font-size:10px;
          line-height:1.8;
          color:#77857f;
        "
      >

        Untuk menghubungkan website ke Google Sheets,
        masukkan URL Web App Google Apps Script
        pada:

        <br><br>

        <strong>
          CONFIG.GOOGLE_APPS_SCRIPT_URL
        </strong>

        <br><br>

        Google Sheets digunakan sebagai database master
        dan riwayat transaksi.

      </div>

    </div>

  `;

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function globalSearchKey(event){

  if(
    event.key === "Enter"
  ){

    const input =
      document.getElementById(
        "globalSearch"
      );


    const query =
      input.value.trim();


    if(!query){

      return;

    }


    go("checkin");


    setTimeout(
      ()=>{

        const search =
          document.getElementById(
            "guestSearch"
          );


        if(search){

          search.value =
            query;

          searchGuests();

        }

      },
      60
    );

  }

}


document.addEventListener(
  "keydown",
  event=>{

    if(
      event.ctrlKey &&
      event.key.toLowerCase() === "k"
    ){

      event.preventDefault();

      document
        .getElementById(
          "globalSearch"
        )
        ?.focus();

    }

  }
);


/* =========================================================
   EMPTY STATE
========================================================= */

function emptyState(message){

  return `

    <div class="empty">

      ${escapeHTML(message)}

    </div>

  `;

}


/* =========================================================
   EXPORT CSV
========================================================= */

function exportCSV(){

  const rows = [

    [
      "ID",
      "NAMA",
      "TAMU DARI",
      "KETERANGAN",
      "STATUS",
      "CHECK IN",
      "CHECK OUT"
    ]

  ];


  guests.forEach(
    guest=>{

      rows.push(
        [
          guest.id,
          guest.name,
          guest.from,
          guest.type,
          guestStatus(guest),
          guest.checkIn,
          guest.checkOut
        ]
      );

    }
  );


  const csv =
    rows
      .map(
        row=>
          row
            .map(
              value =>
                `"${String(
                  value ?? ""
                ).replace(
                  /"/g,
                  '""'
                )}"`
            )
            .join(",")
      )
      .join("\n");


  const blob =
    new Blob(
      ["\ufeff"+csv],
      {
        type:
          "text/csv;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;

  link.download =
    "Premium_Project_Guest_Attendance.csv";


  document.body.appendChild(
    link
  );


  link.click();

  link.remove();

  URL.revokeObjectURL(
    url
  );


  showToast(
    "File CSV berhasil dibuat."
  );

}


/* =========================================================
   TOAST
========================================================= */

function showToast(
  message,
  type=""
){

  const toast =
    document.getElementById(
      "toast"
    );


  if(!toast){

    return;

  }


  toast.textContent =
    message;


  toast.className =
    `toast show ${type}`;


  clearTimeout(
    showToast.timer
  );


  showToast.timer =
    setTimeout(
      ()=>{
        toast.className =
          "toast";
      },
      2800
    );

}


/* =========================================================
   CLOCK
========================================================= */

function updateClock(){

  const time =
    now();


  const dateElement =
    document.getElementById(
      "liveDate"
    );


  const timeElement =
    document.getElementById(
      "liveTime"
    );


  if(dateElement){

    dateElement.textContent =
      time.date;

  }


  if(timeElement){

    timeElement.textContent =
      `${time.time} WIB`;

  }

}


/* =========================================================
   RENDER
========================================================= */

function render(){

  let page;


  switch(
    currentView
  ){

    case "checkin":

      page =
        attendancePage(
          "CHECK IN"
        );

      break;


    case "checkout":

      page =
        attendancePage(
          "CHECK OUT"
        );

      break;


    case "guests":

      page =
        guestsPage();

      break;


    case "attendance":

      page =
        attendancePageLogs();

      break;


    case "reports":

      page =
        reportsPage();

      break;


    case "settings":

      page =
        settingsPage();

      break;


    default:

      page =
        dashboard();

  }


  const app =
    document.getElementById(
      "app"
    );


  app.innerHTML =
    shell(page);


  updateClock();


  /*
    render kembali detail
    kalau sedang di halaman check
  */

}


/* =========================================================
   INIT
========================================================= */

loadLocal();

render();

updateClock();


setInterval(
  updateClock,
  1000
);


/*
  Ambil data Google Sheets
  jika URL sudah dipasang.
*/

loadFromGoogle();


setInterval(
  ()=>{
    loadFromGoogle();
  },
  CONFIG.REFRESH_MS
);
