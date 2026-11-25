import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../Home/home.css';
import './WorkDetail.css';
import { DEMO_WORKS } from './workdata';

function WorkDetail() {
  const { id } = useParams();
  const [isDarkMode, setIsDarkMode] = useState(false);

  
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [creatorImgFailed, setCreatorImgFailed] = useState(false);
  const [workImgFailed, setWorkImgFailed] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  
  const work = useMemo(() => {
    return DEMO_WORKS.find((item) => String(item.id) === String(id)) || DEMO_WORKS[0];
  }, [id]);
  // รายการผลงานอื่นๆ สำหรับแถบ Other work (ตัดชิ้นปัจจุบันออก)
  const otherWorks = useMemo(() => {
    return DEMO_WORKS.filter((item) => item.id !== work.id);
  }, [work.id]);

  // รีเซ็ตสถานะรูปและเลื่อนกลับขึ้นบนสุดทุกครั้งที่เปลี่ยนชิ้นงาน
  useEffect(() => {
    setHeroImgFailed(false);
    setCreatorImgFailed(false);
    setWorkImgFailed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // ซิงค์ Dark Mode กับทุกหน้า (ไม่เปลี่ยนชุดสีเดิม)
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;

    setIsDarkMode(isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', isDark);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    const theme = nextDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-mode', nextDark);
    localStorage.setItem('theme', theme);
  };

  const heroSrc = work.heroImage || work.image;
  const showHeroImg = Boolean(heroSrc) && !heroImgFailed;
  const showCreatorImg = Boolean(work.creatorImage) && !creatorImgFailed;
  const showWorkImg = Boolean(work.image) && !workImgFailed;

  return (
    <>
      {/* โลโก้มุมซ้ายบน (สลับโหมดสว่าง/มืดอัตโนมัติ) */}
      <Link to="/" className="nav-brand-logo" aria-label="Say Hi Home">
        <img src="/logoSayHi-03.png" alt="Say Hi Logo" className="logo-light" />
        <img src="/logoSayHi-01.png" alt="Say Hi Logo Dark" className="logo-dark" />
      </Link>

      {/* Nav-bar เดิม (Active ที่ Work) */}
      <nav className="main-nav">
        <div className="nav-container">
          <div className="logo"></div>
          <div className="menu-links">
            <Link to="/">Home</Link>
            <Link to="/work" className="active">Work</Link>
            <Link to="/team">Team</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="nav-actions">
            <Link to="/work" className="search-btn" aria-label="Search Works" title="Back to Work">
              🔍
            </Link>
            <label className="theme-switch" htmlFor="checkbox" aria-label="Toggle Dark Mode">
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

      <main className="work-detail-page">
        {/* 1. Hero Banner เต็มหน้าจอ + แถบข้อมูล 3 คอลัมน์ (Developed by / Price / Development) */}
        <section className="wd-hero">
          <div className={`wd-hero-media ${showHeroImg ? 'has-image' : ''}`}>
            {showHeroImg && (
              <img
                src={heroSrc}
                alt={work.title}
                className="wd-hero-img"
                onError={() => setHeroImgFailed(true)}
              />
            )}
            <div className="wd-hero-fade"></div>

            <div className="wd-hero-stats">
              <div className="wd-stat-col">
                <h1 className="wd-stat-value">{work.creatorFullName}</h1>
                <span className="wd-stat-label">Developed by</span>
              </div>
              <div className="wd-stat-col wd-stat-center">
                <span className="wd-stat-value">{work.price}</span>
                <span className="wd-stat-label">Price</span>
              </div>
              <div className="wd-stat-col wd-stat-right">
                <span className="wd-stat-value">{work.duration}</span>
                <span className="wd-stat-label">Development</span>
              </div>
            </div>
          </div>

          <div className="wd-desc-wrapper">
            <p className="wd-desc-text">{work.description}</p>
          </div>
        </section>

        {/* 2. Breadcrumb 4 ไอคอน + ส่วนแสดงคนทำคู่กับชิ้นผลงาน */}
        <section className="wd-content-container">
          <div className="wd-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="wd-crumb-link" title="Home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>
            <span className="wd-crumb-sep">&gt;</span>
            <Link to="/work" className="wd-crumb-link" title="All Works">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </Link>
            <span className="wd-crumb-sep">&gt;</span>
            <Link
              to={`/work?category=${work.type.toLowerCase()}`}
              className="wd-crumb-link"
              title={work.type}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </Link>
            <span className="wd-crumb-sep">&gt;</span>
            <span className="wd-crumb-active" title={work.title}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
            </span>
          </div>

          {/* 2 คอลัมน์: ซ้าย = รูปคนทำ + กรอบคำพูด + ปุ่ม VIEW MORE | ขวา = รูปชิ้นผลงาน + ราคา */}
          <div className="wd-showcase-grid">
            <div className="wd-creator-col">
              <div className="wd-creator-stage">
                <div className="wd-speech-bubble">
                  <span className="wd-bubble-label">Developed by</span>
                  <span className="wd-bubble-name">{work.creatorFullName}</span>
                </div>

                <div className={`wd-creator-box ${showCreatorImg ? 'has-image' : ''}`}>
                  {showCreatorImg && (
                    <img
                      src={work.creatorImage}
                      alt={work.creatorFullName}
                      className="wd-creator-img"
                      loading="lazy"
                      decoding="async"
                      onError={() => setCreatorImgFailed(true)}
                    />
                  )}
                </div>
              </div>

              <Link to="/team" className="wd-view-more-btn">
                VIEW MORE
              </Link>
            </div>

            <div className="wd-artwork-col">
              <div className={`wd-artwork-frame ${showWorkImg ? 'has-image' : ''}`}>
                {showWorkImg && (
                  <img
                    src={work.image}
                    alt={work.title}
                    className="wd-artwork-img"
                    decoding="async"
                    onError={() => setWorkImgFailed(true)}
                  />
                )}
              </div>

              <div className="wd-artwork-price">
                <span className="wd-price-label">Price</span>
                <span className="wd-price-value">{work.price}</span>
              </div>
            </div>
          </div>

          {/* เส้นคั่น */}
          <div className="wd-divider"></div>
        </section>

        {/* 3. Other work — ผลงานอื่นๆ เลื่อนอัตโนมัติ (Marquee วนลูปไร้รอยต่อ) */}
        <section className="wd-other-section">
          <div className="wd-other-header">
            <h2 className="wd-other-title">Other work</h2>
          </div>

          <div
            className={`wd-other-marquee ${isMarqueePaused ? 'is-paused' : ''}`}
            onTouchStart={() => setIsMarqueePaused(true)}
            onTouchEnd={() => setIsMarqueePaused(false)}
            onTouchCancel={() => setIsMarqueePaused(false)}
          >
            <div className="wd-other-track">
              {[0, 1].map((copy) => (
                <div
                  className="wd-other-group"
                  key={copy}
                  aria-hidden={copy === 1 || undefined}
                >
                  {otherWorks.map((item) => (
                    <OtherWorkCard key={`${copy}-${item.id}`} item={item} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer เดิม */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="wire-box logo-box"></div>
            <h2 className="footer-title-sayhi">SAY HI</h2>
            <a href="mailto:KARNHIEND@GMAIL.COM" className="footer-email">
              KARNHIEND@GMAIL.COM
            </a>
          </div>
          <div className="footer-links">
            <div className="link-col">
              <h4 className="footer-heading">PAGES</h4>
              <Link to="/">HOME</Link>
              <Link to="/work?category=graphic">GRAPHIC</Link>
              <Link to="/work?category=production">PRODUCTION</Link>
              <Link to="/work?category=website">WEBSITE</Link>
              <Link to="/work?category=drawing">DRAWING</Link>
              <Link to="/team">OUR TEAM</Link>
              <Link to="/contact">CONTACT</Link>
            </div>
            <div className="link-col contact-col">
              <h4 className="footer-heading">CONTACT</h4>
              <div className="social-icons">
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="social-icon-btn"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="social-icon-btn"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/sayh.i2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="social-icon-btn"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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


function OtherWorkCard({ item }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = Boolean(item.image) && !imgFailed;

  return (
    <Link to={`/work/detail/${item.id}`} className="wd-other-card" title={item.title}>
      <div className={`wd-other-thumb ${showImg ? 'has-image' : ''}`}>
        {showImg && (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>
    </Link>
  );
}

export default WorkDetail; 