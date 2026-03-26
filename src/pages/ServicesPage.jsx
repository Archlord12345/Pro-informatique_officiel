import { Link } from 'react-router-dom'
import { services } from '../data/company'

export function ServicesPage() {
  const serviceIds = ['cybercafe', 'bureautique', 'infographie', 'support']

  return (
    <section className="services-v2">
      <div className="section-head reveal-up section-a services-intro">
        <p className="eyebrow">Nos services</p>
        <h2 className="page-title">Tout le necessaire informatique au meme endroit</h2>
        <p>
          Du besoin ponctuel a la prestation complete, Pro-Informatique livre des solutions rapides,
          fiables et adaptees aux particuliers comme aux professionnels.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => {
          const serviceId = serviceIds[index % serviceIds.length]
          return (
            <article
              key={service.id}
              className={`service-card reveal-up section-${String.fromCharCode(98 + (index % 4))}`}
            >
              <p className="service-index">0{index + 1}</p>
              <h3 className="service-title">{service.title}</h3>
              <p>{service.details}</p>
              <Link to={`/services/${serviceId}`} className="service-link">
                Découvrir ce service
              </Link>
            </article>
          )
        })}
      </div>

      <article className="cta-band reveal-up section-d">
        <p>
          Besoin d'une intervention ou d'un devis rapide ? Lance la discussion depuis l'assistant IA
          ou passe directement a l'atelier.
        </p>
        <Link className="action-link action-link-primary" to="/contact">
          Demander un devis
        </Link>
      </article>
    </section>
  )
}
