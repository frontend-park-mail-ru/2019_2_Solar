const emailRegex = '^(?=.{1,50})';
const passwordRegex = '[a-zA-Z]';
const usernameRegex = '[^a-zA-Z0-9_-]';
const nameRegex = '^(?=.{1,30})';
const statusRegex = '^(?=.{1,200})';

/**
 * Validate email.
 * @param {string} value
 * @return {boolean} Valid or not.
 */
export function validateEmail(value) {
    return (new RegExp(emailRegex)).test(value);
}

/**
 * Validate password.
 * @param {string} value
 * @return {boolean} Valid or not.
 */
export function validatePassword(value) {
    if (value.length > 7) {
        return (new RegExp(passwordRegex)).test(value);
    }
    return false;
}

/**
 * Validate username.
 * @param {string} value
 * @return {boolean} Valid or not.
 */
export function validateUsername(value) {
    if (value.length > 2) {
        return !(new RegExp(usernameRegex)).test(value);
    }
    return false;
}

/**
 * Validate name.
 * @param {string} value
 * @return {boolean} Valid or not.
 */
export function validateName(value) {
    return (new RegExp(nameRegex)).test(value);
}

/**
 * Validate status.
 * @param {string} value
 * @return {boolean} Valid or not.
 */
export function validateStatus(value) {
    return (new RegExp(statusRegex)).test(value);
}

/**
 * Validate Signup form.
 * @param {object} signUpForm
 * @return {boolean} Valid or not.
 */
export function validateSignup(signUpForm) {
    const errorList = {
        errorMessage: '',
        errorNumbers: [],
    };

    if (!validateEmail(signUpForm.elements['email'].value)) {
        errorList.errorMessage += 'емейл, ';
        errorList.errorNumbers.push('email');
    }

    if (!validatePassword(signUpForm.elements['password'].value)) {
        errorList.errorMessage += 'пароль, ';
        errorList.errorNumbers.push('password');
    }

    if (!validateUsername(signUpForm.elements['username'].value)) {
        errorList.errorMessage += 'никнейм, ';
        errorList.errorNumbers.push('username');
    }

    if (errorList.errorMessage.length > 0) {
        errorList.errorMessage = errorList.errorMessage.slice(0, -2);
    }

    if (errorList.errorMessage.length > 0 && errorList.errorNumbers.length > 0) {
        return errorList;
    }

    return null;
}

/**
 * error Draw
 * @param {*} listWithFields
 * @param {*} validationErrorNumbers
 * @param {*} className
 */
export function errorDraw(listWithFields, validationErrorNumbers, className) {
    for (let i = 0; i < validationErrorNumbers.length; i++) {
        listWithFields[validationErrorNumbers[i]].classList.add(className);
    }
}

/**
 * Remove error style
 * @param {*} listWithFields
 * @param {*} className
 */
export function deleteErrorDraw(listWithFields, className) {
    for (const key in listWithFields) {
        if (listWithFields.hasOwnProperty(key)) {
            listWithFields[key].classList.remove(className);
        }
    }
}
