import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/authService'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await authService.signIn(email, password)
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    // Login successful
    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Pro-Informatique</h1>
            <p>Connexion Administrateur</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pro-informatique.cm"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          <div className="login-footer">
            <Link to="/reset-password" className="reset-link">
              Mot de passe oublié ?
            </Link>
            <div className="divider">ou</div>
            <Link to="/" className="home-link">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>

        <div className="login-info">
          <div className="info-box">
            <h3>Accès Admin</h3>
            <p>Espace réservé aux administrateurs de Pro-Informatique. Gérez vos projets, portfolios et contenus.</p>
          </div>
          <div className="info-box">
            <h3>Sécurisé</h3>
            <p>Vos données sont protégées par Supabase. Authentification sécurisée et chiffrement des données.</p>
          </div>
          <div className="info-box">
            <h3>Support</h3>
            <p>Besoin d'aide ? Contactez l'équipe admin pour récupérer vos identifiants.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
