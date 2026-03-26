import { aiContextKeywords, companyProfile, services } from '../data/company'

const OUT_OF_SCOPE =
  "Je suis limite aux informations concernant Pro-Informatique. Cette question est hors contexte pour moi."

const localKnowledge = [
  companyProfile.description,
  `Fondateur: ${companyProfile.founder}`,
  `Localisation: ${companyProfile.location}`,
  ...services.map((item) => `${item.title}: ${item.details}`),
].join('\n')

const normalize = (text) => text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')

export const isQuestionInContext = (question) => {
  const cleaned = normalize(question)
  return aiContextKeywords.some((keyword) => cleaned.includes(normalize(keyword)))
}

export const askProInfoAssistant = async (question) => {
  if (!isQuestionInContext(question)) {
    return { content: OUT_OF_SCOPE, outOfScope: true }
  }

  const endpoint = import.meta.env.VITE_CHAT_ENDPOINT

  if (!endpoint) {
    return {
      content:
        "Mode local: connecte un backend sur VITE_CHAT_ENDPOINT pour utiliser Gemini, OpenAI, Mistral ou un autre provider en securisant les cles API cote serveur.",
      context: localKnowledge,
      outOfScope: false,
    }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, context: localKnowledge }),
  })

  if (!response.ok) {
    throw new Error('Le service IA est temporairement indisponible.')
  }

  const data = await response.json()
  return { content: data.answer, outOfScope: false }
}
