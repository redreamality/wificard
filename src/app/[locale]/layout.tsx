import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';

export function generateStaticParams() {
  return [
    { locale: 'en' }, 
    { locale: 'zh' },
    { locale: 'ja' },
    { locale: 'de' },
    { locale: 'it' },
    { locale: 'es' },
    { locale: 'fr' }
  ];
}

export const metadata = {
  metadataBase: new URL('https://wificard.redreamality.com'),
  title: 'WiFi Card Generator - Create Beautiful WiFi Cards',
  description: 'Generate beautiful WiFi cards with QR codes for easy network sharing. Perfect for hotels, restaurants, and offices.',
  keywords: 'wifi card, qr code, wifi qr code, wifi generator, hotel wifi, restaurant wifi',
  openGraph: {
    title: 'WiFi Card Generator - Create Beautiful WiFi Cards',
    description: 'Generate beautiful WiFi cards with QR codes for easy network sharing',
    url: 'https://wificard.redreamality.com',
    siteName: 'WiFi Card Generator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WiFi Card Generator',
    description: 'Generate beautiful WiFi cards with QR codes',
  },
  alternates: {
    canonical: 'https://wificard.redreamality.com',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate" type="application/rss+xml" title="WiFi Card Generator RSS Feed" href="/feed.xml" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 
