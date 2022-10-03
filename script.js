let cells = document.querySelectorAll('.cell');
const winAlert = document.createElement("div");
winAlert.setAttribute("id", "win-alert");
let turn = 'O';

const gameBoard = ( () => {
    let cellsContent = ['','','','','','','','',''];
    let stateOfGame = 'Playing';

    const showContent = () => {
        let i = 0;
        for (const cell of cells) {
            cell.innerHTML = cellsContent[i];
            if (cellsContent[i] == "X") {
                cell.style.color = "orange";
            } else if (cellsContent[i] == "O") {
                cell.style.color = "rgb(169, 241, 60)";
            }
            i++;
        }
    }

    const reset = () => {
        for (let i = 0; i < cellsContent.length; i++) {
            cellsContent[i] = '';
        }
        turn = 'O';
        stateOfGame = 'Playing';
        nameText.innerHTML = oPlayer.name + "'s turn";
        body.removeChild(winAlert);
        showContent();
    };

    const checkStateOfTheGame = () => {
        // Check three in a row
        for (let i = 0; i <= 6; i+=3) {
            if ((cellsContent[i] == cellsContent[i+1] && cellsContent[i+1] == cellsContent[i+2]) && cellsContent[i] != '') {
                stateOfGame = 'Win';
                break;
            };
        }
        // Check three in a column
        for (let i = 0; i <= 3; i++) {
            if ((cellsContent[i] == cellsContent[i+3] && cellsContent[i+3] == cellsContent[i+6]) && cellsContent[i] != '') {
                stateOfGame = 'Win';
                break;
            };
        }
        // Check diagonal
        if ((cellsContent[0] == cellsContent[4] && cellsContent[4] == cellsContent[8] && cellsContent[0] != '') || (cellsContent[2] == cellsContent[4] && cellsContent[4] == cellsContent[6] && cellsContent[2] != '')) {
            stateOfGame = 'Win';
        }

        if (stateOfGame != 'Win' && cellsContent.indexOf("") == -1) {
            stateOfGame = 'Draw';
        };

        if (stateOfGame == 'Win') {
            if (turn == 'X'){
                winAlert.innerHTML = oPlayer.name + " wins!";
            } else {
                winAlert.innerHTML = xPlayer.name + " wins!";
            }
            body.appendChild(winAlert);
        }

        if (stateOfGame != 'Win' && cellsContent.indexOf("") == -1) {
            stateOfGame = "Draw";
        }

        if (stateOfGame == 'Draw') {
            winAlert.innerHTML = "Draw!";
            body.appendChild(winAlert);
        };
    };

    const changeCellContent = (position, value) => {
        if (cellsContent[position] == '') {
            cellsContent[position] = value;
            if (value == 'X') {
                turn = 'O';
                nameText.innerHTML = oPlayer.name + "'s turn";
            } else {
                turn = 'X';
                nameText.innerHTML = xPlayer.name + "'s turn";
            }
        } else {
            alert("You have to choose an empty cell!!")
        }
        showContent();
        checkStateOfTheGame();
        
    }

    return {showContent, changeCellContent, cellsContent, reset, stateOfGame};

})();


const playerFactory = (symbol) => {
    const setSymbol = (position) => {
        gameBoard.changeCellContent(position, symbol);
    }
    return {symbol, setSymbol};
};

const xPlayer = playerFactory('X');
const oPlayer = playerFactory('O');

cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        let position = e.target.getAttribute('data-id');
        if (turn == 'X') {
            xPlayer.setSymbol(position);
        } else {
            oPlayer.setSymbol(position);
        };
    });
})

// Logic to read the form input and afterwards display the names of the players

const form = document.querySelector("form");
const body = document.querySelector("body");
var playerXname = document.createElement("h3");
var playerOname = document.createElement("h3");

let nameText = body.querySelector("p");

form.addEventListener('submit', (e) => {
    e.preventDefault();
} );

form.addEventListener('submit', () => {
    xPlayer.name = form.querySelector("#player-1").value;
    oPlayer.name = form.querySelector("#player-2").value;
    playerXname.innerHTML = xPlayer.name;
    playerOname.innerHTML = oPlayer.name;
    nameText.innerHTML = oPlayer.name + "'s turn";
    form.remove();
});

const resetButton = document.querySelector("#reset-button");

resetButton.addEventListener('click', () => {
    gameBoard.reset();
});


