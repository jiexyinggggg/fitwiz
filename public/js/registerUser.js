document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password === confirmPassword) {
      console.log("Signup successful");
      console.log("Username:", username);
      console.log("Email:", email);
      console.log("Password:", password);
      warningCard.classList.add("d-none");

      const data = {
        username: username,
        email: email,
        password: password,
      };

      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData", responseData);
        if (responseStatus == 200) {
          if (responseData.token) {
            localStorage.setItem("token", responseData.token);
            window.location.href = "profile.html";
          }
        } else {
          warningCard.classList.remove("d-none");
          warningText.innerText = responseData.message;
        }
      };

      fetchMethod(currentUrl + "/api/register", callback, "POST", data);
      signupForm.reset();
    } else {
      warningCard.classList.remove("d-none");
      warningText.innerText = "Passwords do not match";
    }
  });
});  