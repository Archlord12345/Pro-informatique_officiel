'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Zap, Users } from 'lucide-react'

export function Hero() {
  return (
    <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-card to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  🚀 Excellence en IT depuis 2015
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight text-foreground">
                Vos <span className="text-primary">solutions</span> informatiques au Cameroun
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cybercafé moderne, services IT professionnels, et expertise numérique pour transformer votre business. Nous combinons technologie de pointe et service client exceptionnels.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 h-auto">
                Découvrir nos services
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button variant="outline" className="text-base px-8 py-6 h-auto">
                En savoir plus
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Clients satisfaits</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground">Projets réalisés</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">Support client</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <Shield size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Sécurité maximale</h3>
                    <p className="text-sm text-muted-foreground">Protection des données garantie</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-secondary/5 rounded-xl border border-secondary/10">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <Zap size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Performance rapide</h3>
                    <p className="text-sm text-muted-foreground">Fiabilité de nos services</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-xl border border-accent/10">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <Users size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Équipe expérimentée</h3>
                    <p className="text-sm text-muted-foreground">Experts en solutions IT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
