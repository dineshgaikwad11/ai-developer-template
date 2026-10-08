import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export function Navbar() {
  useEffect(() => {
    void import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand fw-semibold" to="/employees">
          Employee Management
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#employee-navigation"
          aria-controls="employee-navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="employee-navigation">
          <div className="navbar-nav ms-auto">
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/" end>
              Health
            </NavLink>
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/employees">
              Employees
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}