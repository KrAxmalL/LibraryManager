export const startsWithDigitRegexp = /^\d/;

export const isbnRegexp = /^\d{3}-\d-\d{5}-\d{3}-\d$/;

export const priceRegexp = /^\d+[.,]\d{2}$/;

export const phoneNumberRegexp = /^(\+38)\d{10}$/;

export const notEmptyString = (str) => str && str.trim().length > 0;

export const positiveNumber = (number) => number && number > 0;