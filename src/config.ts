export type LocaleType = 'en' | 'zh' | 'ja' | 'de' | 'it' | 'es' | 'fr' | 'ru' | 'th' | 'el' | 'hi' | 'ar' | 'uk' | 'pl' | 'id';

export const locales: LocaleType[] = ['en', 'zh', 'ja', 'de', 'it', 'es', 'fr', 'ru', 'th', 'el', 'hi', 'ar', 'uk', 'pl', 'id'];

export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number]; 