let width = window.innerWidth;
let height = window.innerHeight;

let navbar = document.getElementById("navbar");
let navButton = document.getElementById("navButton");

let navActive = false;
let navAnimationRunning = false;

/* This checks if the navbar is currently running an animation, if it is, then it will change the boolean to true, else it will change it to false. */
["animationstart", "animationend"].forEach((event) => {
    navbar.addEventListener(event, () => {
        if (event == "animationstart") {
            navAnimationRunning = true;
        } else if (event == "animationend") {
            navAnimationRunning = false;
        }
    });
});

/* Button listens for a click event and runs an animation depending on the state of the navbar. If it is activated, run the reverse animation, else run the normal animation. Checks if animation is running to prevent spam causing visual glitches. */
navButton.addEventListener("click", () => {
    if (navAnimationRunning == false) {
        (navActive == false) ? navActive = true : navActive = false;
        if (navActive == false) {
            navbar.style.animationName = "navSlideReverse";
        } else if (navActive == true) {
            navbar.style.animationName = "navSlide";
        } else {
            throw console.error("you suck at coding");
        }
    }
});


let navLinks = [];

for (let i = 0; i < 6; i++) {
    navLinks[i] = document.getElementById(`navLink${[i]}`);
    navLinks[i].style.fontSize = `${width/1130}em`;

    window.addEventListener('resize', () => {
        navLinks[i].style.fontSize = `${width/1130}em`;
    });
}

let goldButton = document.getElementById("goldButton");
let audio = new Audio('../images/were_rich.ogg');

goldButton.addEventListener('click', () => {
    audio.play();
})

