import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mortgage Calculator | LoanPayLogic',
  description: 'Estimate your monthly mortgage payments with the precise LoanPayLogic calculator. Analyze principal, interest, and explore the best loan rates.',
  openGraph: {
    title: 'Smart Mortgage Calculator - LoanPayLogic',
    description: 'Calculate your exact mortgage payments instantly and get pre-approved offers.',
    url: 'https://loanpaylogic.com',
    siteName: 'LoanPayLogic',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
