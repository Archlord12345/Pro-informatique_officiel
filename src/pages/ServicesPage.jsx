import { services } from '../data/company'

export function ServicesPage() {
  return (
    <section>
      <div className="section-head reveal-up">
        <p className="eyebrow">Nos services</p>
        <h2>Tout le necessaire informatique au meme endroit</h2>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <article key={service.id} className={`service-card reveal-up delay-${(index % 3) + 1}`}>
            <h3>{service.title}</h3>
            <p>{service.details}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
