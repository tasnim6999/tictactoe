/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};


// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    if (board[position] === ' ') {
        board[position] = mark;
    }

}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    let outputBoard = {};

    for (let position in board) {
        if (board[position] === ' ') {
            outputBoard[position] = position;
        } else {
            outputBoard[position] = board[position];
        }
    }

    console.log(` ${outputBoard[1]} | ${outputBoard[2]} | ${outputBoard[3]} `);
    console.log(" --------- ");
    console.log(` ${outputBoard[4]} | ${outputBoard[5]} | ${outputBoard[6]} `);
    console.log(" --------- ");
    console.log(` ${outputBoard[7]} | ${outputBoard[8]} | ${outputBoard[9]} `);
}



// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String


function validateMove(position) {
    if (isNaN(position)){  //Not a number
        return false;  
    } 
   
    if (position < 1 || position > 9) {  
        return false;  
    }

    if (board[position] !== ' ') {
        return false;  
    }

    return true;

}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6], 
    [7, 8, 9], 
    [1, 4, 7], 
    [2, 5, 8], 
    [3, 6, 9], 
    [1, 5, 9], 
    [3, 5, 7]  
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
for (let e of winCombinations) {
        if (board[e[0]] === player &&
            board[e[1]] === player &&
            board[e[2]] === player) {
            return true;
        }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
for (let position in board) {
        if (board[position] === ' ') {
            return false; 
        }
    }
    return true; 
}


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let ValidMove = false;

    while (!ValidMove) {
        let position = prompt(`${player}'s turn, input: `);

        if (validateMove(position)) {
            markBoard(position, player);
            ValidMove = true;
        } else {
            console.log(`Invalid. Only choose an empty position between 1 and 9.`);
        }
    }

    printBoard();

    if (checkWin(player)) {
        console.log(`WINNER: ${player}. End Game!`);
        winnerIdentified = true;
    } else if (checkFull()) {
        console.log(`End. It's a tie.`);
        winnerIdentified = true;
    } else {
        currentTurnPlayer = (player === 'X') ? 'O' : 'X';
    }
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    playTurn(currentTurnPlayer);
}

// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
// Function to reset the game state
function resetGame() {
    board = {
        1: ' ',
        2: ' ',
        3: ' ',
        4: ' ',
        5: ' ',
        6: ' ',
        7: ' ',
        8: ' ',
        9: ' '
    };
    winnerIdentified = false;
    currentTurnPlayer = 'X';
}

// Function to ask the players if they want to restart the game
function askForRestart() {
    const response = prompt('Do you want to restart the game? (y/n): ').toLowerCase();
    return response === 'y';
}

// Main game loop
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

while (true) {
    while (!winnerIdentified) {
        playTurn(currentTurnPlayer);
    }

    if (askForRestart()) {
        resetGame();
        console.log('\nGame restarted: \n\n' +
            ' 1 | 2 | 3 \n' +
            ' --------- \n' +
            ' 4 | 5 | 6 \n' +
            ' --------- \n' +
            ' 7 | 8 | 9 \n');
    } else {
        break; // Exit the game loop if the players don't want to restart
    }
}