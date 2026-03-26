import { Link } from 'react-router-dom'
import { services } from '../data/company'

const EXTENDED_SERVICES = [
  {
    id: 'cyber',
    icon: '🖥️',
    title: 'Cybercafé & bureautique',
    details:
      'Accès internet haut débit, impression de documents, saisie, reliure, scan, photocopie et assistance administrative. Tout ce qu\'il vous faut pour vos démarches quotidiennes.',
  },
  {
    id: 'design',
    icon: '🎨',
    title: 'Infographie & communication visuelle',
    details:
      'Création de flyers, banderoles, affiches, cartes de visite et identités visuelles complètes. Nos graphistes donnent vie à votre image de marque avec créativité et rigueur.',
  },
  {
    id: 'print',
    icon: '🖨️',
    title: 'Impression grand format',
    details:
      'Impression haute résolution de banderoles, roll-up, bâches publicitaires, kakémonos et supports grands formats pour tous vos événements et campagnes.',
  },
  {
    id: 'branding',
    icon: '🔖',
    title: 'Cachets personnalisés',
    details:
      'Conception et fabrication de cachets en caoutchouc ou résine pour entreprises, commerces, associations et indépendants. Livraison rapide avec prévisualisation avant fabrication.',
  },
  {
    id: 'repair',
    icon: '🔧',
    title: 'Réparation informatique',
    details:
      'Diagnostic complet, maintenance préventive, optimisation logicielle, remplacement de composants, récupération de données. PC, laptops et périphériques.',
  },
  {
    id: 'network',
    icon: '📡',
    title: 'Réseau & infrastructure',
    details:
      'Installation et configuration de réseaux locaux, Wi-Fi, routeurs et switches pour entreprises et domiciles. Câblage structuré et supervision réseau.',
  },
]

export function ServicesPage() {
  return (
    <section className="services-v2">
      <div className="services-intro reveal-up section-a">
        <p className="eyebrow">Nos services</p>
        <h2 className="page-title" style={{ marginTop: '0.75rem' }}>
          Tout le nécessaire informatique<br />au même endroit
        </h2>
        <p>
          Du besoin ponctuel à la prestation complète, Pro-Informatique livre des solutions
          rapides, fiables et adaptées aux particuliers comme aux professionnels.
        </p>
      </div>

      <div className="services-grid">
        {EXTENDED_SERVICES.map((service, index) => (
          <article
            key={service.id}
            className={`service-card reveal-up section-${String.fromCharCode(97 + (index % 4))}`}
          >
            <div className="service-card-icon">{service.icon}</div>
            <p className="service-index">0{index + 1}</p>
            <h3 className="service-title">{service.title}</h3>
            <p>{service.details}</p>
            <Link to={`/services/${service.id}`} className="service-link">
              En savoir plus →
            </Link>
          </article>
        ))}
      </div>

      <div className="cta-band reveal-up section-d">
        <p>
          Besoin d'une intervention ou d'un devis rapide ? Contactez-nous directement
          ou passez à notre atelier à Bafoussam.
        </p>
        <Link className="action-link action-link-primary" to="/contact">
          Demander un devis →
        </Link>
      </div>
    </section>
  )
}
