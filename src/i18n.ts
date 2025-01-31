import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Asia/Shanghai',
    now: new Date()
  };
}); 