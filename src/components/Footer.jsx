import { Link } from 'react-router-dom'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-title">Pro-Informatique</h3>
          <p className="footer-description">
            Solutions informatiques complètes pour vos besoins digitaux. Expertise reconnus dans le secteur avec plus de 10 ans d'expérience.
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">f</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">📷</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">in</a>
            <a href="https://wa.me/+1234567890" target="_blank" rel="noopener noreferrer" className="social-link">W</a>
          </div>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Services</h4>
          <ul className="footer-links">
            <li><Link to="/services#cybercafe">Cybercafé</Link></li>
            <li><Link to="/services#bureautique">Bureautique</Link></li>
            <li><Link to="/services#infographie">Infographie</Link></li>
            <li><Link to="/services#support">Support Technique</Link></li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/about">À Propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4 className="footer-subtitle">Contact</h4>
          <ul className="footer-contact">
            <li>📍 Descente Akwa, Bafoussam (Cameroun)</li>
            <li>📧 <a href="mailto:contact@pro-informatique.com">contact@pro-informatique.cm</a></li>
            <li>📞 <a href="tel:+237690123456">+237 690-123-456</a></li>
            <li>⏰ Lun-Ven: 9h-18h | Sam: 10h-16h</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} Pro-Informatique. Tous droits réservés.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Confidentialité</Link>
          <span> | </span>
          <Link to="/terms">Conditions</Link>
          <span> | </span>
          <a href="#">Plan du site</a>
        </div>
      </div>
    </footer>
  )
}
