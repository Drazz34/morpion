let board = Array.from(document.querySelectorAll('.cell'));
let currentPlayer = 'X';
let gameActive = false;
let players = [];

let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.getElementById('play').addEventListener('click', function () {
    resetGame();
    let player1 = '';
    while (!player1) {
        player1 = prompt("Prénom du Joueur 1 : ");
    }

    let player2 = '';
    while (!player2) {
        player2 = prompt("Prénom du Joueur 2 : ");
    }

    while (player1 == player2) {
        player2 = prompt("Prénom déjà pris, veuillez en choisir un autre : ")
    }

    players[0] = player1;
    players[1] = player2;

    // Met à jour les noms des joueurs
    document.getElementById('player1').textContent = "Joueur 1 : " + players[0];
    document.getElementById('player2').textContent = "Joueur 2 : " + players[1];

    document.getElementById('player1').style.color = 'red';
    document.getElementById('player2').style.color = 'green';
    
    gameActive = true;

});

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    if (clickedCell.classList.contains('x') || clickedCell.classList.contains('o') || !gameActive) {
        return;
    }

    clickedCell.classList.add(currentPlayer.toLowerCase());

    updateGameState();
}

function updateGameState() {
    let roundWon = false;

    for (let condition of winningConditions) {
        const a = board[condition[0]].classList.contains(currentPlayer.toLowerCase());
        const b = board[condition[1]].classList.contains(currentPlayer.toLowerCase());
        const c = board[condition[2]].classList.contains(currentPlayer.toLowerCase());

        if (a && a === b && a === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        setTimeout(function () {
            alert(currentPlayer === 'X' ? players[0] + " a gagné !" : players[1] + " a gagné !");
        }, 100);
        return;
    }

    // Vérifie si toutes les cellules ont été remplies
    let roundDraw = true;
    for (let cell of board) {
        if (!cell.classList.contains('x') && !cell.classList.contains('o')) {
            roundDraw = false;
            break;
        }
    }

    // Si toutes les cellules sont remplies et qu'aucun joueur n'a gagné, c'est une égalité
    if (roundDraw) {
        gameActive = false;
        setTimeout(function () {
            alert("Égalité!");
        }, 100);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}



board.forEach(cell => cell.addEventListener('click', handleCellClick));
document.getElementById('reset').addEventListener('click', resetGame);

function resetGame() {
    currentPlayer = 'X';
    board.forEach(cell => {
        cell.classList.remove('x', 'o');
    });
    gameActive = players.length === 2;
}

