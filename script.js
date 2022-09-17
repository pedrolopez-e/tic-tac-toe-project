let cells = document.querySelectorAll('.cell');
let cellsArray = Array.from(cells);

const gameBoard = ( () => {
    
    let cellsContent = ['X','X','X','X','X','X','X','X','X'];

    const showContent = () => {
        let i = 0;
        for (let oneCellContent of cellsContent) {
            cellsArray[i].innerHTML = oneCellContent;
            i++;
        }
    }

    const changeCellContent = (position, value) => {
        if (cellsContent[position] == '') {
            cellsContent[position] = value;
        } else {
            alert("You have to choose an empty cell!!")
        };
    }
    return {showContent, changeCellContent};
})();

/* The player has to have a symbol, and the setSymbol method*/

const playerFactory = (symbol) => {
    const setSymbol = () => {
        gameBoard.changeCellContent(position, symbol);
        gameBoard.showContent();
    }
    return {symbol, setSymbol};
};