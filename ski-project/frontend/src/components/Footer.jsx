import React from "react";
import logoImg from "../assets/logo.png";

export default function Footer({ setActiveView, user }) {
  const handleNavigate = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand-section">
          <div className="footer-logo" onClick={() => handleNavigate("home")} style={{ cursor: "pointer" }}>
            <img src={logoImg} alt="Scan Karega India" className="footer-brand-logo-img" />
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em", color: "var(--color-text-primary)" }}>
              Scan Karega India
            </span>
          </div>
          <p className="footer-tagline">
            Helping every Indian choose healthy food by scanning and making complex food labels simple to understand.
          </p>
          
          {/* Ramgarh Campaign Address */}
          <div className="footer-address-block">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="address-marker-icon">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="address-text">
              Murubanda near Chitorpur, Ramgarh, Dist: Ramgarh, Jharkhand.
            </span>
          </div>


        </div>

        <div className="footer-links-columns">
          <div className="footer-col">
            <h4 className="footer-section-title">Navigation</h4>
            <button onClick={() => handleNavigate("home")} className="footer-btn-link">Home Landing</button>
            <button onClick={() => handleNavigate("about")} className="footer-btn-link">About Mission</button>
            {user && (
              <button onClick={() => handleNavigate("dashboard")} className="footer-btn-link">Active Scanner</button>
            )}
          </div>

          <div className="footer-col">
            <h4 className="footer-section-title">Standards</h4>
            <div className="footer-compliance-box">
              <span className="compliance-pill">BIS COMPLIANT</span>
              <p className="compliance-subtext">Bureau of Indian Standards food safety guidelines awareness campaign portal.</p>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-section-title">Team Info</h4>
            <div className="footer-team-details">
              <span className="team-badge-footer">Team Kranti</span>
              <div className="team-members-footer-list" style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "10px" }}>
                <div className="footer-member-item" style={{ fontSize: "12.5px", display: "flex", alignItems: "center", gap: "6px", color: "var(--color-text-secondary)" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a" }}></span>
                  <span><strong>K. K. Vishwakarma</strong> <span style={{ fontSize: "10px", opacity: 0.8 }}>(Leader)</span></span>
                </div>
                <div className="footer-member-item" style={{ fontSize: "12.5px", display: "flex", alignItems: "center", gap: "6px", color: "var(--color-text-secondary)" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a" }}></span>
                  <span><strong>Anil Kumar</strong> <span style={{ fontSize: "10px", opacity: 0.8 }}>(Developer)</span></span>
                </div>
                <div className="footer-member-item" style={{ fontSize: "12.5px", display: "flex", alignItems: "center", gap: "6px", color: "var(--color-text-secondary)" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a" }}></span>
                  <span><strong>Saba Alam</strong> <span style={{ fontSize: "10px", opacity: 0.8 }}>(Ops Lead)</span></span>
                </div>
                <div className="footer-member-item" style={{ fontSize: "12.5px", display: "flex", alignItems: "center", gap: "6px", color: "var(--color-text-secondary)" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a" }}></span>
                  <span><strong>Abhinav Kumar</strong> <span style={{ fontSize: "10px", opacity: 0.8 }}>(Technical)</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>&copy; {new Date().getFullYear()} Scan Karega India (SKI). Developed for public health literacy.</div>
        <div className="footer-social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-svg-link" aria-label="Twitter">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-svg-link" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-svg-link" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
