

let board = [

    [0, 4, 6,   8, 0, 7,    0, 1, 3],
    [0, 8, 0,   6, 0, 4,    0, 0, 5],
    [0, 0, 9,   0, 3, 1,    0, 0, 0],

    [0, 1, 8,   3, 0, 9,    5, 0, 7],
    [0, 0, 0,   4, 0, 0,    0, 2, 0],
    [0, 0, 0,   0, 0, 6,    3, 4, 8],

    [0, 9, 4,   5, 0, 2,    8, 0, 1],
    [0, 0, 1,   0, 0, 8,    0, 5, 6],
    [0, 0, 0,   0, 0, 3,    4, 0, 2],

]

let w = board[0].length
let h = board.length



let s = 50

let selected = []

let solving = 0

function fits(n, pos) {

    console.log("checking if fitting", pos)

    let row_vals = []
    let col_vals = []
    let square_vals = []

    for (let x = 0; x < w; x++) {
        for(let y = 0; y < h; y ++) {

            if (y == pos[1]) {
                col_vals.push(board[y][x])
            }

            if (x == pos[0]) {
                row_vals.push(board[y][x])
            }

        }
    }

    let square_x = 0;
    let square_y = 0;

    //X ---------------------------->

    if (pos[0] < 3){
        square_x = 1
    }
   
    else if (pos[0] > 2 && pos[0] < 6) {
        square_x = 2
    }
    
    else {
        square_x = 3
    }

    //Y -------------------------------->

    if (pos[1] < 3){
        square_y = 1
    }
   
    else if (pos[1] > 2 && pos[1] < 6) {
        square_y = 2
    }
    
    else {
        square_y = 3
    }

    //square_x, square_y = 1;

    //console.log(square_x, square_y)

    for (let y1 = (square_y - 1) * 3; y1 < (square_y - 1) * 3 + 3; y1 ++) {
        for (let x1 = (square_x - 1) * 3; x1 < (square_x - 1) * 3 + 3; x1 ++) {
            square_vals.push(board[y1][x1])

        }
    }

    console.log(row_vals, col_vals,square_vals)

    for (let r = 0; r < row_vals.length; r++) {
        if (row_vals[r] === n) {console.log("not fitting"); return 0}
    }
    for (let c = 0; c < col_vals.length; c++) {
        if (col_vals[c] === n) {console.log("not fitting"); return 0}
    }
    for (let s = 0; s < square_vals.length; s++) {
        if (square_vals[s] === n) {console.log("not fitting"); return 0}
    }
    
    console.log(1)
    return 1

}

function solve(n) {
   

    let pos = [parseInt(n % w), parseInt(n / h)]
    console.log("my pos", pos)

    // If filled
    if (board[pos[1]][pos[0]] != 0) {
        if (pos[0] == w - 1 && pos[1] == h - 1) {
            console.log("n:", n, "Im at 8,8 but im already filed")
            return 1
        } else {
        
            // If the next cell returns 1 we have reached the end. Because the only way a cell can return 1
            // is if we either got to the end and succeded or it was send up the chain starting at the end
            
            if (solve(n + 1) == 1) {
                return 1
            }
            // If the next cell returns 0 we just send it through up the chain without doing anything. 
            // because the cell was filled from the start
            else {
                console.log("n:", n, "next cell returned 0: but i was already filled - returning 0 for previus cell to delete")
                return 0
            }
        }
    } else {
        
        // Going through every number from 1 to 9
        
        for (let i = 1; i < 10; i++) {

            // Checking if it fits
            if (fits(i, pos) == 1) {

                console.log("i fit", pos, i)

                // Service message
                console.log("n:", n, "Found fitting number:", i)

                // Sets the cell to the fiting number
                board[pos[1]][pos[0]] = i

                // Cheking if we are the last cell
                // If it fits and we are the last cell the soduko has been solved and we return 1
                if (pos[0] == w - 1 && pos[1] == h - 1) {
                    console.log("n:", n, "Number was fitting and i am at 8,8 number:", i)
                    return 1
                }

                // If we are not the last cell
                // Place the number and go on
            
                else {
                    console.log("n:", n, "Number was fitting but im at", pos[0], pos[1])
                    
                    // If the next cell returns 0 we just send it through up the chain without doing anything. 
                    // because the cell was filled from the start
                    
                    if (solve(n + 1) == 1){
                        return 1
                    }
                    // If it returned 0 something down the chain did not fit and we delete our number to try the next
                    else {
                        console.log("n:", n, "next cell returned 0: deleting cell trying next number")
                        board[pos[1]][pos[0]] = 0
                        console.log("deleted cell", board[pos[1]][pos[0]])
                    }
                }
            } else {
                console.log("n:", n, "number not fitting", i)
            }
        }

        // If we got through every number but the cell is still 0
        // Nothing was fitting
        if (board[pos[1]][pos[0]] == 0) {
            //console.log("n:", n, "went through all numbers cell still 0")
            // We return 0 to trigger backtracking in the previus cell
            return 0
        }

    }

}


