import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/about', label: 'À Propos' },
  { to: '/contact', label: 'Contact' },
]

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false)
  }, [])

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">💼</span>
            <span className="logo-text">Pro-Informatique</span>
          </Link>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <div className="navbar-links">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="navbar-actions">
              <NavLink
                to="/login"
                className={({ isActive }) => `navbar-link-secondary ${isActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Connexion
              </NavLink>
              <NavLink
                to="/contact"
                className="navbar-cta"
                onClick={() => setIsOpen(false)}
              >
                Devis Gratuit
              </NavLink>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
