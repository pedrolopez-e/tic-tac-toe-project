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
        };
    }

    return {showContent, changeCellContent};
})();