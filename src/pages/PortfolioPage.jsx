import { useState, useEffect } from 'react'
import { projectService, testimonialService } from '../services/portfolioService'

export function PortfolioPage() {
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadContent()
  }, [selectedCategory])

  const loadContent = async () => {
    setLoading(true)
    setError('')

    try {
      // Load projects
      const projectsResult = await projectService.getProjects(
        selectedCategory !== 'all' ? { category: selectedCategory } : {}
      )

      if (projectsResult.error) {
        setError(projectsResult.error)
      } else {
        setProjects(projectsResult.data || [])
      }

      // Load testimonials
      if (selectedCategory === 'all') {
        const testimonialsResult = await testimonialService.getTestimonials()
        if (!testimonialsResult.error) {
          setTestimonials(testimonialsResult.data || [])
        }
      }
    } catch (err) {
      setError('Erreur lors du chargement du contenu')
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'Tous les projets' },
    { id: 'Infographie', name: 'Infographie' },
    { id: 'Impression', name: 'Impression' },
    { id: 'Technique', name: 'Support Technique' },
    { id: 'Bureautique', name: 'Bureautique' },
  ]

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-content">
          <h1 className="display-title">Notre Portfolio</h1>
          <p className="lead-copy">Découvrez nos réalisations et projets marquants pour nos clients</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="portfolio-filters">
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="portfolio-section">
        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Chargement des projets...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <p>Aucun projet trouvé pour cette catégorie.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  {project.images && project.images[0] && (
                    <img src={project.images[0]} alt={project.title} />
                  )}
                  <div className="project-overlay">
                    <span className="project-category">{project.category}</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="project-client">Client: {project.client}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-date">{new Date(project.completedAt).toLocaleDateString('fr-FR')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      {selectedCategory === 'all' && testimonials.length > 0 && (
        <section className="testimonials-section">
          <h2 className="section-title">Ce que nos clients disent</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  {testimonial.image && <img src={testimonial.image} alt={testimonial.author} className="testimonial-avatar" />}
                  <div className="testimonial-info">
                    <p className="testimonial-author">{testimonial.author}</p>
                    <p className="testimonial-company">{testimonial.company}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
                <p className="testimonial-content">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="portfolio-cta">
        <h2>Intéressé par notre travail ?</h2>
        <p>Contactez-nous pour discuter de votre prochain projet</p>
        <div className="cta-buttons">
          <a href="/chat" className="action-link action-link-primary">
            Demander une estimation
          </a>
          <a href="/contact" className="action-link action-link-ghost">
            Nous contacter
          </a>
        </div>
      </section>
    </div>
  )
}
