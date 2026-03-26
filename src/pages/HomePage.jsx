import { companyProfile } from '../data/company'
import { HeroScene } from '../components/HeroScene'

export function HomePage() {
  return (
    <section className="grid-home">
      <article className="glass-card reveal-up">
        <p className="eyebrow">A propos</p>
        <h2>Votre partenaire digital a Bafoussam</h2>
        <p>{companyProfile.description}</p>
        <p>
          <strong>Fondateur:</strong> {companyProfile.founder}
        </p>
        <p>
          <strong>Adresse:</strong> {companyProfile.location}
        </p>
      </article>

      <article className="glass-card reveal-up delay-1">
        <p className="eyebrow">Experience 3D</p>
        <h2>Ambiance tech immersive</h2>
        <p>
          Cette zone met en avant un decor 3D (ordinateur, accessoires et mouvement) pour accentuer
          l'identite technologique de Pro-Informatique.
        </p>
        <HeroScene />
      </article>
    </section>
  )
}
