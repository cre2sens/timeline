import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ko from './locales/ko/common.json'
import en from './locales/en/common.json'

const savedLocale = localStorage.getItem('chronos-locale')
const defaultLocale = savedLocale || (navigator.language.startsWith('ko') ? 'ko' : 'en')

i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
  lng: defaultLocale,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
