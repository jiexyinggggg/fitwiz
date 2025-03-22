document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const challengeListContainer = document.getElementById("challengeList");
  const createChallengeForm = document.getElementById("createChallengeForm");
  const editChallengeModal = new bootstrap.Modal(document.getElementById("editChallengeModal"));
  const editChallengeForm = document.getElementById("editChallengeForm");
  const completeChallengeModal = new bootstrap.Modal(document.getElementById("completeChallengeModal"));
  const completeChallengeForm = document.getElementById("completeChallengeForm");

  const showMessageCard = (message, type, reload = false) => {
    const messageCard = document.createElement("div");
    messageCard.className = `alert alert-${type} message-card`;
    messageCard.textContent = message;
    document.body.appendChild(messageCard);
    setTimeout(() => {
      messageCard.classList.add("fade-out");
      setTimeout(() => {
        document.body.removeChild(messageCard);
        if (reload) location.reload();
      }, 1000);
    }, 3000);
  };

  const populateChallengeList = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      challengeListContainer.innerHTML = "";

      responseData.forEach((challenge) => {
        // Only include the challenge actions if the user is logged in.
        let challengeActions = "";
        if (token) {
          challengeActions = `
            <button class="btn btn-primary complete-btn" data-challenge-id="${challenge.challenge_id}">
              Complete Challenge
            </button>
            <div class="mt-2">
              <button class="btn btn-edit" data-bs-toggle="modal" data-bs-target="#editChallengeModal"
                data-challenge-id="${challenge.challenge_id}" data-challenge-name="${challenge.challenge}"
                data-skillpoints="${challenge.skillpoints}">
                <i class="bi bi-pencil-square text-light"></i>
              </button>
              <button class="btn btn-delete text-light" title="Delete Challenge" data-challenge-id="${challenge.challenge_id}">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          `;
        }

        const challengeCard = document.createElement("div");
        challengeCard.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        challengeCard.innerHTML = `
          <div class="custom-card h-100 rounded text-center p-3">
            <div class="card-body">
              <h5 class="card-title">${challenge.challenge}</h5>
              <p class="card-text">
                <strong>Reward:</strong> ${challenge.skillpoints} Skillpoints
              </p>
              ${challengeActions}
            </div>
          </div>
        `;
        challengeListContainer.appendChild(challengeCard);
      });

      // Only add event listeners for challenge actions if the user is logged in.
      if (token) {
        document.querySelectorAll(".complete-btn").forEach((button) => {
          button.addEventListener("click", handleOpenCompleteChallengeModal);
        });
        document.querySelectorAll(".btn-edit").forEach((button) => {
          button.addEventListener("click", handleEditChallenge);
        });
        document.querySelectorAll(".btn-delete").forEach((button) => {
          button.addEventListener("click", handleDeleteChallenge);
        });
      }
    } else {
      showMessageCard("Failed to load challenges. Please try again later.", "danger");
    }
  };

  const handleOpenCompleteChallengeModal = (event) => {
    if (!token) {
      showMessageCard("You must be logged in to complete a challenge!", "warning");
      return;
    }
    const button = event.target.closest("button");
    const challengeId = button.getAttribute("data-challenge-id");
    if (!challengeId) {
      showMessageCard("Error: Challenge ID is missing. Please try again.", "danger");
      console.error("Error: Challenge ID is missing.");
      return;
    }
    document.getElementById("completeChallengeId").value = challengeId;
    completeChallengeModal.show();
  };

  completeChallengeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!token) {
      showMessageCard("You must be logged in to complete a challenge!", "warning");
      return;
    }
    const challengeId = document.getElementById("completeChallengeId").value;
    const notes = document.getElementById("challengeNotes").value;

    if (!challengeId) {
      showMessageCard("Error: Challenge ID is missing. Please try again.", "danger");
      console.error("Error: Challenge ID is missing.");
      return;
    }

    const requestData = {
      challenge_id: challengeId,
      completed: true,
      creation_date: new Date().toISOString().slice(0, 19).replace("T", " "), // Convert to MySQL format
      notes: notes,
    };

    fetchMethod(`${currentUrl}/api/challenges/complete`, (responseStatus, responseData) => {
      console.log(responseData)
      if (responseStatus === 201) {
        showMessageCard("Challenge completed successfully!", "success", true);
      } else {
        const errorMessage = responseData?.message || "Failed to complete the challenge.";
        showMessageCard(errorMessage, "danger");
      }
    }, "POST", requestData, token);

    completeChallengeModal.hide();
  });

  const fetchChallenges = () => {
    fetchMethod(`${currentUrl}/api/challenges`, populateChallengeList, "GET", null, token);
  };

  createChallengeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!token) {
      showMessageCard("You must be logged in to create a challenge!", "warning");
      return;
    }
    const challengeName = document.getElementById("challengeName").value;
    const skillPoints = document.getElementById("skillPoints").value;

    if (!challengeName || !skillPoints) {
      showMessageCard("All fields are required.", "warning");
      return;
    }

    fetchMethod(`${currentUrl}/api/challenges`, (responseStatus, responseData) => {
      if (responseStatus === 201) {
        showMessageCard("Challenge created successfully!", "success", true);
      } else {
        const errorMessage = responseData?.message || "Failed to create challenge.";
        showMessageCard(errorMessage, "danger");
      }
    }, "POST", { challenge: challengeName, skillpoints: skillPoints }, token);
  });

  // Handle challenge editing
  const handleEditChallenge = (event) => {
    if (!token) {
      showMessageCard("You must be logged in to edit a challenge!", "warning");
      return;
    }
    const button = event.target.closest("button");
    const challengeId = button.getAttribute("data-challenge-id");
    const challengeName = button.getAttribute("data-challenge-name");
    const skillPoints = button.getAttribute("data-skillpoints");

    // Pre-fill modal fields
    document.getElementById("editChallengeName").value = challengeName;
    document.getElementById("editSkillPoints").value = skillPoints;

    editChallengeForm.onsubmit = function (e) {
      e.preventDefault();
      const updatedName = document.getElementById("editChallengeName").value;
      const updatedSkillPoints = document.getElementById("editSkillPoints").value;

      fetchMethod(
        `${currentUrl}/api/challenges/${challengeId}`,
        (responseStatus, responseData) => {
          if (responseStatus === 200) {
            showMessageCard("Challenge updated successfully!", "success", true);
          } else {
            const errorMessage = responseData?.message || "Failed to update challenge.";
            showMessageCard(errorMessage, "danger");
          }
        },
        "PUT",
        { challenge: updatedName, skillpoints: updatedSkillPoints },
        token
      );

      editChallengeModal.hide();
    };

    editChallengeModal.show();
  };

  // Handle challenge deletion
  const handleDeleteChallenge = (event) => {
    if (!token) {
      showMessageCard("You must be logged in to delete a challenge!", "warning");
      return;
    }
    const challengeId = event.target.closest("button").getAttribute("data-challenge-id");

    fetchMethod(
      `${currentUrl}/api/challenges/${challengeId}`,
      (responseStatus, responseData) => {
        if (responseStatus === 204) {
          showMessageCard("Challenge deleted successfully!", "success", true);
        } else {
          const errorMessage = responseData?.message || "Failed to delete challenge.";
          showMessageCard(errorMessage, "danger");
        }
      },
      "DELETE",
      null,
      token
    );
  };

  // Fetch challenges on page load
  fetchChallenges();
});