import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'NIRIKSHAN — Inspect. Verify. Create real impact.',
  description: 'NIRIKSHAN is a smart real-time monitoring and inspection platform for SIH 2026, built by Team SquareX.',
  keywords: ['NIRIKSHAN', 'SIH 2026', 'Smart India Hackathon', 'inspection', 'real-time monitoring', 'Team SquareX'],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
