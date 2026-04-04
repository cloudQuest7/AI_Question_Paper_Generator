import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow glow-pulse"></div>
      <div className="hero-badge">
        <span className="badge-dot pulse-dot"></span>
        Intelligent Output v2.0
      </div>
      <h1 className="hero-title">
        Scale assessments.<br />Zero repetition.
      </h1>
      <p className="hero-subtitle">
        Input your syllabus and difficulty parameters. We instantly generate perfectly balanced, Bloom's Taxonomy aligned question papers with robust evaluation rubrics.
      </p>
      <div className="hero-buttons">
        <Link to="/login" className="btn-primary btn-large btn-hover-scale">
          Start Generating Free
        </Link>
        <button className="btn-secondary btn-hover-scale">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          Watch it build
        </button>
      </div>

      <div className="app-preview-container">
        <div className="app-preview">
          <div className="preview-header">
            <span className="mac-btn mac-close"></span>
            <span className="mac-btn mac-min"></span>
            <span className="mac-btn mac-max"></span>
            <span className="preview-title">QPG Flow • Dashboard</span>
          </div>
          <div className="preview-body">
            <div className="preview-glow glow-pulse"></div>
            {/* Dynamic UI Loading Representation */}
            <div style={{background: 'rgba(255,255,255,0.6)', padding: '24px 32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 10, backdropFilter: 'blur(20px)', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', width: '400px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div style={{width: '32px', height: '32px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>1</div>
                <div style={{fontSize: '0.875rem', fontWeight: '600', color: '#171717'}}>Generating Bloom's 'Synthesis' Question...</div>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <div style={{width: '100%', height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: '4px'}}></div>
                <div style={{width: '90%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px'}}></div>
                <div style={{width: '60%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px'}}></div>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '16px', marginTop: '4px'}}>
                <div style={{fontSize: '0.75rem', color: '#737373', fontWeight: '500'}}>Format: Case-Based</div>
                <div style={{fontSize: '0.75rem', color: '#10b981', fontWeight: '600', background: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: '99px'}}>15 Marks Assigned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
