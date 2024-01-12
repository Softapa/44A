/** @format */

document.addEventListener("DOMContentLoaded", function () {

  const token = localStorage.getItem("loginid");
  console.log(token, "token");
  if (token) {
    const promptMessage = document.getElementById("prompt-message");
    promptMessage.textContent = 
      "Follow us on Twitter and provide your X handle from your profile after doing so."
    

    const buttonContainer = document.getElementById("AuthContainer");
    console.log(buttonContainer, "auth btns");
    buttonContainer.style.display = "none";

    const user = document.getElementById("user-modal");
    user.style.display = "block";

    user.addEventListener("click", () => {
      //   MODAL LOGICS ------------------
      //   opening modal
      const clainForm = document.getElementById("claim-modal");
      clainForm.style.display = "block";
      clainForm.style.zIndex = 999999999;

      const formContent = document.getElementById("loginform");
      const formContainer = document.getElementById("claim-container");
      // formContainer.style.height= "25vw"
      const closeClaim = document.getElementById("claim-modal-close");
      closeClaim.addEventListener("click", () => {
        clainForm.style.display = "none";
      });

      //  Removing existing content
      const content = document.getElementById("login-content");
      content.style.display = "none";
      if (!formContent.querySelector("h2")) {
        // Create an h1 element
        const newHeading = document.createElement("h2");
        newHeading.textContent = "Claim your reward"; // Change this to your desired heading text
        // Append the h1 element to the form content
        formContent.appendChild(newHeading);
      }

    
    });
  }else{
    const promptMessage = document.getElementById("prompt-message");
    promptMessage.textContent=
      "Login to claim your reward."
    
  }
  // Find the form element
  var signupForm = document.getElementById("signupForm");
  var loginform = document.getElementById("loginform");
  var forgetForm = document.getElementById("forgetForm");
  var resetForm = document.getElementById("resetForm");
  const login = document.getElementsByClassName("login")[0];
  const closesignup = document.getElementsByClassName("closesignup")[0];
  // Add event listener for form submission
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    var formData = new FormData(signupForm);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      jsonData[key] = value;
    });
    console.log("jsonData", jsonData);
    var apiUrl = "http://localhost:5000/api/v2/auth/signup";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        id = data?.data?._id;
        localStorage.setItem("id", JSON.stringify(id));
        if (data.status == "success") {
          console.log("--------", data.status, "------------");
          document
            .getElementsByClassName("login-modal")[0]
            .classList.add("active");

          document
            .getElementsByClassName("signup-modal")[0]
            .classList.remove("active");
          alert(data.message);
        } else {
          alert(data.error);
          console.log("signup popup");
          //  THIS WILL SHIFT IN SUCCESS
          document.getElementById("signup-modal").click();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document
          .getElementById("signup-modal")
          .addEventListener("click", function () {
            window.location.hash = "popup1";
          });
      });
  });

  loginform.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    var formData = new FormData(loginform);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      console.log(value, key, "value", "key");
      jsonData[key] = value;
    });
    console.log("jsonData", jsonData);
    var apiUrl = "http://localhost:5000/api/v2/auth/login";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        id = data?.data?._id;
        localStorage.setItem("loginid", JSON.stringify(id));
        console.log("--------", data.message, "------------");
        if (data.message == "login Successfully!") {
          window.location.href = '/';
          document
            .getElementsByClassName("login-modal")[0]
            .classList.remove("active");
          const buttonContainer = document.getElementById("AuthContainer");
          console.log(buttonContainer, "auth btns");
          buttonContainer.style.display = "none";

          //  displaying user profile icon-------------------------
          const user = document.getElementById("user-modal");
          user.style.display = "block";

          user.addEventListener("click", () => {
            //   MODAL LOGICS ------------------
            //   opening modal
            const clainForm = document.getElementById("claim-modal");
            clainForm.style.display = "block";
            clainForm.style.zIndex = 999999999;

            const formContent = document.getElementById("loginform");
            const formContainer = document.getElementById("claim-container");
            // formContainer.style.height= "25vw"
            const closeClaim = document.getElementById("claim-modal-close");
            closeClaim.addEventListener("click", () => {
              clainForm.style.display = "none";
            });

            //  Removing existing content
            const content = document.getElementById("login-content");
            content.style.display = "none";
            if (!formContent.querySelector("h2")) {
              // Create an h1 element
              const newHeading = document.createElement("h2");
              newHeading.textContent = "Claim your reward"; // Change this to your desired heading text
              // Append the h1 element to the form content
              formContent.appendChild(newHeading);
            }

            //  ---------------------------
          });
        } else {
          const message = data.message;
          console.log(message, "error message ");
          document
            .getElementsByClassName("login-modal")[0]
            .classList.remove("active");
          alert(message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  let key;
  forgetForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    var formData = new FormData(forgetForm);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      jsonData[key] = value;
    });
    console.log("jsonData", jsonData);
    // Replace 'YOUR_API_ENDPOINT' with the actual URL where you want to post the data

    // return;
    var apiUrl = `http://localhost:5000/api/v2/auth/forget_password/${jsonData.secertKey}`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response data here
        console.log(data);

        key = data.data.key;
        id = data.data._id;
        localStorage.setItem("loginid", JSON.stringify(id));
        console.log("--------", data.status, "------------");
        if (data.status == "Correct secertkey") {
          document
            .getElementsByClassName("forgot-modal")[0]
            .classList.remove("active");
          document
            .getElementsByClassName("reset-modal")[0]
            .classList.add("active");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  resetForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    var formData = new FormData(resetForm);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      jsonData[key] = value;
    });
    console.log("jsonData", jsonData);
    var apiUrl = `http://localhost:5000/api/v2/auth/Reset_password/${key}`;

    fetch(apiUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("--------", data.status, "------------");
        if (data.status == "successfuly Updated") {
          document
            .getElementsByClassName("reset-modal")[0]
            .classList.remove("active");
        } else if (data.status == "Reset-Password failed") {
          alert(data.messageStrong);
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("Error:", error);
      });
  });
});
