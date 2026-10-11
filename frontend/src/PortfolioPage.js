import React from "react";
import "./PortfolioPage.css";

const portfolioCards = [
  "ICP Definition & Data Mining",
  "Data Segmentation",
  "Personalized 1:1 Email Outreach",
  "Salesforce Pardot Campaigns",
  "LinkedIn DM Outreach",
  "Cold Calling & SDR Enablement",
  "Mailjet Mass Email Campaigns",
  "Wati WhatsApp Campaigns",
  "Appointment Setting"
];

export default function PortfolioPage() {
  return (
    <main className="portfolio-page">
      <section className="portfolio-hero" aria-labelledby="portfolio-title">
        <div className="portfolio-hero-inner">
          <p className="portfolio-eyebrow">SELECTED WORK / PORTFOLIO</p>
          <h1 id="portfolio-title" className="portfolio-title">
            <span>Ideas are easy.</span>
            <span className="portfolio-title-accent">Making them work is the job.</span>
          </h1>
          <p className="portfolio-description">
            A closer look at the strategies, systems, and campaigns I've built to turn marketing ideas into measurable growth.
          </p>
        </div>
      </section>
      <section className="portfolio-work" aria-labelledby="outbound-title">
        <div className="container-main">
          <p className="portfolio-section-index">01 / SELECTED CAPABILITIES</p>
          <h2 id="outbound-title">Outbound Growth &amp; Account-Based Marketing</h2>
          <p className="portfolio-section-subtitle">From finding the right accounts to starting the right conversations.</p>
          <div className="portfolio-card-grid">
            {portfolioCards.map((name, index) => (
              <article className="portfolio-work-card" key={name}>
                <span className="portfolio-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{name}</h3>
                <span className="portfolio-card-status">Detailed case study coming soon</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
