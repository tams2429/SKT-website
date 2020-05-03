
/* Logic for matching the caption text to the parent image & creating dot elements and style */

let slideIndex, slides, dots, captionText;

const initGallery = () => {

    slideIndex = 0;
    slides = document.getElementsByClassName("imageHolder");
    slides[slideIndex].style.opacity = 1;

    captionText = document.querySelector(".captionHolder .captionText");

    captionText.innerText = slides[slideIndex].querySelector('.caption').innerText;

    dots = [];
    const dotsContainer = document.getElementById('dotsContainer');

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement("span");
        dot.classList.add("dots");
        dot.setAttribute("onclick","moveSlide("+i+")")
        dotsContainer.append(dot);
        dots.push(dot);
    }
    dots[slideIndex].classList.add('active');
}


/* Logic for changing images/dotstyle/caption when the arrow is clicked/left and right key are pressed (invoked when arrow is clicked)*/

const plusSlides = (n) => {
    moveSlide(slideIndex + n);
}

const moveSlide = (n) => {
    let current, next, slideTextAnimClass;
    let moveSlideAnimClass = {
        forCurrent: "",
        forNext: ""
    }

    if(n > slideIndex){
        if(n >= slides.length){
            n = 0;
        }
        moveSlideAnimClass.forCurrent = "moveLeftCurrentSlide";
        moveSlideAnimClass.forNext = "moveLeftNextSlide";
        slideTextAnimClass = "slideTextFromTop";
    } else if (n < slideIndex){
        if(n < 0){
            n = slides.length - 1;
        }
        moveSlideAnimClass.forCurrent = "moveRightCurrentSlide";
        moveSlideAnimClass.forNext = "moveRightNextSlide";
        slideTextAnimClass = "slideTextFromBottom";
    }

    if(n != slideIndex){
        next = slides[n];
        current = slides[slideIndex];
        for(let i = 0; i < slides.length; i++){
            slides[i].className = "imageHolder";
            slides[i].style.opacity = 0;
            dots[i].classList.remove("active");
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        dots[n].classList.add("active");
        slideIndex = n;
    }
    captionText.style.display = "none";
    captionText.className = "captionText " + slideTextAnimClass;
    captionText.innerText = slides[n].querySelector(".caption").innerText;
    captionText.style.display = "block";
}

/* Event listener to invoke slide change functions when the left/right directional key is pressed */

document.addEventListener("keydown", function(e){
        if(e.keyCode == 39){
            plusSlides(1);
        } else if (e.keyCode == 37){
            plusSlides(-1);
        }
})

/* Logic to cause image carousel to play/pause after the associated button has been clicked */

var timer = null;

const setTimer = () => {
    timer = setInterval(function(){
        plusSlides(1);
    }, 3000)
}

const playPauseSlides = () => {
    var playPauseBtn = document.getElementById("playPauseBtn");
    if(timer == null | playPauseBtn.style.backgroundPositionY =="0"){
        setTimer();
        playPauseBtn.style.backgroundPositionY = "-2.1rem";
    } else {
        clearInterval(timer);
        playPauseBtn.style.backgroundPositionY = "0";
        timer == null;
    }



}

initGallery();