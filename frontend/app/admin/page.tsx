"use client";

import { useMemo, useState } from "react";

type Booking = {
  id: string;
  guest: string;
  initials: string;
  trip: string;
  dates: string;
  value: string;
  status: "New lead" | "Quoted" | "Confirmed" | "On trip";
  source: string;
};

const bookings: Booking[] = [
  { id: "PS-1048", guest: "Aarav & Meera", initials: "AM", trip: "Road to Panchachuli", dates: "12–17 Aug", value: "₹43,800", status: "Confirmed", source: "Instagram" },
  { id: "PS-1047", guest: "Nitin Sharma", initials: "NS", trip: "The Hidden Kumaon", dates: "09–11 Aug", value: "₹27,600", status: "Quoted", source: "Website" },
  { id: "PS-1046", guest: "Riya Kapoor", initials: "RK", trip: "Peaks & Sacred Caves", dates: "21–24 Aug", value: "₹54,000", status: "New lead", source: "WhatsApp" },
  { id: "PS-1045", guest: "Joshi Family", initials: "JF", trip: "Devbhoomi Peace Trail", dates: "03–07 Aug", value: "₹68,500", status: "On trip", source: "Referral" },
  { id: "PS-1044", guest: "Kabir & Friends", initials: "KF", trip: "Weekend Unwind", dates: "16–18 Aug", value: "₹39,200", status: "Confirmed", source: "Website" },
];

const departures = [
  { day: "03", month: "AUG", route: "Jageshwar · Binsar · Almora", guest: "Joshi Family · 5 guests", state: "On road", accent: "live" },
  { day: "09", month: "AUG", route: "Champawat · Abbott Mount", guest: "Nitin Sharma · 3 guests", state: "Awaiting payment", accent: "wait" },
  { day: "12", month: "AUG", route: "Munsiyari · Darkot · Birthi", guest: "Aarav & Meera · 2 guests", state: "Ready", accent: "ready" },
];

const navItems = [
  ["⌂", "Overview"], ["◇", "Bookings"], ["▤", "Packages"], ["○", "Guests"], ["⌁", "Partners"], ["₹", "Payments"], ["◫", "Calendar"],
];

