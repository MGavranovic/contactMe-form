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
    Host: 'smtp.elasticemail.com',
    Username: 'mgavranovic4@gmail.com',
    Password: '499E64BA3E52F4B41BF52DE597573F1A8471',
    To: 'mgavranovic4@gmail.com',
    From: 'mgavranovic4@gmail.com',
    Subject: subject.value,
    Body: msgBody,
  }).then((message) => {
    if (message == 'OK') {
      Swal.fire({
        title: 'Success!',
        text: 'Message sent successfully!!',
        icon: 'success',
      });
    }
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  sendEmail();
});

if (module.hot) {
  module.hot.accept();
}
