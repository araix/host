// src/scripts/lookup.js

function isValidISBN10(isbn) {
    const cleanISBN = isbn.replace(/[^0-9X]/g, '').toUpperCase();
    if (cleanISBN.length !== 10) return false;
  
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = parseInt(cleanISBN[i]);
      if (isNaN(digit)) return false;
      sum += digit * (10 - i);
    }
  
    let lastDigit;
    if (cleanISBN[9] === 'X') {
      lastDigit = 10;
    } else {
      lastDigit = parseInt(cleanISBN[9]);
      if (isNaN(lastDigit)) return false;
    }
  
    sum += lastDigit;
    return sum % 11 === 0;
  }
  
  function isValidISBN13(isbn) {
    const cleanISBN = isbn.replace(/[^0-9]/g, '');
    if (cleanISBN.length !== 13) return false;
  
    let sum = 0;
    for (let i = 0; i < 13; i++) {
      const digit = parseInt(cleanISBN[i]);
      if (isNaN(digit)) return false;
      sum += digit * (i % 2 === 0 ? 1 : 3);
    }
  
    return sum % 10 === 0;
  }
  
  function validateISBN(isbn) {
    return isValidISBN10(isbn) || isValidISBN13(isbn);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('isbn-lookup-form');
    const input = document.getElementById('isbn-input');
    const result = document.getElementById('validation-result');
  
    if (!form || !input || !result) {
      console.error('Form elements not found');
      return;
    }
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const isbn = input.value.trim();
      if (!isbn) {
        result.textContent = 'Please enter an ISBN.';
        result.classList.remove('hidden');
        return;
      }
  
      if (validateISBN(isbn)) {
        window.location.href = `https://isbnlookup.org/book/${isbn}`;
      } else {
        result.textContent = 'Invalid ISBN. Please enter a valid ISBN-10 or ISBN-13.';
        result.classList.remove('hidden');
      }
    });
  
    input.addEventListener('input', () => {
      result.classList.add('hidden');
    });
  });