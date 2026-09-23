import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'KOWAL — Twój ruch. Twoja droga. | Nauka jazdy Zawiercie',
  description: 'Koncepcja strony szkoły jazdy Artur Kowal w Zawierciu. Kursy samochodowe i motocyklowe. Zrób pierwszy krok.',
  robots: { index: false, follow: false },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="pl"><body>{children}</body></html>;
}
