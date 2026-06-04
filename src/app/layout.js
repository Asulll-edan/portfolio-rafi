import './globals.css';
import ClientLayout from '@/components/ClientLayout';

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
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}