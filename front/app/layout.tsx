import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Pro-Informatique | Cybercafé & Services IT au Cameroun',
  description: 'Services informatiques professionnels, cybercafé moderne et solutions digitales au Cameroun. Expertise, qualité et innovation.',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'fr_CM',
    url: 'https://pro-informatique.cm',
    siteName: 'Pro-Informatique',
    title: 'Pro-Informatique | Cybercafé & Services IT',
    description: 'Services informatiques de qualité au Cameroun',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
