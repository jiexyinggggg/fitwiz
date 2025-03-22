document.addEventListener("DOMContentLoaded", function () {
const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);
  if (responseStatus == 200) {
    // Check if login was successful
    if (responseData.token) {
      // Store the token in local storage
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", responseData.userId);
      localStorage.setItem("playerId", responseData.playerId);
      // Redirect or perform further actions for logged-in user
      window.location.href = "profile.html";
    }
  } else {
    warningCard.classList.remove("d-none");
    warningText.innerText = responseData.message;
  }
};

  // Get the form element by ID
  const loginForm = document.getElementById("loginForm");
  
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");

  // Event listener for form submission for login
  loginForm.addEventListener("submit", function (event) {
    console.log("loginForm.addEventListener");
    event.preventDefault();

    // Get the values of username and password from the form using the element id
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Data to be sent to the server
    const data = {
      username: username,
      password: password,
    };

    // Perform login request
    fetchMethod(currentUrl + "/api/login", callback, "POST", data);

    // Reset the form fields
    loginForm.reset();
  });
});