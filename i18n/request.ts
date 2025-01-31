import { getRequestConfig, setRequestLocale } from 'next-intl/server';
import { locales } from '../src/config';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Asia/Shanghai',
    now: new Date(),
    setRequestLocale: locale
  };
}); 