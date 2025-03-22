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
  const spellList = document.querySelector(".row.g-4");

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

  // Callback to populate spell shop.
  const callbackForSpells = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      spellList.innerHTML = ""; // Clear existing spells

      responseData.forEach((spell) => {
        const spellCard = document.createElement("div");
        spellCard.className = "col-12 col-sm-6 col-md-4 col-lg-3";
        spellCard.innerHTML = `
          <div class="card custom-card h-100 mx-auto">
            <img src="images/spell${spell.spell_id}.webp" alt="${spell.spell_name}" class="card-img-top">
            <div class="card-body text-center">
              <h5 class="card-title">${spell.spell_name}</h5>
              <p class="card-text">${spell.spell_description}</p>
              <p class="card-text">
                <strong>Spell ID:</strong> ${spell.spell_id} | 
                <strong>Damage:</strong> ${spell.spell_damage} Damage | 
                <strong>Cost:</strong> ${spell.spell_cost} Skillpoints
              </p>
              ${ token ? `<button class="btn btn-primary buy-spell-btn" data-spell-id="${spell.spell_id}">Buy</button>` : "" }
            </div>
          </div>
        `;
        spellList.appendChild(spellCard);
      });

      // Attach event listeners to the Buy buttons only if the user is logged in.
      if (token) {
        document.querySelectorAll(".buy-spell-btn").forEach((button) => {
          button.addEventListener("click", handlePurchase);
        });
      }
    } else {
      showMessageCard("Failed to load spells. Please try again later.", "danger");
    }
  };

  // Handle spell purchase.
  const handlePurchase = (event) => {
    const spellId = event.target.getAttribute("data-spell-id");
    if (!token) {
      showMessageCard("You must be logged in to purchase spells!", "warning");
      return;
    }

    fetchMethod(
      `${currentUrl}/api/diagonAlley/spellShop/purchase`,
      callbackForPurchase,
      "POST",
      { spellId },
      token
    );
  };

  // Callback for purchase response.
  const callbackForPurchase = (responseStatus, responseData) => {
    if (responseStatus === 200) {
      showMessageCard("Spell purchased successfully!", "success");
      // Fetch updated skillpoints immediately after purchase.
      fetchMethod(`${currentUrl}/api/users`, callbackForUserSkillpoints, "GET", null, token);
    } else if (responseStatus === 400 || responseStatus === 403) {
      const errorMessage = responseData?.message || "Unable to complete the purchase.";
      showMessageCard(errorMessage, "warning");
    } else {
      const errorMessage = responseData?.message || "An error occurred while purchasing the spell.";
      showMessageCard(errorMessage, "danger");
    }
  };

  // Fetch spells on page load.
  fetchMethod(`${currentUrl}/api/diagonAlley/spellShop`, callbackForSpells, "GET", null, token);

  // Fetch skillpoints only if the user is logged in.
  if (token) {
    fetchMethod(`${currentUrl}/api/users`, callbackForUserSkillpoints, "GET", null, token);
  }
});