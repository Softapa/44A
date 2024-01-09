/** @format */

document.addEventListener('DOMContentLoaded', function () {
  // Find the form element
  var signupForm = document.getElementById('signupForm');
  var loginform = document.getElementById('loginform');
  var forgetForm = document.getElementById('forgetForm');
  var resetForm = document.getElementById('resetForm');
  const login = document.getElementsByClassName('login')[0];
  const closesignup = document.getElementsByClassName('closesignup')[0];
  // Add event listener for form submission
  signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    var formData = new FormData(signupForm);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      jsonData[key] = value;
    });
    console.log('jsonData', jsonData);
    var apiUrl = 'http://localhost:5000/api/v2/auth/signup';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        id = data.data._id;
        localStorage.setItem('id', JSON.stringify(id));
        if (data.status == 'success') {
          console.log('--------', data.status, '------------');
          document
            .getElementsByClassName('login-modal')[0]
            .classList.add('active');

          document
            .getElementsByClassName('signup-modal')[0]
            .classList.remove('active');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  loginform.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    var formData = new FormData(loginform);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      console.log(value, key, 'value', 'key');
      jsonData[key] = value;
    });
    console.log('jsonData', jsonData);
    var apiUrl = 'http://localhost:5000/api/v2/auth/login';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        id = data.data._id;
        localStorage.setItem('loginid', JSON.stringify(id));
        console.log('--------', data.message, '------------');
        if (data.message == 'login Successfully!') {
          document
            .getElementsByClassName('login-modal')[0]
            .classList.remove('active');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  let key;
  forgetForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    var formData = new FormData(forgetForm);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      jsonData[key] = value;
    });
    console.log('jsonData', jsonData);
    // Replace 'YOUR_API_ENDPOINT' with the actual URL where you want to post the data

    // return;
    var apiUrl = `http://localhost:5000/api/v2/auth/forget_password/${jsonData.secertKey}`;

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data here
        console.log(data);

        key = data.data.key;
        id = data.data._id;
        localStorage.setItem('loginid', JSON.stringify(id));
        console.log('--------', data.status, '------------');
        if (data.status == 'Correct secertkey') {
          document
            .getElementsByClassName('forgot-modal')[0]
            .classList.remove('active');
          document
            .getElementsByClassName('reset-modal')[0]
            .classList.add('active');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

  resetForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    var formData = new FormData(resetForm);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      jsonData[key] = value;
    });
    console.log('jsonData', jsonData);
    var apiUrl = `http://localhost:5000/api/v2/auth/Reset_password/${key}`;

    fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('--------', data.status, '------------');
        if (data.status == 'successfuly Updated') {
          document
            .getElementsByClassName('reset-modal')[0]
            .classList.remove('active');
        } else if (data.status == 'Reset-Password failed') {
          alert(data.messageStrong);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error('Error:', error);
      });
  });
});
