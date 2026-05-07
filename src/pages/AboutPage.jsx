import { useMemo } from 'react'
import { Link } from 'react-router-dom'

const TEAM_DATA = [
  { id: 1, name: 'FEUKOUO TALLA Justin', role: 'Fondateur & Directeur Général', image: '👨‍💼', bio: "Visionnaire à la tête de Pro-Informatique depuis sa fondation, il orchestre la stratégie et l'excellence du service." },
  { id: 2, name: 'Marie Kamga', role: 'Responsable Technique', image: '👩‍💻', bio: 'Experte en infrastructure IT et support client, elle garantit la fiabilité de nos solutions techniques au quotidien.' },
  { id: 3, name: 'Pierre Nkengue', role: 'Directeur Artistique', image: '🧑‍🎨', bio: 'Créatif et passionné, il donne vie aux identités visuelles de nos clients avec talent et précision.' },
  { id: 4, name: 'Sophie Tchinda', role: 'Ingénieure Réseau', image: '👩‍💻', bio: 'Spécialiste des infrastructures réseau, elle déploie des solutions connectées performantes pour les entreprises.' },
]

const STATS = [
  { n: '15+', l: 'Années d\'expérience' },
  { n: '250+', l: 'Projets réalisés' },
  { n: '150+', l: 'Clients satisfaits' },
  { n: '12+', l: 'Membres d\'équipe' },
]

const VALUES = [
  { icon: '🎯', title: 'Excellence', desc: 'Nous visons la perfection dans chaque livrable, quel que soit le budget.' },
  { icon: '🤝', title: 'Partenariat', desc: 'Vos objectifs deviennent les nôtres — nous travaillons côte à côte.' },
  { icon: '💡', title: 'Innovation', desc: 'Nous embrassons les technologies récentes pour des solutions modernes.' },
  { icon: '🛡️', title: 'Fiabilité', desc: 'Qualité constante, délais respectés et support disponible.' },
]

export function AboutPage() {
  const teamMembers = useMemo(() => TEAM_DATA, [])

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="eyebrow">Notre histoire</p>
          <h1 className="page-title" style={{ marginTop: '0.75rem' }}>
            À Propos de<br /><span className="gradient-text">Pro-Informatique</span>
          </h1>
          <p className="page-subtitle" style={{ marginTop: '1rem' }}>
            Depuis plus de 15 ans, nous accompagnons les entreprises et les particuliers
            dans leur transformation digitale depuis Bafoussam.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {STATS.map((s) => (
            <div key={s.l} className="stat-card reveal-up section-a">
              <span className="stat-number">{s.n}</span>
              <p className="stat-label">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History + Values */}
      <section className="about-history">
        <div className="history-container">
          <div className="history-content reveal-up section-a">
            <h2>Notre Histoire</h2>
            <p>
              Pro-Informatique a été fondée au début des années 2000 avec une mission simple :
              fournir des solutions informatiques de qualité professionnelle, accessibles et
              performantes à Bafoussam.
            </p>
            <p>
              Nous avons commencé comme un petit cybercafé à la Descente Akwa et avons
              progressivement élargi nos services pour inclure la bureautique, l'infographie,
              l'impression grand format et le support technique.
            </p>
            <p>
              Aujourd'hui, nous sommes l'un des prestataires informatiques les plus reconnus
              de la région Ouest, avec une équipe de professionnels qualifiés et une clientèle
              en constante croissance.
            </p>
          </div>

          <div className="history-values reveal-up section-b">
            <h2>Nos Valeurs</h2>
            <div className="values-grid">
              {VALUES.map((v) => (
                <div key={v.title} className="value-item">
                  <span className="value-icon">{v.icon}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>L'équipe</p>
        <h2>Des professionnels <span className="gradient-text">passionnés</span></h2>
        <p className="section-subtitle">À votre service chaque jour pour vous donner le meilleur</p>
        <div className="team-grid">
          {teamMembers.map((m) => (
            <div key={m.id} className="team-card reveal-up section-b">
              <div className="team-avatar">{m.image}</div>
              <h3 className="team-name">{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <p className="team-bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Passons à l'action</p>
        <h2>Prêt à démarrer un projet ?</h2>
        <p>Contactez-nous dès aujourd'hui pour une consultation gratuite</p>
        <div className="cta-buttons">
          <Link to="/contact" className="btn btn-primary">Demander un devis →</Link>
          <Link to="/services" className="btn btn-secondary">Voir nos services</Link>
        </div>
      </section>
    </div>
  )
}
