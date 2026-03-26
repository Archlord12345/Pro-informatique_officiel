import { useState } from 'react'

export function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="eyebrow">Parlons de votre projet</div>
          <h1 className="display-title">Contactez-nous</h1>
          <p className="lead-copy">Nous sommes à votre écoute pour transformer vos idées en réalité</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-panel">
              <h2>Envoyez-nous un message</h2>

              {submitted && <div className="success-message">✓ Message envoyé avec succès !</div>}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Prénom</label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jean"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Nom</label>
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Dupont"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vous@example.com"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+237 XXX XXX XXX"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Demande d'information"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet ou question..."
                    rows="6"
                    required
                    disabled={loading}
                  />
                </div>

                <button type="submit" className="contact-submit" disabled={loading}>
                  {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-panel">
              <div className="contact-info-box">
                <h3>📍 Adresse</h3>
                <p>Descente Akwa, Bafoussam</p>
                <p>Région Ouest, Cameroun</p>
              </div>

              <div className="contact-info-box">
                <h3>📞 Téléphone</h3>
                <p className="contact-link">+237 6XX XXX XXX</p>
                <p className="contact-link">+237 6XX XXX XXX</p>
              </div>

              <div className="contact-info-box">
                <h3>📧 Email</h3>
                <p className="contact-link">contact@pro-informatique.cm</p>
                <p className="contact-link">admin@pro-informatique.cm</p>
              </div>

              <div className="contact-info-box">
                <h3>🕐 Horaires</h3>
                <p>Lun - Sam: 08h00 - 18h00</p>
                <p>Dimanche: Fermé</p>
              </div>

              <div className="social-links">
                <a href="#" className="social-btn" title="WhatsApp">
                  💬
                </a>
                <a href="#" className="social-btn" title="Facebook">
                  f
                </a>
                <a href="#" className="social-btn" title="Instagram">
                  📷
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq">
        <h2>Questions fréquentes</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>Quel est votre délai de réponse ?</h4>
            <p>Nous répondons aux demandes dans les 24 heures ouvrables</p>
          </div>
          <div className="faq-item">
            <h4>Proposez-vous une consultation gratuite ?</h4>
            <p>Oui, nos premières consultations sont toujours gratuites</p>
          </div>
          <div className="faq-item">
            <h4>Travaillez-vous avec tous les budgets ?</h4>
            <p>Nous adaptons nos services à tous les types de budgets</p>
          </div>
          <div className="faq-item">
            <h4>Pouvez-vous gérer des projets urgents ?</h4>
            <p>Oui, nous avons des options express pour les projets urgents</p>
          </div>
        </div>
      </section>
    </div>
  )
}
