import { I18nManager } from 'react-native';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import { memoize } from 'lodash'; // Use for caching/memoize for better performance
import { localizeData } from './localize';

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  vi: () => require('./vi.json'),
  en: () => require('./en.json'),
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfig = (language) => {
  // fallback if no available language fits
  const fallback = { languageTag: language || 'en', isRTL: false };

  const { languageTag, isRTL } = language
    ? fallback
    : RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;

  // clear translation cache
  translate.cache.clear();
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {
    [languageTag]: translationGetters[languageTag](),
  };
  i18n.locale = languageTag;
};

export { translate, setI18nConfig, localizeData, RNLocalize };
