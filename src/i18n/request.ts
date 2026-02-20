import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async (params) => {
  const locale = params.locale || routing.defaultLocale;
  
  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    return { 
      locale: routing.defaultLocale,
      messages: {} 
    };
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
