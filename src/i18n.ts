import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale = 'en'}) => {
  const requestLocale = locale;
  return {
    locale: requestLocale,
    messages: (await import(`../messages/${requestLocale}.json`)).default,
    timeZone: 'Asia/Shanghai'
  };
}); 