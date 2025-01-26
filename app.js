
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = []; // Reset the user's sequence
    level++; // Increase the level
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Randomly choose a color
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor); // Add to the game sequence
    console.log(gameSeq);

    gameFlash(randBtn); // Flash the chosen color
}

function checkAns() {
    // Check if the user's last input matches the current game sequence at the same index
    let idx = userSeq.length - 1;

    if (userSeq[idx] === gameSeq[idx]) {
        // If the user has completed the sequence correctly, move to the next level
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Delay levelUp to add one new color
        }
    } else {
        // If the user's input is incorrect, show "Game Over"
        h2.innerHTML = `Game Over! Your score was <b>${level} </b> <br> Please press any key to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150)
        reset(); // Reset the game
    }
}

function btnPress() {
    let clickedBtn = this; // Access the clicked button
    console.log(clickedBtn);
    userFlash(clickedBtn);

    userColor = clickedBtn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor); // Add the clicked color to the user's sequence
    checkAns(); // Check if the user's sequence is correct
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
};

function reset () {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}