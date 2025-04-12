let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let isFirstLoad = true;

let h2 = document.querySelector("h2");
let overlay = document.getElementById("overlay");
let popup = document.getElementById("gameInfo");
let startButton = document.getElementById("startGame");

// Show popup only on first load
window.addEventListener("load", function() {
    if (isFirstLoad) {
        overlay.classList.add("show");
        popup.classList.add("show");
        isFirstLoad = false;
    }
});

// Hide popup when start button is clicked
startButton.addEventListener("click", function() {
    overlay.classList.remove("show");
    popup.classList.remove("show");
    if (!started) {
        started = true;
        levelUp();
    }
});

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("game started");
        started = true;
        overlay.classList.remove("show");
        popup.classList.remove("show");
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash")
    }, 300);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to start.`;
        document.querySelector("body").style.background = "linear-gradient(135deg, #ff0000, #2a2a2a)";
        setTimeout(function() {
            document.querySelector("body").style.background = "linear-gradient(135deg, #1a1a1a, #2a2a2a)";
        }, 150);
        reset();
    }
}

function btnPress() {
    if (!started) return; // Prevent button clicks before game starts
    console.log(this);
    let btn = this;
    btnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}