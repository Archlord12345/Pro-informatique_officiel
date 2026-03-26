import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="glass-card">
      <p className="eyebrow">Erreur 404</p>
      <h2>Page introuvable</h2>
      <p>La page demandee n'existe pas ou a ete deplacee.</p>
      <Link className="inline-link" to="/">
        Retour a l'accueil
      </Link>
    </section>
  )
}
