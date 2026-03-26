import { Suspense, lazy } from 'react'
import { companyProfile } from '../data/company'

const HeroScene = lazy(() => import('../components/HeroScene').then((m) => ({ default: m.HeroScene })))

export function HomePage() {
  return (
    <section className="home-v2">
      <article className="hero-panel reveal-up section-a">
        <p className="eyebrow">Votre partenaire digital a Bafoussam</p>
        <h2 className="display-title">Pro-Informatique transforme vos besoins en solutions concretes</h2>
        <p className="lead-copy">{companyProfile.description}</p>

        <div className="hero-actions">
          <a className="action-link action-link-primary" href="/services">
            Voir les services
          </a>
          <a className="action-link action-link-ghost" href="/chat">
            Poser une question au bot
          </a>
        </div>

        <div className="stat-grid">
          <article className="stat-card">
            <p className="stat-value">24h</p>
            <p className="stat-label">Reactivite sur demandes courantes</p>
          </article>
          <article className="stat-card">
            <p className="stat-value">360°</p>
            <p className="stat-label">Couverture: impression, design, maintenance</p>
          </article>
          <article className="stat-card">
            <p className="stat-value">Local</p>
            <p className="stat-label">Ancrage fort a Bafoussam</p>
          </article>
        </div>
      </article>

      <article className="scene-panel reveal-up section-b">
        <div className="section-head scene-head">
          <p className="eyebrow">Experience 3D</p>
          <h3>Ambiance tech immersive</h3>
          <p>
            Le decor 3D donne une signature visuelle forte et confirme le positionnement
            technologique de la marque.
          </p>
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

        <div className="identity-strip">
          <p>
            <strong>Fondateur:</strong> {companyProfile.founder}
          </p>
          <p>
            <strong>Adresse:</strong> {companyProfile.location}
          </p>
        </div>
      </article>
    </section>
  )
}
