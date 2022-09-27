let cells = document.querySelectorAll('.cell');
let turn = 'O';

const gameBoard = ( () => {
    let cellsContent = ['','','','','','','','',''];
    let stateOfGame = 'Playing';

    const showContent = () => {
        let i = 0;
        for (const cell of cells) {
            cell.innerHTML = cellsContent[i];
            i++;
        }
    }

    const reset = () => {
        for (let i = 0; i < cellsContent.length; i++) {
            cellsContent[i] = '';
        }
        turn = 'O';
        stateOfGame = 'Playing';
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

        if (stateOfGame == 'Win') {
            if (turn == 'X'){
                console.log("Player O wins!");
            } else {
                console.log("Player X wins!");
            }
            console.log("Play again");
            reset();
        }
    };

    const changeCellContent = (position, value) => {
        if (cellsContent[position] == '') {
            cellsContent[position] = value;
            if (value == 'X') {
                turn = 'O';
            } else {
                turn = 'X';
            }
        } else {
            alert("You have to choose an empty cell!!")
        };
        showContent();
        checkStateOfTheGame();
    }

    return {showContent, changeCellContent, cellsContent, reset};

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

form.addEventListener('submit', (e) => {
    e.preventDefault();
} );



