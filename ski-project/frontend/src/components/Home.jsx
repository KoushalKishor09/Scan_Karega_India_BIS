import React, { useState } from "react";

export default function Home({ onLoginClick, user, onScanClick }) {
  const [activeTab, setActiveTab] = useState("unhealthy"); // "unhealthy" or "healthy"
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const sampleProducts = [
    {
      id: "p1",
      name: "Mango Fizz Drink",
      brand: "Standard Brand",
      score: 32,
      label: "Danger",
      nova: "Group 4 (Ultra-Processed)",
      ingredients: ["High Fructose Sugar (18g)", "Palm Oil", "Sodium Benzoate", "Sunset Yellow FCF"],
      warning: "⚠️ High sugar overdose & harmful chemical color additives detected.",
      alternative: "i-Drink Mango (Score: 92)",
      isHealthy: false
    },
    {
      id: "p2",
      name: "i-Drink Mango",
      brand: "SKI Approved Alternative",
      score: 92,
      label: "Excellent",
      nova: "Group 1 (Minimally Processed)",
      ingredients: ["Alphonso Mango Pulp (85%)", "Stevia Extract", "Purified Water", "Vitamin C"],
      warning: "✅ 100% natural fruit sugars, certified clean organic ingredients.",
      alternative: "Best choice for clean daily hydration!",
      isHealthy: true
    },
    {
      id: "p3",
      name: "Classic Potato Chips",
      brand: "Standard Brand",
      score: 40,
      label: "Unhealthy",
      nova: "Group 4 (Ultra-Processed)",
      ingredients: ["Refined Palm Oil", "Monosodium Glutamate", "High Sodium Salt", "Anti-caking Agent"],
      warning: "⚠️ Triggers metabolic risks. Excess palm trans-fats & high sodium.",
      alternative: "Baked Beetroot Chips (Score: 85)",
      isHealthy: false
    },
    {
      id: "p4",
      name: "Baked Beetroot Chips",
      brand: "SKI Approved Alternative",
      score: 85,
      label: "Healthy",
      nova: "Group 1 (Minimally Processed)",
      ingredients: ["Fresh Beetroot slices", "Cold Pressed Olive Oil", "Pink Rock Salt"],
      warning: "✅ Low fat content. Low sodium, rich in natural dietary fiber.",
      alternative: "Clean snacks choice for daily energy!",
      isHealthy: true
    },
    {
      id: "p5",
      name: "Chocolate Cream Biscuits",
      brand: "Standard Brand",
      score: 35,
      label: "Danger",
      nova: "Group 4 (Ultra-Processed)",
      ingredients: ["Hydrogenated Fats", "Processed Cocoa Powder", "Refined Maida", "Artificial Flavor"],
      warning: "⚠️ Heavy industrial processing. High sugar & hydrogenated trans-fats.",
      alternative: "Whole Grain Oats Granola (Score: 88)",
      isHealthy: false
    },
    {
      id: "p6",
      name: "Whole Grain Oats Granola",
      brand: "SKI Approved Alternative",
      score: 88,
      label: "Healthy",
      nova: "Group 2 (Processed Culinary)",
      ingredients: ["Rolled Whole Oats", "Raw Wild Honey", "Almonds", "Chia Seeds"],
      warning: "✅ Rich in active beta-glucans. Sweetened with natural honey.",
      alternative: "Perfect clean energy snack!",
      isHealthy: true
    }
  ];

  const filteredProducts = sampleProducts.filter(p => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "unhealthy") return !p.isHealthy;
    if (selectedFilter === "healthy") return p.isHealthy;
    return true;
  });

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content animate-slide-up">
          <h1 className="hero-title">
            Know What You Eat.<br />
            Instant <span className="text-gradient">Food Label Scans</span>.
          </h1>
          <p className="hero-subtitle">
            Upload any packaged food or drink label. Our AI-powered scanner extracts exact ingredients, evaluates nutritional processing quality, and recommends healthier, clean local Indian alternatives instantly.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={user ? onScanClick : onLoginClick}>
              Start Scanner Now
            </button>
            <a href="#about" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>

        {/* Breathtaking Interactive Live Scanner Simulator */}
        <div className="hero-teaser-wrapper animate-fade-in">
          <div className="simulator-container glass-card">
            {/* Simulator Header & Switcher */}
            <div className="simulator-header">
              <div className="teaser-dots">
                <span className="teaser-dot red"></span>
                <span className="teaser-dot yellow"></span>
                <span className="teaser-dot green"></span>
              </div>
              <div className="simulator-tabs">
                <button 
                  className={`simulator-toggle-btn ${activeTab === "unhealthy" ? "active-unhealthy" : ""}`}
                  onClick={() => setActiveTab("unhealthy")}
                >
                  Standard Drink
                </button>
                <button 
                  className={`simulator-toggle-btn ${activeTab === "healthy" ? "active-healthy" : ""}`}
                  onClick={() => setActiveTab("healthy")}
                >
                  i-Drink Mango
                </button>
              </div>
            </div>

            {/* Simulator Interactive Body */}
            <div className="simulator-body">
              {activeTab === "unhealthy" ? (
                /* Unhealthy Product Preview State */
                <div className="simulator-grid animate-fade-in">
                  <div className="simulator-viewport">
                    <div className="scanning-laser-line laser-red"></div>
                    <div className="viewport-overlay red-overlay"></div>
                    <div className="mock-product-box">
                      <div className="mock-label-preview">
                        <span className="mock-brand">Mango Fizz</span>
                        <div className="mock-ingredient-lines">
                          <span className="ingredient-tag highlight-danger">High Fructose Sugar (18g)</span>
                          <span className="ingredient-tag highlight-warn">Palm Oil</span>
                          <span className="ingredient-tag highlight-danger">Sodium Benzoate</span>
                          <span className="ingredient-tag highlight-warn">Yellow Food Color</span>
                        </div>
                      </div>
                    </div>
                    <span className="viewport-tag-badge bg-danger">Scanning Label...</span>
                  </div>

                  <div className="simulator-metrics">
                    <div className="score-circular-wrapper score-unhealthy">
                      <div className="score-circle-inner">
                        <span className="score-num txt-danger">34</span>
                        <span className="score-lbl">Health Score</span>
                      </div>
                    </div>

                    <div className="simulator-meta-group">
                      <span className="nova-badge nova-4">NOVA Group 4 (Ultra-Processed)</span>
                      <div className="health-verdict verdict-danger">
                        <strong>⚠️ Sugar & Chemical Hazard:</strong> High sugar content & toxic color additives found.
                      </div>
                      <div className="fssai-alt-box">
                        <span className="alt-title">FSSAI / BIS Recommended Clean Alternative:</span>
                        <span className="alt-product-link" onClick={() => setActiveTab("healthy")}>
                          🥤 Try i-Drink Mango (Score: 92)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Healthy Alternative Preview State (i-Drink Mango) */
                <div className="simulator-grid animate-fade-in">
                  <div className="simulator-viewport">
                    <div className="scanning-laser-line laser-green"></div>
                    <div className="viewport-overlay green-overlay"></div>
                    <div className="mock-product-box">
                      <div className="mock-label-preview">
                        <span className="mock-brand brand-healthy">i-Drink Mango</span>
                        <div className="mock-ingredient-lines">
                          <span className="ingredient-tag highlight-success">Alphonso Pulp (85%)</span>
                          <span className="ingredient-tag highlight-success">Natural Stevia</span>
                          <span className="ingredient-tag highlight-info">Purified Water</span>
                          <span className="ingredient-tag highlight-success">Vitamin C</span>
                        </div>
                      </div>
                    </div>
                    <span className="viewport-tag-badge bg-success">Scan Success!</span>
                  </div>

                  <div className="simulator-metrics">
                    <div className="score-circular-wrapper score-healthy animate-pulse-slow">
                      <div className="score-circle-inner">
                        <span className="score-num txt-success">92</span>
                        <span className="score-lbl">Excellent</span>
                      </div>
                    </div>

                    <div className="simulator-meta-group">
                      <span className="nova-badge nova-1">NOVA Group 1 (Minimally Processed)</span>
                      <div className="health-verdict verdict-success">
                        <strong>✅ Highly Recommended:</strong> 100% organic fruit sugars & zero chemical sweeteners.
                      </div>
                      <div className="fssai-alt-box">
                        <span className="alt-title">BIS Certified Nutrition Standards:</span>
                        <span className="alt-status-text">Perfect alternative choice for daily hydration!</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* About / Motivation Section */}
      <section id="about" className="section-padding">
        <div className="section-header">
          <span className="section-eyebrow">The Problem</span>
          <h2 className="section-title">Are you sure your food is healthy?</h2>
          <p className="section-subtitle">
            Modern packaged food is filled with hidden sugars, high sodium, toxic additives, and synthetic emulsifiers. Reading tiny labels is hard. We make it instant and readable.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card glass-card">
            <div className="feature-icon-wrapper-green">
              {/* Hidden Ingredients Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>Hidden Ingredients Exposed</h3>
            <p>Food giants mask chemicals and sugars under complex technical names. Our AI instantly exposes them and details their health impacts.</p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-wrapper-green">
              {/* NOVA Scale Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <h3>NOVA Processing Scale</h3>
            <p>Instantly determines if your product falls into NOVA Group 4 (ultra-processed foods that trigger severe metabolic and long-term health risks).</p>
          </div>

          <div className="feature-card glass-card">
            <div className="feature-icon-wrapper-green">
              {/* Smart Recommendations Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </div>
            <h3>Smart Alternative Engine</h3>
            <p>If the health score is low, we don't just say 'no'. We recommend healthier, cleaner, and easily accessible local Indian alternative brands.</p>
          </div>
        </div>
      </section>

      {/* Interactive Guide / How It Works */}
      <section id="how-it-works" className="section-padding bg-alt">
        <div className="section-header">
          <span className="section-eyebrow">The Scanner Guide</span>
          <h2 className="section-title">Scan in 3 Simple Steps</h2>
        </div>

        <div className="steps-container">
          <div className="step-item">
            <div className="step-num">01</div>
            <h4>Secure Google Login</h4>
            <p>Log in with your Gmail account to access your personal dashboard and save your scanning history securely.</p>
          </div>
          <div className="step-item">
            <div className="step-num">02</div>
            <h4>Upload Food Label Photo</h4>
            <p>Drop or select a high-quality picture of the ingredients or nutrition details box from any packaged product.</p>
          </div>
          <div className="step-item">
            <div className="step-num">03</div>
            <h4>Get AI Analysis & History</h4>
            <p>Receive a computed Health Score out of 100, full breakdown, warnings, and alternatives saved in your profile.</p>
          </div>
        </div>
      </section>

      {/* Sample Product Health Ratings Gallery */}
      <section className="section-padding sample-gallery-section" style={{ borderTop: "1px solid var(--color-border-secondary)" }}>
        <div className="section-header">
          <span className="section-eyebrow">Product Ratings Gallery</span>
          <h2 className="section-title">Common Indian Packaged Foods</h2>
          <p className="section-subtitle">
            Browse through typical product scans below. Compare highly processed foods containing chemicals and palm oils against certified clean alternatives.
          </p>
        </div>

        {/* Gallery Filter Switcher */}
        <div className="gallery-filter-tabs" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginBottom: "40px" }}>
          <button 
            className={`gallery-filter-btn ${selectedFilter === "all" ? "active" : ""}`}
            onClick={() => { setSelectedFilter("all"); setMobileCardIndex(0); }}
          >
            All Products
          </button>
          <button 
            className={`gallery-filter-btn ${selectedFilter === "unhealthy" ? "active-danger" : ""}`}
            onClick={() => { setSelectedFilter("unhealthy"); setMobileCardIndex(0); }}
          >
            ⚠️ High Chemical (Avoid)
          </button>
          <button 
            className={`gallery-filter-btn ${selectedFilter === "healthy" ? "active-success" : ""}`}
            onClick={() => { setSelectedFilter("healthy"); setMobileCardIndex(0); }}
          >
            ✅ Clean Alternatives (Choose)
          </button>
        </div>

        {/* Gallery Cards Container */}
        {!isMobile ? (
          /* Gallery Cards Desktop Grid */
          <div className="gallery-desktop-view">
            <div className="gallery-cards-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
              {filteredProducts.map(p => (
                <div key={p.id} className={`glass-card gallery-product-card ${p.isHealthy ? "border-healthy" : "border-unhealthy"}`} style={{ display: "flex", flexDirection: "column", padding: "28px", position: "relative", gap: "16px", transition: "all 0.35s", minHeight: "480px" }}>
                  <div className="gallery-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                    <div>
                      <span className="gallery-card-brand" style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{p.brand}</span>
                      <h3 className="gallery-card-name" style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: "800", color: "var(--color-text-primary)", margin: "4px 0 0 0" }}>{p.name}</h3>
                    </div>
                    <div className={`gallery-score-badge ${p.isHealthy ? "bg-score-healthy" : "bg-score-unhealthy"}`}>
                      <span style={{ fontSize: "18px", fontWeight: "900", color: p.isHealthy ? "var(--color-primary-dark)" : "#ef4444", lineHeight: "1" }}>{p.score}</span>
                      <span style={{ fontSize: "7px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.04em", color: p.isHealthy ? "var(--color-primary-dark)" : "#ef4444" }}>Score</span>
                    </div>
                  </div>

                  <div className="gallery-card-meta">
                    <span className={`gallery-nova-tag ${p.isHealthy ? "nova-clean" : "nova-toxic"}`} style={{ fontSize: "10px", fontWeight: "800", padding: "4px 10px", borderRadius: "20px" }}>
                      NOVA {p.nova}
                    </span>
                  </div>

                  <div className="gallery-ingredients-box" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>Detected Ingredients:</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {p.ingredients.map((ing, i) => (
                        <span key={i} className="gallery-ing-tag">
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.isHealthy ? "var(--color-primary)" : "#ef4444", display: "inline-block" }}></span>
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`gallery-verdict-box ${p.isHealthy ? "verdict-box-success" : "verdict-box-danger"}`} style={{ marginTop: "auto" }}>
                    <strong>Verdict:</strong> {p.warning}
                  </div>

                  {p.isHealthy ? (
                    <div className="gallery-recommendation-box" style={{ borderTop: "1px solid transparent", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "6px", visibility: "hidden" }}>
                      <span style={{ fontSize: "9px" }}>Placeholder</span>
                      <div className="rec-alternative-pill">Placeholder</div>
                    </div>
                  ) : (
                    <div className="gallery-recommendation-box">
                      <span style={{ fontSize: "9px", fontWeight: "800", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>Recommended Clean Alternative:</span>
                      <div 
                        className="rec-alternative-pill"
                        onClick={() => {
                          setSelectedFilter("healthy");
                          window.scrollTo({ top: document.querySelector(".sample-gallery-section").offsetTop - 80, behavior: "smooth" });
                        }}
                      >
                        🥤 {p.alternative}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Gallery Cards Mobile Carousel (Single Card View) */
          <div className="gallery-mobile-view" style={{ display: "block" }}>
            {filteredProducts.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {(() => {
                  const p = filteredProducts[mobileCardIndex % filteredProducts.length] || filteredProducts[0];
                  if (!p) return null;
                  return (
                    <div className={`glass-card gallery-product-card ${p.isHealthy ? "border-healthy" : "border-unhealthy"}`} style={{ display: "flex", flexDirection: "column", padding: "24px", position: "relative", gap: "16px", minHeight: "480px" }}>
                      <div className="gallery-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                        <div>
                          <span className="gallery-card-brand" style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{p.brand}</span>
                          <h3 className="gallery-card-name" style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: "800", color: "var(--color-text-primary)", margin: "4px 0 0 0" }}>{p.name}</h3>
                        </div>
                        <div className={`gallery-score-badge ${p.isHealthy ? "bg-score-healthy" : "bg-score-unhealthy"}`}>
                          <span style={{ fontSize: "18px", fontWeight: "900", color: p.isHealthy ? "var(--color-primary-dark)" : "#ef4444", lineHeight: "1" }}>{p.score}</span>
                          <span style={{ fontSize: "7px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.04em", color: p.isHealthy ? "var(--color-primary-dark)" : "#ef4444" }}>Score</span>
                        </div>
                      </div>

                      <div className="gallery-card-meta">
                        <span className={`gallery-nova-tag ${p.isHealthy ? "nova-clean" : "nova-toxic"}`} style={{ fontSize: "10px", fontWeight: "800", padding: "4px 10px", borderRadius: "20px" }}>
                          NOVA {p.nova}
                        </span>
                      </div>

                      <div className="gallery-ingredients-box" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>Detected Ingredients:</span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {p.ingredients.map((ing, i) => (
                            <span key={i} className="gallery-ing-tag">
                              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: p.isHealthy ? "var(--color-primary)" : "#ef4444", display: "inline-block" }}></span>
                              {ing}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={`gallery-verdict-box ${p.isHealthy ? "verdict-box-success" : "verdict-box-danger"}`} style={{ marginTop: "auto" }}>
                        <strong>Verdict:</strong> {p.warning}
                      </div>

                      {p.isHealthy ? (
                        <div className="gallery-recommendation-box" style={{ borderTop: "1px solid transparent", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "6px", visibility: "hidden" }}>
                          <span style={{ fontSize: "9px" }}>Placeholder</span>
                          <div className="rec-alternative-pill">Placeholder</div>
                        </div>
                      ) : (
                        <div className="gallery-recommendation-box">
                          <span style={{ fontSize: "9px", fontWeight: "800", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>Recommended Clean Alternative:</span>
                          <div 
                            className="rec-alternative-pill"
                            onClick={() => {
                              setSelectedFilter("healthy");
                              setMobileCardIndex(0);
                              window.scrollTo({ top: document.querySelector(".sample-gallery-section").offsetTop - 80, behavior: "smooth" });
                            }}
                          >
                            🥤 {p.alternative}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Slider Navigation Bar */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", marginTop: "8px", padding: "0 4px" }}>
                  <button 
                    className="gallery-nav-btn"
                    onClick={() => setMobileCardIndex(prev => (prev - 1 + filteredProducts.length) % filteredProducts.length)}
                    style={{ flex: 1, padding: "12px 18px", borderRadius: "30px", border: "1px solid var(--color-border-secondary)", background: "var(--color-background-secondary)", color: "var(--color-text-primary)", fontSize: "13px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "all 0.2s" }}
                  >
                    ← Previous
                  </button>
                  <span style={{ fontSize: "14px", fontWeight: "800", color: "var(--color-text-secondary)", minWidth: "50px", textAlign: "center" }}>
                    {mobileCardIndex + 1} / {filteredProducts.length}
                  </span>
                  <button 
                    className="gallery-nav-btn btn-primary"
                    onClick={() => setMobileCardIndex(prev => (prev + 1) % filteredProducts.length)}
                    style={{ flex: 1, padding: "12px 18px", borderRadius: "30px", border: "none", background: "var(--color-primary)", color: "#ffffff", fontSize: "13px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)" }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Gated Scan Promotion Banner */}
      <section className="section-padding gate-banner-section">
        <div className="glass-card gate-banner">
          <h3>Ready to Scan Your Food?</h3>
          {user ? (
            <>
              <p>You are successfully logged in! Access your personal scanner dashboard now to analyze food label ingredients in real-time.</p>
              <button className="btn-primary" onClick={onScanClick}>
                Go to Scanner Dashboard
              </button>
            </>
          ) : (
            <>
              <p>Create an account to begin using our real-time AI scanner, track your health ratings, and keep an active record of scanned products.</p>
              <button className="btn-primary" onClick={onLoginClick}>
                Sign In to Unlock Scanner
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
