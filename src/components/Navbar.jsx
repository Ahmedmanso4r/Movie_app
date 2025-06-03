import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="me-2">🎬</span>
          Movies App
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/popular" 
                className={`nav-link ${location.pathname === '/popular' ? 'active' : ''}`}
              >
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/favorites" 
                className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
              >
                Favorites
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/login" 
                className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/register" 
                className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;