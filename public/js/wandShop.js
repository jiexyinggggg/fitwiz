document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");

  // If the user is not logged in, remove the skillpoints display container.
  if (!token) {
    const skillpointsContainer = document.querySelector(
      ".container.d-flex.justify-content-end.align-items-center.mb-3"
    );
    if (skillpointsContainer) {
      skillpointsContainer.remove();
    }
  }

  const skillpointsElement = document.getElementById("skillpoints");
  const wandList = document.querySelector(".row.g-4");

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

  // Callback to update the user's skillpoints dynamically.
  const callbackForUserSkillpoints = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      skillpointsElement.textContent = responseData.skillpoints || "0";
    } else {
      showMessageCard("Failed to load skillpoints.", "danger");
    }
  };

  // Callback to populate the wand shop.
  const callbackForWands = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      wandList.innerHTML = ""; // Clear any existing wands

      responseData.forEach((wand) => {
        const wandCard = document.createElement("div");
        wandCard.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        wandCard.innerHTML = `
          <div class="card custom-card h-100 mx-auto">
            <img src="images/wand${wand.wand_id}.png" alt="Wand" class="card-img-top">
            <div class="card-body text-center">
              <h5 class="card-title">${wand.wand_name}</h5>
              <p class="card-text">
                <strong>Wand ID:</strong> ${wand.wand_id} | 
                <strong>Cost:</strong> ${wand.wand_cost} Skillpoints
              </p>
              ${
                token
                  ? `<button class="btn btn-primary buy-wand-btn" data-wand-id="${wand.wand_id}">Buy</button>`
                  : ""
              }
            </div>
          </div>
        `;
        wandList.appendChild(wandCard);
      });

      // Add event listeners to all Buy buttons (if any exist).
      document.querySelectorAll(".buy-wand-btn").forEach((button) => {
        button.addEventListener("click", handlePurchase);
      });
    } else {
      showMessageCard("Failed to load wands. Please try again later.", "danger");
    }
  };

  // Handle wand purchase.
  const handlePurchase = (event) => {
    const wandId = event.target.getAttribute("data-wand-id");
    if (!token) {
      showMessageCard("You must be logged in to purchase wands!", "warning");
      return;
    }

    fetchMethod(
      `${currentUrl}/api/diagonAlley/wandShop/purchase`,
      callbackForPurchase,
      "POST",
      { wandId },
      token
    );
  };

  // Callback for purchase response.
  const callbackForPurchase = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      showMessageCard("Wand purchased successfully!", "success");
      // Fetch updated skillpoints immediately after purchase.
      fetchMethod(
        `${currentUrl}/api/users`,
        callbackForUserSkillpoints,
        "GET",
        null,
        token
      );
    } else if (responseStatus === 400 || responseStatus === 403) {
      const errorMessage = responseData?.message || "Unable to complete the purchase.";
      showMessageCard(errorMessage, "warning");
    } else {
      const errorMessage = responseData?.message || "An error occurred while purchasing the wand.";
      showMessageCard(errorMessage, "danger");
    }
  };

  // Fetch wands on page load.
  fetchMethod(`${currentUrl}/api/diagonAlley/wandShop`, callbackForWands, "GET", null, token);

  // Fetch skillpoints only if the user is logged in.
  if (token) {
    fetchMethod(`${currentUrl}/api/users`, callbackForUserSkillpoints, "GET", null, token);
  }
});