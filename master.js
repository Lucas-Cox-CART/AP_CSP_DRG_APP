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



/* This was incredible painful to make. Left and Right buttons cause carousel items to rotate showing different images. If an animation ISN'T running, it will allow the code within the listener to run. When the listener runs, the animation boolean is switched and a timeout for 1s (which is also the length of the animation) is activated. For the left button, Item3 is brought to the Zeroth slot in the array pushing everything forwards. For the right button, Item0 is brought to the Fourth slot in the array causing the rest of the items to be pulled forwards. Transition durations make the animations run smooth and allows for offscreen elements to shift from one side to another without being seen. */

let carouselButtonLeft = document.getElementById("carousel-buttonLeft");
let carouselButtonRight = document.getElementById("carousel-buttonRight");

let carouselAnimationRunning = false;
let carouselItem = [];

// super-duper useful array sorting algorithm
Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

for (let i = 0; i < 4; i++) {
    carouselItem[i] = document.getElementById(`carouselItem${[i+1]}`);
}


carouselButtonLeft.addEventListener("click", () => {
    if (carouselAnimationRunning == false) {
        carouselAnimationRunning = true;
        carouselItem.move(3,0);
        carouselItem[0].style.transitionDuration = "0s";
        carouselItem[0].style.left = "-70%";
        carouselItem[1].style.left = "15%";
        carouselItem[2].style.left = "100%";
        carouselItem[3].style.left = "100%";
        setTimeout(() => {
            carouselItem[0].style.transitionDuration = "1s";
            carouselAnimationRunning = false;
        }, 1000);
    }
});

carouselButtonRight.addEventListener("click", () => {
    if (carouselAnimationRunning == false) {
        carouselAnimationRunning = true;
        carouselItem.move(0,3);
        carouselItem[3].style.transitionDuration = "0s";
        carouselItem[0].style.left = "-70%";
        carouselItem[1].style.left = "15%";
        carouselItem[2].style.left = "100%";
        carouselItem[3].style.left = "100%";
        setTimeout(() => {
            carouselItem[3].style.transitionDuration = "1s";
            carouselAnimationRunning = false;
        }, 1000);
    }
});



/* this next mission segment took me over an hour. desired state is the state asking if the cursor is hovering over the mission element. current state is asking if an animation is currently running. transition state picks up the desired state and plays the animation and refreshes the desired state, acts like a 'state-manager'. animations are simple keyframes in css. a bunch of other trickery like if currentState is inactive aka if a animation isn't running, that means one must have finished and transitionState will be emptied and prepared for another desiredState. */

let missions = [];

let desiredState = [];
let currentState = [];
let transitionState = [];

let missionIcons = [];
let missionDescriptions = [];

for (let i = 0; i < 8; i++) {

    missions[i] = document.getElementById(`mission${[i]}`);

    desiredState[i] = "";
    transitionState[i] = "";
    currentState[i] = "inactive";

    missionIcons[i] = document.getElementById(`missionIcon${[i]}`);
    missionDescriptions[i] = document.getElementById(`missionDescription${[i]}`);

    missions[i].addEventListener('mouseover', () => {
        desiredState[i] = 1;
    });

    missions[i].addEventListener('mouseout', () => {
        desiredState[i] = 0;
    });

    setInterval(() => {

        if (transitionState[i] == "") {
            transitionState[i] = desiredState[i];
        }

        if (transitionState[i] == 0 && currentState[i] == "inactive") {

            missions[i].style.animationName = "missionNormal";

            missionIcons[i].style.opacity = "1";
            missionIcons[i].style.width = "100%";
            missionDescriptions[i].style.opacity = "0";
            missionDescriptions[i].style.width = "0%";

            currentState[i] = "active";
            setTimeout(() => {
                currentState[i] = "inactive";
                transitionState[i] = "";
            }, 16);
        }

        if (transitionState[i] == 1 && currentState[i] == "inactive") {

            missions[i].style.animationName = "missionHover";

            missionIcons[i].style.opacity = "0";
            missionIcons[i].style.width = "0%";
            missionDescriptions[i].style.opacity = "1";
            missionDescriptions[i].style.width = "100%";

            currentState[i] = "active";
            setTimeout(() => {
                currentState[i] = "inactive";
                transitionState[i] = "";
            }, 600);
        }

        if (currentState[i] == "inactive") {
            transitionState[i] = "";

            missions[i].style.animationName = "missionNormal";

            missionIcons[i].style.opacity = "0";
            missionIcons[i].style.width = "100%";
            missionDescriptions[i].style.opacity = "1";
            missionDescriptions[i].style.width = "0%";
        }

    }, 16);

}

let navLinks = [];

for (let i = 0; i < 8; i++) {
    navLinks[i] = document.getElementById(`navLink${[i]}`);
    navLinks[i].style.fontSize = `${width/1130}em`;
}

window.addEventListener('resize', () => {
    navLinks[i].style.fontSize = `${width/1130}em`;
});

let bugs = [];
let bugTextOuter = [];
let bugTextInner = [];

for (let i = 0; i < 4; i++) {
    bugs[i] = document.getElementById(`bug${[i]}`);
    bugTextOuter[i] = document.getElementById(`bugText${[i]}_outer`);
    bugTextInner[i] = document.getElementById(`bugText${[i]}_inner`);

    ['mouseover', 'mouseout'].forEach(event => {
        bugs[i].addEventListener(event, () => {
            if (event == "mouseover") {
                bugTextOuter[i].style.width = "200px";
                bugTextOuter[i].style.height = "200px";
                bugTextOuter[i].style.border = "2px solid #30363d";
                bugTextInner[i].style.opacity = "1";
                bugTextInner[i].style.fontSize = "1em";
            }

            if (event == "mouseout") {
                bugTextOuter[i].style.width = "0px";
                bugTextOuter[i].style.height = "0px";
                bugTextOuter[i].style.border = "1px solid white";
                bugTextInner[i].style.opacity = "0";
                bugTextInner[i].style.fontSize = "0em";
            }
        });
    });
}


// let bugs = [];
// let bugTexts = [];

// for (let i = 0; i < 4; i++) {
//     bugs[i] = document.getElementById(`bug${[i]}`);
//     bugTexts[i] = document.getElementById(`bugText${[i]}`);

//     bugs[i].addEventListener('mouseover', () => {
//         bugTexts[i].style.width = "200px";
//     });
// }