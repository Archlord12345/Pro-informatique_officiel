'use client'

import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const projects = [
  {
    id: 1,
    title: 'Plateforme E-Commerce',
    category: 'Web Development',
    client: 'StartUp Tech Cameroon',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop',
    technologies: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 2,
    title: 'Application Gestion RH',
    category: 'Développement Mobile',
    client: 'Entreprise XYZ',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
    technologies: ['Flutter', 'Firebase', 'Dart']
  },
  {
    id: 3,
    title: 'Cybercafé Installation',
    category: 'Infrastructure',
    client: 'Douala Business Center',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db13?w=500&h=400&fit=crop',
    technologies: ['Network', 'Hardware', 'Security']
  },
  {
    id: 4,
    title: 'Système Gestion Stock',
    category: 'Web Development',
    client: 'Retail Group CM',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
    technologies: ['Vue.js', 'Python', 'PostgreSQL']
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    category: 'Web Development',
    client: 'Digital Agency Pro',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop',
    technologies: ['React', 'D3.js', 'API']
  },
  {
    id: 6,
    title: 'App Mobile Banking',
    category: 'Développement Mobile',
    client: 'FinTech Startup',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4e565db13?w=500&h=400&fit=crop',
    technologies: ['React Native', 'Node.js', 'PostgreSQL']
  }
]

export function Gallery() {
  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Nos Réalisations
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Portfolio de <span className="text-primary">projets réussis</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez nos projets les plus marquants pour des clients variés à travers le Cameroun et l&apos;Afrique.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-border/50"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {project.category}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.client}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
