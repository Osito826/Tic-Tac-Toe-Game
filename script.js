//Classes set for each turn
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
//Set all winning combos so it knows when someone wins
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
]
//Store all data-cells elements into a an array/NodeList
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
//Value Undefined = falsy value
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

//Function made so our first instance can also have the hover class
function startGame() {
    circleTurn = false
    //Loop thru data-cells, add eventlistener where it can only be clicked on once
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    //Add class to NodeList/array element for whoevers turn is next
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    //Place mark
    placeMark(cell, currentClass)
    //Check for a win
    //Check for a draw
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        //Switch turns
        switchTurns()
        setBoardHoverClass()
    }
}
//Checks who won or if a draw
function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : 
        "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}

//Adds a class to targeted cell element
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
//Sets current circleTurn to opposite value
function switchTurns() {
    circleTurn = !circleTurn
}
//Sets current hover state base on whos turn is next
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}
//Checks True/False if currentClass is contained in every index of each Winning_Combinations
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}