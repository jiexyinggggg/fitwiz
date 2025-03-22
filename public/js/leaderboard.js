document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const userLeaderboardTable = document.querySelector("#user-leaderboard tbody");
  const houseLeaderboardTable = document.querySelector("#house-leaderboard tbody");
  const houseFilter = document.getElementById("houseFilter");

  // Show message card function
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

  // Populate user leaderboard
  const populateUserLeaderboard = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      userLeaderboardTable.innerHTML = ""; // Clear existing rows

      responseData.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${user.username}</td>
          <td>${user.challenges_completed}</td>
          <td>${user.duels_won}</td>
          <td>${user.skillpoints}</td>
        `;
        userLeaderboardTable.appendChild(row);
      });
    } else if (responseStatus === 404) {
      userLeaderboardTable.innerHTML = `<tr><td colspan="6">No users found for the selected house.</td></tr>`;
    } else {
      showMessageCard("Failed to load user leaderboard. Please try again later.", "danger");
    }
  };

  // Populate house leaderboard
  const populateHouseLeaderboard = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      houseLeaderboardTable.innerHTML = ""; // Clear existing rows

      responseData.leaderboard.forEach((house, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${house.house_name}</td>
          <td>${house.total_skillpoints}</td>
        `;
        houseLeaderboardTable.appendChild(row);
      });
    } else if (responseStatus === 404) {
      houseLeaderboardTable.innerHTML = `<tr><td colspan="3">No houses found.</td></tr>`;
    } else {
      showMessageCard("Failed to load house leaderboard. Please try again later.", "danger");
    }
  };

  // Fetch user leaderboard
  const fetchUserLeaderboard = (houseId = "all") => {
    const url = houseId === "all"
      ? `${currentUrl}/api/leaderboard/users`
      : `${currentUrl}/api/leaderboard/users?house_id=${houseId}`;

    fetchMethod(url, populateUserLeaderboard, "GET", null, token);
  };

  // Fetch house leaderboard
  const fetchHouseLeaderboard = () => {
    fetchMethod(`${currentUrl}/api/leaderboard/houses`, populateHouseLeaderboard, "GET", null, token);
  };

  // Event listener for house filter
  houseFilter.addEventListener("change", function () {
    const selectedHouse = this.value;
    fetchUserLeaderboard(selectedHouse);
  });

  // Initial fetch on page load
  fetchUserLeaderboard();
  fetchHouseLeaderboard();
});