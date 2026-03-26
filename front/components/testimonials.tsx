'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Ibrahim Hassan',
    company: 'Tech Startup Douala',
    role: 'Directeur Exécutif',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Pro-Informatique a transformé notre infrastructure IT. Leur expertise et réactivité sont exceptionnelles. Ils nous ont aidé à économiser 40% en coûts IT.',
    rating: 5
  },
  {
    id: 2,
    name: 'Jeanne Yopa',
    company: 'Fashion Boutique CM',
    role: 'Propriétaire',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Le développement de notre site e-commerce a été fluide et professionnel. L\'équipe a vraiment écouté nos besoins. Les ventes ont augmenté de 60% depuis le lancement.',
    rating: 5
  },
  {
    id: 3,
    name: 'Olivier Kapteu',
    company: 'Cabinet Juridique Associate',
    role: 'Associé',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    content: 'La sécurité des données est critique pour nous. Pro-Informatique a mis en place une infrastructure très sécurisée avec conformité totale. Très professionnel!',
    rating: 5
  },
  {
    id: 4,
    name: 'Amina Sow',
    company: 'Agence Marketing Créative',
    role: 'Directrice',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Leur application mobile pour notre agence a dépassé nos attentes. Interface intuitive, performance remarquable. Je la recommande fortement!',
    rating: 5
  },
  {
    id: 5,
    name: 'Thomas Moyo',
    company: 'Transport Logistics Inc',
    role: 'Responsable IT',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    content: 'Le système de gestion qu\'ils ont développé a automatisé 80% de nos processus. ROI impressionnant et support client impeccable.',
    rating: 5
  },
  {
    id: 6,
    name: 'Patricia Ndip',
    company: 'Hospital Management Group',
    role: 'Directrice Générale',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Pour le secteur sensible de la santé, ils ont fourni une solution RGPD-compliant et sécurisée. Leur diligence professionnelle est remarquable.',
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Témoignages
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Ce que nos clients <span className="text-primary">disent de nous</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Des résultats concrets et une satisfaction client qui parle d&apos;elle-même.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="p-6 hover:shadow-lg transition-all duration-300 border border-border flex flex-col"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-border pt-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
