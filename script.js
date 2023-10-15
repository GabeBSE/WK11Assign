window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    function announce(type) {
    const alertElement = document.querySelector('.alert');
    switch (type) {
        case PLAYERO_WON:
            alertElement.innerHTML = 'Player <span class="playerO">O</span> Won!';
            alertElement.classList.remove('alert-success');
            alertElement.classList.add('alert-info'); // Customize the alert style
            break;
        case PLAYERX_WON:
            alertElement.innerHTML = 'Player <span class="playerX">X</span> Won!';
            alertElement.classList.remove('alert-info');
            alertElement.classList.add('alert-success'); // Customize the alert style
            break;
        case TIE:
            alertElement.innerText = 'It\'s a Tie!';
            alertElement.classList.remove('alert-success');
            alertElement.classList.add('alert-warning'); // Customize the alert style
            break;
    }
    alertElement.classList.remove('hide');
}

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
    
        // Hide the Bootstrap alert
        const alertElement = document.querySelector('.alert');
        alertElement.classList.add('hide'); // Add your custom "hide" class
        alertElement.classList.remove('show'); // Remove the Bootstrap "show" class
    
        if (currentPlayer === 'O') {
            // If the current player at the time of reset is 'O', change to 'X'
            changePlayer();
        }

        // Reset each game tile to empty
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    // Add a click event listener for each game tile to handle user actions
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    // Add a click event listener to the reset button to start a new game
    resetButton.addEventListener('click', resetBoard);
});
