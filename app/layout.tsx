import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Antoine Limare | Portfolio',
  description: 'Portfolio de Antoine Limare, développeur web basé à Rouen, spécialisé en React et Next.js.',
  metadataBase: new URL('https://portfolio.antoine-limare.dev'),
  openGraph: {
    title: 'Antoine Limare | Portfolio',
    description: 'Développeur web — Création d’applications modernes en React/Next.js',
    url: 'https://portfolio.antoine-limare.dev',
    siteName: 'Portfolio Antoine Limare',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-dark">
      <body className={`${inter.variable} relative overflow-x-hidden`}>{children}</body>
    </html>
  );
}
