const board = document.querySelectorAll('.square')
const reset = document.querySelector('header input')
const message = document.querySelector('footer span')
let turn = 0
let moves = []
let gameOver = false

for (let i = 0; i < board.length; i ++){
    const square = board[i]

    square.addEventListener('click', ()=>{
       if (makeSelection(square)){

        updateMoves(i, square.innerHTML, parseInt(square.dataset['square']))

        if (checkTie(moves)){
            document.querySelector('#winner').innerHTML = "Tie"
        }else{
            document.querySelector('#winner').innerHTML = checkWin(moves)
        }
       }
    })
}
const updateMoves = (place,player,points)=> {
    moves[place] = [player,points]
}
const checkTie = (arr)=>{
    let xMoves = arr.filter(a => a[0]=="X")
    let oMoves = arr.filter(a => a[0]=="O")
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == undefined || null) {
            return false
        }
    }
    if (row(xMoves) === false && row(oMoves) === false && arr.length === 9) return true
}

const checkWin = (arr)=> {
    let xMoves = arr.filter(a => a[0]=="X")
    let oMoves = arr.filter(a => a[0]=="O")
    
    if (row(xMoves)) {
        gameOver = !gameOver
        return "X"
    }
    if (row(oMoves)) {
        gameOver = !gameOver
        return "O"
    }
    return "Pending"
}
const row = (arr)=>{
    for (let i = 0; i < arr.length; i++) {        
        for (let j = i + 1 ; j < arr.length; j++) {
            for (let k = j + 1; k < arr.length; k++) {
                if (arr[i][1] + arr[j][1] + arr[k][1] === 15) {
                    document.querySelector(`#turn`).innerHTML = "Game Over"
                    return true;
                  }else { 
                      return false
                  }
            }
        }
    }
}
const emptyboard = () => {
    moves = []
    gameOver = false
    document.querySelector(`#turn`).innerHTML = "X"
    document.querySelector(`#winner`).innerHTML = ""
    turn = 0 // make first user be X all the time
    for (let i = 0; i < board.length; i ++){
        const square = board[i]
        square.innerHTML = ''
    }
}

const makeSelection = (sel) => {    
    if (gameOver || sel.innerHTML !== ''){
        return false
    } 
    switch (turn) {
        case 0:
            sel.innerHTML = 'X'
            turn ++
            document.querySelector(`#turn`).innerHTML = "O"
            break;
        case 1:
            sel.innerHTML = 'O'
            turn --
            document.querySelector(`#turn`).innerHTML = "X"
            break;
    }
    return true

}

reset.addEventListener('click', emptyboard)