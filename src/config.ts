export type LocaleType = 'en' | 'zh' | 'ja' | 'de' | 'it' | 'es' | 'fr';

export const locales: LocaleType[] = ['en', 'zh', 'ja', 'de', 'it', 'es', 'fr'];

export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number]; 