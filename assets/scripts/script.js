const portraitsEls = document.querySelectorAll(".hero-portrait");
const dynamicTextEl = document.querySelector("#hero-dinamic-text");
const navBrightEl = document.querySelector(".header .main-nav ul::after");
const mainNavWrapEl = document.getElementById("main-nav-wrap");
const burgerBtnEl = document.querySelector(".burger-icon-open");
const closeBtnEl = document.querySelector(".burger-icon-close");

mainNavWrapEl.addEventListener("click", function (ev) {
    const targetEl = ev.target;

    if (targetEl.classList.contains("burger-icon-open")) {
        // open nav menu
        mainNavWrapEl.querySelector("ul").classList.add("show-flex");
        burgerBtnEl.classList.add("hide");
        closeBtnEl.classList.remove("hide");
    } else if (
        targetEl.classList.contains("main-nav-links-container") ||
        targetEl.classList.contains("burger-icon-close") ||
        targetEl.classList.contains("main-nav-link")
    ) {
        // close nav menu
        mainNavWrapEl.querySelector("ul").classList.remove("show-flex");
        burgerBtnEl.classList.remove("hide");
        closeBtnEl.classList.add("hide");
    }
});

const phrases = [
    "I write code!!!",
    "I create Websites!!!",
    "Webpages full responsive!!!",
    "I code with accessibility on mind!!!",
    "I code retrogames!!!",
    "Frontend and backend!!!",
    "Webpages with low data comsumption!!!",
    "All kinds of websites!!!",
    "Leeeeeeeeeeroy Jenkins!!!",
];

function changePortrait(portraits, time = "4000") {
    let index = 0;
    let maxIndex = portraits.length;

    const swapPortraits = () => {
        portraits[index % maxIndex].classList.add("hide");
        index++;
        portraits[index % maxIndex].classList.remove("hide");
    };

    setInterval(swapPortraits, time);
}

function lightElement(element) {
    element.classList.toggle("light");
}

function writeDinamicText(phrases) {
    let phrase;
    let lettersArray;
    let maxIndex;
    let isTextIncreasing = true;
    let index = 0;
    let phraseToWrite = "_";

    const pickPhrase = function (firstTime = false) {
        if (firstTime) phrase = phrases[0];
        else phrase = phrases[Math.floor(Math.random() * phrases.length)];

        lettersArray = phrase.split("");
        maxIndex = lettersArray.length;
    };

    pickPhrase(true);

    setInterval(() => {
        // ascending index to write
        if (index === -1) {
            isTextIncreasing = true;
            index++;
            pickPhrase();
        }

        // descending index to delete
        if (index >= maxIndex) {
            isTextIncreasing = false;
        }

        if (isTextIncreasing) {
            phraseToWrite = phraseToWrite.slice(0, index);
            phraseToWrite += lettersArray[index] + "_";
            index++;
        } else {
            phraseToWrite = phraseToWrite.slice(0, index);
            index--;
        }
        dynamicTextEl.innerHTML = phraseToWrite;
    }, "200");
}

function moveHeroElements() {
    document.querySelector(".hero-img-container").classList.add("move-right");
    document.querySelector(".hero-header").classList.add("move-left");
}

changePortrait(portraitsEls);
writeDinamicText(phrases);
lightElement(mainNavWrapEl);

setInterval(lightElement.bind(null, mainNavWrapEl), "40000");

window.addEventListener("load", moveHeroElements);
