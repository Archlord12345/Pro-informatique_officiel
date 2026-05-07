import { Suspense, lazy, useState, useEffect, useRef } from 'react'
import { companyProfile, services } from '../data/company'
import { Link } from 'react-router-dom'
import { projectService } from '../services/portfolioService'

const HeroScene = lazy(() =>
  import('../components/HeroScene').then((m) => ({ default: m.HeroScene })),
)

const SERVICE_ICONS = ['🎨', '🖨️', '🔖', '🔧']

const TESTIMONIALS = [
  {
    id: 1,
    text: 'Service rapide et de très bonne qualité. Mon identité visuelle a été créée en 48h. Je recommande !',
    name: 'Armel K.',
    role: 'Entrepreneur, Bafoussam',
    avatar: '👨‍💼',
  },
  {
    id: 2,
    text: 'Excellente équipe, très réactive. Nos bannières ont été imprimées parfaitement pour notre événement.',
    name: 'Fatima N.',
    role: 'Directrice marketing',
    avatar: '👩‍💼',
  },
  {
    id: 3,
    text: 'Mon ordinateur réparé en moins d\'une journée. Tarifs honnêtes et travail soigné. Merci Pro-Informatique !',
    name: 'Patrick D.',
    role: 'Ingénieur indépendant',
    avatar: '🧑‍💻',
  },
]

