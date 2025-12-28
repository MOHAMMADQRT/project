document.getElementById('registration-form').addEventListener('submit', handleSubmit);

const usernameInput = document.getElementById('username');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// اضافه کردن event listener برای هر input
usernameInput.addEventListener('input', () => validateUsername(usernameInput));
fullNameInput.addEventListener('input', () => validateFullName(fullNameInput));
emailInput.addEventListener('input', () => validateEmail(emailInput));
passwordInput.addEventListener('input', () => validatePassword(passwordInput));

// Validation functions
function validateUsername(input) {
  const username = input.value.trim();
  const error = document.getElementById('username-error');

  if (!/^[a-zA-Z0-9]{3,15}$/.test(username)) {
    showError(input, error, 'Username must be between 3 and 15 characters, alphanumeric only.');
  } else {
    showSuccess(input, error);
  }
}

function validateFullName(input) {
  const fullName = input.value.trim();
  const error = document.getElementById('fullName-error');

  if (!/^[a-zA-Z\s]+$/.test(fullName) || fullName.split(' ').length < 2) {
    showError(input, error, 'Full name must contain only letters and spaces');
  } else {
    showSuccess(input, error);
  }
}

function validateEmail(input) {
  const email = input.value.trim();
  const error = document.getElementById('email-error');
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailPattern.test(email)) {
    showError(input, error, 'Please enter a valid email address');
  } else {
    showSuccess(input, error);
  }
}

function validatePassword(input) {
  const password = input.value;
  const error = document.getElementById('password-error');
  const passwordStrength = document.getElementById('password-strength');

  const rules = {
    minLength: password.length >= 8,
    containsNumberOrSymbol: /\d/.test(password) || /[!@#$%^&*(),.?":{}|<>]/.test(password),
    containsName: !password.includes(document.getElementById('fullName').value),
    containsEmail: !password.includes(document.getElementById('email').value),
  };

  document.getElementById('name-email').style.color = rules.containsName && rules.containsEmail ? 'green' : 'red';
  document.getElementById('characters').style.color = rules.minLength ? 'green' : 'red';
  document.getElementById('symbol').style.color = rules.containsNumberOrSymbol ? 'green' : 'red';

  if (rules.minLength && rules.containsName && rules.containsEmail && rules.containsNumberOrSymbol) {
    input.classList.add('valid');
    input.classList.remove('invalid');
    passwordStrength.textContent = '✔ Password Strength: Strong';
    passwordStrength.style.color = 'green';
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
    passwordStrength.textContent = '✔ Password Strength: Weak';
    passwordStrength.style.color = 'red';
  }

  enableSubmitButton();
}

function showError(input, errorEl, message) {
  input.classList.add('invalid');
  input.classList.remove('valid');
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

function showSuccess(input, errorEl) {
  input.classList.add('valid');
  input.classList.remove('invalid');
  errorEl.style.display = 'none';
}

function enableSubmitButton() {
  const submitBtn = document.getElementById('submit-btn');
  const isFormValid = document.querySelectorAll('.valid').length === 4;
  submitBtn.disabled = !isFormValid;
}

function handleSubmit(event) {
  event.preventDefault();

  // 'گرفتن اصلاعات از فایل اصلییی'
  const username = document.getElementById('username').value;
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // چاپ تو کنسول
  console.log('Username:', username);
  console.log('Full Name:', fullName);
  console.log('Email:', email);
  console.log('Password:', password);


  document.getElementById('success-message').style.display = 'block';


  document.getElementById('registration-form').reset();

  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.classList.remove('valid', 'invalid');
  });

  setTimeout(() => {
    document.getElementById('success-message')}); // Hide success message after 3 seconds

  document.getElementById('submit-btn').disabled = true;

  // Reset other buttons to default state
  const signUpBtn = document.querySelector('.signup-btn');
  const signInBtn = document.querySelector('.signin-btn');

  signUpBtn.classList.remove('active-btn');
  signInBtn.classList.remove('active-btn');
  signUpBtn.style.backgroundColor = '';
  signInBtn.style.backgroundColor = '';
}
