"use client";

import { FormEvent, useState } from "react";

const vibes = [
  {
    id: "chill",
    number: "01",
    eyebrow: "Friends · Couples · Slow weekends",
    title: "Chill & Unwind",
    copy: "Private cottages, bonfires, local food and unhurried mountain mornings — planned around your comfort.",
    tags: ["Bonfire", "Food", "Private stay"],
    image:
      "https://images.unsplash.com/photo-1552727882-97a459159e08?auto=format&fit=crop&q=85&w=1400",
  },
  {
    id: "peace",
    number: "02",
    eyebrow: "Seekers · Families · Slow travellers",
    title: "Peace & Spiritual",
    copy: "Sacred forests, quiet temples, satvik food and alcohol-free stays for a journey that feels lighter.",
    tags: ["Alcohol-free", "Temples", "Meditation"],
    image:
      "https://images.unsplash.com/photo-1710091972662-03760aaaeced?auto=format&fit=crop&q=85&w=1400",
  },
  {
    id: "wild",
    number: "03",
    eyebrow: "Explorers · Photographers · Road trippers",
    title: "Wild & Curious",
    copy: "Hidden roads, village trails, border cultures and Himalayan sunrises beyond the usual tourist map.",
    tags: ["Road trips", "Treks", "Local life"],
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=85&w=1400",
  },
];

const journeys = [
  {
    place: "Champawat · Lohaghat · Abbott Mount",
    title: "The Hidden Kumaon",
    days: "3 days / 2 nights",
    type: "Slow travel",
    price: "From ₹8,900",
    tone: "clay",
  },
  {
    place: "Chaukori · Patal Bhuvaneshwar · Pithoragarh",
    title: "Peaks & Sacred Caves",
    days: "4 days / 3 nights",
    type: "Balanced",
    price: "From ₹13,500",
    tone: "sand",
  },
  {
    place: "Munsiyari · Darkot · Birthi",
    title: "Road to Panchachuli",
    days: "6 days / 5 nights",
    type: "Adventure",
    price: "From ₹21,900",
    tone: "mist",
  },
];

const districts = [
  "Nainital",
  "Almora",
  "Bageshwar",
  "Pithoragarh",
  "Champawat",
  "Udham Singh Nagar",
];

