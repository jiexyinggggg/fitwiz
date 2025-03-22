document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const reviewsContainer = document.getElementById("reviewsContainer");
  const editReviewForm = document.getElementById("editReviewForm");
  const editReviewModalElement = document.getElementById("editReviewModal");
  const editReviewModal = new bootstrap.Modal(editReviewModalElement, { backdrop: 'static' });
  const editReviewId = document.getElementById("editReviewId");
  const editUsername = document.getElementById("editUsername");
  const editEmail = document.getElementById("editEmail");
  const editComments = document.getElementById("editComments");
  const editRating = document.getElementById("editRating");

  const showMessageCard = (message, type) => {
    const messageCard = document.createElement("div");
    messageCard.className = `alert alert-${type} message-card`;
    messageCard.textContent = message;
    document.body.appendChild(messageCard);
    setTimeout(() => {
      messageCard.classList.add("fade-out");
      setTimeout(() => {
        document.body.removeChild(messageCard);
      }, 1000);
    }, 3000);
  };

  // Callback function to process and display all retrieved reviews
  const callbackForGetAllReviews = (responseStatus, responseData) => {
    reviewsContainer.innerHTML = "";

    if (responseStatus === 200) {
      responseData.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.className = "card custom-card bg-dark text-white shadow-sm border border-white mb-3";
        reviewCard.setAttribute("data-review-id", review.review_id);

        // Conditionally render the edit and delete icons only if the user is logged in
        reviewCard.innerHTML = `
          <div class="card-body position-relative">
            ${token ? `
              <div class="position-absolute top-0 end-0 mt-2 me-2">
                <i class="bi bi-pencil-square text-white edit-review" data-review-id="${review.review_id}" style="cursor: pointer; margin-right: 10px;"></i>
                <i class="bi bi-trash text-white delete-review" data-review-id="${review.review_id}" style="cursor: pointer;"></i>
              </div>
            ` : ""}
            <h5 class="card-title">${review.name}</h5>
            <h6 class="card-subtitle mb-2 text-white">Email: ${review.email}</h6>
            <h6 class="card-subtitle mb-2 text-warning">Rating: ${"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}</h6>
            <p class="card-text">${review.comment}</p>
            <p class="text-white"><small>Submitted at: ${new Date(review.submitted_at).toLocaleString()}</small></p>
          </div>
        `;

        reviewsContainer.appendChild(reviewCard);
      });

      // Attach event listeners for edit and delete only if the user is logged in
      if (token) {
        document.querySelectorAll(".edit-review").forEach((icon) =>
          icon.addEventListener("click", handleEditReview)
        );
        document.querySelectorAll(".delete-review").forEach((icon) =>
          icon.addEventListener("click", handleDeleteReview)
        );
      }

    } else if (responseStatus === 404) {
      reviewsContainer.innerHTML = `<p class="text-center text-warning">No reviews found.</p>`;
    } else {
      showMessageCard("Failed to load reviews.", "danger");
    }
  };

  window.handleEditReview = (event) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showMessageCard("You must be logged in to edit a review!", "warning");
      return;
    }
    const reviewId = event.target.getAttribute("data-review-id");
    const reviewCard = event.target.closest(".card");

    editReviewId.value = reviewId;
    editUsername.value = reviewCard.querySelector(".card-title").textContent;
    editEmail.value = reviewCard.querySelector(".card-subtitle").textContent.replace("Email: ", "");
    editComments.value = reviewCard.querySelector(".card-text").textContent;

    const ratingStars = reviewCard.querySelector(".text-warning").textContent;
    editRating.value = ratingStars.split("★").length - 1; // Count filled stars

    editReviewModal.show();
  };

  // Event listener for submitting the review edit form
  editReviewForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const token = localStorage.getItem("token");
    if (!token) {
      showMessageCard("You must be logged in to edit a review!", "warning");
      return;
    }

    const updatedData = {
      reviewId: editReviewId.value,
      name: editUsername.value.trim(),
      email: editEmail.value.trim(),
      comment: editComments.value.trim(),
      rating: parseInt(editRating.value),
    };

    if (!updatedData.name || !updatedData.email || !updatedData.comment || isNaN(updatedData.rating)) {
      showMessageCard("All fields are required!", "warning");
      return;
    }

    fetchMethod(
      `${currentUrl}/api/owlPost`,
      callbackForUpdateReview,
      "PUT",
      updatedData,
      token
    );
  });

  // Callback function to handle the response after updating a review
  const callbackForUpdateReview = (responseStatus, responseData) => {

    if (responseStatus === 200) {
      editReviewModal.hide();

      requestAnimationFrame(() => {
        editReviewModalElement.classList.remove("show");
        editReviewModalElement.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        editReviewModalElement.style.display = "none";

        document.querySelectorAll(".modal-backdrop").forEach(backdrop => backdrop.remove());
      });

      showMessageCard("Review updated successfully!", "success");

      const reviewCard = document.querySelector(`[data-review-id="${editReviewId.value}"]`).closest(".card");
      reviewCard.querySelector(".card-title").textContent = editUsername.value;
      reviewCard.querySelector(".card-subtitle").textContent = `Email: ${editEmail.value}`;
      reviewCard.querySelector(".card-text").textContent = editComments.value;
      reviewCard.querySelector(".text-warning").textContent = "★".repeat(editRating.value) + "☆".repeat(5 - editRating.value);
    } else {
      showMessageCard(responseData?.message || "Failed to update review.", "danger");
    }
  };

  // Function to handle deleting a review
  const handleDeleteReview = (event) => {
    const token = localStorage.getItem("token");
    if (!token) {
      showMessageCard("You must be logged in to delete a review!", "warning");
      return;
    }
    const reviewId = event.target.getAttribute("data-review-id");

    fetchMethod(
      `${currentUrl}/api/owlPost/${reviewId}`,
      (responseStatus, responseData) => {
        if (responseStatus === 204) {
          document.querySelector(`[data-review-id="${reviewId}"]`).remove();
          showMessageCard("Review deleted successfully!", "success");
        } else {
          showMessageCard(responseData?.message || "Failed to delete review.", "danger");
        }
      },
      "DELETE",
      null,
      token
    );
  };

  // Fetch reviews on page load
  fetchMethod(`${currentUrl}/api/owlPost`, callbackForGetAllReviews, "GET", null, null);
});