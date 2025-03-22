document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const houseEmblem = document.getElementById("houseEmblem");
    const houseMessage = document.getElementById("houseMessage");
    const chooseHouseButton = document.getElementById("chooseHouseButton");
    const houseModalBody = document.querySelector("#houseModal .modal-body .row");

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
    
    // House descriptions
    const houseDescriptions = {
        Gryffindor: "Bravery, daring, nerve, and chivalry. Gryffindors are courageous at heart.",
        Hufflepuff: "Dedication, patience, loyalty, and fair play. Hufflepuffs value hard work.",
        Ravenclaw: "Intelligence, wisdom, creativity, and learning. Ravenclaws are sharp-minded.",
        Slytherin: "Ambition, cunning, resourcefulness, and determination. Slytherins are leaders."
    };

    // Callback for fetching user house
    const fetchUserHouse = () => {
        fetchMethod(`${currentUrl}/api/houses/userHouse`, (responseStatus, responseData) => {
            if (responseStatus === 200) {
                const houseName = responseData.house;
                houseEmblem.src = `images/${houseName.toLowerCase()}.png`;
                houseEmblem.style.marginBottom = "15px";
                houseMessage.textContent = `You belong to ${houseName}! 🪄`;

                chooseHouseButton.classList.add("d-none");
            } else if (responseStatus === 404) {
                houseMessage.innerHTML = `The Sorting Hat awaits! You haven't been sorted into a house yet. Tap below to embark on your magical journey and choose your Hogwarts House! 🪄`;
                chooseHouseButton.classList.remove("d-none");
            } else {
                showMessageCard("Failed to load house information. Please try again later.", "danger");
            }
        }, "GET", null, token);
    };

    // Callback for fetching all houses
    const fetchAllHouses = () => {
        fetchMethod(`${currentUrl}/api/houses/allHouses`, (responseStatus, houses) => {
            if (responseStatus !== 200) {
                showMessageCard("Failed to load houses. Please try again later.", "danger");
                return;
            }

            houseModalBody.innerHTML = "";

            houses.forEach((house) => {
                const houseName = house.house_name || "Unknown House";
                const houseDescription = house.description || houseDescriptions[houseName] || "No description available.";

                const houseCard = `
                    <div class="col-md-12 col-lg-6 mb-4">
                        <div class="card bg-dark text-white shadow-sm border border-white">
                            <img src="images/${houseName.toLowerCase()}.png" class="card-img-top house-emblem mx-auto mt-3" alt="${houseName} Emblem">
                            <div class="card-body text-center">
                                <h5 class="card-title">${houseName}</h5>
                                <p class="card-text">${houseDescription}</p>
                                <button class="btn btn-primary w-100 choose-house-btn" data-houseid="${house.house_id}">Choose House</button>
                            </div>
                        </div>
                    </div>`;
                houseModalBody.innerHTML += houseCard;
            });

            document.querySelectorAll(".choose-house-btn").forEach((button) => {
                button.addEventListener("click", handleChooseHouse);
            });
        }, "GET", null, token);
    };

    // Handle choosing a house
    const handleChooseHouse = (event) => {
        const chosenHouseId = event.target.getAttribute("data-houseid");
    
        if (!chosenHouseId) {
            showMessageCard("Error: House selection is missing.", "danger");
            return;
        }
    
        const requestData = { houseId: parseInt(chosenHouseId) };
    
        fetchMethod(`${currentUrl}/api/houses/chooseHouse`, (responseStatus, responseData) => {
            if (responseStatus === 201) {
                showMessageCard(`Congratulations! You are now in ${responseData.message}!`, "success", true);
    
                // Close the modal immediately after house selection
                const houseModal = document.getElementById("houseModal");
                const bootstrapModal = bootstrap.Modal.getInstance(houseModal);
                if (bootstrapModal) {
                    bootstrapModal.hide();
                }
    
                setTimeout(() => {
                    location.reload();
                }, 1000);
    
            } else if (responseStatus === 409) {
                showMessageCard("User has already been sorted into a house!", "warning");
            } else {
                showMessageCard("Failed to choose house. Please try again.", "danger");
            }
        }, "POST", requestData, token);
    };

    fetchUserHouse();

    chooseHouseButton.addEventListener("click", fetchAllHouses);
});