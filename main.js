const urlParams = new URLSearchParams(window.location.search);
const receivedUsername = urlParams.get('username');

if (receivedUsername !== null ) {
    console.log('Received Username:', decodeURIComponent(receivedUsername));
} else {
  const test = ' http://192.168.56.1:8080/LoginPage/Login.html'
  window.location.replace(test); 
}

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__form", {
  ...scrollRevealOption,
  delay: 500,
});

// trending container
ScrollReveal().reveal(".trending__card", {
  ...scrollRevealOption,
  interval: 500,
});

// destination container
ScrollReveal().reveal(".destination__card", {
  duration: 1000,
  interval: 500,
});

// seller container
ScrollReveal().reveal(".seller__card", {
  ...scrollRevealOption,
  interval: 500,
});

// guide container
ScrollReveal().reveal(".guide__card", {
  ...scrollRevealOption,
  interval: 500,
});

//  client container
ScrollReveal().reveal(".client__card", {
  ...scrollRevealOption,
  interval: 500,
});
