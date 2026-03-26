import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'

const serviceDetails = {
  cybercafe: {
    title: 'Cybercafé Professionnel',
    icon: '🖥️',
    description: 'Accès internet haute vitesse avec stations de travail modernes',
    features: [
      '30+ Postes de travail haute performance',
      'Connexion Internet haut débit (100 Mbps)',
      'Climatisation et confort optimal',
      'WIFI gratuit pour tous les clients',
      'Imprimantes et scanners disponibles',
      'Sécurité 24/7 avec surveillance',
      'Accès à logiciels professionnels',
      'Cours d\'informatique gratuits'
    ],
    pricing: 'À partir de 1 000 FCFA/heure',
    packages: [
      { name: 'Pack Étudiant', price: '5 000 FCFA', duration: '5 heures' },
      { name: 'Pack Professionnel', price: '15 000 FCFA', duration: '20 heures' },
      { name: 'Pack Entreprise', price: '45 000 FCFA', duration: '1 mois' }
    ]
  },
  bureautique: {
    title: 'Services de Bureautique',
    icon: '📄',
    description: 'Assistance et formation en outils bureautiques',
    features: [
      'Formation Word, Excel, PowerPoint',
      'Dactylographie professionnelle',
      'Mise en forme de documents',
      'Création de présentations',
      'Gestion de données et calculs',
      'Impression et photocopie',
      'Numérisation de documents',
      'Assistance pour demandes administratives'
    ],
    pricing: 'À partir de 2 000 FCFA',
    packages: [
      { name: 'Document Simple', price: '2 000 FCFA', services: 'Lettre, CV, etc.' },
      { name: 'Présentation', price: '5 000 FCFA', services: 'PowerPoint 15-20 slides' },
      { name: 'Tableau Complexe', price: '8 000 FCFA', services: 'Excel avec formules' }
    ]
  },
  infographie: {
    title: 'Création Graphique & Infographie',
    icon: '🎨',
    description: 'Design professionnel pour vos projets visuels',
    features: [
      'Conception de logos et branding',
      'Création de flyers et brochures',
      'Design de cartes de visite',
      'Retouche photo professionnelle',
      'Création d\'affiches et bandeaux',
      'Design d\'emballages',
      'Illustrations personnalisées',
      'Motion graphics et animations'
    ],
    pricing: 'À partir de 10 000 FCFA',
    packages: [
      { name: 'Logo Simple', price: '25 000 FCFA', revisions: '3 versions' },
      { name: 'Identité Visuelle Complète', price: '75 000 FCFA', includes: 'Logo + Flyer + Carte' },
      { name: 'Branding Complet', price: '150 000 FCFA', includes: 'Suite complète' }
    ]
  },
  support: {
    title: 'Support Technique & Maintenance',
    icon: '🔧',
    description: 'Assistance technique et maintenance informatique',
    features: [
      'Dépannage informatique urgent',
      'Maintenance préventive',
      'Installation de logiciels',
      'Configuration réseaux',
      'Gestion de sauvegardes',
      'Nettoyage et optimisation',
      'Support à distance 24/7',
      'Formation utilisateurs'
    ],
    pricing: 'À partir de 5 000 FCFA',
    packages: [
      { name: 'Intervention Simple', price: '10 000 FCFA', response: '1 heure' },
      { name: 'Contrat Mensuel', price: '25 000 FCFA', includes: '10 interventions' },
      { name: 'Support Annuel', price: '250 000 FCFA', includes: 'Priorité + Support 24/7' }
    ]
  }
}

export function ServicesDetailPage() {
  const { serviceId } = useParams()
  
  const service = useMemo(() => {
    return serviceDetails[serviceId]
  }, [serviceId])

  if (!service) {
    return (
      <div className="page-container">
        <div className="not-found-container">
          <h1>Service non trouvé</h1>
          <p>Retournez à la <Link to="/services">page des services</Link></p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="service-detail-hero">
        <div className="service-hero-content">
          <div className="service-icon-large">{service.icon}</div>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
        </div>
      </section>

      {/* Content */}
      <section className="service-detail-content">
        <div className="service-grid">
          {/* Features */}
          <div className="service-features">
            <h2>Caractéristiques</h2>
            <ul className="features-list">
              {service.features.map((feature, idx) => (
                <li key={idx} className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages */}
          <div className="service-packages">
            <h2>Nos Offres</h2>
            <div className="packages-list">
              {service.packages.map((pkg, idx) => (
                <div key={idx} className="package-card">
                  <h3>{pkg.name}</h3>
                  <p className="package-price">{pkg.price}</p>
                  <p className="package-details">
                    {pkg.duration || pkg.services || pkg.revisions || pkg.includes || pkg.response}
                  </p>
                  <button className="btn btn-secondary btn-small">Sélectionner</button>
                </div>
              ))}
            </div>

            <div className="pricing-note">
              <p><strong>Tarif de base:</strong> {service.pricing}</p>
              <p>Les tarifs peuvent varier selon la complexité du projet. Contactez-nous pour un devis personnalisé.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Scenarios */}
      <section className="service-scenarios">
        <h2>Cas d'Usage</h2>
        <div className="scenarios-grid">
          <div className="scenario-card">
            <h3>Pour les Étudiants</h3>
            <p>Accès internet, dactylographie de mémoires, présentations PowerPoint</p>
          </div>
          <div className="scenario-card">
            <h3>Pour les Professionnels</h3>
            <p>Espace de travail, services bureautiques, support technique</p>
          </div>
          <div className="scenario-card">
            <h3>Pour les Entreprises</h3>
            <p>Solutions complètes de branding, support technique dédié, infrastructure</p>
          </div>
          <div className="scenario-card">
            <h3>Pour les PME</h3>
            <p>Packages flexibles, support continu, solutions évolutives</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="service-cta">
        <h2>Intéressé par ce service?</h2>
        <p>Contactez-nous pour en savoir plus ou demander un devis personnalisé</p>
        <div className="cta-buttons">
          <Link to="/contact" className="btn btn-primary">Demander un Devis</Link>
          <a href="tel:+237690123456" className="btn btn-secondary">Nous Appeler</a>
        </div>
      </section>
    </div>
  )
}
