const form  = document.getElementsByTagName('form')[0];

const email = document.getElementById('email');
const emailError = document.querySelector('#email + span.section-about__error');
const emailTwo = document.getElementById('emailtwo');
const emailTwoError = document.querySelector('#emailtwo + span.section-contact__error');
const nameForm = document.getElementById('nameto');
const nameError = document.querySelector('#nameto + span.section-contact__error');

email.addEventListener('input', function (event) {
  if (email.validity.valid) {
    emailError.textContent = '';
    emailError.className = 'section-about__error';
  } else {
    showError();
  }
});

emailTwo.addEventListener('input', function (event) {
  if (emailTwo.validity.valid) {
    emailTwoError.textContent = '';
    emailTwoError.className = 'section-contact__error';
  } else {
    showError();
  }
});

form.addEventListener('submit', function (event) {
  if(!email.validity.valid || !emailTwo.validity.valid) {
    showError();
    event.preventDefault();
  }
});

function showError() {
  if(email.validity.valueMissing) {
    emailError.textContent = 'Введите электронный адрес';
  } else if(email.validity.typeMismatch || email.validity.tooShort) {
    emailError.textContent = 'Недопустимый формат';
  }
  emailError.className = 'section-about__error';
  if(emailTwo.validity.valueMissing) {
    emailTwoError.textContent = 'Введите электронный адрес';
  } else if(emailTwo.validity.typeMismatch || emailTwo.validity.tooShort) {
    emailTwoError.textContent = 'Недопустимый формат';
  }
  emailTwoError.className = 'section-contact__error';
}

nameForm.addEventListener('input', function (event) {
  if (nameForm.validity.valid) {
    nameError.textContent = '';
    nameError.className = 'section-contact__error';
  } else {
    validateForm();
  }
});

form.addEventListener('submit', function (event) {
  if(!nameForm.validity.valid) {
    validateForm();
    event.preventDefault();
  }
});

function validateForm() {
  if (nameForm == "") {
    nameError.textContent = "Пожалуйста, введите ваше имя";
  } else {
    var regex = /^[a-zA-Z\s]+$/;
    if (regex.test(nameForm) === false || nameForm.validity.rangeOverflow || nameForm.validity.rangeUnderflow) {
      nameError.textContent = 'Недопустимый формат';
    }
  }
  nameError.className = 'section-contact__error';
}