export function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      projectService
        .getFeaturedProjects(3)
        .then(({ data }) => { if (data?.length) setFeaturedProjects(data) })
        .catch(() => {})
        .finally(() => setLoading(false))
    }
  }, [])

  const orbiterIcons = ['🖨️', '🎨', '🔧', '💻', '📱', '⚙️']

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="modern-hero">
        <div className="hero-gradient-bg" />
        <div className="hero-content-wrapper">
          <div className="hero-left reveal-up section-a">
            <p className="hero-eyebrow">🚀 Expertise digitale locale · Bafoussam</p>
            <h1 className="hero-main-title">
              Des solutions pro<br />
              <span className="gradient-text">enfin accessibles.</span>
            </h1>
            <p className="hero-description">
              Pro-Informatique est votre partenaire digital de confiance à Bafoussam.
              Cybercafé, infographie, impression grand format, réparation — tout en un.
            </p>
            <div className="hero-cta-group">
              <Link to="/services" className="cta-primary">Découvrir nos services</Link>
              <Link to="/contact" className="cta-secondary">Devis gratuit →</Link>
            </div>
            <div className="hero-stats-mini">
              <div className="stat-mini">
                <span className="stat-number">15+</span>
                <span className="stat-text">Ans d'expertise</span>
              </div>
              <div className="stat-mini">
                <span className="stat-number">+150</span>
                <span className="stat-text">Clients satisfaits</span>
              </div>
              <div className="stat-mini">
                <span className="stat-number">24h</span>
                <span className="stat-text">Réactivité</span>
              </div>
            </div>
          </div>

          <div className="hero-right reveal-up section-b">
            <div className="orbital-container">
              <div className="specialist-circle">
                <div className="circle-inner">
                  <p className="circle-stat">Pro</p>
                  <p className="circle-label">Informatique</p>
                </div>
              </div>
              <div className="orbital-ring orbital-ring-1" />
              <div className="orbital-ring orbital-ring-2" />
              {orbiterIcons.map((icon, i) => (
                <div
                  key={i}
                  className="team-avatar"
                  style={{ '--index': i, '--total': orbiterIcons.length }}
                >
                  <div className="avatar-inner">{icon}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ────────────────────────────────── */}
      <section className="services-preview-section">
        <div className="preview-container">
          <div className="preview-header reveal-up section-a">
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Ce que nous faisons</p>
            <h2>Nos services clés</h2>
            <p>Une couverture complète de vos besoins digitaux</p>
          </div>
          <div className="services-grid-preview">
            {services.map((service, idx) => (
              <div key={service.id} className={`service-preview-card reveal-up section-${String.fromCharCode(97 + idx)}`}>
                <div className="service-icon">{SERVICE_ICONS[idx] || '⚡'}</div>
                <h3>{service.title}</h3>
                <p>{service.details}</p>
                <div className="card-highlight" />
              </div>
            ))}
          </div>
          <div className="preview-footer">
            <Link to="/services" className="link-more">Voir tous les services →</Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ──────────────────────────────────────── */}
      <section className="stats-band">
        <div className="stats-band-grid">
          {[
            { n: '15+', l: 'Années d\'expérience' },
            { n: '250+', l: 'Projets réalisés' },
            { n: '150+', l: 'Clients satisfaits' },
            { n: '24h', l: 'Délai de réponse' },
          ].map((s) => (
            <div key={s.l} className="stats-band-item">
              <div className="stats-band-number">{s.n}</div>
              <div className="stats-band-label">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO PREVIEW ───────────────────────────────── */}
      <section className="portfolio-preview-section">
        <div className="preview-container">
          <div className="preview-header reveal-up section-a">
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Nos réalisations</p>
            <h2>Projets récents</h2>
            <p>Des créations concrètes pour des clients variés</p>
          </div>
          <div className="portfolio-grid-preview">
            {loading ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                Chargement…
              </div>
            ) : featuredProjects.length > 0 ? (
              featuredProjects.map((p) => (
                <div key={p.id} className="portfolio-preview-card">
                  <div
                    className="portfolio-preview-img"
                    style={{
                      background: 'linear-gradient(135deg,#1b238f,#11a9e2)',
                      backgroundImage: p.images?.[0] ? `url(${p.images[0]})` : undefined,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <h4>{p.title}</h4>
                  <p className="portfolio-meta">{p.category || 'Projet'} · {p.client || 'Notre équipe'}</p>
                </div>
              ))
            ) : (
              [
                { title: 'Identité visuelle PME', meta: 'Design · Impression', bg: 'linear-gradient(135deg,#1b238f 0%,#11a9e2 100%)' },
                { title: 'Campagne banderoles', meta: 'Impression grand format', bg: 'linear-gradient(135deg,#04703e 0%,#11a9e2 100%)' },
                { title: 'Réparation réseau LAN', meta: 'Support technique', bg: 'linear-gradient(135deg,#ea0f8f 0%,#f4b400 100%)' },
              ].map((p) => (
                <div key={p.title} className="portfolio-preview-card">
                  <div className="portfolio-preview-img" style={{ background: p.bg }} />
                  <h4>{p.title}</h4>
                  <p className="portfolio-meta">{p.meta}</p>
                </div>
              ))
            )}
          </div>
          <div className="preview-footer">
            <Link to="/portfolio" className="link-more">Découvrir le portfolio →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────── */}
      <section className="trust-section">
        <div className="trust-grid">
          <div className="trust-header reveal-up section-a">
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Ils nous font confiance</p>
            <h2>Ce que disent nos clients</h2>
            <p>Retours authentiques de nos partenaires locaux</p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div>
                    <p className="author-name">{t.name}</p>
                    <p className="author-role">{t.role}</p>
                  </div>
                  <div className="stars" style={{ marginLeft: 'auto' }}>★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3D SCENE ────────────────────────────────────────── */}
      <div className="scene-panel reveal-up section-b">
        <div className="section-head scene-head">
          <p className="eyebrow" style={{ alignSelf: 'center' }}>Experience 3D</p>
          <h3 style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '0.5rem' }}>
            Ambiance tech immersive
          </h3>
        </div>
        <Suspense
          fallback={
            <div className="hero-scene hero-skeleton">
              <p>Chargement de la scène 3D…</p>
            </div>
          }
        >
          <HeroScene />
        </Suspense>
      </div>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="final-cta-section">
        <div className="cta-content">
          <p className="eyebrow">Prêt à démarrer ?</p>
          <h2>Transformons votre vision <span className="gradient-text">en réalité.</span></h2>
          <p>Nos experts sont disponibles pour discuter de votre projet dès aujourd'hui.</p>
          <Link to="/contact" className="cta-large">Commencer une discussion →</Link>
        </div>
      </section>
    </>
  )
}
