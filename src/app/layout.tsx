// src/app/layout.tsx
import './globals.css';
import { Signika_Negative } from 'next/font/google';

const signika = Signika_Negative({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-signika',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={signika.variable}>
      <body className="font-sans bg-background text-foreground">{children}</body>
    </html>
  );
}
