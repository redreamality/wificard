import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import '../globals.css';
import { locales, LocaleType } from '../../config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: LocaleType }>;
}

export default async function LocaleLayout(props: LayoutProps) {
  const { children, params } = props;
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  let messages: AbstractIntlMessages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
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
