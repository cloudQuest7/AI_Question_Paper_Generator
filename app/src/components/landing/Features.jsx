export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="features-header">
        <h2 className="features-title" style={{maxWidth: '800px', margin: '0 auto 24px'}}>Intelligent design for <br/>every examination</h2>
        <p className="features-desc">Forget manual mark tracking and repeated questions. QPG Flow manages syllabus constraints effortlessly.</p>
      </div>
      <div className="features-grid">
        <div className="feature-card feature-hover">
          <div className="feature-icon" style={{background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)'}}>⚖️</div>
          <h3 style={{fontSize: '1.5rem', marginBottom: '12px'}}>Balanced Coverage</h3>
          <p style={{color: '#737373', lineHeight: '1.6'}}>Input your syllabus. The engine automatically maps and guarantees perfect distribution of topics and mark weightage.</p>
        </div>
        <div className="feature-card feature-hover">
          <div className="feature-icon" style={{background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.2)'}}>🧠</div>
          <h3 style={{fontSize: '1.5rem', marginBottom: '12px'}}>Bloom's Taxonomy</h3>
          <p style={{color: '#737373', lineHeight: '1.6'}}>Define difficulty tiers. Questions strictly adhere to cognitive levels—from granular memory recall to complex synthesis.</p>
        </div>
        <div className="feature-card feature-hover">
          <div className="feature-icon" style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)'}}>🔄</div>
          <h3 style={{fontSize: '1.5rem', marginBottom: '12px'}}>Zero Repetition</h3>
          <p style={{color: '#737373', lineHeight: '1.6'}}>Intelligent question bank analysis continuously compares past papers to ensure maximum novelty for every single exam.</p>
        </div>
        <div className="feature-card feature-hover">
          <div className="feature-icon" style={{background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)'}}>📝</div>
          <h3 style={{fontSize: '1.5rem', marginBottom: '12px'}}>Omni-Format</h3>
          <p style={{color: '#737373', lineHeight: '1.6'}}>Whether you need rapid-fire MCQs, dense descriptive essays, or intricate case-based scenarios—we support it natively.</p>
        </div>
        
        <div className="feature-card feature-hover" style={{gridColumn: '1 / -1', display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap'}}>
          <div style={{flex: '1 1 300px'}}>
             <div className="feature-icon" style={{background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', marginBottom: '16px'}}>✅</div>
             <h3 style={{fontSize: '1.875rem', marginBottom: '16px'}}>Automated Rubrics & Model Answers</h3>
             <p style={{color: '#737373', fontSize: '1.125rem', lineHeight: '1.6'}}>With every paper generated, QPG Flow simultaneously produces a comprehensive evaluation scheme. From distinct marking criteria to expected ideal answers—grading just became as seamless as generation.</p>
          </div>
          <div style={{flex: '1 1 300px', background: '#fafafa', borderRadius: '16px', padding: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'}}>
              <div style={{fontSize: '0.875rem', color: '#171717', fontWeight: 'bold', marginBottom: '12px'}}>Q4: Marketing Strategy Execution (10 Marks)</div>
              <div style={{fontSize: '0.75rem', color: '#525252', marginBottom: '8px', paddingLeft: '8px', borderLeft: '2px solid #ef4444'}}>Identification of 3 core segments (3 Marks)</div>
              <div style={{fontSize: '0.75rem', color: '#525252', marginBottom: '8px', paddingLeft: '8px', borderLeft: '2px solid #ef4444'}}>Alignment with Q3 financial constraints (4 Marks)</div>
              <div style={{fontSize: '0.75rem', color: '#525252', paddingLeft: '8px', borderLeft: '2px solid #ef4444'}}>Innovativeness of channel selection (3 Marks)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
