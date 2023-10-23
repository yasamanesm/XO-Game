
//Set the playes and turn 
const squares = document.querySelectorAll('.squares');
const playerX = "X";
const playerO = "O";
var turn = playerX;
let flag = false;

// Creat an array for our squares (9 squares)
const boardNum = Array(squares.length).fill(null);;


//our Elements
const line = document.querySelector('.line');
const turnTxt = document.querySelector('.turn');
const winningMessage = document.querySelector('.winning-message');
const restartBtn = document.querySelector('.restart');


squares.forEach(square => {
    square.addEventListener('click', squareClick);
});

restartBtn.addEventListener('click', restartGame);

function hoverOnSquare() {
    //after winning you cannot see hover 
    if (winningMessage.classList.contains('show')) {
        return;
    }
    //clear hover 
    squares.forEach((square) => {
        square.classList.remove("x-hover");
        square.classList.remove("o-hover");
    });

    //creating our class
    const hoverClass = `${turn.toLowerCase()}-hover`;


    squares.forEach((square) => {
        if (square.innerText == "") {
            square.classList.add(hoverClass)
        }
    })
}

hoverOnSquare();
//player's turn text on the board
function playerTurn() {

    let turnText = '';

    if (turn === playerX) {

        turnText = `It is <span style="color: red;">X</span>'s Turn`;

    } else {

        turnText = `It is <span style="color: blue;">O</span>'s Turn`;
    }

    turnTxt.innerHTML = turnText;
}
//Main function
function squareClick(e) {
    if (winningMessage.classList.contains('show')) {
        return;
    }
    const square = e.target;
    const squareNumber = square.dataset.number;
    if (square.innerText != "") {
        return;
    }

    if (turn === playerX) {
        square.innerHTML = `<span style="color: red;">${playerX}</span>`;
        boardNum[squareNumber] = playerX;
        turn = playerO;
    }
    else {
        square.innerHTML = `<span style="color: blue;">${playerO}</span>`;
        boardNum[squareNumber] = playerO;
        turn = playerX;
    }
    playerTurn();
    hoverOnSquare();
    detectWinner();
    if (!flag) {
        checkDraw();
    }
}

//Winning combinations 
const winningCombination = [
    { combination: [0, 1, 2], lineClass: "line-row-1" },
    { combination: [3, 4, 5], lineClass: "line-row-2" },
    { combination: [6, 7, 8], lineClass: "line-row-3" },

    { combination: [0, 3, 6], lineClass: "line-column-1" },
    { combination: [1, 4, 7], lineClass: "line-column-2" },
    { combination: [2, 5, 8], lineClass: "line-column-3" },

    { combination: [0, 4, 8], lineClass: "line-diagonal-1" },
    { combination: [2, 4, 6], lineClass: "line-diagonal-2" },
]

//Detecting the winner

function detectWinner() {

    for (const winComb of winningCombination) {
        const [a, b, c] = winComb.combination;
        const lineClass = winComb.lineClass;
        if (boardNum[a] && boardNum[a] === boardNum[b] && boardNum[a] === boardNum[c]) {

            const winningPlayer = boardNum[a];
            turnTxt.style.display = 'none';
            line.classList.add(lineClass);
            winningMessage.innerHTML = `Player <span class="${winningPlayer === 'X' ? 'x-title' : 'o-title'}">${winningPlayer}</span> won the game!`;
            winningMessage.classList.add('show');
            flag = true;
            return;

        }
    }
}

//Check for draw 

function checkDraw() {
    if (boardNum.every(square => square !== null)) {
        turnTxt.style.display = 'none';
        winningMessage.innerText = 'Uh oh ! ! it is a draw !';
        winningMessage.classList.add('show');
    }
}

//Restart the game

function restartGame() {
    boardNum.fill(null);

    squares.forEach(square => {
        square.innerText = "";
    });

    playerHasWon = false;
    turn = playerX;
    flag = false;

    winningMessage.classList.remove('show');
    turnTxt.style.display = 'block';
    line.className = 'line';
    playerTurn();
    hoverOnSquare();

}