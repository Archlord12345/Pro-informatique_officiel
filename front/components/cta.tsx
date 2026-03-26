'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Mail, Phone } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-primary/90 to-secondary">
      <div className="max-w-4xl mx-auto text-center text-white space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-balance">
            Prêt à transformer votre digital?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Contactez-nous dès aujourd&apos;hui pour une consultation gratuite. Notre équipe est prête à vous aider.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Phone */}
          <a
            href="tel:+237666666666"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors border border-white/30"
          >
            <Phone size={20} />
            <div className="text-left">
              <p className="text-sm text-white/80">Appelez-nous</p>
              <p className="font-semibold">+237 666 666 666</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:contact@pro-informatique.cm"
            className="flex items-center justify-center gap-3 px-6 py-4 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors border border-white/30"
          >
            <Mail size={20} />
            <div className="text-left">
              <p className="text-sm text-white/80">Écrivez-nous</p>
              <p className="font-semibold">contact@pro-informatique.cm</p>
            </div>
          </a>
        </div>

        {/* CTA Button */}
        <Button className="bg-white hover:bg-white/90 text-primary font-semibold text-base px-8 py-6 h-auto">
          Demander une consultation
          <ArrowRight className="ml-2" size={20} />
        </Button>

        {/* Response Time */}
        <p className="text-white/80 text-sm">
          Nous répondons généralement en moins de 2 heures pendant les heures de travail
        </p>
      </div>
    </section>
  )
}
