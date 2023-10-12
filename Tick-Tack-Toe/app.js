const X_class = 'x'
const CIRCLE_class = 'circle'
const winningComb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
const cellEl = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const btn = document.getElementById('restart')
const WinTextEL = document.querySelector('[win-text]')
const WinText = document.getElementById('wins')
let circleTurn

startGame()

btn.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
    cellEl.forEach(cell => {
        cell.classList.remove(X_class)
        cell.classList.remove(CIRCLE_class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    hover()
    WinText.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_class : X_class
   placeMark(cell, currentClass)
   //check win
   if(checkWin(currentClass)){
    endGame(false)
   } else if (isDraw()){
    endGame(true)
   } else {
        swapTruns()
        hover()
   }
   //check draw
   //switch turns

}

function endGame(draw){
    if(draw){
        WinTextEL.innerText = 'Draw!'
    } else{
        WinTextEL.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    WinText.classList.add('show')
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTruns(){
    circleTurn = !circleTurn
}

function isDraw(){
    return [...cellEl].every(cell =>{
        return cell.classList.contains(X_class) ||
        cell.classList.contains(CIRCLE_class)
    })
}

function hover(){
    board.classList.remove(X_class)
    board.classList.remove(CIRCLE_class)
    if(circleTurn){
        board.classList.add(CIRCLE_class)
    } else{
        board.classList.add(X_class)
    }
}

function checkWin(currentClass){
    return winningComb.some(combination =>{
        return combination.every(index => {
            return cellEl[index].classList.contains(currentClass)
        })
    })
}