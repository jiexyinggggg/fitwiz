document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const itemFilter = document.getElementById("itemFilter");
  const vaultItemsContainer = document.getElementById("vaultItems");

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

  // Callback to populate vault items
  const populateVaultItems = (responseStatus, responseData, filterType) => {
    vaultItemsContainer.innerHTML = ""; // Clear existing items
    
    if (responseStatus === 200) {
      // Filter responseData based on the selected type
      let filteredData = responseData;
      if (filterType === "wands") {
        filteredData = responseData.filter(item => item.wand_id !== undefined);
      } else if (filterType === "potions") {
        filteredData = responseData.filter(item => item.potion_id !== undefined);
      } else if (filterType === "spells") {
        filteredData = responseData.filter(item => item.spell_id !== undefined);
      }
      
      // If no items exist for the selected filter, show a message
      if (filteredData.length === 0) {
        showMessageCard("No items found in this category.", "warning");
        return;
      }
      
      // Create cards for each filtered item
      filteredData.forEach((item) => {
        let itemId, itemName, itemType;

        if (item.wand_id !== undefined) {
          itemId = item.wand_id;
          itemName = item.wand_name;
          itemType = "Wand";
        } else if (item.potion_id !== undefined) {
          itemId = item.potion_id;
          itemName = item.potion_name;
          itemType = "Potion";
        } else if (item.spell_id !== undefined) {
          itemId = item.spell_id;
          itemName = item.spell_name;
          itemType = "Spell";
        } else {
          itemId = "Unknown";
          itemName = "Unknown Item";
          itemType = "Unknown Type";
        }

        const itemCard = document.createElement("div");
        itemCard.className = "col-12 col-sm-6 col-md-4 col-lg-3 vault-item";
        itemCard.setAttribute("data-type", itemType.toLowerCase());

        itemCard.innerHTML = `
          <div class="card custom-card h-100 text-white text-center" style="background-color: rgba(0,0,27,0.9);">
            <div class="card-body">
              <h5 class="card-title">${itemName || "Unknown Item"}</h5>
              <p class="card-text">
                ${itemType} ID: ${itemId || "N/A"}
              </p>
            </div>
          </div>
        `;
        vaultItemsContainer.appendChild(itemCard);
      });
    } else if (responseStatus === 400) {
      showMessageCard(responseData?.message || "Bad request. Please try again.", "warning");
    } else if (responseStatus === 404) {
      showMessageCard(responseData?.message || "No items found in this category.", "warning");
    } else if (responseStatus === 500) {
      showMessageCard(responseData?.message || "An internal server error occurred.", "danger");
    } else {
      showMessageCard(responseData?.message || "An unexpected error occurred.", "danger");
    }
  };  

  // Fetch vault items based on the selected filter
  const fetchVaultItems = (type) => {
    let url = `${currentUrl}/api/vault/`;
    if (type === "wands") url += "wands";
    else if (type === "potions") url += "potions";
    else if (type === "spells") url += "spells";

    fetchMethod(url, populateVaultItems, "GET", null, token);
  };

  // Apply filter and fetch items
  const applyFilter = (selectedType) => {
    fetchVaultItems(selectedType);
  };

  // Event listener for item filter
  itemFilter.addEventListener("change", function () {
    applyFilter(this.value);
  });

  // Fetch items for the default filter on page load
  applyFilter(itemFilter.value);
});