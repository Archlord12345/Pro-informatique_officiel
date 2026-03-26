import { useEffect, useMemo, useState } from 'react'
import { addComment, fetchCommentsByMedia, fetchMedia } from '../services/mediaService'

export function MediaPage() {
  const [media, setMedia] = useState([])
  const [activeMediaId, setActiveMediaId] = useState('')
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ fullName: '', email: '', message: '' })

  useEffect(() => {
    const load = async () => {
      try {
        const posts = await fetchMedia()
        setMedia(posts)
        setActiveMediaId(posts[0]?.id ?? '')
      } catch {
        setError('Impossible de charger les medias pour le moment.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  useEffect(() => {
    if (!activeMediaId) {
      return
    }

    const loadComments = async () => {
      try {
        const records = await fetchCommentsByMedia(activeMediaId)
        setComments(records)
      } catch {
        setError('Chargement des commentaires indisponible.')
      }
    }

    loadComments()
  }, [activeMediaId])

  const activeMedia = useMemo(() => media.find((item) => item.id === activeMediaId), [media, activeMediaId])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.fullName || !form.email || !form.message || !activeMediaId) {
      setError('Nom, email et commentaire sont obligatoires.')
      return
    }

    try {
      const record = await addComment({ mediaId: activeMediaId, ...form })
      setComments((prev) => [record, ...prev])
      setForm({ fullName: '', email: '', message: '' })
      setError('')
    } catch {
      setError("L'envoi du commentaire a echoue.")
    }
  }

  if (loading) {
    return <p>Chargement des medias...</p>
  }

  return (
    <section className="media-layout">
      <div className="media-list">
        <div className="section-head">
          <p className="eyebrow">Galerie</p>
          <h2>Publications media</h2>
        </div>

        {media.map((item) => (
          <button
            key={item.id}
            type="button"
            className={activeMediaId === item.id ? 'media-button active' : 'media-button'}
            onClick={() => setActiveMediaId(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <article className="media-panel">
        {activeMedia ? (
          <>
            <img src={activeMedia.url} alt={activeMedia.title} className="media-preview" />
            <h3>{activeMedia.title}</h3>
            <p>{activeMedia.summary}</p>
          </>
        ) : (
          <p>Aucune publication disponible.</p>
        )}

        <form className="comment-form" onSubmit={handleSubmit}>
          <h4>Laisser un commentaire</h4>
          <input
            type="text"
            placeholder="Nom complet"
            value={form.fullName}
            onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <textarea
            rows="4"
            placeholder="Votre commentaire"
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          />
          <button type="submit">Publier</button>
        </form>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="comments-list">
          {comments.map((comment) => (
            <article key={comment.id} className="comment-card">
              <p className="comment-head">
                {comment.full_name || comment.fullName} - {new Date(comment.created_at).toLocaleString()}
              </p>
              <p>{comment.message}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  )
}
