import Swal from 'sweetalert2';
window.Swal = Swal;

const form = document.querySelector('form');
const btnSendMsg = document.querySelector('.btn-send-msg');
const fullName = document.getElementById('name');
const emailAddress = document.getElementById('email');
const phoneNumber = document.getElementById('phone');
const subject = document.getElementById('subject');
const msg = document.getElementById('message');

const sendEmail = function () {
  const msgBody = `Name: ${fullName.value}<br>
  Email Address: ${emailAddress.value}<br>
  Phone Number: ${phoneNumber.value}<br>
  Message: ${msg.value}`;

  Email.send({
    SecureToken: 'e246cbc6-27ad-4315-8d72-d14731e21db5',
    To: 'mgavranovic4@gmail.com',
    From: 'mgavranovic4@gmail.com',
    Subject: subject.value,
    Body: msgBody,
  }).then((message) => {
    if (message === 'OK') {
      Swal.fire({
        title: 'Success!',
        text: 'Message sent successfully!!',
        icon: 'success',
      });
    }
  });
};

// Check Input looks a bit scuffed atm and willl have to go over this part of code
// I will prob have to split this checkInput in 5 dif func to be
// able to check for every field separately as it checks everything at
// the same time in this state
const checkInput = function () {
  const data = document.querySelectorAll('.data');

  for (const item of data) {
    if (item.value === '') {
      item.classList.add('error');
      item.parentElement.classList.add('error');
    }

    if (data[1].value !== '') {
      checkEmail();
    }

    data[1].addEventListener('keyup', function () {
      checkEmail();
    });

    item.addEventListener('keyup', function () {
      if (item.value !== '') {
        item.classList.remove('error');
        item.parentElement.classList.remove('error');
      } else {
        item.classList.add('error');
        item.parentElement.classList.add('error');
      }
    });
  }
};

const checkEmail = function () {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorEmail = document.querySelector('.error-txt.email');

  if (!emailAddress.value.match(emailRegex)) {
    emailAddress.classList.add('error');
    emailAddress.parentElement.classList.add('error');

    if (emailAddress.value !== '') {
      errorEmail.innerHTML = 'Enter a valid email!';
    } else {
      errorEmail.innerHTML = `Email Address field can't be empty!`;
    }
  } else {
    emailAddress.classList.remove('error');
    emailAddress.parentElement.classList.remove('error');
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInput();

  if (
    !fullName.classList.contains('error') &&
    !phoneNumber.classList.contains('error') &&
    !subject.classList.contains('error') &&
    !emailAddress.classList.contains('error') &&
    !msg.classList.contains('error')
  ) {
    sendEmail();

    form.reset();
    return false;
  }
});

form.addEventListener('keyup', function (e) {
  e.preventDefault();
  checkInput();
});

if (module.hot) {
  module.hot.accept();
}
