let navbar = document.getElementById("navbar");
let navActive = false;
document.getElementById("navButton").addEventListener("click", () => {
    navActive == false ? navActive = true : navActive = false;
    if (navActive == false) {
        navbar.style.animationName = "navSlideReverse";
    } else if (navActive == true) {
        navbar.style.animationName = "navSlide";
    } else {
        throw console.error("copium");
    }
});