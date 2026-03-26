'use client'

import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">P</span>
              </div>
              <div>
                <h3 className="font-bold">Pro-Informatique</h3>
                <p className="text-xs text-white/80">Cameroun</p>
              </div>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              Solutions informatiques innovantes pour transformer votre entreprise au Cameroun et en Afrique.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition-colors">
                  Cybercafé Premium
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition-colors">
                  Maintenance IT
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition-colors">
                  Développement Web
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition-colors">
                  Cybersécurité
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-white transition-colors">
                  Formations IT
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Entreprise</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#team" className="text-white/80 hover:text-white transition-colors">
                  Notre équipe
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-white/80 hover:text-white transition-colors">
                  Nos projets
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Carrières
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 items-start">
                <Phone size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/80">Téléphone</p>
                  <a href="tel:+237666666666" className="hover:text-white transition-colors">
                    +237 666 666 666
                  </a>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <Mail size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/80">Email</p>
                  <a href="mailto:contact@pro-informatique.cm" className="hover:text-white transition-colors">
                    contact@pro-informatique.cm
                  </a>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/80">Adresse</p>
                  <p>Douala, Cameroun</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 py-8">
          {/* Bottom Content */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/80">
            <p>
              © {new Date().getFullYear()} Pro-Informatique. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Conditions d&apos;utilisation
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
