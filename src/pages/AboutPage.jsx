import { useMemo } from 'react'

const TEAM_DATA = [
  {
    id: 1,
    name: 'Jean Dupont',
    role: 'Directeur Général',
    image: '👨‍💼',
    bio: 'Expert en solutions informatiques avec 15 ans d\'expérience'
  },
  {
    id: 2,
    name: 'Marie Martin',
    role: 'Responsable Technique',
    image: '👩‍💻',
    bio: 'Spécialiste en infrastructure et support client'
  },
  {
    id: 3,
    name: 'Pierre Bernard',
    role: 'Designer Graphique',
    image: '🧑‍🎨',
    bio: 'Créatif et innovant dans le design digital'
  },
  {
    id: 4,
    name: 'Sophie Laurent',
    role: 'Développeuse',
    image: '👩‍💻',
    bio: 'Experte en développement web et backend'
  }
]

const STATS_DATA = {
  experience: 15,
  projects: 250,
  clients: 150,
  team: 12
}

export function AboutPage() {
  const teamMembers = useMemo(() => TEAM_DATA, [])
  const stats = useMemo(() => STATS_DATA, [])

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="page-title">À Propos de Pro-Informatique</h1>
          <p className="page-subtitle">
            Depuis plus de 15 ans, nous accompagnons les entreprises et les particuliers dans leur transformation digitale
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-number">{stats.experience}+</h3>
            <p className="stat-label">Années d'Expérience</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">{stats.projects}+</h3>
            <p className="stat-label">Projets Réalisés</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">{stats.clients}+</h3>
            <p className="stat-label">Clients Satisfaits</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-number">{stats.team}+</h3>
            <p className="stat-label">Membres d'Équipe</p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="about-history">
        <div className="history-container">
          <div className="history-content">
            <h2>Notre Histoire</h2>
            <p>
              Pro-Informatique a été fondée en 2009 avec une mission simple : fournir des solutions informatiques de qualité professionnelle, accessibles et performantes. 
            </p>
            <p>
              Nous avons commencé comme un petit cybercafé à Bafoussam et avons progressivement élargi nos services pour inclure la bureautique, l'infographie et le support technique.
            </p>
            <p>
              Aujourd'hui, nous sommes l'un des prestataires informatiques les plus reconnus de la région, avec une équipe de 12 professionnels qualifiés et une clientèle en constante croissance.
            </p>
          </div>

          <div className="history-values">
            <h2>Nos Valeurs</h2>
            <div className="values-grid">
              <div className="value-item">
                <span className="value-icon">🎯</span>
                <h3>Excellence</h3>
                <p>Nous visons l'excellence dans chaque projet</p>
              </div>
              <div className="value-item">
                <span className="value-icon">🤝</span>
                <h3>Partenariat</h3>
                <p>Nous travaillons en collaboration étroite avec nos clients</p>
              </div>
              <div className="value-item">
                <span className="value-icon">💡</span>
                <h3>Innovation</h3>
                <p>Nous embrassons les dernières technologies</p>
              </div>
              <div className="value-item">
                <span className="value-icon">🛡️</span>
                <h3>Fiabilité</h3>
                <p>Nous garantissons la sécurité et la qualité</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Notre Équipe</h2>
        <p className="section-subtitle">Des professionnels passionnés à votre service</p>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-avatar">{member.image}</div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Prêt à Démarrer un Projet?</h2>
        <p>Contactez-nous dès aujourd'hui pour une consultation gratuite</p>
        <div className="cta-buttons">
          <button className="btn btn-primary">Demander un Devis</button>
          <button className="btn btn-secondary">Nous Appeler</button>
        </div>
      </section>
    </div>
  )
}
