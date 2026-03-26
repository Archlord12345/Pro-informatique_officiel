'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Équipe', href: '#team' },
  { label: 'Témoignages', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">P</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-primary">Pro-Informatique</h1>
            <p className="text-xs text-muted-foreground">Cameroun</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+237666666666" className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            <Phone size={16} />
            <span>+237 666 666 666</span>
          </a>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Contactez-nous
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="lg:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border space-y-3">
              <a href="tel:+237666666666" className="block px-3 py-2 text-sm font-medium text-primary">
                +237 666 666 666
              </a>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Contactez-nous
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
