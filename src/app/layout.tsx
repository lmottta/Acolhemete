import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { MainLayout } from '../components/layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AcolheMente - Plataforma Digital para a Comunidade Neurodivergente',
  description:
    'Conectando famílias, profissionais e clínicas para o cuidado integral de pessoas autistas e neurodivergentes na América Latina. Plataforma segura, acessível e acolhedora.',
  keywords: [
    'neurodivergência',
    'autismo',
    'TDAH',
    'apoio',
    'terapia',
    'inclusão',
    'acessibilidade',
    'América Latina',
    'comunidade',
    'suporte',
  ],
  authors: [{ name: 'AcolheMente' }],
  creator: 'AcolheMente',
  publisher: 'AcolheMente',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://acolhemente.com',
    title: 'AcolheMente - Plataforma Digital para a Comunidade Neurodivergente',
    description:
      'Conectando famílias, profissionais e clínicas para o cuidado integral de pessoas autistas e neurodivergentes na América Latina.',
    siteName: 'AcolheMente',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AcolheMente - Plataforma Digital para a Comunidade Neurodivergente',
    description:
      'Conectando famílias, profissionais e clínicas para o cuidado integral de pessoas autistas e neurodivergentes na América Latina.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#4a90a4" />
        <meta name="msapplication-TileColor" content="#4a90a4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
