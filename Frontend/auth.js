/** @format */

// Replace BackendUrl with the actual URL where you want to post the data

const BackendUrl = "http://localhost:5000/api/v2/auth";

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("loginid");

  if (token) {
    const promptMessage = document.getElementById("prompt-message");
    promptMessage.textContent =
      "Follow us on Twitter and provide your X handle from your profile after doing so.";

    const buttonContainer = document.getElementById("AuthContainer");

    buttonContainer.style.display = "none";

    const user = document.getElementById("user-modal");
    const logoutBtn = document.getElementById("logout-user")
    
    user.style.display = "block";
    const  userAddress = document.getElementById("user-address")
    const content = localStorage.getItem("address")
    userAddress.textContent= content

    userAddress.textContent =
    userAddress.textContent.substring(0, 10) + "...";
    if(userAddress.textContent.length>10){
      user.style.display = "none";
      userAddress.style.display= "block"
      logoutBtn.style.display= "block"

      logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loginid");
        localStorage.removeItem("address")
        const user = document.getElementById("user-modal");
        user.style.display = "none";
        const buttonContainer = document.getElementById("AuthContainer");
        buttonContainer.style.display = "block";
        window.location.href = "/";
      });

      
    
    }

    user.addEventListener("click", () => {
      const clainForm = document.getElementById("claim-modal");
      clainForm.style.display = "block";
      clainForm.style.zIndex = 999999999;

      const formContent = document.getElementById("loginform");

      const closeClaim = document.getElementById("claim-modal-close");
      closeClaim.addEventListener("click", () => {
        clainForm.style.display = "none";
      });

      const content = document.getElementById("login-content");
      content.style.display = "none";
      if (!formContent.querySelector("h2")) {
        const newHeading = document.createElement("h2");
        newHeading.textContent = "Claim your reward";

        formContent.appendChild(newHeading);
      }
    });
  } else {
    const promptMessage = document.getElementById("prompt-message");
    promptMessage.textContent = "Login to claim your reward.";
  }

  var signupForm = document.getElementById("signupForm");
  var loginform = document.getElementById("loginform");
  var forgetForm = document.getElementById("forgetForm");
  var resetForm = document.getElementById("resetForm");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(signupForm);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      jsonData[key] = value;
    });


    fetch(`${BackendUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        id = data?.data?._id;
        localStorage.setItem("id", JSON.stringify(id));
        if (data.status == "success") {
          document
            .getElementsByClassName("login-modal")[0]
            .classList.add("active");

          document
            .getElementsByClassName("signup-modal")[0]
            .classList.remove("active");
          alert(data.message);
        } else {
          alert(data.error);
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

    var formData = new FormData(loginform);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      jsonData[key] = value;
    });

    fetch(`${BackendUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        id = data?.data?._id;
        localStorage.setItem("loginid", JSON.stringify(id));
        if (data.message == "login Successfully!") {
          window.location.href = "/";
          document
            .getElementsByClassName("login-modal")[0]
            .classList.remove("active");
          const buttonContainer = document.getElementById("AuthContainer");

          buttonContainer.style.display = "none";

          const user = document.getElementById("user-modal");
          user.style.display = "block";

          user.addEventListener("click", () => {
            const clainForm = document.getElementById("claim-modal");
            clainForm.style.display = "block";
            clainForm.style.zIndex = 999999999;

            const formContent = document.getElementById("loginform");

            const closeClaim = document.getElementById("claim-modal-close");
            closeClaim.addEventListener("click", () => {
              clainForm.style.display = "none";
            });

            const content = document.getElementById("login-content");
            content.style.display = "none";
            if (!formContent.querySelector("h2")) {
              const newHeading = document.createElement("h2");
              newHeading.textContent = "Claim your reward";

              formContent.appendChild(newHeading);
            }
          });
        } else {
          const message = data.message;
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
    event.preventDefault();

    var formData = new FormData(forgetForm);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      jsonData[key] = value;
    });

    fetch(`${BackendUrl}/forget_password/${jsonData.secertKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        key = data.data.key;
        id = data.data._id;
        localStorage.setItem("loginid", JSON.stringify(id));

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
    event.preventDefault();

    var formData = new FormData(resetForm);

    var jsonData = {};
    let id;
    formData.forEach(function (value, key) {
      jsonData[key] = value;
    });

    fetch(`${BackendUrl}/Reset_password/${key}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
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
