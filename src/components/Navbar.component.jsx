import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark py-3">
        <div className="container-fluid d-flex justify-content-sm-around">
          <Link className="navbar-brand" to="/">
            CSI Blogs
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-sm-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname == "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Blogs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname == "/upload" ? "active" : ""
                  }`}
                  to="upload"
                >
                  Upload
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
