import type { Metadata, Viewport } from 'next'
import { cn } from '@/lib/utils'
import Header from '@/components/header'
import { Sidebar } from '@/components/sidebar-search'
import { Toaster } from '@/components/ui/sonner'
import { AppStateProvider } from '@/lib/utils/app-state'

const title = 'AI Search'
const description =
  'A fully open-source AI-powered answer engine with a generative UI.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased')}>
        
        <AppStateProvider>
          <Header />
          {children}
          <Sidebar />
          <Toaster />
        </AppStateProvider>
      </body>
    </html>
  )
}
