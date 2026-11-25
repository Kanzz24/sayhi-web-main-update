import React, { useState, useEffect } from 'react';
import '../Home/home.css'; 
import './Team.css';
import { Link } from 'react-router-dom';

function Team() {
  const teamMembers = [
    { id: 1, nickname: "POB", name: "KORPAPOP KUMWAN", role: "CEO / DEVELOPER" },
    { id: 2, nickname: "PUMPUI", name: "KANYAPAT THONGRANG", role: "GRAPHIC DESIGN" },
    { id: 3, nickname: "IM", name: "CHAIANAN TURAPONG", role: "PROGRAMMER" },
    { id: 4, nickname: "LUKTAN", name: "NAMPHET AIAMONG", role: "GRAPHIC DESIGN" },
    { id: 5, nickname: "KAN HI-END", name: "SAKKAN MEEJAN", role: "FRONT END DEVELOPER" },
    { id: 6, nickname: "SOS", name: "SORRAWIT KULSAROJ", role: "DEVELOPER" },
    { id: 7, nickname: "TOON", name: "SITTHISAK SUKSATHIT", role: "DEVELOPER" },
    { id: 8, nickname: "SODA", name: "SIRIPONG WANCHAWEE", role: "DEVELOPER" },
    { id: 9, nickname: "BOSS", name: "APICHART INSING", role: "UX/UI" },
    { id: 10, nickname: "ZODA", name: "PATTANASAK KHAEKTAO", role: "DEVELOPER" },
    { id: 11, nickname: "FAH", name: "SROIFA PANTIP", role: "GRAPHIC DESIGN" },
  ];

  const [viewMode, setViewMode] = useState('grid'); 

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (document.body.classList.contains('dark-mode') || localStorage.getItem('theme') === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // ฟังก์ชันกดสลับโหมด
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo"></div>
          <div className="menu-links">
            <Link to="/">Home</Link>
            <Link to="/work">Work</Link>
            <Link to="/team" className="active">Team</Link>
            <Link to="/contact">Contact</Link>
          </div>   
          <div className="nav-actions">
            <button className="search-btn" aria-label="Search">🔍</button>
            <label className="theme-switch" htmlFor="checkbox" aria-label="Toggle Dark Mode">
              {/* จุดที่ 2 ที่แก้ไข: เพิ่ม checked และ onChange ตรงนี้ */}
              <input 
                type="checkbox" 
                id="checkbox" 
                checked={isDarkMode} 
                onChange={toggleDarkMode} 
              />
              <div className="slider round"></div>
            </label>
          </div>
          <button className="hamburger-btn" aria-label="Menu">☰</button>
        </div>
      </nav>

      {/* ---------------- เนื้อหาหน้า Team ---------------- */}
      <main className="team-page-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          🏠 &gt; 👤
        </div>

        {/* Hero Slider */}
        <section className="team-hero-slider">
          <button className="slider-arrow left-arrow">❮</button>
          <div className="slider-content">
            <div className="slider-image-placeholder">
              {/* รูปแมวดำจำลอง */}
              <span className="cat-placeholder">🐈‍⬛</span>
            </div>
            <div className="slider-info">
              <h1 className="hero-nickname">POB</h1>
              <p className="hero-fullname">KORPAPOP KUMWAN</p>
              <p className="hero-role">CEO / DEVELOPER</p>
              <button className="more-btn">MORE</button>
            </div>
          </div>
          <button className="slider-arrow right-arrow">❯</button>
        </section>

        {/* See All Member Indicator */}
        <div className="see-all-indicator">
          <span className="see-all-text">SEE ALL MEMBER</span>
          <div className="down-arrow-icon">▼</div>
        </div>

        {/* View Toggle (Grid / List) */}
        <div className="view-toggle-container">
          <div className="toggle-bg">
            <button 
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              ⊞
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ≣
            </button>
          </div>
        </div>

        {/* Team Members Grid */}
        <section className={`team-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {teamMembers.map((member) => (
            <div className="team-card" key={member.id}>
              <div className="card-img-placeholder">
                <span className="x-mark">✕</span>
              </div>
              <div className="card-info">
                <h3 className="member-nickname">{member.nickname}</h3>
                <p className="member-fullname">{member.name}</p>
                <p className="member-role">{member.role}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* ---------------- Footer (ของเดิม ห้ามแก้) ---------------- */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="wire-box logo-box"></div>
            <h2 className="footer-title-sayhi">SAY HI</h2>
            <a href="mailto:KARNHIEND@GMAIL.COM" className="footer-email">KARNHIEND@GMAIL.COM</a>
          </div>
          <div className="footer-links">
            <div className="link-col">
              <h4 className="footer-heading">PAGES</h4>
              <a href="/">HOME</a>
              <a href="/work?category=graphic">GRAPHIC</a>
              <a href="/work?category=production">PRODUCTION</a>
              <a href="/work?category=website">WEBSITE</a>
              <a href="/work?category=drawing">DRAWING</a>
              <a href="/team">OUR TEAM</a>
              <a href="/contact">CONTACT</a>
            </div>
            <div className="link-col contact-col">
              <h4 className="footer-heading">CONTACT</h4>
              <div className="social-icons">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Team;