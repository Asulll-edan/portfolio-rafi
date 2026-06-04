import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'Muhammad Sultan Rafi — Portfolio',
  description: 'Portfolio Muhammad Sultan Rafi — Fullstack Developer, Back end coder, Laravel',
  icons: {
    icon: '/assets/images/msr.png',
    apple: '/assets/images/msr.png',
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