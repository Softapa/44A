/** @format */

const login = document.getElementsByClassName('login')[0];

login.onclick = function () {
  id = this.getAttribute('id');
  document.getElementsByClassName(id)[0].classList.add('active');
};

const closelogin = document.getElementsByClassName('closelogin')[0];

closelogin.onclick = function () {
  document.getElementsByClassName('login-modal')[0].classList.remove('active');
};

const signup = document.getElementsByClassName('signup')[0];

signup.onclick = function () {
  id = this.getAttribute('id');
  document.getElementsByClassName(id)[0].classList.add('active');
};

const closesignup = document.getElementsByClassName('closesignup')[0];

closesignup.onclick = function () {
  document.getElementsByClassName('signup-modal')[0].classList.remove('active');
};

const forgot = document.getElementsByClassName('forgot')[0];

forgot.onclick = function () {
  id = this.getAttribute('id');
  document.getElementsByClassName('login-modal')[0].classList.remove('active');
  document.getElementsByClassName(id)[0].classList.add('active');
};

const closeforgot = document.getElementsByClassName('closeforgot')[0];

closeforgot.onclick = function () {
  document.getElementsByClassName('forgot-modal')[0].classList.remove('active');
};

// const forgotButton = document.getElementsByClassName('forgotButton')[0];

// forgotButton.onclick = function () {
//   id = this.getAttribute('id');
//   document.getElementsByClassName('forgot-modal')[0].classList.remove('active');
//   document.getElementsByClassName(id)[0].classList.add('active');
// };

const closereset = document.getElementsByClassName('closereset')[0];

closereset.onclick = function () {
  document.getElementsByClassName('reset-modal')[0].classList.remove('active');
};
