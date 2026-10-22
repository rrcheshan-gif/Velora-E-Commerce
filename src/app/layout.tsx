import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: 'VELORA — Everything You Love, in One Place',
  description:
    'Experience international everyday luxury across fine fashion, high-fidelity acoustic tech, home living sanctuary, and clean botanical beauty. Express worldwide shipping.',
  keywords: [
    'VELORA',
    'luxury shopping',
    'international e-commerce',
    'designer cashmere',
    'audiophile sound',
    'home sanctuary',
    'botanical beauty',
  ],
  authors: [{ name: 'VELORA Maison' }],
  openGraph: {
    title: 'VELORA — Everything You Love, in One Place',
    description: 'Shop quality finds across fashion, technology, home, beauty, and more.',
    type: 'website',
    locale: 'en_US',
    siteName: 'VELORA International',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-velora-black selection:bg-velora-gold-500 selection:text-white">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