export default function AdminDashboard() {
  const [active, setActive] = useState("Overview");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredBookings = useMemo(() => bookings.filter((booking) => {
    const matchesStatus = filter === "All" || booking.status === filter;
    const haystack = `${booking.guest} ${booking.trip} ${booking.id}`.toLowerCase();
    return matchesStatus && haystack.includes(query.toLowerCase());
  }), [filter, query]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  return (
    <main className="admin-shell">
      <aside className={menuOpen ? "admin-sidebar open" : "admin-sidebar"}>
        <a className="admin-brand" href="/" aria-label="Pahadi Safar website">
          <span className="admin-brand-mark">प</span>
          <span><b>PAHADI SAFAR</b><small>OPERATIONS</small></span>
        </a>

        <div className="workspace-label">Workspace</div>
        <nav className="admin-nav" aria-label="Dashboard navigation">
          {navItems.map(([icon, label]) => (
            <button key={label} className={active === label ? "active" : ""} onClick={() => { setActive(label); setMenuOpen(false); notify(`${label} view is ready for the next phase.`); }}>
              <span>{icon}</span>{label}{label === "Bookings" && <i>5</i>}
            </button>
          ))}
        </nav>

        <div className="sidebar-spacer" />
        <div className="season-card">
          <span>MONSOON NOTE</span>
          <b>Road watch is active</b>
          <p>Check Pithoragarh routes before confirming new departures.</p>
          <button onClick={() => notify("Road advisory marked for review.")}>Review advisory ↗</button>
        </div>
        <button className="profile-card" onClick={() => notify("Team profile settings will open here.")}>
          <span>VS</span><span><b>Vikramjeet</b><small>Owner · Khatima</small></span><i>•••</i>
        </button>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle dashboard menu">☰</button>
          <div className="today-status"><span className="pulse" /> Saturday, 01 August 2026 <em>·</em> Khatima, 27°C</div>
          <div className="top-actions">
            <label className="global-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search guest, trip, ID" /></label>
            <button className="notification" onClick={() => notify("You have 3 follow-ups due today.")} aria-label="Notifications">♢<i>3</i></button>
            <button className="primary-action" onClick={() => notify("New booking form will be connected next.")}>＋ New booking</button>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="dashboard-welcome">
            <div>
              <p className="admin-eyebrow">TODAY&apos;S COMMAND CENTRE</p>
              <h1>Namaste, Vikramjeet.</h1>
              <p>Three departures need attention. Everything else is moving beautifully.</p>
            </div>
            <div className="demo-badge"><span>●</span> DEMO OPERATIONS</div>
          </section>

          <section className="metric-grid" aria-label="Business summary">
            <article className="metric-card featured">
              <div className="metric-top"><span>REVENUE THIS MONTH</span><i>↗ 18.4%</i></div>
              <strong>₹2,84,600</strong>
              <div className="spark-bars" aria-label="Revenue rising over eight periods">
                {[35, 48, 41, 62, 55, 72, 66, 88, 78, 100].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
              </div>
              <small>₹2.1L collected · ₹74k pending</small>
            </article>
            <article className="metric-card">
              <div className="metric-icon coral">◇</div><span>ACTIVE BOOKINGS</span><strong>18</strong><small><b>5</b> new this week</small>
            </article>
            <article className="metric-card">
              <div className="metric-icon sage">◫</div><span>UPCOMING TRIPS</span><strong>07</strong><small>Next departure in <b>2 days</b></small>
            </article>
            <article className="metric-card">
              <div className="metric-icon gold">◎</div><span>GUEST HAPPINESS</span><strong>4.9</strong><small>From 46 trip reviews</small>
            </article>
          </section>

          <section className="operations-grid">
            <article className="panel departures-panel">
              <div className="panel-heading"><div><p className="admin-eyebrow">ON THE ROAD</p><h2>Upcoming departures</h2></div><button onClick={() => notify("Full calendar coming next.")}>View calendar ↗</button></div>
              <div className="departure-list">
                {departures.map((trip) => (
                  <div className="departure" key={trip.day + trip.route}>
                    <div className="date-block"><b>{trip.day}</b><span>{trip.month}</span></div>
                    <div className="departure-info"><b>{trip.route}</b><span>{trip.guest}</span></div>
                    <span className={`trip-state ${trip.accent}`}>{trip.state}</span>
                    <button onClick={() => notify(`${trip.route} opened.`)} aria-label={`Open ${trip.route}`}>↗</button>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel action-panel">
              <div className="panel-heading"><div><p className="admin-eyebrow">NEEDS YOU</p><h2>Today&apos;s actions</h2></div><span className="count-badge">04</span></div>
              <div className="action-list">
                {[
                  ["Payment follow-up", "Nitin · ₹9,200 due", "₹"],
                  ["Confirm hotel", "Munsiyari · 12 Aug", "⌂"],
                  ["Send final itinerary", "Aarav & Meera", "→"],
                  ["Driver allocation", "Champawat · 09 Aug", "⌁"],
                ].map(([title, detail, icon]) => (
                  <button key={title} onClick={() => notify(`${title} marked complete.`)}><span>{icon}</span><span><b>{title}</b><small>{detail}</small></span><i>○</i></button>
                ))}
              </div>
            </article>
          </section>

          <section className="panel bookings-panel">
            <div className="booking-header">
              <div><p className="admin-eyebrow">BOOKING PIPELINE</p><h2>Recent enquiries</h2></div>
              <div className="booking-tools">
                <label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search bookings" /></label>
                <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter booking status">
                  <option>All</option><option>New lead</option><option>Quoted</option><option>Confirmed</option><option>On trip</option>
                </select>
              </div>
            </div>
            <div className="booking-table" role="table" aria-label="Recent bookings">
              <div className="table-row table-head" role="row"><span>GUEST</span><span>JOURNEY</span><span>DATES</span><span>VALUE</span><span>STATUS</span><span /></div>
              {filteredBookings.map((booking) => (
                <div className="table-row" role="row" key={booking.id}>
                  <div className="guest-cell"><span>{booking.initials}</span><div><b>{booking.guest}</b><small>{booking.id} · {booking.source}</small></div></div>
                  <div className="journey-cell"><b>{booking.trip}</b></div>
                  <div>{booking.dates}</div><div className="booking-value">{booking.value}</div>
                  <div><span className={`status-pill ${booking.status.toLowerCase().replace(" ", "-")}`}>{booking.status}</span></div>
                  <button onClick={() => notify(`${booking.guest}'s booking opened.`)} aria-label={`Open ${booking.guest} booking`}>•••</button>
                </div>
              ))}
              {filteredBookings.length === 0 && <p className="empty-state">No bookings match this search.</p>}
            </div>
            <button className="view-all" onClick={() => notify("All bookings view is ready for the next phase.")}>View all bookings <span>↗</span></button>
          </section>
        </div>
      </section>

      {toast && <div className="admin-toast" role="status"><span>✓</span>{toast}</div>}
      {menuOpen && <button className="menu-scrim" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}
    </main>
  );
}
