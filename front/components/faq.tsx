'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'Quels services offrez-vous exactement?',
    answer: 'Nous offrons une large gamme de services: cybercafé premium, maintenance IT, développement web et mobile, cybersécurité, infrastructure cloud, formations IT et support client 24/7.'
  },
  {
    id: 2,
    question: 'Quel est votre disponibilité du support?',
    answer: 'Notre support client est disponible 24 heures sur 24, 7 jours sur 7. Vous pouvez nous contacter par téléphone, email ou chat en direct à tout moment.'
  },
  {
    id: 3,
    question: 'Combien coûtent vos services de développement?',
    answer: 'Les tarifs varient selon le scope du projet. Nous proposons des devis personnalisés après consultation. Contactez-nous pour une évaluation gratuite.'
  },
  {
    id: 4,
    question: 'Travaillez-vous sur site ou à distance?',
    answer: 'Nous travaillons de manière flexible - sur site à Douala/Yaoundé ou à distance selon vos préférences. Nous nous adaptons à vos besoins.'
  },
  {
    id: 5,
    question: 'Avez-vous des certifications de sécurité?',
    answer: 'Oui, notre équipe est certifiée en cybersécurité (ISO 27001) et nous respectons les normes RGPD pour la protection des données.'
  },
  {
    id: 6,
    question: 'Proposez-vous des contrats de maintenance?',
    answer: 'Oui, nous proposons des contrats de maintenance flexibles adaptés à votre budget et vos besoins. Assistance illimitée incluse.'
  }
]

export function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Foire Aux Questions
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Questions <span className="text-primary">fréquemment posées</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Trouvez les réponses à vos questions les plus courantes.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card
              key={faq.id}
              className="border border-border overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground text-left">
                  {faq.question}
                </h3>
                <ChevronDown
                  size={20}
                  className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                    expandedId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedId === faq.id && (
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-xl text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">
            N&apos;avez-vous pas trouvé la réponse?
          </h3>
          <p className="text-muted-foreground mb-4">
            Contactez notre équipe support, elle sera ravi de vous aider.
          </p>
          <a
            href="mailto:support@pro-informatique.cm"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  )
}
