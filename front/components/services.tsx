'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Wifi, 
  Monitor, 
  Shield, 
  Users, 
  Smartphone, 
  Server,
  Code,
  Headphones
} from 'lucide-react'

const services = [
  {
    icon: Wifi,
    title: 'Cybercafé Premium',
    description: 'Espaces modernes équipés de stations haute performance pour surfer, travailler et jouer.',
    features: ['Internet ultra-rapide', 'Environnement climatisé', 'Accès WiFi gratuit'],
    color: 'text-primary'
  },
  {
    icon: Monitor,
    title: 'Maintenance IT',
    description: 'Services de maintenance et support technique pour tous vos équipements informatiques.',
    features: ['Support 24/7', 'Diagnostic rapide', 'Pièces de rechange'],
    color: 'text-secondary'
  },
  {
    icon: Shield,
    title: 'Cybersécurité',
    description: 'Solutions de sécurité informatique avancées pour protéger vos données.',
    features: ['Antivirus robuste', 'Firewall professionnel', 'Sauvegarde cloud'],
    color: 'text-accent'
  },
  {
    icon: Smartphone,
    title: 'Développement Mobile',
    description: 'Applications mobiles iOS et Android optimisées pour votre entreprise.',
    features: ['Design moderne', 'Intégration API', 'Performance optimale'],
    color: 'text-primary'
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Sites web et applications web custom développés avec les dernières technologies.',
    features: ['Responsive design', 'SEO optimisé', 'Maintenance incluse'],
    color: 'text-secondary'
  },
  {
    icon: Server,
    title: 'Infrastructure Cloud',
    description: 'Hébergement et gestion d\'infrastructure cloud sécurisée et scalable.',
    features: ['Haute disponibilité', 'Backup automatique', 'Monitoring 24/7'],
    color: 'text-accent'
  },
  {
    icon: Users,
    title: 'Formations IT',
    description: 'Programmes de formation professionnels pour monter en compétences.',
    features: ['Instructeurs certifiés', 'Certificats reconnus', 'Flexibilité horaire'],
    color: 'text-primary'
  },
  {
    icon: Headphones,
    title: 'Support Client',
    description: 'Assistance technique et conseil disponible 24 heures sur 24, 7 jours sur 7.',
    features: ['Chat en direct', 'Support email', 'Assistance téléphone'],
    color: 'text-secondary'
  }
]

export function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Nos Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Solutions informatiques <span className="text-primary">complètes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            De la maintenance IT au développement custom, nous offrons une gamme complète de services pour répondre à tous vos besoins numériques.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.title} className="group p-6 hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/30">
                <div className="mb-4 p-3 bg-muted rounded-lg w-fit">
                  <Icon size={28} className={`${service.color} group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="w-full text-primary hover:bg-primary/10">
                  En savoir plus
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
