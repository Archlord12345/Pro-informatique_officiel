import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="not-found-card reveal-up section-a">
      <p className="eyebrow">Erreur 404</p>
      <h2 className="page-title">Page introuvable</h2>
      <p>La page demandee n'existe pas ou a ete deplacee.</p>
      <Link className="action-link action-link-primary" to="/">
        Retour a l'accueil
      </Link>
    </section>
  )
}
