import { Suspense, lazy, useState, useEffect } from 'react'
import { companyProfile, services } from '../data/company'
import { Link } from 'react-router-dom'

const HeroScene = lazy(() => import('../components/HeroScene').then((m) => ({ default: m.HeroScene })))

export function HomePage() {
  const [teamCount] = useState(12)

  const teamMembers = Array.from({ length: teamCount }, (_, i) => ({
    id: i,
    emoji: ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨'][i % 6],
  }))

  return (
    <>
      {/* HERO SECTION */}
      <section className="modern-hero">
        <div className="hero-gradient-bg"></div>
        
        <div className="hero-content-wrapper">
          <div className="hero-left">
            <p className="hero-eyebrow">Expertise digitale locale</p>
            <h1 className="hero-main-title">
              Des solutions professionnelles que vous pensiez inaccessibles<br/>
              <span className="gradient-text">Now Just One Click Away!</span>
            </h1>
            <p className="hero-description">
              {companyProfile.description}
            </p>
            
            <div className="hero-cta-group">
              <Link to="/services" className="cta-primary">
                Démarrer maintenant
              </Link>
              <Link to="/contact" className="cta-secondary">
                Nous contacter
              </Link>
            </div>

            <div className="hero-stats-mini">
              <div className="stat-mini">
                <span className="stat-number">24h</span>
                <span className="stat-text">Réactivité</span>
              </div>
              <div className="stat-mini">
                <span className="stat-number">360°</span>
                <span className="stat-text">Services</span>
              </div>
              <div className="stat-mini">
                <span className="stat-number">Local</span>
                <span className="stat-text">Bafoussam</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="orbital-container">
              <div className="specialist-circle">
                <div className="circle-inner">
                  <p className="circle-stat">12+</p>
                  <p className="circle-label">Experts</p>
                </div>
              </div>
              
              <div className="orbital-ring orbital-ring-1"></div>
              <div className="orbital-ring orbital-ring-2"></div>
              
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="team-avatar"
                  style={{
                    '--index': index,
                    '--total': teamMembers.length,
                  }}
                >
                  <div className="avatar-inner">
                    {member.emoji}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW SECTION */}
      <section className="services-preview-section">
        <div className="preview-container">
          <div className="preview-header">
            <h2>Nos services clés</h2>
            <p>Une couverture complète de vos besoins digitaux</p>
          </div>

          <div className="services-grid-preview">
            {services.slice(0, 3).map((service, idx) => (
              <div key={service.id} className="service-preview-card">
                <div className="service-icon">{['🎨', '🖨️', '⚙️'][idx]}</div>
                <h3>{service.title}</h3>
                <p>{service.details}</p>
                <div className="card-highlight"></div>
              </div>
            ))}
          </div>

          <div className="preview-footer">
            <Link to="/services" className="link-more">
              Voir tous les services →
            </Link>
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW SECTION */}
      <section className="portfolio-preview-section">
        <div className="preview-container">
          <div className="preview-header">
            <h2>Projets réalisés</h2>
            <p>Des réalisations concrètes pour des clients variés</p>
          </div>

          <div className="portfolio-grid-preview">
            <div className="portfolio-preview-card">
              <div className="portfolio-preview-img" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}></div>
              <h4>Boutique E-commerce</h4>
              <p className="portfolio-meta">Design • Développement</p>
            </div>
            <div className="portfolio-preview-card">
              <div className="portfolio-preview-img" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}></div>
              <h4>Application Mobile</h4>
              <p className="portfolio-meta">Maintenance • Support</p>
            </div>
            <div className="portfolio-preview-card">
              <div className="portfolio-preview-img" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}></div>
              <h4>Campagne Impression</h4>
              <p className="portfolio-meta">Design • Impression</p>
            </div>
          </div>

          <div className="preview-footer">
            <Link to="/portfolio" className="link-more">
              Découvrir notre portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL SECTION */}
      <section className="final-cta-section">
        <div className="cta-content">
          <h2>Prêt à transformer votre vision en réalité?</h2>
          <p>Nos experts sont disponibles pour discuter de votre projet</p>
          <Link to="/contact" className="cta-large">
            Commencer une discussion
          </Link>
        </div>
      </section>

      {/* 3D SCENE (kept for reference) */}
      <article className="scene-panel reveal-up section-b" style={{ opacity: 0.5, marginTop: '3rem' }}>
        <div className="section-head scene-head">
          <p className="eyebrow">Experience 3D</p>
          <h3>Ambiance tech immersive</h3>
        </div>

        <Suspense
          fallback={
            <div className="hero-scene hero-skeleton">
              <p>Chargement de la scene 3D...</p>
            </div>
          }
        >
          <HeroScene />
        </Suspense>
      </article>
    </>
  )
}
