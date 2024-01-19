const reviewBtn = document.querySelector('#ReviewButton')

reviewBtn.addEventListener('click',(e)=>{
    const redirectTo = `http://192.168.56.1:8080/Reviews/Ambience%20Reviews/review.html` ;
        window.location.replace(redirectTo); 
})


// http://192.168.56.1:8080/Reviews/Ambience%20Reviews/review.html