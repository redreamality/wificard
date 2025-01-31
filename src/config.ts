export const locales = ['en', 'zh', 'ja', 'de', 'it', 'es', 'fr'] as const;
export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number]; 