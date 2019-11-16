const emailRegex = '^.+@.+\..+$';
const usernameRegex = '^[a-zA-Z0-9_]{3,30}$';
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
    if (value.length < 8 || value.length > 30) {
        return {result: false, message: 'Длина пароля - от 8 до 30 символов'};
    }
    if (!(new RegExp('[A-Z]+')).test(value)) {
        return {result: false, message: 'Пароль должен содержать хотя бы одну заглавную буквy'};
    }
    if (!(new RegExp('[a-z]+')).test(value)) {
        return {result: false, message: 'Пароль должен содержать хотя бы одну незаглавную букву'};
    }
    return {result: true};
}

/**
 * Validate username.
 * @param {string} value
 * @return {boolean} Valid or not.
 */
export function validateUsername(value) {
    return (new RegExp(usernameRegex)).test(value);
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
    if (!validateEmail(signUpForm.elements['email'].value)) {
        errorList.errorMessage += 'емейл, ';
        errorList.errorNumbers.push('email');
        return {result: false, message: 'email'};
    }

    if (!validatePassword(signUpForm.elements['password'].value).result) {
        return {result: false, message: validatePassword(signUpForm.elements['password'].value).message};
    }

    if (!validateUsername(signUpForm.elements['username'].value)) {
        errorList.errorMessage += 'никнейм, ';
        errorList.errorNumbers.push('username');
        return {result: false, message: 'nickname'};
    }

    return {result: true};
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
