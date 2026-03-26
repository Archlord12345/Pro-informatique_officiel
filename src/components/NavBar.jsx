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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const close = () => setIsOpen(false)

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={close}>
          <span className="logo-icon">💻</span>
          <span className="logo-text">Pro-Informatique</span>
        </Link>

        <button
          className={`mobile-menu-btn${isOpen ? ' open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-menu${isOpen ? ' active' : ''}`}>
          <div className="navbar-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}
                onClick={close}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="navbar-actions">
            <NavLink
              to="/login"
              className={({ isActive }) => `navbar-link-secondary${isActive ? ' active' : ''}`}
              onClick={close}
            >
              Connexion
            </NavLink>
            <NavLink to="/contact" className="navbar-cta" onClick={close}>
              Devis Gratuit
            </NavLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
