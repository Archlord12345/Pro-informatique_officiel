import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService, profileService } from '../services/authService'

export function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      setLoading(false)
      return
    }

    // Sign up
    const result = await authService.signUp(formData.email, formData.password, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    })

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    // Create user profile
    if (result.data?.user) {
      await profileService.upsertProfile(result.data.user.id, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: 'user',
      })
    }

    setSuccess(true)
    setLoading(false)
    setTimeout(() => navigate('/login'), 2000)
  }

  if (success) {
    return (
      <div className="register-page">
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">✓</div>
            <h2>Inscrite avec succès !</h2>
            <p>Un email de confirmation a été envoyé. Veuillez vérifier votre boîte de réception.</p>
            <p className="redirect-text">Redirection vers la connexion...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>Créer un compte</h1>
            <p>Pro-Informatique - Espace Client</p>
          </div>

          <form onSubmit={handleRegister} className="register-form">
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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Inscription en cours...' : 'Créer mon compte'}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