export default function Home() {
  const [selectedVibe, setSelectedVibe] = useState("peace");
  const [notice, setNotice] = useState("");

  function startPlanning(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const brief = [
      "Namaste Pahadi Safar! I want to plan a Kumaon trip.",
      `Vibe: ${selectedVibe}`,
      `Travellers: ${form.get("travellers")}`,
      `Duration: ${form.get("duration")}`,
      `Budget: ${form.get("budget")}`,
      `Starting from: ${form.get("start")}`,
    ].join("\n");
    setNotice("Your trip brief is ready — opening WhatsApp.");
    window.open(`https://wa.me/?text=${encodeURIComponent(brief)}`, "_blank");
  }

  return (
    <main>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Pahadi Safar home">
          <span className="brand-mark">प</span>
          <span>
            <b>PAHADI SAFAR</b>
            <small>CURATED IN KUMAON</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#vibes">Experiences</a>
          <a href="#journeys">Journeys</a>
          <a href="#about">Our Kumaon</a>
        </nav>
        <a className="nav-cta" href="#planner">
          Plan my trip <span>↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="kicker"><span /> Born in Kumaon · Built for curious souls</p>
          <h1>One Kumaon.<br /><em>Many ways to feel it.</em></h1>
          <p className="hero-lead">
            Not another sightseeing checklist. Tell us how you want to feel,
            and locals who know these roads will shape the journey around you.
          </p>
          <div className="hero-actions">
            <a className="button button-warm" href="#vibes">Find your vibe <span>↓</span></a>
            <a className="text-link" href="#journeys">Explore journeys <span>↗</span></a>
          </div>
        </div>
        <div className="hero-proof">
          <div><b>06</b><span>districts,<br />one local lens</span></div>
          <div><b>100%</b><span>private &<br />personal</span></div>
          <div><b>24/7</b><span>human support<br />on the road</span></div>
        </div>
        <p className="hero-caption">Near Chaukori · Kumaon Himalaya</p>
      </section>

      <section className="intro" id="vibes">
        <div>
          <p className="section-label">Choose your energy</p>
          <h2>Same mountains.<br /><i>A different journey for everyone.</i></h2>
        </div>
        <p className="intro-copy">
          Some come to celebrate. Some come to reconnect. Some just want the
          road to surprise them. Your stay, food, pace and places should match
          your reason for travelling.
        </p>
      </section>

      <section className="vibe-grid" aria-label="Travel vibes">
        {vibes.map((vibe) => (
          <article className="vibe-card" key={vibe.id}>
            <img src={vibe.image} alt="" />
            <div className="vibe-overlay" />
            <div className="vibe-top"><span>{vibe.number}</span><span>↗</span></div>
            <div className="vibe-content">
              <p>{vibe.eyebrow}</p>
              <h3>{vibe.title}</h3>
              <div className="vibe-detail">
                <p>{vibe.copy}</p>
                <div>{vibe.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="principle" id="about">
        <p className="section-label">The Pahadi Safar promise</p>
        <blockquote>
          “We don&apos;t sell places.<br />We design the <em>feeling</em> you take home.”
        </blockquote>
        <div className="principle-row">
          <p>Built by people who have travelled these roads, eaten in these homes and watched the weather turn without warning.</p>
          <div>
            <span>Local hosts</span><span>Honest pacing</span><span>Responsible travel</span>
          </div>
        </div>
      </section>

      <section className="journeys" id="journeys">
        <div className="journey-heading">
          <div><p className="section-label">Start with a story</p><h2>Journeys we love</h2></div>
          <a className="text-link dark" href="#planner">Build something different <span>↗</span></a>
        </div>
        <div className="journey-list">
          {journeys.map((trip, index) => (
            <article className={`journey-card ${trip.tone}`} key={trip.title}>
              <p className="journey-index">0{index + 1}</p>
              <p className="journey-place">{trip.place}</p>
              <h3>{trip.title}</h3>
              <div className="journey-meta">
                <span>{trip.days}</span><span>{trip.type}</span><b>{trip.price}</b>
              </div>
              <a href="#planner" aria-label={`Plan ${trip.title}`}>↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="district-strip" aria-label="Kumaon districts">
        {districts.map((district) => <span key={district}>✦ {district}</span>)}
      </section>

      <section className="planner" id="planner">
        <div className="planner-copy">
          <p className="section-label light">Your kind of trip</p>
          <h2>Let&apos;s shape a journey<br />that feels like <i>you.</i></h2>
          <p>No rigid packages. Share the basics and a Kumaon local will help turn them into a thoughtful route.</p>
          <div className="planner-note"><span>01</span> Choose your vibe <b>→</b><span>02</span> Share the basics <b>→</b><span>03</span> Talk to a local</div>
        </div>

        <form className="planner-form" onSubmit={startPlanning}>
          <fieldset>
            <legend>What are you travelling for?</legend>
            <div className="vibe-options">
              {["Chill & unwind", "Peace & spiritual", "Wild & curious", "A bit of everything"].map((option, index) => {
                const value = ["chill", "peace", "wild", "balanced"][index];
                return (
                  <label key={value} className={selectedVibe === value ? "selected" : ""}>
                    <input type="radio" name="vibe" value={value} checked={selectedVibe === value} onChange={() => setSelectedVibe(value)} />
                    <span>{option}</span><b>{selectedVibe === value ? "●" : "○"}</b>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <div className="field-row">
            <label>Travellers<select name="travellers" defaultValue="2 people"><option>Solo</option><option>2 people</option><option>3–5 people</option><option>6+ people</option></select></label>
            <label>Duration<select name="duration" defaultValue="3–4 days"><option>Weekend</option><option>3–4 days</option><option>5–7 days</option><option>8+ days</option></select></label>
          </div>
          <div className="field-row">
            <label>Budget per person<select name="budget" defaultValue="₹10k–₹20k"><option>Under ₹10k</option><option>₹10k–₹20k</option><option>₹20k–₹35k</option><option>₹35k+</option></select></label>
            <label>Starting from<input name="start" defaultValue="Khatima" aria-label="Starting location" /></label>
          </div>
          <button className="button button-warm form-button" type="submit">Create my trip brief <span>↗</span></button>
          <p className="form-foot">No payment. No commitment. A real human replies.</p>
          <p className="form-notice" aria-live="polite">{notice}</p>
        </form>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark">प</span><h2>PAHADI SAFAR</h2></div>
        <p>Kumaon wahi.<br /><em>Safar aapke mood ka.</em></p>
        <div className="footer-links"><a href="#vibes">Experiences</a><a href="#journeys">Journeys</a><a href="#planner">Plan a trip</a></div>
        <small>Curated with care in Khatima, Uttarakhand · © 2026 Pahadi Safar</small>
      </footer>
    </main>
  );
}
