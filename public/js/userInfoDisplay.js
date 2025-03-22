document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userIdElement = document.getElementById("userId");
  const usernameElement = document.getElementById("displayUsername");
  const emailElement = document.getElementById("userEmail");
  const skillpointsElement = document.getElementById("skillpoints");
  
  const showMessageCard = (message, type, reload = false) => {
    const messageCard = document.createElement("div");
    messageCard.className = `alert alert-${type} message-card`;
    messageCard.textContent = message;
    document.body.appendChild(messageCard);
    setTimeout(() => {
      messageCard.classList.add("fade-out");
      setTimeout(() => {
        document.body.removeChild(messageCard);
        if (reload) {
          location.reload();
        }
      }, 1000);
    }, 3000);
  };

  // Callback for user profile information
  const callbackForUserInfo = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      userIdElement.textContent = responseData.user_id || "N/A";
      usernameElement.textContent = responseData.username || "N/A";
      emailElement.textContent = responseData.email || "N/A";
      skillpointsElement.textContent = responseData.skillpoints || "0";
    } else if (responseStatus === 404) {
      showMessageCard("User not found. Please log in again.", "warning");
    } else {
      showMessageCard("Failed to load user info. Please try again later.", "danger");
    }
  };

  // Fetch user profile info
  fetchMethod(`${currentUrl}/api/users`, callbackForUserInfo, "GET", null, token);
});