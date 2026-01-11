import '@/app/globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { GITHUB_USERNAME } from '@/config/constants'
import { CONTENT_MAX_WIDTH } from '@/config/layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '동호의 블로그',
  description: 'Slow and steady, with pleasure.',
  icons: {
    icon: `https://github.com/${GITHUB_USERNAME}.png`,
    apple: `https://github.com/${GITHUB_USERNAME}.png`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <div className="flex flex-col min-h-screen bg-background">
          <Header />
          <main className={`flex-1 ${CONTENT_MAX_WIDTH} w-full mx-auto p-0 bg-background`}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

