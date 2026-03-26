import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/medias', label: 'Medias' },
  { to: '/chat', label: 'Assistant IA' },
  { to: '/admin', label: 'Admin' },
]

export function NavBar() {
  return (
    <header className="topbar">
      <div className="brand-row">
        <img src="/images/prologo.png" alt="Logo Pro-Informatique" className="brand-logo" />
        <div>
          <p className="eyebrow">Entreprise numerique</p>
          <h1>Pro-Informatique</h1>
        </div>
      </div>

      <nav aria-label="Navigation principale" className="main-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'nav-pill active' : 'nav-pill')}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
