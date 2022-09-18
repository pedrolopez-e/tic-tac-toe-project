let cells = document.querySelectorAll('.cell');
let turn = 'O';

const gameBoard = ( () => {
    let cellsContent = ['','','','','','','','',''];

    const showContent = () => {
        let i = 0;
        for (const cell of cells) {
            cell.innerHTML = cellsContent[i];
            i++;
        }
    }

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
    }
    
    return {showContent, changeCellContent, cellsContent};

})();


const playerFactory = (symbol) => {
    const setSymbol = (position) => {
        gameBoard.changeCellContent(position, symbol);
        gameBoard.showContent();
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



/*cells.forEach(cell => cell.addEventListener('clic', (e) => {
    if (turn == 'X') {
        xPlayer.setSymbol(parseInt(e.target.getAttribute('data-id')));
    } else {
        oPlayer.setSymbol(parseInt(e.target.getAttribute('data-id')));
    };
}));*/