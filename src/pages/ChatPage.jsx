import { useState } from 'react'
import { askProInfoAssistant } from '../services/chatService'

export function ChatPage() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAsk = async (event) => {
    event.preventDefault()

    if (!question.trim()) {
      setError('Pose une question sur Pro-Informatique.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await askProInfoAssistant(question)
      setAnswer(result.content)
    } catch {
      setError("Le bot n'est pas joignable pour le moment.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="chat-v2">
      <article className="chat-main reveal-up section-a">
        <p className="eyebrow">Assistant IA</p>
        <h2 className="page-title">Chatbot limite au contexte Pro-Informatique</h2>
        <p>
          Le bot repond uniquement aux questions en lien avec les services, le lieu, l'equipe et
          les activites de Pro-Informatique.
        </p>

        <form className="chat-form" onSubmit={handleAsk}>
          <textarea
            rows="4"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Exemple: Quels services d'infographie proposez-vous ?"
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Analyse en cours...' : 'Envoyer'}
          </button>
        </form>

        {error ? <p className="form-error">{error}</p> : null}

        {answer ? (
          <div className="chat-answer">
            <h3>Reponse</h3>
            <p>{answer}</p>
          </div>
        ) : null}
      </article>

      <article className="chat-side reveal-up section-b">
        <p className="eyebrow">Bots externes</p>
        <h2 className="page-title">Canaux WhatsApp & Telegram</h2>
        <p>
          Intgre ton numero WhatsApp et ton bot Telegram dans le fichier .env pour connecter ces
          canaux de messagerie.
        </p>
        <ul className="contact-list">
          <li>WhatsApp: {import.meta.env.VITE_WHATSAPP_NUMBER || 'Non configure'}</li>
          <li>Telegram bot: {import.meta.env.VITE_TELEGRAM_BOT || 'Non configure'}</li>
          <li>Telegram chat ID: {import.meta.env.VITE_TELEGRAM_CHAT_ID || 'Non configure'}</li>
        </ul>

        <a href="/services" className="inline-link">
          Voir nos offres avant de contacter
        </a>
      </article>
    </section>
  )
}
