import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import {
    collection,
    getFirestore,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot, 
    query,
    where,
    orderBy,
    serverTimestamp ,
    getDocs, 
    updateDoc
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js'
 
const firebaseConfig = {
    //
  };
  initializeApp(firebaseConfig);

const db = getFirestore(); 
const colReviews = collection(db,'reviewsRestaurant');
 
let review = [];

getDocs(colReviews)
.then((snapshotObject)=>{
    snapshotObject.docs.forEach((doc)=>{  
        review.push({...doc.data(),id: doc.id})
    })     
    //console.log(review);
})
.catch((err)=>{
    console.log(err);
})

let q = query(colReviews,where("ProductName","==","5spice"));
onSnapshot(q,(snapshot)=>{
    const sortedReviews = [];
    snapshot.docs.forEach((doc)=>{
        sortedReviews.push({...doc.data(),id: doc.id})
    })
    displayReviews(sortedReviews);
})


  function generateReviewTemplate(review) {
    const stars = '★'.repeat(review.stars); 

  
    const firestoreTimestamp = review.createdAt;
    const date = firestoreTimestamp.toDate();
    const formattedDate = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });


    return `
      <div class="review">
        <p class="user">${review.FromUser}</p>
        <p class="rating">${stars}</p>
        <p class="comment">${review.Review}</p>
        <p class="posted-at">Posted on: ${formattedDate}</p>
      </div>
    `;
  }
 
  function displayReviews(reviews) {
    const reviewContainer = document.getElementById('reviewContainer');

    reviews.forEach(review => {
      const reviewTemplate = generateReviewTemplate(review);
      reviewContainer.innerHTML += reviewTemplate;
    });
  }





  ///////////////////////////
  document.addEventListener('DOMContentLoaded', function () {
    let rating = 0;
    let reviewPosted = false;

    function setRating(value) {
      if (!reviewPosted) {
        rating = value;
        highlightEmojis();
      }
    }

    function highlightEmojis() {
      const emojis = document.querySelectorAll('.emoji');
      emojis.forEach((emoji, index) => {
        if (index < rating) {
          emoji.classList.add('selected');
        } else {
          emoji.classList.remove('selected');
        }
      });
    }
    const postButton = document.querySelector('#postButton');

    postButton.addEventListener('click',(e)=>{
      postReview();
    })
    const emojiElements = document.querySelectorAll('.emoji');
    emojiElements.forEach((emoji, index) => {
      emoji.addEventListener('click', function () {
        setRating(index + 1);
      });
    });

    function postReview() {
      const reviewTitle = document.querySelector('.review-title');
      const usernameInput = document.querySelector('.username-input');
      const commentInput = document.querySelector('.comment-input');
      const postButton = document.querySelector('.post-button');
      const reviewPostedMessage = document.getElementById('reviewPostedMessage');
      const emojiElements = document.querySelectorAll('.emoji');

      if (!usernameInput.value || !commentInput.value || rating === 0) {
        alert('Please provide username, review, and rating.');
        return;
      }else{

        addDoc(colReviews,{
          FromUser:usernameInput.value,
          Location: "Mumbai",
          ProductName : "5spice",
          ProductType:"services",
          Product:"Restaurant",
          Review:commentInput.value,
          stars : parseInt(rating) ,
          createdAt: serverTimestamp()
          })
          .then(()=>{
              console.log("Posted");
          })
          .catch((err)=>{
              console.log("Error : ",err);
          })
          
          reviewTitle.textContent = `Your Rating: ${rating} Stars`;
          usernameInput.style.display = 'none';
          commentInput.style.display = 'none';
          postButton.style.display = 'none';
          reviewPostedMessage.style.display = 'block';
    
          reviewPosted = true;

          emojiElements.forEach((emoji) => {
          emoji.removeEventListener('click', setRating);
        });
      }
    }
  });
