document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const reviewForm = document.getElementById("reviewForm");
  const starRating = document.getElementById("starRating");
  const ratingInput = document.getElementById("rating");

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

  // Event listener to handle star rating selection
  starRating.addEventListener("click", function (event) {
    if (event.target.classList.contains("bi-star-fill")) {
      const selectedRating = event.target.getAttribute("data-value");
      ratingInput.value = selectedRating;

      // Highlight stars up to selected value
      document.querySelectorAll("#starRating .bi-star-fill").forEach((star) => {
        star.classList.toggle("text-warning", star.getAttribute("data-value") <= selectedRating);
      });
    }
  });

  // Event listener for review form submission
  reviewForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // If not logged in, show error message and exit.
    if (!token) {
      showMessageCard("You must be logged in to leave a review!", "warning");
      return;
    }

    const name = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const rating = ratingInput.value;
    const comment = document.getElementById("comments").value.trim();

    if (!name || !email || !rating || !comment) {
      showMessageCard("All fields are required!", "warning");
      return;
    }

    fetchMethod(
      `${currentUrl}/api/owlPost`,
      callbackForSubmitReview,
      "POST",
      { name, email, rating, comment },
      token
    );
  });

  // Callback function to handle the response from the review submission API
  const callbackForSubmitReview = (responseStatus, responseData) => {
    if (responseStatus === 201) {
      showMessageCard("Review submitted successfully!", "success", true);
    } else {
      showMessageCard(responseData?.message || "Failed to submit review.", "danger");
    }
  };
});