const emailRegex = '^(?=.{1,50})';
const passwordRegex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})';
const usernameRegex = '^(?=.{1,30})';
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
    return (new RegExp(passwordRegex)).test(value);
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
    return (validateEmail(signUpForm.elements['email'].value) &&
            validatePassword(signUpForm.elements['password'].value) &&
            validateUsername(signUpForm.elements['username'].value));
}
