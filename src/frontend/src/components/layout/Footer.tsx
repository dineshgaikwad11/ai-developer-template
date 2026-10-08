import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-light border-top py-3 mt-auto">
      <div className="container">
        <div className="row align-items-center gy-2">
          <div className="col-md-6 text-center text-md-start">
            <small className="text-body-secondary">
              &copy; {new Date().getFullYear()} Employee Management
            </small>
          </div>
          <div className="col-md-6">
            <nav className="d-flex justify-content-center justify-content-md-end gap-3" aria-label="Footer links">
              <Link className="link-secondary small" to="/employees">Employees</Link>
              <Link className="link-secondary small" to="/">Health</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}