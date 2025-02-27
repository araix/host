// src/scripts/barcode.js

function BarcodeGenerator() {
  // DOM elements
  this.isbnInput = document.getElementById('isbn');
  this.generateButton = document.getElementById('generate-barcode');
  this.errorMessage = document.getElementById('error-message');

  // Initialize
  this.init();
}

BarcodeGenerator.prototype.init = function () {
  this.generateButton.addEventListener('click', () => this.redirectToBarcode());
};

// ISBN-13 validation logic
BarcodeGenerator.prototype.validateISBN = function (isbn) {
  // Remove any hyphens or spaces from the ISBN
  const cleanISBN = isbn.replace(/[-\s]/g, '');

  // Check if it's a valid ISBN-13 length
  if (cleanISBN.length !== 13) {
    return false;
  }

  // Check if it contains only numbers
  if (!/^\d+$/.test(cleanISBN)) {
    return false;
  }

  // Validate ISBN-13 check digit
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleanISBN[i]) * (i % 2 === 0 ? 1 : 3);
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(cleanISBN[12]);
};

BarcodeGenerator.prototype.redirectToBarcode = function () {
  const isbn = this.isbnInput.value.trim().replace(/[-\s]/g, '');

  // Reset UI
  this.errorMessage.classList.add('hidden');

  // Validate ISBN
  if (!this.validateISBN(isbn)) {
    this.errorMessage.classList.remove('hidden');
    return;
  }

  // Redirect to external barcode generator
  window.location.href = `https://isbnbarcode.org/?generate=${isbn}`;
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BarcodeGenerator();
});