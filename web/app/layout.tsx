import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { MainNav, Footer } from '@/components/main-nav'

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export const metadata = {
  title: 'Sport Scribe - AI-Powered Sports Journalism',
  description: 'Intelligent sports journalism platform using multi-agent AI',
  openGraph: {
    title: 'Sports Scribe - AI-Powered Sports Journalism',
    description: 'Intelligent sports journalism powered by AI. Delivering accurate, engaging, and up-to-date sports content.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sports Scribe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sports Scribe - AI-Powered Sports Journalism',
    description: 'Intelligent sports journalism powered by AI. Delivering accurate, engaging, and up-to-date sports content.',
  },
}

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  weight: ['300', '400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${inter.variable} scroll-smooth`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className={`${inter.variable} font-sans bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 dark:text-gray-100 transition-colors duration-200`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <MainNav />
            <main className="flex-1">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
} 