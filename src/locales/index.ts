import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Languages
import en from './languages/en';
import vi from './languages/vi';
import todo from './languages/en/todo.json';

i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    vi: { translation: vi },
    en: { translation: en, todo },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
