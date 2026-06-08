import './globals.css';
import ClientLayout from '@/components/ClientLayout';
import { Patrick_Hand, Caveat, Permanent_Marker, Kalam } from 'next/font/google';

const patrickHand = Patrick_Hand({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
});

const caveat = Caveat({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-doodle',
  display: 'swap',
});

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker',
  display: 'swap',
});

const kalam = Kalam({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-kalam',
  display: 'swap',
});

export const metadata = {
  title: 'Rafi Portfolio',
  description: 'Portfolio Muhammad Sultan Rafi — Fullstack Developer, Back end coder, Laravel',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${patrickHand.variable} ${caveat.variable} ${permanentMarker.variable} ${kalam.variable}`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}