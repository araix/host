//converter.js

export function convertISBN13toISBN10(isbn13) {
  const isbn13Str = String(isbn13).replace(/[- ]/g, '');

  if (!/^(978)\d{10}$/.test(isbn13Str)) {
    throw new Error('Invalid ISBN-13 format or not starting with 978.');
  }

  let isbn10 = isbn13Str.substring(3, 12);
  let checkSum = 0;
  for (let i = 0; i < 9; i++) {
    checkSum += parseInt(isbn10[i]) * (10 - i);
  }
  let checkDigit = 11 - (checkSum % 11);
  if (checkDigit === 10) {
    checkDigit = 'X';
  } else if (checkDigit === 11) {
    checkDigit = '0';
  }

  isbn10 += checkDigit;
  return isbn10;
}

export function convertISBN10toISBN13(isbn10) {
  const isbn10Str = String(isbn10).replace(/[- ]/g, '').toUpperCase();

  if (!/^\d{9}[\dX]$/.test(isbn10Str)) {
    throw new Error('Invalid ISBN-10 format.');
  }

  let isbn13 = '978' + isbn10Str.substring(0, 9);
  let checkSum = 0;
  for (let i = 0; i < 12; i++) {
    checkSum += parseInt(isbn13[i]) * (i % 2 === 0 ? 1 : 3);
  }
  let checkDigit = (10 - (checkSum % 10)) % 10;
  isbn13 += checkDigit;
  return isbn13;
}
