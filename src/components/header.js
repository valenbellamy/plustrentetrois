import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useLayoutEffect } from "react"
import Logo from "./logo"

const Header = ({ inverse }) => {
  const [navOpen, setNavOpen] = useState(false)
  useLayoutEffect(() => {
    window.addEventListener("resize", computeWidth)
    return () => window.removeEventListener("resize", computeWidth)
  })

  const computeWidth = () => {
    if (window.innerWidth > 991.98) {
      setNavOpen(false)
    }
  }

  return (
    <header>
      <nav
        className={`navbar ${inverse ? "--inverse" : ""} ${
          navOpen ? "--show" : ""
        }`}
      >
        <Link to="/" className="navbar__brand" aria-label="Plus Trente Trois">
          <Logo />
        </Link>
        <button
          className={`navbar__toggler ${navOpen ? "--open" : ""}`}
          type="button"
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
          onClick={() => setNavOpen(navOpen => !navOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="navbar__collapse">
          <ul className="navbar__nav">
            <li className="nav__item active">
              <Link
                className="nav__link"
                to="/projects"
                activeClassName="--active"
              >
                projects
              </Link>
            </li>
            <li className="nav__item active">
              <a
                href="https://www.instagram.com/?hl=fr"
                target="_blank"
                rel="noopener noreferrer"
                className="nav__link"
                to="about"
              >
                instagram
              </a>
            </li>
            <li className="nav__item active">
              <Link
                className="nav__link"
                to="/about"
                activeClassName="--active"
              >
                about
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  inverse: PropTypes.bool,
}

Header.defaultProps = {
  inverse: false,
}

export default Header
