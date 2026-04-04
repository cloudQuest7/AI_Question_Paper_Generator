export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div>
          <div className="footer-brand">
            <div className="logo-icon" style={{width: '24px', height: '24px', fontSize: '12px'}}>Q</div>
            <span>QPG Flow</span>
          </div>
          <p style={{color: '#525252', fontSize: '0.875rem'}}>&copy; {new Date().getFullYear()} AI Generator. Designed for educational excellence.</p>
        </div>
      </div>
    </footer>
  );
}
