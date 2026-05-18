import { useState } from "react";
import logoImg from "../assets/logo.png";

export default function Navbar({ 
  user, 
  onLogout, 
  onLoginClick, 
  activeView, 
  setActiveView, 
  theme, 
  toggleTheme 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (activeView === "home") {
      window.location.reload();
    } else {
      setActiveView("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    setActiveView("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    setActiveView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="nav-container">
      <div className="nav-wrapper">
        {/* Logo / Brand */}
        <div className="nav-logo" onClick={handleHomeClick}>
          <img src={logoImg} alt="Scan Karega India Logo" className="logo-brand-img" />
          <span className="logo-title">Scan Karega India</span>
        </div>

        {/* Desktop Menu */}
        <div className="nav-links-desktop">
          <a 
            href="#home" 
            className={`nav-link ${activeView === "home" ? "active-link" : ""}`} 
            onClick={handleHomeClick}
          >
            Home
          </a>
          <a 
            href="#about" 
            className={`nav-link ${activeView === "about" ? "active-link" : ""}`} 
            onClick={handleAboutClick}
          >
            About
          </a>
          {user && (
            <a 
              href="#scanner" 
              className={`nav-link ${activeView === "dashboard" ? "active-link" : ""}`} 
              onClick={handleDashboardClick}
            >
              Scan
            </a>
          )}

          {/* Theme Toggle Button */}
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {user ? (
            <div className="nav-profile-dropdown-wrapper">
              {/* Only Profile DP Visible on Desktop */}
              <img 
                src={user.picture || "https://api.dicebear.com/7.x/adventurer/svg"} 
                alt="profile" 
                className="nav-avatar-only" 
                onClick={handleDashboardClick}
                title="Go to My Scanner Dashboard"
              />
              {/* Sleek Floating Dropdown on Hover */}
              <div className="nav-profile-dropdown-card">
                <div className="dropdown-user-info">
                  <span className="dropdown-user-name">{user.name}</span>
                  <span className="dropdown-user-email">{user.email}</span>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-btn-logout" onClick={onLogout}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 6 }}>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button className="btn-login-header" onClick={onLoginClick}>Sign In</button>
          )}
        </div>

        {/* Hamburger Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Mobile Theme Toggle */}
          <button className="theme-toggle-btn mobile-theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === "dark" ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button className="nav-hamburger-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            <div className={`hamburger-bar ${isOpen ? "open-top" : ""}`}></div>
            <div className={`hamburger-bar ${isOpen ? "open-mid" : ""}`}></div>
            <div className={`hamburger-bar ${isOpen ? "open-bot" : ""}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="nav-links-mobile animate-fade-in">
          <a 
            href="#home" 
            className={`nav-link-mobile-item ${activeView === "home" ? "active-link-mobile" : ""}`} 
            onClick={(e) => { handleHomeClick(e); setIsOpen(false); }}
          >
            Home
          </a>
          <a 
            href="#about" 
            className={`nav-link-mobile-item ${activeView === "about" ? "active-link-mobile" : ""}`} 
            onClick={(e) => { handleAboutClick(e); setIsOpen(false); }}
          >
            About
          </a>
          {user && (
            <a 
              href="#scanner" 
              className={`nav-link-mobile-item ${activeView === "dashboard" ? "active-link-mobile" : ""}`} 
              onClick={(e) => { handleDashboardClick(e); setIsOpen(false); }}
            >
              Scan
            </a>
          )}

          {user ? (
            <div className="nav-profile-mobile-box">
              <div className="profile-mobile-user" onClick={(e) => { handleDashboardClick(e); setIsOpen(false); }} style={{ cursor: 'pointer' }}>
                <img src={user.picture || "https://api.dicebear.com/7.x/adventurer/svg"} alt="profile" className="nav-avatar" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{user.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{user.email}</div>
                </div>
              </div>
              <button className="btn-logout" style={{ width: '100%', marginTop: 12 }} onClick={() => { onLogout(); setIsOpen(false); }}>Logout</button>
            </div>
          ) : (
            <button className="btn-login-header" style={{ width: '100%', marginTop: 10 }} onClick={() => { onLoginClick(); setIsOpen(false); }}>Sign In</button>
          )}
        </div>
      )}
    </nav>
  );
}
