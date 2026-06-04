// PATH: src/app/layout.js

import './globals.css';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'Muhammad Sultan Rafi — Portfolio',
  description: 'Portfolio Muhammad Sultan Rafi — Fullstack Developer, Back end coder, Laravel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}