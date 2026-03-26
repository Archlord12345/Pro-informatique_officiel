'use client'

import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Gallery } from '@/components/gallery'
import { Team } from '@/components/team'
import { Testimonials } from '@/components/testimonials'
import { FAQ } from '@/components/faq'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'
import { ChatBot } from '@/components/chatbot'

export default function Home() {
  return (
    <main className="bg-background">
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Team />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <ChatBot />
    </main>
  )
}
