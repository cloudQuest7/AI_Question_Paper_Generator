import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PreviewStep from '../components/dashboard/PreviewStep';
import './Dashboard.css';

function Dashboard() {
  const [step, setStep] = useState(1);

  // Step 1 State
  const [setup, setSetup] = useState({
  subject: '',
  teacher: '',
  department: '',
  academicYear: '',
  class: '',
  div: '',
  sem: '',
  examType: '',
  duration: '',
  date: '',
  notes: '',
  syllabus: '',
  totalMarks: '',
  paperType: 'MCQ+Subjective'
});
  // Step 2 State
  const [sections, setSections] = useState([
  { 
    id: 1, name: 'Section A', questions: 4, marksPerQ: 5, 
    bloom: 'Remember/Understand', diff: 'Easy', type: 'Subjective',
    attemptType: 'Attempt All', attemptX: '', attemptY: ''
  }
]);

  const totalCalculated = sections.reduce((sum, sec) => sum + (sec.questions * sec.marksPerQ), 0);
  const totalExpected = parseInt(setup.totalMarks) || 0;
  const isValid = totalCalculated === totalExpected && totalExpected > 0;

  // AI Loading State
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPaperData, setAiPaperData] = useState(null);

  const addSection = () => {
  const nextLabel = String.fromCharCode(65 + sections.length);
  const defaultType = setup.paperType === 'MCQ' ? 'MCQ'
    : setup.paperType === 'Subjective' ? 'Subjective'
    : 'Subjective';
  setSections([...sections, {
    id: Date.now(),
    name: `Section ${nextLabel}`,
    questions: 1,
    marksPerQ: 10,
    bloom: 'Apply/Analyze',
    diff: 'Medium',
    type: defaultType,
    attemptType: 'Attempt All',
    attemptX: '',
    attemptY: ''
  }]);
};

  const updateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const handlePaperTypeChange = (type) => {
    setSetup({ ...setup, paperType: type });
    if (type === 'MCQ') {
      setSections(sections.map(s => ({ ...s, type: 'MCQ' })));
    } else if (type === 'Subjective') {
      setSections(sections.map(s => ({ ...s, type: 'Subjective' })));
    }
    // MCQ+Subjective: teacher decides per section
  };

  const handleGenerate = async () => {
    if (!isValid) return;
    setStep(3);
    setIsGenerating(true);

    const topics = setup.syllabus
      .split('\n')
      .map(s => s.trim())
      .filter(s => s !== '');

    try {
      const response = await fetch('http://localhost:5000/generate-ai-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: setup.subject,
          topics: topics.length > 0 ? topics : [setup.subject],
          sections: sections,
          paper_type: setup.paperType
        })
      });

      const data = await response.json();

      if (data.success) {
        setAiPaperData(data.paper);
      }

      setIsGenerating(false);
      setStep(4);
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
      alert("Backend connection failed! Is port 5000 running?");
      setStep(4);
    }
  };

  const handleDownload = async () => {
    if (!aiPaperData) {
      alert('No paper generated yet.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/download-question-paper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: setup.subject,
          total_marks: parseInt(setup.totalMarks) || 60,
          teacher: setup.teacher || 'N/A',
          date: new Date().toLocaleDateString('en-GB'),
          paper_data: aiPaperData,
          paper_type: setup.paperType
        })
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'question_paper.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Failed to generate PDF. Check backend console.');
    }
  };

  const handleDownloadAnswerKey = async () => {
    if (!aiPaperData) {
      alert('No paper generated yet.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/download-answer-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: setup.subject,
          paper: aiPaperData
        })
      });

      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'answer_key.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Failed to generate answer key.');
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Progress */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon" style={{ width: 24, height: 24, fontSize: 10 }}>Q</div>
          QPG Flow
        </div>

        <div className="stepper">
          {[
            { num: 1, label: 'Paper Setup' },
            { num: 2, label: 'Section Builder' },
            { num: 3, label: 'AI Generation' },
            { num: 4, label: 'Preview & Edit' },
            { num: 5, label: 'Export' }
          ].map(s => (
            <div key={s.num} className={`step-item ${step === s.num ? 'active' : step > s.num ? 'completed' : ''}`}>
              <div className="step-circle">{step > s.num ? '✓' : s.num}</div>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Area */}
      <main className="dashboard-main">
        {step === 1 && (
  <div className="dashboard-container">
    <div className="form-header">
      <h2>Paper Setup</h2>
      <p>Define the core parameters for the examination.</p>
    </div>

    <div className="form-grid">

      {/* College Info */}
      <div className="input-group">
        <label>Department</label>
        <input type="text" className="glass-input"
          placeholder="e.g. Department of Computer Engineering"
          value={setup.department}
          onChange={e => setSetup({ ...setup, department: e.target.value })}
        />
      </div>

      <div className="form-row">
        <div className="input-group">
          <label>Subject Name</label>
          <input type="text" className="glass-input"
            placeholder="e.g. Database Management System"
            value={setup.subject}
            onChange={e => setSetup({ ...setup, subject: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Faculty Name</label>
          <input type="text" className="glass-input"
            placeholder="e.g. Prof. Manasi Kulkarni"
            value={setup.teacher}
            onChange={e => setSetup({ ...setup, teacher: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label>Academic Year</label>
          <input type="text" className="glass-input"
            placeholder="e.g. 2024-25"
            value={setup.academicYear}
            onChange={e => setSetup({ ...setup, academicYear: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Class</label>
          <input type="text" className="glass-input"
            placeholder="e.g. SY"
            value={setup.class}
            onChange={e => setSetup({ ...setup, class: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label>Division</label>
          <input type="text" className="glass-input"
            placeholder="e.g. ALL"
            value={setup.div}
            onChange={e => setSetup({ ...setup, div: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Semester</label>
          <input type="text" className="glass-input"
            placeholder="e.g. III"
            value={setup.sem}
            onChange={e => setSetup({ ...setup, sem: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label>Exam Type</label>
          <input type="text" className="glass-input"
            placeholder="e.g. Class Test I / Mid Sem / End Sem"
            value={setup.examType}
            onChange={e => setSetup({ ...setup, examType: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Duration</label>
          <input type="text" className="glass-input"
            placeholder="e.g. 1.5 Hours"
            value={setup.duration}
            onChange={e => setSetup({ ...setup, duration: e.target.value })}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="input-group">
          <label>Date</label>
          <input type="text" className="glass-input"
            placeholder="e.g. 26th August 2024"
            value={setup.date}
            onChange={e => setSetup({ ...setup, date: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label>Total Marks</label>
          <input type="number" className="glass-input"
            placeholder="e.g. 40"
            value={setup.totalMarks}
            onChange={e => setSetup({ ...setup, totalMarks: e.target.value })}
          />
        </div>
      </div>

      {/* Paper Type Selector */}
      <div className="input-group">
        <label>Type of Paper</label>
        <div className="paper-type-selector">
          {['MCQ', 'Subjective', 'MCQ+Subjective'].map(type => (
            <button
              key={type}
              className={`paper-type-btn ${setup.paperType === type ? 'active' : ''}`}
              onClick={() => handlePaperTypeChange(type)}
              type="button"
            >
              {type === 'MCQ' && '🔘 MCQ Only'}
              {type === 'Subjective' && '📝 Subjective Only'}
              {type === 'MCQ+Subjective' && '⚡ MCQ + Subjective'}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="input-group">
        <label>Notes / Instructions</label>
        <textarea className="glass-input"
          placeholder={"e.g.\nQ1 is compulsory.\nAttempt any 2 from the remaining 3 questions.\nAssume suitable data wherever necessary."}
          value={setup.notes}
          onChange={e => setSetup({ ...setup, notes: e.target.value })}
        />
      </div>

      {/* Syllabus */}
      <div className="input-group">
        <label>Syllabus / Topics to Cover</label>
        <textarea className="glass-input"
          placeholder="Enter each topic on a new line..."
          value={setup.syllabus}
          onChange={e => setSetup({ ...setup, syllabus: e.target.value })}
        />
      </div>

    </div>

    <div className="action-bar">
      <div></div>
      <button
        className="btn-primary"
        onClick={() => setStep(2)}
        disabled={!setup.subject || !setup.totalMarks}
        style={{ opacity: setup.subject && setup.totalMarks ? 1 : 0.5 }}
      >
        Next: Section Builder →
      </button>
    </div>
  </div>
)}

        {step === 2 && (
          <div className="dashboard-container">
            <div className="form-header">
              <h2>Section Builder</h2>
              <p>Configure the structure, difficulty, and Bloom's Taxonomy limits per section.</p>
            </div>

            <div className="sections-list">
              {sections.map((sec, index) => (
                <div key={sec.id} className="section-card">
                  <div className="section-card-header">
                    <h3>{sec.name}</h3>
                    {sections.length > 1 && (
                      <button className="remove-btn" onClick={() => removeSection(sec.id)}>Remove Section</button>
                    )}
                  </div>

                  <div className="form-grid">
                    <div className="form-row">
                      <div className="input-group">
                        <label>Num of Questions</label>
                        <input type="number" className="glass-input" value={sec.questions} onChange={e => updateSection(sec.id, 'questions', parseInt(e.target.value) || 0)} />
                      </div>
                      <div className="input-group">
                        <label>Marks per Question</label>
                        <input type="number" className="glass-input" value={sec.marksPerQ} onChange={e => updateSection(sec.id, 'marksPerQ', parseInt(e.target.value) || 0)} />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="input-group">
                        <label>Bloom's Taxonomy Level</label>
                        <select className="glass-input" value={sec.bloom} onChange={e => updateSection(sec.id, 'bloom', e.target.value)}>
                          <option>Remember/Understand</option>
                          <option>Apply/Analyze</option>
                          <option>Evaluate/Create</option>
                          <option>Mixed Coverage</option>
                        </select>
                      </div>
                      <div className="input-group">
                        <label>Difficulty</label>
                        <select className="glass-input" value={sec.diff} onChange={e => updateSection(sec.id, 'diff', e.target.value)}>
                          <option>Easy</option>
                          <option>Medium</option>
                          <option>Hard</option>
                        </select>
                      </div>
                    </div>

                    {/* Attempt Instruction */}
<div className="input-group">
  <label>Attempt Instruction</label>
  <div className="paper-type-selector">
    {['Attempt All', 'Attempt Any'].map(type => (
      <button
        key={type}
        className={`paper-type-btn ${sec.attemptType === type ? 'active' : ''}`}
        onClick={() => updateSection(sec.id, 'attemptType', type)}
        type="button"
      >
        {type}
      </button>
    ))}
  </div>
</div>

{/* Show X out of Y inputs only if Attempt Any */}
{sec.attemptType === 'Attempt Any' && (
  <div className="form-row">
    <div className="input-group">
      <label>Attempt Any (X)</label>
      <input type="number" className="glass-input"
        placeholder="e.g. 3"
        value={sec.attemptX || ''}
        onChange={e => updateSection(sec.id, 'attemptX', e.target.value)}
      />
    </div>
    <div className="input-group">
      <label>Out of (Y)</label>
      <input type="number" className="glass-input"
        placeholder="e.g. 4"
        value={sec.attemptY || ''}
        onChange={e => updateSection(sec.id, 'attemptY', e.target.value)}
      />
    </div>
  </div>
)}

                    {/* Section Type — only show if MCQ+Subjective — NEW */}
                    {setup.paperType === 'MCQ+Subjective' && (
                      <div className="input-group">
                        <label>Section Type</label>
                        <div className="paper-type-selector">
                          {['MCQ', 'Subjective'].map(type => (
                            <button
                              key={type}
                              className={`paper-type-btn ${sec.type === type ? 'active' : ''}`}
                              onClick={() => updateSection(sec.id, 'type', type)}
                              type="button"
                            >
                              {type === 'MCQ' ? '🔘 MCQ' : '📝 Subjective'}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <button className="add-section-btn" onClick={addSection}>
                + Add another section
              </button>
            </div>

            <div className="action-bar">
              <button className="btn-secondary" onClick={() => setStep(1)} style={{ padding: '8px 20px' }}>← Back</button>

              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div className={`validation-pill ${isValid ? 'valid' : 'invalid'}`}>
                  {isValid ? '✓ Marks Validated' : '⚠️ Mark Mismatch'} Output: {totalCalculated} / {totalExpected}
                </div>
                <button className="btn-primary" disabled={!isValid} onClick={handleGenerate} style={{ opacity: isValid ? 1 : 0.5 }}>
                  Generate Paper ✨
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="dashboard-container">
            <div className="loading-view">
              <div className="pulse-ring">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                AI is generating your {setup.paperType} paper...
              </h2>
              <p style={{ color: '#737373' }}>Synthesizing the perfect balanced paper. Please wait.</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <PreviewStep setup={setup} sections={sections} aiPaperData={aiPaperData} setStep={setStep} />
        )}

        {step === 5 && (
          <div className="dashboard-container text-center">
            <div className="pulse-ring" style={{ margin: '0 auto 32px', background: 'rgba(16, 185, 129, 0.1)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: '#0a0a0a' }}>Paper Generation Complete</h2>
            <p style={{ color: '#525252', fontSize: '1.125rem', marginBottom: '48px' }}>Your academically balanced paper and corresponding grading rubric are ready.</p>

            <div className="form-row">
              <div className="section-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>📄</div>
                <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Question Paper</h3>
                <p style={{ color: '#737373', fontSize: '0.875rem', marginBottom: '24px' }}>Standardized format ready for print.</p>
                <button className="btn-primary" style={{ width: '100%' }} onClick={handleDownload}>Download PDF</button>
              </div>

              <div className="section-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: '#fafafa' }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Answer Key & Rubrics</h3>
                <p style={{ color: '#737373', fontSize: '0.875rem', marginBottom: '24px' }}>Hidden from students, step-wise grading.</p>
                <button className="btn-primary" style={{ width: '100%', background: '#a855f7' }} onClick={handleDownloadAnswerKey}>Download Rubric</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard;