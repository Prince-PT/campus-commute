// "use client";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

// Export metadata from the server component (this file)
export const metadata: Metadata = {
  title: 'Campus Commute',
  description: 'Affordable cab rides at LNMIIT',
};

// Create a separate client component for the AuthProvider
import { ClientLayout } from './ClientLayout';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