function setup() {

    createCanvas(450, 450)

    let button = createButton("Solve")
    button.mousePressed(buttonPressed)

}

function draw() {

    background(255)


    stroke(0)

    
    
    noFill()
    for (let i = 0; i < w; i ++) {
        for(let j = 0; j < h; j++) {
            //console.log("drev rect")
            strokeWeight(1)
            if (j == selected[1] && i == selected[0]) {
                fill(0,0,255, 100)
            } else {
                noFill()

            }
            rect(i* (450 / w), j*(450 / h), 450 / w, 450 / h)
            if (board[j][i] != 0) {
                stroke(0)
                text(board[j][i], i* (450 / w) + (450 / w) / 2, j*(450 / w) + (450 / w) / 2)
            }
            stroke(0)
            if (i % 3 == 0) {
                strokeWeight(3)
                line(i * (450 / w), 0, i * (450 / h), 450)
            }
            if (j % 3 == 0) {
                strokeWeight(3)
                line(0, j * (450 / w), 450, j * (450 / h))
            }
        }
    }

}

function buttonPressed() {
    console.log("solving")
    solve(0)
}

function mousePressed() {

    selected[0] = parseInt(mouseX / 50)
    selected[1] = parseInt(mouseY / 50)

}

function keyPressed() {
    console.log(keyCode)
    switch(keyCode) {
        case 49:
            if (fits(1, [selected[0], selected[1]])) {
                board[selected[1]][selected[0]] = 1
            }
            break
        case 50:
            if (fits(2, [selected[0], selected[1]])) {
                board[selected[1]][selected[0]] = 2
            }
            break
        case 51:
            if (fits(3, [selected[0], selected[1]])) {
                board[selected[1]][selected[0]] = 3
            }
            break
        case 52:
            if (fits(4, [selected[0], selected[1]])) {
                board[selected[1]][selected[0]] = 4
            }
            break
        case 53:
            if (fits(5, [selected[0], selected[1]])) {
                board[selected[1]][selected[0]] = 5
            }
            break
        case 54:
            if (fits(6, [selected[0], selected[1]])) {
                board[selected[1]][selected[0]] = 6
            }
            break
        case 55:
            if (fits(7, [selected[0], selected[1]])) {
                board[selected[1]][selected[0]] = 7
            }
            break
        case 56:
            if (fits(8, [selected[0], selected[1]])) {
                board[selected[1]][selected[0]] = 8
            }
            break
        case 57:
            if (fits(9, [selected[0], selected[1]])) {
                board[selected[1]][selected[0]] = 9
            }
            break
        case 8:
            board[selected[1]][selected[0]] = 0
            break
        case 46:
            for (let x = 0; x < w; x++) {
                for (let y = 0; y < h; y++) {
                    board[y][x] = 0
                }
            }
            break
    }   
}