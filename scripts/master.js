import "./fontSize.js";

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

function missionAnimationStyles(i) {
    missions[i].style.animationName = "missionHover";
    missionIcons[i].style.opacity = "0";
    missionIcons[i].style.width = "0%";
    missionDescriptions[i].style.opacity = "1";
    missionDescriptions[i].style.width = "100%";
    missionDescriptions[i].style.height = "100%";
    missionDescriptions[i].style.margin = "10%";
}

function missionAnimationStylesReverse(i) {
    missions[i].style.animationName = "missionNormal";
    missionIcons[i].style.opacity = "1";
    missionIcons[i].style.width = "100%";
    missionDescriptions[i].style.opacity = "0";
    missionDescriptions[i].style.width = "0%";
    missionDescriptions[i].style.height = "0%";
    missionDescriptions[i].style.margin = "0%";
}

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
            missionAnimationStylesReverse(i);
            currentState[i] = "active";
            setTimeout(() => {
                currentState[i] = "inactive";
                transitionState[i] = "";
            }, 16);
        }
        if (transitionState[i] == 1 && currentState[i] == "inactive") {
            missionAnimationStyles(i);
            currentState[i] = "active";
            setTimeout(() => {
                currentState[i] = "inactive";
                transitionState[i] = "";
            }, 600);
        }
        if (currentState[i] == "inactive") {
            transitionState[i] = "";
            missionAnimationStylesReverse(i);
        }
    }, 16);

}

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
                bugTextOuter[i].style.width = "300px";
                bugTextOuter[i].style.height = "300px";
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

let heroImage = document.getElementById("hero-image");
let heroCounter = 0;

setInterval(() => {
    switch(heroCounter) {
        case 0: 
            heroImage.style.backgroundImage = "url(../images/hero-image1.jpg)";
        break;
        case 1: 
            heroImage.style.backgroundImage = "url(../images/hero-image2.jpg)";
        break;
        case 2: 
            heroImage.style.backgroundImage = "url(../images/hero-image3.jpg)";
        break;
        case 3: 
            heroImage.style.backgroundImage = "url(../images/hero-image0.jpg)";
        break;
    }
    heroCounter++;
    if (heroCounter > 3) {
        heroCounter = 0;
    }
}, 5500);

/* 
TODO:
- Finish other pages
- Replace Lorem Ipsum with actual text

- NEEDS audio
*/