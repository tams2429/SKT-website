const navSlide = () => {
    const navBar = document.querySelector('.toggle-collapse');
    const navItems = document.querySelector('.nav-items');
    const navLinks = document.querySelectorAll('.nav-items .nav-link');



    navBar.addEventListener('click', () => {
        
        //Toggle Nav        
        navItems.classList.toggle('nav-active');

        //Animate links    
        navLinks.forEach((link, index) => {
            if (link.style.animation){
                link.style.animation = '';
            } else{
            link.style.animation = `navItemsFade 0.5s ease forwards ${index/7 + 1}s`
            }
        });


        //Navbar animation
        navBar.classList.toggle('navBar-active');
    })





}




/* Logic for matching the caption text to the parent image & creating dot elements and style */


let slideIndex, slides, dots, captionText;


const initGallery = () => {

    slideIndex = 0;
    slides = document.getElementsByClassName("imageHolder");
    slides[slideIndex].style.opacity = 1;
    console.log(slides);

    captionText = document.querySelector(".captionHolder .captionText");
    console.log(captionText);


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

/* -------------------------------------------------------------------- */




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
        console.log(next);
        current = slides[slideIndex];
        console.log(current);
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
    console.log(slideTextAnimClass);
    captionText.style.display = "none";
    captionText.className = "captionText " + slideTextAnimClass;
    captionText.innerText = slides[n].querySelector(".caption").innerText;
    captionText.style.display = "block";



}







document.addEventListener("keydown", function(e){
        if(e.keyCode == 39){
            plusSlides(1);
        } else if (e.keyCode == 37){
            plusSlides(-1);
        }
})


/* -------------------------------------------------------------------- */

/* Logic to cause image carousel to play/pause after the associated button has been clicked */

var timer = null;

const setTimer = () => {
    timer = setInterval(function(){
        plusSlides(1);
    }, 3000)
}


const playPauseSlides = () => {
    var playPauseBtn = document.getElementById("playPauseBtn");
    if(timer == null | playPauseBtn.style.backgroundPositionY =="0px"){
        console.log(timer);
        setTimer();
        playPauseBtn.style.backgroundPositionY = "-33px";
        console.log("played")
    } else {
        console.log(timer);
        clearInterval(timer);

        playPauseBtn.style.backgroundPositionY = "0px";
        console.log("paused")
        timer == null;
    }



}



















/* ---------------------------------------------------------------------------------- */






const app = () => {
    navSlide();
    initGallery();

    
}

app();



