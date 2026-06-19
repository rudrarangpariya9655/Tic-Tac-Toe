let boxes = document.querySelectorAll(".box");
let msg = document.querySelector(".msg");
let turn = true;
let count = 0;
let gameOver = false;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (box.innerText !== "" || gameOver) return;

        if (turn) {
            box.innerText = "O";
            turn = false;
            count++;
            box.style.pointerEvents = "none";
            checkWinner();
            if (!gameOver) setTimeout(() => {autoBot();}, 2000);;
        }
    });
});

function autoBot() {

    if (count >= 9 || gameOver) return;

    let emptyBoxes = [];

    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length === 0) return;

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerText = "X";
    boxes[randomIndex].style.pointerEvents = "none";

    turn = true;
    count++;

    checkWinner();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {

        let pos1v = boxes[pattern[0]].innerText;
        let pos2v = boxes[pattern[1]].innerText;
        let pos3v = boxes[pattern[2]].innerText;

        if (pos1v !== "" && pos2v !== "" && pos3v !== "") {
            if (pos1v === pos2v && pos1v === pos3v) {
                showWinner(pos1v);
                return;
            }
        }
    }

    if (count === 9 && !gameOver) {
        msg.innerText = "Match is Tie";
        gameOver = true;
        setTimeout(() => location.reload(), 3000);
    }
};

const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    gameOver = true;

    boxes.forEach((box) => {
        box.style.pointerEvents = "none";
        box.style.cursor = "not-allowed";
    });

    setTimeout(() => location.reload(), 3000);
};