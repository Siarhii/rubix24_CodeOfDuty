// Sample data for reviews
const reviews = [
    { user: 'User123', comment: 'Visited last week. Amazing collection and well-maintained.', rating: 5 },
    // Add more reviews as needed
  ];
  
  // Function to display reviews
  function displayReviews() {
    const reviewsSection = document.getElementById('reviews');
  
    reviews.forEach(review => {
      const reviewDiv = document.createElement('div');
      reviewDiv.classList.add('review');
  
      const userComment = document.createElement('p');
      userComment.innerHTML = `<strong>${review.user}:</strong> ${review.comment}`;
  
      const rating = document.createElement('p');
      rating.classList.add('rating');
      rating.textContent = `Rating: ${review.rating} stars`;
  
      reviewDiv.appendChild(userComment);
      reviewDiv.appendChild(rating);
  
      reviewsSection.appendChild(reviewDiv);
    });
  }
  
  // Function to submit a new review
  function submitReview() {
    const user = prompt('Enter your name:');
    const comment = prompt('Share your experience:');
    const rating = parseInt(prompt('Rate (1-5):'), 10);
  
    if (user && comment && !isNaN(rating) && rating >= 1 && rating <= 5) {
      reviews.push({ user, comment, rating });
      alert('Review submitted successfully!');
      location.reload(); // Refresh the page to display the new review
    } else {
      alert('Invalid input. Please try again.');
    }
  }
  
  // Display reviews when the page loads
  window.onload = displayReviews;
  