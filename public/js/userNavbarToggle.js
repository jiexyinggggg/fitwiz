document.addEventListener("DOMContentLoaded", function () {
  // Get the buttons from the HTML
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const vaultButton = document.getElementById("vaultButton");
  const profileButton = document.getElementById("profileButton");
  const logoutButton = document.getElementById("logoutButton");

  // Check if token exists in local storage
  const token = localStorage.getItem("token");
  if (token) {
    // Token exists, show profile button and hide login and register buttons
    loginButton.classList.add("d-none");
    registerButton.classList.add("d-none");
    vaultButton.classList.remove("d-none");
    profileButton.classList.remove("d-none");
    logoutButton.classList.remove("d-none");
  } else {
    // Token does not exist, show login and register buttons and hide profile and logout buttons
    loginButton.classList.remove("d-none");
    registerButton.classList.remove("d-none");
    vaultButton.classList.add("d-none");
    profileButton.classList.add("d-none");
    logoutButton.classList.add("d-none");
  }

  logoutButton.addEventListener("click", function () {
    // Remove the token from local storage and redirect to index.html
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "profile.html";
  });
});