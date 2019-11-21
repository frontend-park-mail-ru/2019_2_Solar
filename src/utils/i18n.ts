import ru from '../locales/ru.json';
import en from '../locales/en.json';

/**
 * @class
 */
class I18n {
    language: string;
    languageMap: object;
    
    /**
     * I18n constructor.
     * @constructor
     */
    constructor() {
        this.language = 'ru';
        this.languageMap = {
            'ru': ru,
            'en': en,
        };
    }

    /**
     * Set app language.
     * @param {string} str
     */
    setLanguage(str) {
        this.language = str;
    }

    /**
     * Return key from a language dict.
     * @param {string} str
     * @return {str}
     */
    t(str) {
        return this.languageMap[this.language][this.language][str];
    }
}

export default new I18n();
