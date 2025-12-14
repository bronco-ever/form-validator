'use strict';

const form = document.getElementById('form');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

const phoneInput = document.getElementById('phone');

const passwordInput = document.getElementById('password1');
const reqLength = document.getElementById('req-length');
const reqLower = document.getElementById('req-lower');
const reqUpper = document.getElementById('req-upper');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

const password2 = document.getElementById('password2');
const matchStatus = document.getElementById('match-status');

let isValid = false;

// Format phone number as (123) 456-7890
phoneInput.addEventListener('input', () => {
  let digits = phoneInput.value.replace(/\D/g, '');
  if(digits.length > 10) {
    digits = digits.substring(0, 10);
  }

  let formattedNumber = '';

  if(digits.length > 0) {
    formattedNumber += '(' + digits.substring(0, 3);
  }
  if(digits.length >= 4) {
    formattedNumber += ') ' + digits.substring(3, Math.min(6, digits.length));
  }
  if(digits.length >= 7) {
    formattedNumber += '-' + digits.substring(6, 10);
  }

  phoneInput.value = formattedNumber;
});


// Password 1 validation
passwordInput.addEventListener('input', () => {
  const value = passwordInput.value;

  // Tests
  const lengthValid = value.length >= 8 && value.length <=15;
  const lowerValid = /[a-z]/.test(value);
  const upperValid = /[A-Z]/.test(value);
  const numberValid = /[0-9]/.test(value);
  const specialValid = /[@$!%*?&]/.test(value);

  // Update UI
  updateRequirement(reqLength, lengthValid);
  updateRequirement(reqLower, lowerValid);
  updateRequirement(reqUpper, upperValid);
  updateRequirement(reqNumber, numberValid);
  updateRequirement(reqSpecial, specialValid);

  const allValid = lengthValid && lowerValid && upperValid && numberValid && specialValid;

  if(allValid) {
    passwordInput.classList.add('valid');
    passwordInput.classList.remove('invalid');
  } else {
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
  }
});

function updateRequirement(element, isValid) {
  if(isValid) {
    element.classList.remove('invalid');
    element.classList.add('valid');
    element.textContent = '✔ ' + element.textContent.slice(2);
  } else {
    element.classList.remove('valid');
    element.classList.add('invalid');
    element.textContent = '✖ ' + element.textContent.slice(2);
  }
}

// Password match validation
function checkPasswordMatch() {
  const pass1 = passwordInput.value;
  const pass2 = password2.value;

  if(pass2.length === 0) {
    matchStatus.classList.remove('valid');
    matchStatus.classList.add('invalid');
    matchStatus.textContent = '❌ Passwords must match';
    password2.classList.remove('valid');
    password2.classList.add('invalid');
    return;
  }

  if(pass1 === pass2) {
    matchStatus.classList.remove('invalid');
    matchStatus.classList.add('valid');
    matchStatus.textContent = '✔ Passwords match';
    password2.classList.remove('invalid');
    password2.classList.add('valid');
  } else {
    matchStatus.classList.remove('valid');
    matchStatus.classList.add('invalid');
    matchStatus.textContent = '❌ Passwords must match';
    password2.classList.remove('valid');
    password2.classList.add('invalid');
  }
}

passwordInput.addEventListener('input', checkPasswordMatch);
password2.addEventListener('input', checkPasswordMatch);

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value
  };
  console.log(user);
}

function validateForm() {
  isValid = form.checkValidity();
  
  if(!isValid) {
    message.textContent = 'Please fill out all of the fields.';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
  }

  if(isValid) {
    message.textContent = 'Success! Thank you for registering.';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
  }
}

// Form submit event
function processFormData(e) {
  e.preventDefault();
  validateForm();
  if(isValid) {
    storeFormData();
  }
}

form.addEventListener('submit', processFormData);