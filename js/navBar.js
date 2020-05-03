const navSlide = () => {
    const navBar = document.querySelector('.toggle-collapse');
    const navItems = document.querySelector('.nav-items');
    const navLinks = document.querySelectorAll('.nav-items .nav-link');



    navBar.addEventListener('click', () => {
        
        //Toggle Nav        
        navItems.classList.toggle('nav-active');

        //Animate links    
        navLinks.forEach((link, index) => {
            console.log(link);
            console.log(index);
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

navSlide();