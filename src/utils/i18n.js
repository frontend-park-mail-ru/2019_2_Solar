import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

i18n
    .use(LanguageDetector)
    .init({
        resources: {
            ru: {
                translation: ru['ru'],
            },
            en: {
                translation: en['en'],
            },
        },
        keySeparator: false,
        fallbackLng: 'ru',
        lng: 'ru',
    });

export default i18n;
