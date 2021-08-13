import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, vi } from './locales';

// tips: export each translation to a seperate file
const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome
    initImmediate: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',
  });

export default i18n;
