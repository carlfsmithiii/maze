const gameNode = document.getElementById("gameArea");
const playerNode = makePlayerNode();
const [cellHeight, cellWidth] = getCellDimensions();
const direction = {
    down: 1,
    up: -1,
    left: -1,
    right: 1,
    none: 0
};

const wallChar = "█";
const hallChar = "░";
const passageChars = [hallChar, "S", "F"];
const map = [
  "█████████████████████",
  "█░░░█░░░░░█░░░░░█░█░█",
  "█░█░█░███░█████░█░█░█",
  "█░█░█░░░█░░░░░█░█░░░█",
  "█░███████░█░███░█░█░█",
  "█░░░░░░░░░█░░░░░█░█░█",
  "█░███░█████░█████░█░█",
  "█░█░░░█░░░█░█░░░░░█░█",
  "█░█████░█░█░█░███░█░F",
  "S░░░░░█░█░█░█░█░█░███",
  "█████░█░█░█░█░█░█░█░█",
  "█░░░░░█░█░█░░░█░█░█░█",
  "█░███████░█████░█░█░█",
  "█░░░░░░░█░░░░░░░█░░░█",
  "█████████████████████"
];

const mazeWidth = 21;
const mazeHeight = 15;

let playerPosition = {
    row: 9,
    column: 0,
}
let isWon = false;

function initMaze() {
    for (let row = 0; row < mazeHeight; row++) {
        const newRow = document.createElement("div");
        newRow.classList.add("row");
        gameNode.appendChild(newRow);
        for (let column = 0; column < mazeWidth; column++) {
            const newCell = document.createElement("div");
            if (map[row][column] == "█") {
                newCell.classList.add("gameCell", "wall");
            } else if (row == playerPosition[0] && column == playerPosition[1]) {
                newCell.classList.add("gameCell", "player");
            } else {
                newCell.classList.add("gameCell", "hallway");
            }
            newRow.appendChild(newCell);
        }
    }

    setPlayerPosition(playerPosition['row'], playerPosition['column']);
}

function makePlayerNode() {
    let playerNode = document.createElement("div");
    playerNode.classList.add("gameCell", "player");
    gameNode.appendChild(playerNode);
    return playerNode;
}

function setPlayerPosition(row, column) {
    playerNode.style.top = row * cellHeight + "px";
    playerNode.style.left = column * cellWidth + "px";
}

function getCellDimensions() {
    const styles = window.getComputedStyle(playerNode);
    const height = /\d+/.exec(styles.height);
    const width = /\d+/.exec(styles.width);
    return [height[0], width[0]];
}

function play() {
    document.addEventListener("keydown", (event) => {
        if (!isWon) {
            const keyName = event.key;
            if (keyName == "ArrowDown") {
                downPressed();
            } else if (keyName == "ArrowUp") {
                upPressed();
            } else if (keyName == "ArrowLeft") {
                leftPressed();
            } else if (keyName == "ArrowRight") {
                rightPressed();
            }
            checkWin();
        }
    });
}

function downPressed() {
    tryToMovePlayer(direction.down, direction.none);
}

function upPressed() {
    tryToMovePlayer(direction.up, direction.none);
}

function rightPressed() {
    tryToMovePlayer(direction.none, direction.right);
}  

function leftPressed() {
    tryToMovePlayer(direction.none, direction.left);
}

function tryToMovePlayer(rowShift, columnShift) {
    const possibleNewPosition = [playerPosition.row + rowShift, playerPosition.column + columnShift];
    if (isValidPosition(...possibleNewPosition)) {
        playerPosition = {
            row: possibleNewPosition[0],
            column: possibleNewPosition[1]
        }
        setPlayerPosition(playerPosition.row, playerPosition.column);
    }
}

function isValidPosition(row, column) {
    if (isRowInGrid(row) && isColumnInGrid(column)) {
        return passageChars.includes(map[row][column]);
    }
}

function isRowInGrid(row) {
    return row >= 0 && row < mazeHeight;
}

function isColumnInGrid(column) {
    return column >= 0 && column < mazeWidth;
}

function checkWin() {
    if (map[playerPosition['row']][playerPosition['column']] == "F") {
        const winningHeading = document.createElement("h1");
        winningHeading.appendChild(document.createTextNode("YOU WIN!"));
        document.body.appendChild(winningHeading);
        isWon = true;
    }
}

initMaze();
play();