document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const activityHistoryTable = document.getElementById("activityHistoryTable");

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

  // Callback for user activity history
  const callbackForUserActivityHistory = (responseStatus, responseData) => {
    if (responseStatus === 200 && responseData.length > 0) {
      activityHistoryTable.innerHTML = "";
      responseData.forEach((activity) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${activity.activity_date || "N/A"}</td>
          <td>${activity.activity_type || "N/A"}</td>
          <td>${activity.activity_detail || "N/A"}</td>
          <td>${activity.activity_status || "-"}</td>
        `;
        activityHistoryTable.appendChild(row);
      });
    } else if (responseStatus === 404) {
      activityHistoryTable.innerHTML = `
        <tr>
          <td colspan="4" class="no-activity-message">
            <i class="bi bi-exclamation-triangle-fill"></i> No activity history found.
          </td>
        </tr>
      `;
    } else {
      showMessageCard("Failed to load activity history. Please try again later.", "danger");
    }
  };

  // Fetch user activity history
  fetchMethod(
    `${currentUrl}/api/users/userActivityHistory`,
    callbackForUserActivityHistory,
    "GET",
    null,
    token
  );
});