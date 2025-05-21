document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const scoreDisplay = document.getElementById('score');
    const restartBtn = document.getElementById('restart');
    const tryAgainBtn = document.getElementById('try-again');
    const gameOverScreen = document.getElementById('game-over');

    const tileMap = new Map();
    const gifs = {
        2: 'gifs/2.gif',
        4: 'gifs/4.gif',
        8: 'gifs/8.gif',
        16: 'gifs/16.gif',
        32: 'gifs/32.gif',
        64: 'gifs/64.gif',
        128: 'gifs/128.gif',
        256: 'gifs/256.gif',
        512: 'gifs/512.gif',
        1024: 'gifs/1024.gif',
        2048: 'gifs/2048.gif'
    };

    let tileIdCounter = 0;
    let board = [];
    let score = 0;
    let mergedPositions = [];

    function initGame() {
        board = Array(4).fill().map(() => Array(4).fill(0));
        score = 0;
        scoreDisplay.textContent = score;
        grid.innerHTML = '';
        gameOverScreen.style.display = 'none';

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                grid.appendChild(cell);
            }
        }

        addRandomTile();
        addRandomTile();
    }

    function addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    emptyCells.push({ i, j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[i][j] = Math.random() < 0.9 ? 2 : 4;
            createTile(i, j, board[i][j]);
        }
    }

    function createTile(row, col, value) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.row = row;
    tile.dataset.col = col;
    tile.dataset.value = value;
    tile.style.top = `${row * 110 + 10}px`;
    tile.style.left = `${col * 110 + 10}px`;

    const img = document.createElement('img');
    img.src = gifs[value];
    img.alt = value;
    tile.appendChild(img);

    grid.appendChild(tile);

    const key = `${row}-${col}`;
    tileMap.set(key, tile);

    return tile;
}

    function move(direction) {
        let moved = false;
        const oldBoard = JSON.parse(JSON.stringify(board));
        const newBoard = Array(4).fill().map(() => Array(4).fill(0));
        mergedPositions = [];

        if (direction === 'left') {
            for (let i = 0; i < 4; i++) {
                let row = board[i].filter(cell => cell !== 0);
                for (let j = 0; j < row.length - 1; j++) {
                    if (row[j] === row[j + 1]) {
                        row[j] *= 2;
                        score += row[j];
                        row[j + 1] = 0;
                        mergedPositions.push({ i: i, j: j });
                    }
                }
                row = row.filter(cell => cell !== 0);
                while (row.length < 4) row.push(0);
                newBoard[i] = row;
            }
        } else if (direction === 'right') {
            for (let i = 0; i < 4; i++) {
                let row = board[i].filter(cell => cell !== 0);
                for (let j = row.length - 1; j > 0; j--) {
                    if (row[j] === row[j - 1]) {
                        row[j] *= 2;
                        score += row[j];
                        row[j - 1] = 0;
                        mergedPositions.push({ i: i, j: 3 - (row.length - 1 - j) });
                    }
                }
                row = row.filter(cell => cell !== 0);
                while (row.length < 4) row.unshift(0);
                newBoard[i] = row;
            }
        } else if (direction === 'up') {
            for (let j = 0; j < 4; j++) {
                let column = [];
                for (let i = 0; i < 4; i++) {
                    if (board[i][j] !== 0) column.push(board[i][j]);
                }
                for (let i = 0; i < column.length - 1; i++) {
                    if (column[i] === column[i + 1]) {
                        column[i] *= 2;
                        score += column[i];
                        column[i + 1] = 0;
                        mergedPositions.push({ i: i, j: j });
                    }
                }
                column = column.filter(cell => cell !== 0);
                while (column.length < 4) column.push(0);
                for (let i = 0; i < 4; i++) {
                    newBoard[i][j] = column[i];
                }
            }
        } else if (direction === 'down') {
            for (let j = 0; j < 4; j++) {
                let column = [];
                for (let i = 0; i < 4; i++) {
                    if (board[i][j] !== 0) column.push(board[i][j]);
                }
                for (let i = column.length - 1; i > 0; i--) {
                    if (column[i] === column[i - 1]) {
                        column[i] *= 2;
                        score += column[i];
                        column[i - 1] = 0;
                        mergedPositions.push({ i: 3 - (column.length - 1 - i), j: j });
                    }
                }
                column = column.filter(cell => cell !== 0);
                while (column.length < 4) column.unshift(0);
                for (let i = 0; i < 4; i++) {
                    newBoard[i][j] = column[i];
                }
            }
        }

        moved = JSON.stringify(oldBoard) !== JSON.stringify(newBoard);
        if (moved) {
            board = newBoard;
            scoreDisplay.textContent = score;
            updateBoard();
            setTimeout(() => {
                addRandomTile();
                if (isGameOver()) {
                    gameOverScreen.style.display = 'flex';
                }
            }, 100);
        }
    }

function updateBoard() {
    const newTileMap = new Map();

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const value = board[i][j];
            const key = `${i}-${j}`;

            if (value === 0) {
                const oldTile = tileMap.get(key);
                if (oldTile) {
                    oldTile.remove();
                }
                continue;
            }

            let tile = tileMap.get(key);
            if (!tile) {

                tile = createTile(i, j, value);
            } else {
                tile.style.top = `${i * 110 + 10}px`;
                tile.style.left = `${j * 110 + 10}px`;

                if (parseInt(tile.dataset.value) !== value) {
                    tile.dataset.value = value;
                    tile.innerHTML = ''; 

                    const img = document.createElement('img');
                    img.src = gifs[value];
                    img.alt = value;
                    tile.appendChild(img);
                }
            }

            if (mergedPositions.some(pos => pos.i === i && pos.j === j)) {
                tile.classList.add('merge-animate');
                setTimeout(() => tile.classList.remove('merge-animate'), 200);
            }

            newTileMap.set(key, tile);
        }
    }

    for (const [key, tile] of tileMap.entries()) {
        if (!newTileMap.has(key)) {
            tile.remove();
        }
    }

    tileMap.clear();
    for (const [key, value] of newTileMap.entries()) {
        tileMap.set(key, value);
    }

    mergedPositions = [];
}


    function isGameOver() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) return false;
                if (j < 3 && board[i][j] === board[i][j + 1]) return false;
                if (i < 3 && board[i][j] === board[i + 1][j]) return false;
            }
        }
        return true;
    }

    document.addEventListener('keydown', (e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
            move(e.key.replace('Arrow', '').toLowerCase());
        }
    });

    restartBtn.addEventListener('click', initGame);
    tryAgainBtn.addEventListener('click', initGame);

    initGame();
});
