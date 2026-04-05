import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .qpg-nav-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    padding: 20px 20px;
    pointer-events: none;
    background: transparent;
  }

  .qpg-nav {
    pointer-events: all;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 16px;
    padding: 14px 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
    max-width: 1300px;
    width: 100%;
    gap: 40px;
  }

  .qpg-nav.scrolled {
    background: #ffffff;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  }

  /* Brand */
  .qpg-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    flex-shrink: 0;
    padding: 0;
  }

  .qpg-logo-mark {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  }

  .qpg-brand-text {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #111111;
    letter-spacing: -0.5px;
    white-space: nowrap;
  }

  /* Links */
  .qpg-links {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    justify-content: center;
  }

  .qpg-item { position: relative; }

  .qpg-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    color: #525252;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .qpg-link:hover,
  .qpg-link.open {
    color: #111111;
    background: rgba(0, 0, 0, 0.05);
  }

  .qpg-chevron {
    width: 13px;
    height: 13px;
    opacity: 0.5;
    transition: transform 0.2s, opacity 0.2s;
    flex-shrink: 0;
  }

  .qpg-link.open .qpg-chevron {
    transform: rotate(180deg);
    opacity: 0.8;
  }

  /* Dropdown */
  .qpg-drop {
    position: absolute;
    top: calc(100% + 16px);
    left: 50%;
    transform: translateX(-50%) translateY(8px);
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 14px;
    padding: 12px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 200;
    backdrop-filter: blur(12px);
  }

  .qpg-drop.open {
    opacity: 1;
    pointer-events: all;
    transform: translateX(-50%) translateY(0);
  }

  .qpg-drop.wide {
    min-width: 480px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }

  .qpg-drop.wide .qpg-drop-header { grid-column: 1 / -1; }
  .qpg-drop.narrow { min-width: 280px; }

  .qpg-drop-header {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #999999;
    padding: 6px 12px 10px;
    font-family: 'Inter', sans-serif;
  }

  .qpg-drop-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 11px;
    text-decoration: none;
    transition: background 0.15s;
    cursor: pointer;
  }

  .qpg-drop-item:hover { background: #f5f5f5; }

  .qpg-drop-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #f5f5f5;
    border: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
    transition: all 0.15s;
  }

  .qpg-drop-item:hover .qpg-drop-icon {
    background: #ebebeb;
    border-color: #d4d4d4;
  }

  .qpg-drop-texts { display: flex; flex-direction: column; gap: 2px; }

  .qpg-drop-title {
    font-size: 14px;
    font-weight: 600;
    color: #111111;
    font-family: 'Inter', sans-serif;
    line-height: 1.2;
  }

  .qpg-drop-sub {
    font-size: 12px;
    color: #737373;
    font-family: 'Inter', sans-serif;
    line-height: 1.3;
  }

  /* Actions */
  .qpg-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  .qpg-login {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 16px;
    font-size: 14px;
    font-weight: 500;
    color: #111111;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    border-radius: 10px;
    border: 1.5px solid #d4d4d4;
    background: #ffffff;
    transition: all 0.2s ease;
    white-space: nowrap;
    cursor: pointer;
  }

  .qpg-login:hover {
    color: #111111;
    background: #f5f5f5;
    border-color: #bfbfbf;
  }

  .qpg-login svg {
    width: 14px;
    height: 14px;
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  .qpg-login:hover svg {
    opacity: 1;
  }

  .qpg-cta {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: #ffffff;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    text-decoration: none;
    letter-spacing: -0.3px;
    white-space: nowrap;
    transition: all 0.2s ease;
    flex-shrink: 0;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }

  .qpg-cta:hover {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
  }

  .qpg-cta:active {
    transform: translateY(0);
  }

  /* Hamburger */
  .qpg-burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    background: #f5f5f5;
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .qpg-burger:hover {
    background: #ebebeb;
    border-color: #d4d4d4;
  }

  .qpg-burger span {
    display: block;
    width: 16px;
    height: 2px;
    background: #525252;
    border-radius: 2px;
    transition: transform 0.25s, opacity 0.25s;
  }

  .qpg-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .qpg-burger.open span:nth-child(2) { opacity: 0; }
  .qpg-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile Drawer */
  .qpg-drawer {
    position: fixed;
    inset: 0;
    z-index: 999;
    pointer-events: none;
  }

  .qpg-drawer-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .qpg-drawer.open .qpg-drawer-backdrop {
    opacity: 1;
    pointer-events: all;
  }

  .qpg-drawer-panel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    border-bottom: 1px solid #e5e5e5;
    padding: 80px 20px 24px;
    transform: translateY(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .qpg-drawer.open .qpg-drawer-panel {
    transform: translateY(0);
    pointer-events: all;
  }

  .qpg-drawer-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #999999;
    padding: 10px 12px 8px;
    font-family: 'Inter', sans-serif;
  }

  .qpg-drawer-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 12px;
    border-radius: 11px;
    text-decoration: none;
    transition: background 0.15s;
    cursor: pointer;
  }

  .qpg-drawer-link:hover { background: #f5f5f5; }

  .qpg-drawer-icon {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #f5f5f5;
    border: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .qpg-drawer-texts { display: flex; flex-direction: column; gap: 2px; }

  .qpg-drawer-title {
    font-size: 14px;
    font-weight: 600;
    color: #111111;
    font-family: 'Inter', sans-serif;
  }

  .qpg-drawer-sub {
    font-size: 12px;
    color: #737373;
    font-family: 'Inter', sans-serif;
  }

  .qpg-drawer-divider {
    height: 1px;
    background: #e5e5e5;
    margin: 12px 0;
  }

  .qpg-drawer-actions {
    display: flex;
    gap: 10px;
    padding-top: 8px;
  }

  .qpg-drawer-login {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 11px;
    border-radius: 10px;
    border: 1.5px solid #d4d4d4;
    font-size: 14px;
    font-weight: 600;
    color: #111111;
    background: #ffffff;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .qpg-drawer-login:hover {
    background: #f5f5f5;
    border-color: #bfbfbf;
  }

  .qpg-drawer-login svg {
    width: 14px;
    height: 14px;
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  .qpg-drawer-login:hover svg {
    opacity: 1;
  }

  .qpg-drawer-cta {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 11px;
    border-radius: 10px;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;
    border: none;
    cursor: pointer;
  }

  .qpg-drawer-cta:hover {
    background: linear-gradient(135deg, #7c3aed, #6d28d9);
    transform: translateY(-1px);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .qpg-nav {
      padding: 12px 24px;
      gap: 24px;
    }

    .qpg-links { gap: 4px; }
    .qpg-link { padding: 6px 12px; font-size: 13px; }
    .qpg-desktop-actions { gap: 8px; }
  }

  @media (max-width: 768px) {
    .qpg-nav-wrapper {
      padding: 16px 16px;
    }

    .qpg-nav {
      padding: 12px 20px;
      gap: 16px;
    }

    .qpg-logo-mark { width: 32px; height: 32px; font-size: 14px; }
    .qpg-brand-text { font-size: 16px; }

    .qpg-links { display: none; }
    .qpg-desktop-actions { display: none; }
    .qpg-burger { display: flex; }
  }

  @media (max-width: 480px) {
    .qpg-nav-wrapper {
      padding: 12px 12px;
    }

    .qpg-nav {
      padding: 10px 16px;
      border-radius: 12px;
      gap: 12px;
    }

    .qpg-logo-mark { width: 28px; height: 28px; font-size: 12px; }
    .qpg-brand-text { font-size: 14px; }
    .qpg-burger { width: 36px; height: 36px; gap: 4px; }
    .qpg-burger span { width: 14px; }

    .qpg-drawer-panel { padding: 70px 16px 20px; }
    .qpg-drawer-actions { gap: 8px; }
    .qpg-drawer-login,
    .qpg-drawer-cta { padding: 10px 12px; font-size: 13px; }
  }
`;

const featuresItems = [
  { icon: '⚡', title: 'AI Generation', sub: 'Papers in seconds with Gemini' },
  { icon: '🧠', title: "Bloom's Engine", sub: 'Cognitive level targeting' },
  { icon: '📊', title: 'Difficulty Control', sub: 'Easy, medium, hard mixing' },
  { icon: '✏️', title: 'Live Preview & Edit', sub: 'Tweak before you export' },
  { icon: '🗂️', title: 'Question Bank', sub: 'Save & reuse questions' },
  { icon: '🔄', title: 'Regenerate', sub: 'Instant refresh per section' },
];

const formatsItems = [
  { icon: '📄', title: 'PDF Export', sub: 'Clean print-ready output' },
  { icon: '🗝️', title: 'Answer Key', sub: 'Auto-generated with paper' },
  { icon: '📐', title: 'Custom Sections', sub: 'Section A, B, C — your way' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [openMenu, setOpenMenu]   = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggle  = (n) => setOpenMenu(p => p === n ? null : n);
  const closeAll = () => { setOpenMenu(null); setMobileOpen(false); };

  return (
    <>
      <style>{navStyles}</style>

      <div className="qpg-nav-wrapper">
        <nav className={`qpg-nav ${scrolled ? 'scrolled' : ''}`} ref={navRef}>

          {/* Brand */}
          <Link to="/" className="qpg-brand" onClick={closeAll}>
            <div className="qpg-logo-mark">Q</div>
            <span className="qpg-brand-text">QPG Flow</span>
          </Link>

          <div className="qpg-sep" />

          {/* Desktop nav links */}
          <div className="qpg-links">

            <div className="qpg-item">
              <button
                className={`qpg-link ${openMenu === 'features' ? 'open' : ''}`}
                onClick={() => toggle('features')}
              >
                Features
                <svg className="qpg-chevron" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`qpg-drop wide ${openMenu === 'features' ? 'open' : ''}`}>
                <div className="qpg-drop-header">Capabilities</div>
                {featuresItems.map(item => (
                  <a key={item.title} href="#features" className="qpg-drop-item" onClick={closeAll}>
                    <div className="qpg-drop-icon">{item.icon}</div>
                    <div className="qpg-drop-texts">
                      <span className="qpg-drop-title">{item.title}</span>
                      <span className="qpg-drop-sub">{item.sub}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <a href="#taxonomy" className="qpg-link" onClick={closeAll}>Taxonomy</a>

            <div className="qpg-item">
              <button
                className={`qpg-link ${openMenu === 'formats' ? 'open' : ''}`}
                onClick={() => toggle('formats')}
              >
                Formats
                <svg className="qpg-chevron" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`qpg-drop narrow ${openMenu === 'formats' ? 'open' : ''}`}>
                <div className="qpg-drop-header">Export Options</div>
                {formatsItems.map(item => (
                  <a key={item.title} href="#formats" className="qpg-drop-item" onClick={closeAll}>
                    <div className="qpg-drop-icon">{item.icon}</div>
                    <div className="qpg-drop-texts">
                      <span className="qpg-drop-title">{item.title}</span>
                      <span className="qpg-drop-sub">{item.sub}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <a href="#how" className="qpg-link" onClick={closeAll}>How it works</a>

          </div>

          {/* Desktop actions */}
          <div className="qpg-actions qpg-desktop-actions">
            <Link to="/login" className="qpg-login" onClick={closeAll}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Log in
            </Link>
            <Link to="/generate" className="qpg-cta" onClick={closeAll}>Generate Free</Link>
          </div>

          {/* Mobile hamburger — right */}
          <div className="qpg-actions">
            <button
              className={`qpg-burger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(p => !p)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile drawer */}
      <div className={`qpg-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="qpg-drawer-backdrop" onClick={closeAll} />
        <div className="qpg-drawer-panel">

          <div className="qpg-drawer-label">Features</div>
          {featuresItems.slice(0, 4).map(item => (
            <a key={item.title} href="#features" className="qpg-drawer-link" onClick={closeAll}>
              <div className="qpg-drawer-icon">{item.icon}</div>
              <div className="qpg-drawer-texts">
                <span className="qpg-drawer-title">{item.title}</span>
                <span className="qpg-drawer-sub">{item.sub}</span>
              </div>
            </a>
          ))}

          <div className="qpg-drawer-divider" />

          <div className="qpg-drawer-label">Export</div>
          {formatsItems.map(item => (
            <a key={item.title} href="#formats" className="qpg-drawer-link" onClick={closeAll}>
              <div className="qpg-drawer-icon">{item.icon}</div>
              <div className="qpg-drawer-texts">
                <span className="qpg-drawer-title">{item.title}</span>
                <span className="qpg-drawer-sub">{item.sub}</span>
              </div>
            </a>
          ))}

          <div className="qpg-drawer-divider\" />

          <div className="qpg-drawer-actions">
            <Link to="/login" className="qpg-drawer-login" onClick={closeAll}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '14px', height: '14px'}}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Log in
            </Link>
            <Link to="/generate" className="qpg-drawer-cta" onClick={closeAll}>Generate Free</Link>
          </div>

        </div>
      </div>
    </>
  );
}