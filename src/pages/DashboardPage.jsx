import { useState, useEffect } from 'react'
import { projectService } from '../services/portfolioService'

export function DashboardPage() {
  const [projects, setProjects] = useState([])
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedThisMonth: 0,
    activeClients: 0,
    revenue: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    setLoading(true)
    const { data } = await projectService.getProjects()
    setProjects(data || [])

    // Mock stats
    setStats({
      totalProjects: data?.length || 12,
      completedThisMonth: Math.floor((data?.length || 12) * 0.4),
      activeClients: 8,
      revenue: 450000,
    })
    setLoading(false)
  }

  const quickStats = [
    {
      label: 'Projets totaux',
      value: stats.totalProjects,
      icon: '📁',
      color: 'stat-blue',
    },
    {
      label: 'Finalisés ce mois',
      value: stats.completedThisMonth,
      icon: '✓',
      color: 'stat-green',
    },
    {
      label: 'Clients actifs',
      value: stats.activeClients,
      icon: '👥',
      color: 'stat-purple',
    },
    {
      label: 'Revenus (FCFA)',
      value: `${(stats.revenue / 1000).toFixed(0)}K`,
      icon: '💰',
      color: 'stat-gold',
    },
  ]

  return (
    <div className="dashboard-page">
      <section className="dashboard-header">
        <div className="dashboard-header-content">
          <h1>Tableau de Bord</h1>
          <p>Gérez vos projets et suivez vos performances</p>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="content-wrap">
          {/* Stats Grid */}
          <div className="stats-overview">
            {quickStats.map((stat) => (
              <div key={stat.label} className={`stat-card ${stat.color}`}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Projects Panel */}
            <div className="dashboard-panel projects-panel">
              <div className="panel-header">
                <h2>Projets Récents</h2>
                <a href="/portfolio" className="panel-action-link">
                  Voir tous →
                </a>
              </div>

              {loading ? (
                <div className="loading-state">Chargement...</div>
              ) : projects.length === 0 ? (
                <div className="empty-state">
                  <p>Aucun projet pour le moment</p>
                </div>
              ) : (
                <div className="projects-list">
                  {projects.slice(0, 5).map((project) => (
                    <div key={project.id} className="project-row">
                      <div className="project-row-info">
                        <h4>{project.title}</h4>
                        <p>{project.category}</p>
                      </div>
                      <div className="project-row-status">
                        <span className="status-badge">Finalisé</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activities Panel */}
            <div className="dashboard-panel activities-panel">
              <div className="panel-header">
                <h2>Activités Récentes</h2>
              </div>

              <div className="activities-list">
                <div className="activity-item">
                  <div className="activity-icon">📋</div>
                  <div className="activity-info">
                    <p className="activity-title">Nouveau projet créé</p>
                    <p className="activity-time">Il y a 2 heures</p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">✓</div>
                  <div className="activity-info">
                    <p className="activity-title">Projet finalisé</p>
                    <p className="activity-time">Il y a 5 heures</p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">💬</div>
                  <div className="activity-info">
                    <p className="activity-title">Nouveau commentaire client</p>
                    <p className="activity-time">Il y a 1 jour</p>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">📧</div>
                  <div className="activity-info">
                    <p className="activity-title">Email de demande reçu</p>
                    <p className="activity-time">Il y a 2 jours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="dashboard-actions">
            <a href="/portfolio" className="action-link action-link-primary">
              + Nouveau Projet
            </a>
            <a href="/contact" className="action-link action-link-ghost">
              Voir les demandes
            </a>
            <a href="/admin" className="action-link action-link-ghost">
              Paramètres admin
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
