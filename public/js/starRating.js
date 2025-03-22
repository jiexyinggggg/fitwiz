const stars = document.querySelectorAll('#starRating .bi');
const ratingInput = document.getElementById('rating');

const setupStarRating = (starsContainer, ratingInput) => {
  const stars = starsContainer.querySelectorAll('.bi');

  stars.forEach((star) => {
    star.addEventListener('click', () => {
      // Set rating value
      const ratingValue = star.getAttribute('data-value');
      ratingInput.value = ratingValue;

      // Highlight stars up to the selected one
      stars.forEach((s) => {
        if (s.getAttribute('data-value') <= ratingValue) {
          s.classList.remove('text-white');
          s.classList.add('text-warning');
        } else {
          s.classList.add('text-white');
          s.classList.remove('text-warning');
        }
      });
    });

    // Add hover effect
    star.addEventListener('mouseover', () => {
      const hoverValue = star.getAttribute('data-value');
      stars.forEach((s) => {
        if (s.getAttribute('data-value') <= hoverValue) {
          s.classList.remove('text-white');
          s.classList.add('text-warning');
        } else {
          s.classList.add('text-white');
          s.classList.remove('text-warning');
        }
      });
    });

    // Remove hover effect when mouse leaves
    star.addEventListener('mouseout', () => {
      const selectedRating = ratingInput.value;
      stars.forEach((s) => {
        if (s.getAttribute('data-value') <= selectedRating) {
          s.classList.remove('text-white');
          s.classList.add('text-warning');
        } else {
          s.classList.add('text-white');
          s.classList.remove('text-warning');
        }
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupStarRating(document.getElementById("starRating"), document.getElementById("rating")); // Main Review Form
  setupStarRating(document.getElementById("editStarRating"), document.getElementById("editRating")); // Edit Review Modal
});