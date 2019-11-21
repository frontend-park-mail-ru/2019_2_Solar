import {validatePassword} from '../src/utils/validation.js';

test('correct passwords', () => {
    expect(validatePassword('qqqqqqqqQQQQQQQQ').result).toBe(true);
});

test('empty password', () => {
    expect(validatePassword('').result).toBe(false);
});

test('password with no capital letters', () => {
    expect(validatePassword('qqqqqqqqqq').result).toBe(false);
});

test('password without lowercase letters', () => {
    expect(validatePassword('QQQQQQQQQQQ').result).toBe(false);
});