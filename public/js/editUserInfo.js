document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userIdElement = document.getElementById("userId");
  const displayUsernameElement = document.getElementById("displayUsername");
  const userEmailElement = document.getElementById("userEmail");
  const skillpointsElement = document.getElementById("skillpoints");
  const editButton = document.getElementById("editButton");
  const userInfoDisplay = document.getElementById("userInfoDisplay");
  const userInfoForm = document.getElementById("userInfoForm");
  const usernameInput = document.getElementById("username");
  const saveButton = document.getElementById("saveButton");

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

  // Callback function to handle user info fetch response
  const callbackForFetchUserInfo = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      userIdElement.textContent = responseData.user_id || "N/A";
      displayUsernameElement.textContent = responseData.username || "N/A";
      userEmailElement.textContent = responseData.email || "N/A";
      skillpointsElement.textContent = responseData.skillpoints || "0";
    } else {
      showMessageCard("Failed to load user info.", "danger");
    }
  };

  // Fetch user information on page load
  fetchMethod(`${currentUrl}/api/users`, callbackForFetchUserInfo, "GET", null, token);

  // Event listener for the edit button
  editButton.addEventListener("click", function () {
    userInfoDisplay.classList.toggle("d-none");
    userInfoForm.classList.toggle("d-none");
    usernameInput.value = displayUsernameElement.textContent; // Prefill current username
  });

  // Event listener for the save button
  saveButton.addEventListener("click", function () {
    const newUsername = usernameInput.value.trim();
    const userId = userIdElement.textContent;

    if (!newUsername) {
      showMessageCard("Username cannot be empty.", "warning");
      return;
    }

    fetchMethod(
      `${currentUrl}/api/users/${userId}`,
      callbackForUpdateUsername,
      "PUT",
      { username: newUsername },
      token
    );
  });

  // Callback function to handle username update response
  const callbackForUpdateUsername = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      showMessageCard("Username updated successfully!", "success", true);
    } else if (responseStatus === 400 || responseStatus === 409) {
      const errorMessage = responseData?.message || "Unable to update username.";
      showMessageCard(errorMessage, "warning");
    } else {
      showMessageCard("An error occurred while updating username.", "danger");
    }
  };
});