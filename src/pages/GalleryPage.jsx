import { useEffect, useState } from 'react'
import { driveService } from '../services/driveService'

const mockGalleryItems = [
  {
    id: 1,
    name: 'Portfolio 2024',
    type: 'folder',
    icon: '📁',
    description: 'Nos meilleurs projets de l\'année',
    itemCount: 15
  },
  {
    id: 2,
    name: 'Case Study - E-commerce',
    type: 'document',
    icon: '📊',
    description: 'Augmentation de 300% des ventes',
    date: '24 Jan 2024'
  },
  {
    id: 3,
    name: 'Logos & Branding',
    type: 'folder',
    icon: '📁',
    description: 'Collection de nos créations graphiques',
    itemCount: 42
  },
  {
    id: 4,
    name: 'Présentation Services 2024',
    type: 'presentation',
    icon: '🎬',
    description: 'Vue d\'ensemble de nos services',
    date: '15 Jan 2024'
  },
  {
    id: 5,
    name: 'Testimonials Clients',
    type: 'document',
    icon: '⭐',
    description: 'Avis et témoignages de nos clients',
    date: '10 Jan 2024'
  },
  {
    id: 6,
    name: 'Galerie Photos Projets',
    type: 'folder',
    icon: '📁',
    description: 'Photos en haute résolution de projets',
    itemCount: 120
  }
]

export function GalleryPage() {
  const [items, setItems] = useState(mockGalleryItems)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [driveConfigured, setDriveConfigured] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    // Check if Drive is configured
    const configured = driveService.isConfigured()
    setDriveConfigured(configured)

    // Try to fetch real items from Google Drive
    if (configured) {
      fetchDriveItems()
    }
  }, [])

  async function fetchDriveItems() {
    setLoading(true)
    setError(null)
    try {
      // This would fetch from Google Drive API in production
      const result = await driveService.listFiles(null, 20)
      if (result.error) {
        setError(result.error)
        // Keep using mock data
      } else if (result.data) {
        setItems(result.data)
      }
    } catch (err) {
      console.error('Error fetching Google Drive items:', err)
      setError('Impossible de charger les fichiers Google Drive')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (item) => {
    setSelectedItem(item)
    // In production, trigger download
  }

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="gallery-hero">
        <h1 className="page-title">Galerie & Ressources</h1>
        <p className="page-subtitle">
          Explorez nos projets, documentations et ressources disponibles
        </p>
        {!driveConfigured && (
          <div className="info-banner">
            ⚠️ Google Drive n'est pas configuré. Affichage des données de démonstration.
          </div>
        )}
      </section>

      {/* Stats Bar */}
      <section className="gallery-stats">
        <div className="stat-item">
          <span className="stat-icon">📁</span>
          <div>
            <p className="stat-number">{items.filter(i => i.type === 'folder').length}</p>
            <p className="stat-label">Dossiers</p>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">📄</span>
          <div>
            <p className="stat-number">{items.filter(i => i.type !== 'folder').length}</p>
            <p className="stat-label">Fichiers</p>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-icon">💾</span>
          <div>
            <p className="stat-number">2.3 GB</p>
            <p className="stat-label">Espace utilisé</p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-content">
        <div className="gallery-controls">
          <input
            type="text"
            placeholder="Rechercher des fichiers..."
            className="search-input"
          />
          <button 
            className="btn btn-secondary btn-small"
            onClick={fetchDriveItems}
            disabled={loading}
          >
            {loading ? 'Chargement...' : 'Rafraîchir'}
          </button>
        </div>

        {error && (
          <div className="error-banner">
            ❌ {error}
          </div>
        )}

        <div className="gallery-grid">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="gallery-card"
              onClick={() => handleDownload(item)}
            >
              <div className="gallery-card-header">
                <span className="gallery-icon">{item.icon}</span>
                {item.type === 'folder' && (
                  <span className="folder-badge">{item.itemCount} items</span>
                )}
              </div>

              <div className="gallery-card-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {item.date && <small>{item.date}</small>}
              </div>

              <div className="gallery-card-footer">
                <button 
                  className="btn btn-small"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(item)
                  }}
                >
                  {item.type === 'folder' ? 'Ouvrir' : 'Télécharger'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && !loading && (
          <div className="empty-state">
            <p>Aucun fichier à afficher</p>
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="gallery-categories">
        <h2>Categories Populaires</h2>
        <div className="categories-grid">
          <div className="category-card">
            <h3>📊 Rapports & Analyses</h3>
            <p>Études de cas et analyses détaillées</p>
          </div>
          <div className="category-card">
            <h3>🎨 Designs & Branding</h3>
            <p>Ressources graphiques et identité visuelle</p>
          </div>
          <div className="category-card">
            <h3>📹 Vidéos & Médias</h3>
            <p>Tutoriels et vidéos de projets</p>
          </div>
          <div className="category-card">
            <h3>📚 Documentation</h3>
            <p>Guides techniques et manuels</p>
          </div>
        </div>
      </section>

      {/* Modal pour fichier sélectionné */}
      {selectedItem && (
        <div className="modal" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>✕</button>
            <div className="modal-header">
              <span className="modal-icon">{selectedItem.icon}</span>
              <h2>{selectedItem.name}</h2>
            </div>
            <div className="modal-body">
              <p>{selectedItem.description}</p>
              {selectedItem.type === 'folder' && (
                <p className="modal-info">📁 Contient {selectedItem.itemCount} éléments</p>
              )}
              {selectedItem.date && (
                <p className="modal-info">📅 {selectedItem.date}</p>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setSelectedItem(null)}>
                {selectedItem.type === 'folder' ? 'Ouvrir le dossier' : 'Télécharger'} 
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
