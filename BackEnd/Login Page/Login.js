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
   //api config
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

          //const accessKey = 
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
                     const redirectTo = `` ;
                     setTimeout(() => {
                         window.location.replace(redirectTo); 
                     }, 500);
                })
                  .catch((error) => {
                    console.error('Error fetching location:', error)
                    const username = cred.user.displayName;
                    Location = "default";
                     const redirectTo = `` ;
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
                 // const accessKey = '';

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
// const signUpForm = document.querySelector(".signup")
// signUpForm.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     const email = signUpForm.email.value;
//     const pass = signUpForm.password.value;
//     const username = signUpForm.username.value;
//     createUserWithEmailAndPassword(auth,email,pass)
//         .then((cred)=>{
//             return updateProfile(cred.user, { displayName: username })
//                 .then(() => {
//                     console.log('Username saved:', username);
//                     const accessKey = '';
// 
//                     fetch(`http://api.ipstack.com/check?access_key=${accessKey}`)
//                     .then(response => response.json())
//                     .then(data => {
//                         const userLocation = {
//                         city: data.city,
//                         region: data.region_name,
//                         country: data.country_name,
//                         latitude: data.latitude,
//                         longitude: data.longitude,
//                         };

//                         console.log('User Location:', userLocation);
//                     })
//                     .catch(error => console.error('Error fetching location:', error));
//                 })
//                 .catch((error) => {
//                     console.error('Display name update error:', error.message);
//                 });
//         })
//         .then(() => {
//             addDoc( colUsers,{
//                 Username:username,
//                 Location: Location,
//                 createdAt: serverTimestamp()
//             })
//             .catch((err)=>{
//                 console.log("Error : ",err);
//             })
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
// })
// const signInForm = document.querySelector(".signin")
// signInForm.addEventListener('submit',(e)=>{
//     e.preventDefault();

//     const email = signInForm.email2.value;
//     const pass = signInForm.password2.value;

//     signInWithEmailAndPassword(auth,email,pass)
//         .then((cred)=>{
//             console.log("User Logged In")
//             const city = "mumbai"
//             const username = cred.user.displayName;
//             const redirectTo = `http://192.168.2.109:8080/index.html?username=${encodeURIComponent(username)}&location=${encodeURIComponent(city)}` ;
//             setTimeout(() => {
//                 window.location.replace(redirectTo); 
//             }, 500);

//         })
//         .catch((err)=>{
//             console.log(err)
//         })
// })

// const logoutButton = document.querySelector(".logOut")
// logoutButton.addEventListener('click',(e)=>{
//     e.preventDefault();
//     signOut(auth)
//         .then(()=>{
//            console.log("User Logged Out");
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// })

// const unsubauthLog = onAuthStateChanged(auth,(cred)=>{
//     console.log("Status changed : ",cred);
//     const username = cred.displayName;
//         if(username!=null || username!=undefined){
//             const redirectTo = 'http://192.168.2.109:8080/index.html?username=' + encodeURIComponent(username);
//             setTimeout(() => {
//                 window.location.replace(redirectTo); 
//             }, 1000);
//         }
//     });


// const unsubButton = document.querySelector(".unsub");
// unsubButton.addEventListener('click',(e)=>{
//     e.preventDefault();

//     unsubauthLog();
//     console.log("Unsubcribed")
// })