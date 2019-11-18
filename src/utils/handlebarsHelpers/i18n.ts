import i18n from '../i18n';

/**
 * @module
 * @param {objecct} str
 * @return {object}
 */
export default (str) => {
    return (i18n != undefined ? i18n.t(str) : str);
};
