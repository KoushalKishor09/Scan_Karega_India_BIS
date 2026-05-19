import React from "react";

export default function About({ onLoginClick, user }) {
  return (
    <div className="about-container animate-fade-in">
      {/* Hero Banner Section */}
      <section className="about-hero">
        <div className="hero-overlay-grid"></div>
        <div className="about-hero-content">
          <span className="section-eyebrow">Our Simple Mission</span>
          <h1 className="about-hero-title">Know What You Eat. Choose Clean Food.</h1>
          <p className="about-hero-subtitle">
            We help you read food labels easily. Scan any packaged food or drink to instantly find secret chemicals, sugar levels, and get healthier local Indian alternatives.
          </p>
        </div>
      </section>


{/* demo   */}

      {/* Core Mission Grid */}
      <section className="section-padding">
        <div className="about-grid">
          <div className="about-text-content">
            <h2 className="section-title">Why Scan Karega India Exists</h2>
            <p className="about-paragraph">
              Many packaged snacks hide high sugar, bad palm oil, and harmful chemical preservatives behind complicated names. Reading these tiny labels at the store is hard and confusing.
            </p>
            <p className="about-paragraph">
              Scan Karega India makes it super simple! Our AI label scanner translates chemical additives into plain English, rates the food quality, and recommends clean local alternatives.
            </p>
            
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>100% Honest & Free</h4>
                  <p>No paid ads. We only show real nutrition facts for your family's safety.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="12" y1="22" x2="12" y2="15.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22 8.5 12 15.5 2 8.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4>BIS Standards</h4>
                  <p>We follow official Bureau of Indian Standards (BIS) rules to check food safety.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-visual-side">
            <div className="glass-card about-stat-card animate-pulse-slow">
              <div className="stat-circle">
                <span className="stat-number">SKI</span>
                <span className="stat-label">Clean Eat</span>
              </div>
              <div className="stat-card-details">
                <h4>Traditional Alternatives</h4>
                <p>We help you swap chemical-laden snacks with healthy, traditional Indian food options.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIS Compliance Details Section */}
      <section className="section-padding bg-alt-about">
        <div className="section-header">
          <span className="section-eyebrow">Health Safety</span>
          <h2 className="section-title">How We Rate Your Food</h2>
          <p className="section-subtitle">
            We analyze packaged food ingredients using three simple checks to keep your health safe:
          </p>
        </div>

        <div className="compliance-grid">
          <div className="compliance-card glass-card">
            <div className="compliance-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>Chemical Check</h3>
            <p>We screen ingredients against FSSAI & BIS limits to warn you about harmful food colors and preservatives.</p>
          </div>

          <div className="compliance-card glass-card">
            <div className="compliance-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>Processing Score</h3>
            <p>We highlight ultra-processed foods (NOVA Group 4) so you can avoid high-risk industrial junk food.</p>
          </div>

          <div className="compliance-card glass-card">
            <div className="compliance-icon-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3>Clean Swaps</h3>
            <p>We give you clean local alternatives instantly so you can build better eating habits every day.</p>
          </div>
        </div>
      </section>

      {/* Team Kranti Dedication Section */}
      <section className="section-padding team-dedication-section">
        <div className="section-header">
          <span className="section-eyebrow">The Campaigners</span>
          <h2 className="section-title">Team Kranti</h2>
          <p className="section-subtitle">
            A passionate group of developers and campaigners driving the Healthy India movement forward.
          </p>
        </div>

        <div className="team-kranti-grid">
          {/* Card 1: Koushal */}
          <div className="glass-card team-member-card">
            <div className="member-top-actions">
              <span className="member-role-badge lead">Team Leader</span>
              <button className="member-chat-btn" aria-label="Message Koushal">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>
            <div className="member-avatar-circle circle-k">K</div>
            <h3 className="member-name">Koushal Kishor Vishwakarma</h3>
            <div className="member-phone">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91 80925 48739</span>
            </div>
          </div>

          {/* Card 2: Saba */}
          <div className="glass-card team-member-card">
            <div className="member-top-actions">
              <span className="member-role-badge">Operations Lead</span>
              <button className="member-chat-btn" aria-label="Message Saba">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>
            <div className="member-avatar-circle circle-s">S</div>
            <h3 className="member-name">Saba Alam</h3>
            <div className="member-phone">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91 62013 79624</span>
            </div>
          </div>

          {/* Card 3: Abhinav */}
          <div className="glass-card team-member-card">
            <div className="member-top-actions">
              <span className="member-role-badge">Technical Lead</span>
              <button className="member-chat-btn" aria-label="Message Abhinav">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>
            <div className="member-avatar-circle circle-a">A</div>
            <h3 className="member-name">Abhinav Kumar</h3>
            <div className="member-phone">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91 91422 06077</span>
            </div>
          </div>

          {/* Card 4: Anil */}
          <div className="glass-card team-member-card">
            <div className="member-top-actions">
              <span className="member-role-badge self">Developer</span>
              <button className="member-logout-redirect-btn" aria-label="Self Action">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "#f97316" }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </div>
            <div className="member-avatar-circle circle-a2">A</div>
            <h3 className="member-name">Anil Kumar</h3>
            <div className="member-phone">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91 70917 04927</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="about-cta-section section-padding">
          <div className="glass-card about-cta-card">
            <h3>Start Scanning Packaged Foods Today</h3>
            <p>Create a free account to scan any label, calculate health scores, and get clean Indian alternatives.</p>
            <button className="btn-primary" onClick={onLoginClick}>Sign In to Start Scanning</button>
          </div>
        </section>
      )}
    </div>
  );
}
