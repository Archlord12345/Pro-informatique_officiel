import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

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
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!formData.firstName || !formData.email || !formData.message) {
        setError('Veuillez remplir tous les champs requis')
        setLoading(false)
        return
      }

      const { error: supabaseError } = await supabase.from('contacts').insert([
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          created_at: new Date().toISOString(),
        },
      ])

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
      }

      setSubmitted(true)
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      console.error('Submit error:', err)
      setError("Erreur lors de l'envoi du formulaire")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <p className="eyebrow">Parlons de votre projet</p>
          <h1 className="display-title">Contactez-nous</h1>
          <p className="lead-copy">
            Nous sommes à votre écoute pour transformer vos idées en réalité digitale.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form-panel">
              <h2>Envoyez-nous un message</h2>

              {submitted && (
                <div className="success-message">✓ Message envoyé avec succès ! Nous vous répondrons sous 24h.</div>
              )}
              {error && <div className="error-message">⚠️ {error}</div>}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">Prénom *</label>
                    <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Jean" required disabled={loading} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Nom</label>
                    <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Dupont" disabled={loading} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="vous@example.com" required disabled={loading} />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+237 6XX XXX XXX" disabled={loading} />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Sujet</label>
                  <input id="subject" type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Demande de devis infographie" disabled={loading} />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Décrivez votre projet ou votre besoin..." rows="6" required disabled={loading} />
                </div>

                <button type="submit" className="contact-submit" disabled={loading}>
                  {loading ? 'Envoi en cours…' : 'Envoyer le message →'}
                </button>
              </form>
            </div>

            {/* Info panel */}
            <div className="contact-info-panel">
              <div className="contact-info-box">
                <h3>📍 Adresse</h3>
                <p>Descente Akwa, Bafoussam</p>
                <p>Région Ouest, Cameroun</p>
              </div>
              <div className="contact-info-box">
                <h3>📞 Téléphone</h3>
                <p className="contact-link">+237 690 123 456</p>
                <p className="contact-link">+237 677 890 123</p>
              </div>
              <div className="contact-info-box">
                <h3>📧 Email</h3>
                <p className="contact-link">contact@pro-informatique.cm</p>
                <p className="contact-link">admin@pro-informatique.cm</p>
              </div>
              <div className="contact-info-box">
                <h3>🕐 Horaires d'ouverture</h3>
                <p>Lun – Sam : 08h00 – 18h00</p>
                <p>Dimanche : Fermé</p>
              </div>
              <div className="social-links">
                <a href="https://wa.me/+237690123456" target="_blank" rel="noopener noreferrer" className="social-btn" title="WhatsApp">💬</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" title="Facebook">f</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" title="Instagram">📷</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" title="LinkedIn">in</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-faq">
        <h2>Questions fréquentes</h2>
        <div className="faq-grid">
          {[
            { q: 'Quel est votre délai de réponse ?', a: 'Nous répondons à toutes les demandes dans les 24 heures ouvrables.' },
            { q: 'Proposez-vous une consultation gratuite ?', a: 'Oui, nos premières consultations sont toujours gratuites et sans engagement.' },
            { q: 'Travaillez-vous avec tous les budgets ?', a: 'Absolument, nous adaptons nos services à tous les types de budgets.' },
            { q: 'Pouvez-vous gérer des projets urgents ?', a: 'Oui, nous proposons des options express pour les projets urgents moyennant supplément.' },
          ].map((faq) => (
            <div key={faq.q} className="faq-item">
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
