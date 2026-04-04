import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <div className="nav-brand">
          <div className="logo-icon">Q</div>
          <span>QPG Flow</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#taxonomy">Taxonomy Engine</a>
          <a href="#formats">Supported Formats</a>
        </div>
        <div className="nav-actions">
          <Link to="/login" className="login-link">Log in</Link>
          <Link to="/login" className="btn-primary">Generate For Free</Link>
        </div>
      </div>
    </nav>
  );
}
