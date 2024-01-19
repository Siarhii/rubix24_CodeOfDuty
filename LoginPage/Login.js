import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'

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

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    updateProfile

} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyA80Y7Gg8_zrUVYzaoMWwENZXmyCyqNXsQ",
    authDomain: "rubixhackathon.firebaseapp.com",
    projectId: "rubixhackathon",
    storageBucket: "rubixhackathon.appspot.com",
    messagingSenderId: "883376760335",
    appId: "1:883376760335:web:13314053a2521d2905a57a",
    measurementId: "G-B726KSRPBZ"
  };

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const colUsers= collection(db,'Users');
let Location = "Mumbai";

document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('signInBtn');
    var signupForm = document.getElementById('signUpBtn');

    loginForm.addEventListener('click', function (event) {
      event.preventDefault(); 

      var logemail = document.getElementById('logemail').value;
      var logpass = document.getElementById('logpass').value;

      signInWithEmailAndPassword(auth,logemail,logpass)
      .then((cred)=>{
          console.log("User Logged In")

          const accessKey = '678de0505651432f44f0d55d32bd592d';
          fetch(`http://api.ipstack.com/check?access_key=${accessKey}`)
                  .then(response => response.json())
                  .then(data => {
                      const userLocation = {
                      city: data.city,
                      region: data.region_name,
                      country: data.country_name,
                      latitude: data.latitude,
                      longitude: data.longitude,
                      };

                     Location = userLocation.city;

                     const username = cred.user.displayName;
                     const redirectTo = `http://192.168.56.1:8080/index.html?username=${encodeURIComponent(username)}&location=${encodeURIComponent(Location)}` ;
                     setTimeout(() => {
                         window.location.replace(redirectTo); 
                     }, 500);
                })
                  .catch((error) => {
                    console.error('Error fetching location:', error)
                    const username = cred.user.displayName;
                    Location = "default";
                     const redirectTo = `http://192.168.56.1:8080/index.html?username=${encodeURIComponent(username)}&location=${encodeURIComponent(Location)}` ;
                     setTimeout(() => {
                         window.location.replace(redirectTo); 
                     }, 500);
                });
         
      })
      .catch((err)=>{
      
          console.log(err)
      })
    });

    signupForm.addEventListener('click', function (event) {
      event.preventDefault();

      var logname = document.getElementById('logname').value;
      var signupEmail = document.getElementById('signup-email').value;
      var signupPass = document.getElementById('signup-pass').value;

  createUserWithEmailAndPassword(auth,signupEmail,signupPass)
      .then((cred)=>{
          return updateProfile(cred.user, { displayName: logname })
              .then(() => {
                  console.log('Username saved:', logname);
                  const accessKey = '678de0505651432f44f0d55d32bd592d';

                  alert("UserName Created.Go back to Login Page.");

                  fetch(`http://api.ipstack.com/check?access_key=${accessKey}`)
                  .then(response => response.json())
                  .then(data => {
                      const userLocation = {
                      city: data.city,
                      region: data.region_name,
                      country: data.country_name,
                      latitude: data.latitude,
                      longitude: data.longitude,
                      };

                     Location = userLocation.city;
                  })
                  .catch(error => console.error('Error fetching location:', error));
              })
              .catch((error) => {
                  console.error('Display name update error:', error.message);
              });
      })
      .then(() => {
          addDoc( colUsers,{
              Username:logname,
              Location: Location,
              createdAt: serverTimestamp()
          })
          .catch((err)=>{
              console.log("Error : ",err);
          })
      })
      .catch((err)=>{
          console.log(err)
      })

    });
  });