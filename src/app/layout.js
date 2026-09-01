import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { Inter, Montserrat } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata = {
  title: 'Muhammad Sultan Rafi - Fullstack Developer',
  description: 'Portfolio Muhammad Sultan Rafi — Fullstack Developer specializing in Laravel, Next.js, and modern web technologies',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${montserrat.variable}`}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}