document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const creatureList = document.getElementById("creatureList");
  const duelList = document.getElementById("duelList");
  const duelModal = new bootstrap.Modal(document.getElementById("duelModal"));
  const skillpointsElement = document.getElementById("skillpoints");
  let currentDuelId = null;

  // If the user isn't logged in, remove the "All Duels" tab and its content.
  if (!token) {
    const allDuelsTabLink = document.querySelector('a[href="#allDuelsTab"]');
    if (allDuelsTabLink && allDuelsTabLink.parentElement) {
      allDuelsTabLink.parentElement.remove();
    }
    const allDuelsTabContent = document.getElementById("allDuelsTab");
    if (allDuelsTabContent) {
      allDuelsTabContent.remove();
    }

    const skillpointsContainer = document.querySelector(
      ".container.d-flex.justify-content-end.align-items-center.mb-3"
    );
    if (skillpointsContainer) {
      skillpointsContainer.remove();
    }
  }

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

  // ##############################################################
  // FETCH AND DISPLAY USER SKILLPOINTS
  // ##############################################################
  const callbackForUserSkillpoints = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      skillpointsElement.textContent = responseData.skillpoints || "0";
    } else {
      showMessageCard("Failed to load skillpoints.", "danger");
    }
  };

  // ##############################################################
  // FETCH AND DISPLAY CREATURES FOR DUEL
  // ##############################################################
  const callbackForCreatures = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      creatureList.innerHTML = "";
      responseData.forEach((creature) => {
        const creatureCard = document.createElement("div");
        creatureCard.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        creatureCard.innerHTML = `
          <div class="custom-card h-100 rounded p-3">
            <img src="images/${creature.creature_name.toLowerCase()}.png" alt="${creature.creature_name}" class="card-img-top">
            <div class="card-body text-center">
              <h5 class="card-title">${creature.creature_name}</h5>
              <p class="card-text">${creature.description || "A mysterious magical creature."}</p>
              <p class="card-text"><strong>Creature Health:</strong> ${creature.creature_health} | <strong>Reward:</strong> ${creature.reward_points} Skillpoints</p>
              <button class="btn btn-primary mb-4 start-duel-btn" data-creature-id="${creature.creature_id}">
                Duel
              </button>
            </div>
          </div>
        `;
        creatureList.appendChild(creatureCard);
      });

      document.querySelectorAll(".start-duel-btn").forEach((button) => {
        button.addEventListener("click", handleStartDuel);
      });
    } else {
      showMessageCard("Failed to load creatures.", "danger");
    }
  };

  fetchMethod(`${currentUrl}/api/duel/creatures`, callbackForCreatures, "GET", null, token);

  if (token) {
    const callbackForDuels = (responseStatus, responseData) => {
      if (responseStatus === 200) {
        duelList.innerHTML = "";
        responseData.forEach((duel) => {
          const duelCard = document.createElement("div");
          duelCard.className = "col-12 col-sm-6 col-md-4 col-lg-3";
          duelCard.innerHTML = `
            <div class="custom-card h-100 rounded shadow-sm p-3">
              <div class="card-body text-center">
                <h5 class="card-title mb-3">Duel ID: ${duel.duel_id}</h5>
                <p class="card-text mb-2"><strong>Message:</strong> ${duel.result || "In Progress"}</p>
                <button class="btn btn-primary view-duel-btn" data-duel-id="${duel.duel_id}">
                  View Duel
                </button>
              </div>
            </div>
          `;
          duelList.appendChild(duelCard);
        });

        document.querySelectorAll(".view-duel-btn").forEach((button) => {
          button.addEventListener("click", handleViewDuel);
        });
      } else {
        showMessageCard("No duels in progress!", "danger");
      }
    };

    fetchMethod(`${currentUrl}/api/duel`, callbackForDuels, "GET", null, token);
    fetchMethod(`${currentUrl}/api/users`, callbackForUserSkillpoints, "GET", null, token);
  }

  const handleStartDuel = (event) => {
    if (!token) {
      showMessageCard("You must be logged in to start a duel!", "warning");
      return;
    }

    const button = event.target.closest("button");
    const creatureId = button.getAttribute("data-creature-id");

    if (!creatureId) {
      showMessageCard("Error: Creature ID is missing. Please try again.", "danger");
      return;
    }

    fetchMethod(
      `${currentUrl}/api/duel/start`,
      callbackForStartDuel,
      "POST",
      { creatureId: creatureId },
      token
    );
  };

  const callbackForStartDuel = (responseStatus, responseData) => {
    if (responseStatus === 201) {
      showMessageCard("Duel started successfully!", "success", true);
      fetchMethod(`${currentUrl}/api/users`, callbackForUserSkillpoints, "GET", null, token);
    } else {
      showMessageCard(responseData?.message || "Failed to start duel.", "danger");
    }
  };

  const handleViewDuel = (event) => {
    if (!token) {
      showMessageCard("You must be logged in to view a duel!", "warning");
      return;
    }

    currentDuelId = event.target.getAttribute("data-duel-id");

    if (!currentDuelId) {
      showMessageCard("Error: Duel ID is missing. Please try again.", "danger");
      return;
    }

    fetchMethod(
      `${currentUrl}/api/duel/${currentDuelId}`,
      callbackForViewDuel,
      "GET",
      null,
      token
    );
  };

  const callbackForViewDuel = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      document.getElementById("duelModalLabel1").textContent = `Duel ID: ${responseData[0].duel_id}`;
      document.getElementById("userHealth").textContent = responseData[0].user_health;
      document.getElementById("creatureHealth").textContent = responseData[0].creature_health;
      document.getElementById("duelMessage").textContent = responseData[0].result || "In Progress";
      document.getElementById("creatureId").textContent = responseData[0].creature_id;
      document.getElementById("skillpointsGained").textContent = responseData[0].skillpoints_gained;
      document.getElementById("skillpointsDeducted").textContent = responseData[0].skillpoints_deducted;

      document.getElementById("attackButton").setAttribute("data-duel-id", responseData[0].duel_id);
      document.getElementById("attackButton").addEventListener("click", handleAttack);

      duelModal.show();
    } else {
      showMessageCard("Failed to load duel details.", "danger");
    }
  };

  const handleAttack = () => {
    if (!token) {
      showMessageCard("You must be logged in to attack in a duel!", "warning");
      return;
    }

    if (!currentDuelId) {
      showMessageCard("Error: Duel ID is missing. Please try again.", "danger");
      return;
    }

    fetchMethod(
      `${currentUrl}/api/duel/attack`,
      callbackForAttackDuel,
      "POST",
      { duelId: currentDuelId },
      token
    );
  };

  const callbackForAttackDuel = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      document.getElementById("userHealth").textContent = responseData.user_health;
      document.getElementById("creatureHealth").textContent = responseData.creature_health;
      document.getElementById("duelMessage").textContent = responseData.status || "In Progress";
      document.getElementById("skillpointsGained").textContent = responseData.skillpoints_gained;
      document.getElementById("skillpointsDeducted").textContent = responseData.skillpoints_deducted;

      showMessageCard("Attack successful!", "success");
      fetchMethod(`${currentUrl}/api/users`, callbackForUserSkillpoints, "GET", null, token);

      if (responseData.message.includes("Win") || responseData.message.includes("Lose")) {
        document.getElementById("attackButton").disabled = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    } else {
      showMessageCard(responseData?.message || "Failed to attack.", "danger");
    }
  };
});