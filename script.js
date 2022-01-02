const startBox = document.querySelector(`#start-box`);
const gameBoard = document.querySelector(`#game-board`);
// alert message
const alertGame = document.getElementById('alert');
const play = document.querySelector(`#play`);
play.addEventListener('click', () => {
    // get players information
    const playerName1 = document.querySelector(`#player-name-1`).value.trim();
    const playerSign1 = document.querySelector(`#sign-1`).value.trim();
    const playerName2 = document.querySelector(`#player-name-2`).value.trim();
    const playerSign2 = document.querySelector(`#sign-2`).value.trim();
    const message = document.querySelector(`#message`);
    message.style.display = "block";
    if (playerName1 && playerName2 && playerSign1 && playerSign2 !== "") {
        if (playerSign1 === playerSign2) {
            // alert when input same sign
            message.innerHTML="Please select a different sign";
            setTimeout( () => { message.style.display = "none"; } , 3000);
        } else {
            const player1 = {
                name: `${playerName1}`,
                sign: `${playerSign1}`,
            };
            const player2 = {
                name: `${playerName2}`,
                sign: `${playerSign2}`,
            };
            //save player information in local storage
            localStorage.setItem('info1' , JSON.stringify(player1));
            localStorage.setItem('info2' , JSON.stringify(player2));
            // close start box & open the game board
            startBox.style.display = "none";
            gameBoard.style.display = "block";
            // load player information
            var info1 = JSON.parse(localStorage.getItem('info1'));
            var info2 = JSON.parse(localStorage.getItem('info2'));
            // show player name
            const turn1 = document.querySelector(`#turn1`);
            turn1.innerHTML = info1.name;
            const turn2 = document.querySelector(`#turn2`);
            turn2.innerHTML = info2.name;
            // player element selected
            let elements1 = [];
            let elements2 = [];
            // run game
            const boardElement = document.querySelectorAll(`.board-element`);
            let click = 0;
            let point1 = 0;
            let point2 = 0;
            for (let j = 0 ; j < boardElement.length ; j++) {
                // active player
                const turn = document.querySelectorAll(`.noturn`);
                boardElement[j].addEventListener('click' , () => {
                    // select elements by player
                    if (boardElement[j].innerHTML === "") {
                        click++;
                        if (click % 2 === 1) {
                            // player 1 turn
                            boardElement[j].innerHTML = info1.sign;
                            elements1.push(j);
                            // check player 1 won?
                            if (elements1.includes(0) && elements1.includes(1) && elements1.includes(2) === true
                            || elements1.includes(3) && elements1.includes(4) && elements1.includes(5) === true
                            || elements1.includes(6) && elements1.includes(7) && elements1.includes(8) === true
                            || elements1.includes(0) && elements1.includes(3) && elements1.includes(6) === true
                            || elements1.includes(1) && elements1.includes(4) && elements1.includes(7) === true
                            || elements1.includes(2) && elements1.includes(5) && elements1.includes(8) === true
                            || elements1.includes(0) && elements1.includes(4) && elements1.includes(8) === true
                            || elements1.includes(2) && elements1.includes(4) && elements1.includes(6) === true) {
                                alertGame.style.display = "flex";
                                alertGame.innerHTML = `${info1.name} is won`;
                                point1++;
                                const result1 = document.querySelector(`#point1`);
                                result1.innerHTML = point1;
                                resumeGame();
                            } else if(click === 9) {
                                // draw game
                                    alertGame.style.display = "flex";
                                    alertGame.innerHTML = 'Game Draw!';
                                    resumeGame();
                            }
                        } else {
                            // player 2 turn
                            boardElement[j].innerHTML = info2.sign;
                            elements2.push(j);
                            // check player 2 won?
                            if (elements2.includes(0) && elements2.includes(1) && elements2.includes(2) === true
                            || elements2.includes(3) && elements2.includes(4) && elements2.includes(5) === true
                            || elements2.includes(6) && elements2.includes(7) && elements2.includes(8) === true
                            || elements2.includes(0) && elements2.includes(3) && elements2.includes(6) === true
                            || elements2.includes(1) && elements2.includes(4) && elements2.includes(7) === true
                            || elements2.includes(2) && elements2.includes(5) && elements2.includes(8) === true
                            || elements2.includes(0) && elements2.includes(4) && elements2.includes(8) === true
                            || elements2.includes(2) && elements2.includes(4) && elements2.includes(6) === true) {
                                alertGame.style.display = "flex";
                                alertGame.innerHTML = `${info2.name} is won`;
                                point2++;
                                const result2 = document.querySelector(`#point2`);
                                result2.innerHTML = point2;
                                resumeGame();
                            }
                        }
                    } else {
                        // if reselect the element
                        alertGame.style.display = "flex";
                        alertGame.innerHTML = 'Select Another element!';
                        setTimeout( () => {
                            alertGame.style.display = "none";
                        } , 1000);
                    }
                });
                // resume game
                function resumeGame() {
                    setTimeout ( () => {
                        elements1 = [];
                        elements2 = [];
                        click = 0;
                        alertGame.style.display = "none";
                        boardElement.forEach(element => {
                            element.innerHTML = "";
                        });
                    }, 2000);
                }
            }
        }
    } else {
        // alert when empty input
        message.innerHTML="Please complete the forms";
        setTimeout( () => { message.style.display = "none"; } , 3000);
    }
});

//start game with enter key
startBox.addEventListener("keydown", (event) => {
    if (event.key == "Enter") { play.click();}
});

// create board game
const board = document.querySelector(`#board`);
let n = 3;
for (let i = 0 ; i < n*n ; i++) {
    let div = document.createElement(`div`);
    board.appendChild(div);
    div.classList.add('board-element');
}

// reset game
const reset = document.querySelector(`#reset`);
reset.addEventListener('click' , () => {
    localStorage.clear();
    location.reload();
});