import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const closeNav = () => setIsNavCollapsed(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      props.handleCategoryChange(query);
      setSearchQuery("");
      closeNav();
    }
  };

  const categories = [
    "general",
    "business",
    "health",
    "technology",
    "sports",
    "entertainment",
    "science",
    "politics",
    "india",
  ];

  return (
    <nav className="navbar fixed-top navbar-expand-lg glass py-3">
      <div className="container-fluid align-items-center">
        <span className="navbar-brand fs-4 me-auto p-0 brand-gradient">
          World News
        </span>

        <div className="d-flex align-items-center gap-2 gap-lg-3 order-lg-last">
          <button
            onClick={toggleTheme}
            className="btn btn-link p-0 text-decoration-none d-flex align-items-center justify-content-center"
            title="Toggle Theme"
            style={{ fontSize: "1.4rem", width: "40px", height: "40px" }}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <button
            className="navbar-toggler border-0 p-2"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="navbarSupportedContent" style={{ maxHeight: !isNavCollapsed ? '80vh' : 'auto', overflowY: !isNavCollapsed ? 'auto' : 'visible' }}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-3 mt-lg-0">
            {categories.map((cat) => (
              <li className="nav-item" key={cat}>
                <Link
                  className={`nav-link text-capitalize px-3 ${props.category === cat ? "active fw-bold text-primary" : ""}`}
                  to={`/${cat}`}
                  onClick={closeNav}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-lg-end pe-lg-3 mt-3 mt-lg-0">
            <form className="d-flex w-100" role="search" onSubmit={handleSearchSubmit}>
              <div className="input-group w-100" style={{ maxWidth: '300px' }}>
                <input
                  className="form-control border-0 bg-light px-3"
                  type="search"
                  placeholder="Search category..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{ borderRadius: "8px 0 0 8px" }}
                />
                <button
                  className="btn btn-primary px-3"
                  type="submit"
                  style={{ borderRadius: "0 8px 8px 0" }}
                >
                  🔍
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
