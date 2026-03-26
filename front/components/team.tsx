'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Linkedin, Mail, Phone } from 'lucide-react'

const team = [
  {
    id: 1,
    name: 'Jean-Paul Nkembi',
    title: 'Directeur Général',
    bio: 'Expert en solutions IT avec 10+ ans d\'expérience dans l\'infrastructure numérique.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    email: 'jean.nkembi@pro-informatique.cm',
    phone: '+237 666 111 111',
    specialties: ['Infrastructure', 'Management', 'Stratégie IT']
  },
  {
    id: 2,
    name: 'Marie Tchoumou',
    title: 'Chef de Projet Development',
    bio: 'Développeuse full-stack passionnée par la création d\'applications web innovantes.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    email: 'marie.tchoumou@pro-informatique.cm',
    phone: '+237 666 222 222',
    specialties: ['React', 'Node.js', 'Web Development']
  },
  {
    id: 3,
    name: 'Charles Momo',
    title: 'Spécialiste Sécurité IT',
    bio: 'Certificat en cybersécurité avec expertise en protections des données critiques.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    email: 'charles.momo@pro-informatique.cm',
    phone: '+237 666 333 333',
    specialties: ['Cybersécurité', 'Compliance', 'Cloud Security']
  },
  {
    id: 4,
    name: 'Amara Diallo',
    title: 'Développeuse Mobile',
    bio: 'Créatrice d\'applications mobiles multi-plateformes avec passion pour l\'UX.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    email: 'amara.diallo@pro-informatique.cm',
    phone: '+237 666 444 444',
    specialties: ['Flutter', 'React Native', 'iOS', 'Android']
  },
  {
    id: 5,
    name: 'Samuel Nkosi',
    title: 'Administrateur Réseau',
    bio: 'Gestion d\'infrastructures réseaux complexes avec 8 ans d\'expérience.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    email: 'samuel.nkosi@pro-informatique.cm',
    phone: '+237 666 555 555',
    specialties: ['Networking', 'Infrastructure', 'Maintenance']
  },
  {
    id: 6,
    name: 'Élise Kamga',
    title: 'Manager Support Client',
    bio: 'Dédiée à offrir un support client exceptionnel et une satisfaction maximale.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    email: 'elise.kamga@pro-informatique.cm',
    phone: '+237 666 666 666',
    specialties: ['Support Client', 'CRM', 'Formation']
  }
]

export function Team() {
  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Notre Équipe
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Les <span className="text-primary">experts</span> derrière nos succès
          </h2>
          <p className="text-lg text-muted-foreground">
            Une équipe diversifiée et passionnée, composée de professionnels certifiés et expérimentés.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.id} className="p-0 overflow-hidden hover:shadow-lg transition-all duration-300 border border-border">
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-muted">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-primary font-semibold text-sm">{member.title}</p>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.bio}
                </p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {member.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                {/* Contact */}
                <div className="border-t border-border pt-4 flex items-center gap-3">
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Email"
                  >
                    <Mail size={18} className="text-muted-foreground hover:text-primary" />
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Téléphone"
                  >
                    <Phone size={18} className="text-muted-foreground hover:text-primary" />
                  </a>
                  <a
                    href="#"
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="LinkedIn"
                  >
                    <Linkedin size={18} className="text-muted-foreground hover:text-primary" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
