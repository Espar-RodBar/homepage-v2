const portraitsEls = document.querySelectorAll(".hero-portrait");
const dynamicTextEl = document.querySelector("#hero-dinamic-text");

const mainNavWrapEl = document.getElementById("main-nav-wrap");

const mobileMenuBtn = document.querySelector(".mobile-nav-burger-btn");
const menuBackdropEl = document.querySelector(".menu-backdrop-layer");
const mainNavWrapperEl = document.querySelector(".main-nav-links-wrapper");

const cellMenuActClassFlag = "cell--active";
const mainLinkCSS = "main-nav-link";

const pageState = {
    isCellMenuAct: false,
};

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

window.addEventListener("load", moveHeroElements);

// Add/remove class functions
function addClass(className, el) {
    el.classList.add(className);
}

function remvClass(className, el) {
    el.classList.remove(className);
}

// Nav handler
function activateMobileMenu() {
    if (pageState.isCellMenuAct) {
        new Promise((res, rej) =>
            res(remvClass(cellMenuActClassFlag, menuBackdropEl))
        )
            .then(() =>
                setTimeout(remvClass, 300, cellMenuActClassFlag, mobileMenuBtn)
            )
            .then(() =>
                setTimeout(
                    remvClass,
                    300,
                    cellMenuActClassFlag,
                    mainNavWrapperEl
                )
            )
            .then(() => (pageState.isCellMenuAct = false))
            .catch((err) => console.log(err));
    } else {
        new Promise((res, rej) => {
            res(addClass(cellMenuActClassFlag, mobileMenuBtn));
        })
            .then(() => addClass(cellMenuActClassFlag, menuBackdropEl))
            .then(() =>
                setTimeout(
                    addClass,
                    600,
                    cellMenuActClassFlag,
                    mainNavWrapperEl
                )
            )
            .then(() => (pageState.isCellMenuAct = true))
            .catch((err) => console.log(err));
    }
}

// When a menu link is activated in mobile, close the menu.
function closeMainNavClick(e) {
    if (pageState.isCellMenuAct && e.target.classList.contains(mainLinkCSS)) {
        setTimeout(activateMobileMenu, 0);
    }
}

// Events
mobileMenuBtn.addEventListener("click", () => {
    activateMobileMenu();
});

mainNavWrapperEl.addEventListener("click", (e) => {
    closeMainNavClick(e);
});
