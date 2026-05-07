import { Link } from 'react-router-dom'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-section">
          <h3 className="footer-title">💻 Pro-Informatique</h3>
          <p className="footer-description">
            Votre partenaire digital de confiance à Bafoussam. Cybercafé, infographie, impression
            grand format, réparation &amp; bien plus — tout en un.
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">f</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">📷</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">in</a>
            <a href="https://wa.me/+237690123456" target="_blank" rel="noopener noreferrer" className="social-link">W</a>
          </div>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Services</h4>
          <ul className="footer-links">
            <li><Link to="/services">Cybercafé &amp; bureautique</Link></li>
            <li><Link to="/services">Infographie</Link></li>
            <li><Link to="/services">Impression grand format</Link></li>
            <li><Link to="/services">Cachets personnalisés</Link></li>
            <li><Link to="/services">Réparation informatique</Link></li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/gallery">Galerie</Link></li>
            <li><Link to="/about">À Propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Contact</h4>
          <ul className="footer-contact">
            <li>📍 Descente Akwa, Bafoussam — Cameroun</li>
            <li>📧 <a href="mailto:contact@pro-informatique.cm">contact@pro-informatique.cm</a></li>
            <li>📞 <a href="tel:+237690123456">+237 690-123-456</a></li>
            <li>⏰ Lun–Sam&nbsp;: 08h – 18h</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} Pro-Informatique. Tous droits réservés.</p>
        <div className="footer-bottom-links">
          <a href="#">Confidentialité</a>
          <span>·</span>
          <a href="#">Conditions</a>
          <span>·</span>
          <a href="#">Plan du site</a>
        </div>
      </div>
    </footer>
  )
}
