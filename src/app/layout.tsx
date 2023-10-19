import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Providers from '@/components/Providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stock Management System',
  description: 'A simple application to manage stock of products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header/>
          {children}
        </Providers>
        </body>
    </html>
  )
}
