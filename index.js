function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}


let grid;
let cols;
let rows;
let resolution = 10;
let clr;
let vi;
let cnt;
let dxy = [[1, 0], [1, 1], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]]


function setup() {
    createCanvas(800, 600);
    cols = width / resolution;
    rows = height / resolution;
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            grid[i][j] = new Cell(round(Math.random()),0);
        }
    }   
}


function draw(){
    background(0);



    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            let x = i * resolution;
            let y = j * resolution;
            cur = grid[i][j]
            strokeWeight(9);
            if (grid[i][j].state == 1) {
                // <5 blue
                if ( cur.size < 5) {
                    clr = color(100, 100, 255);
                    stroke(clr);
                    point(x, y)
                    
                }
                // 10 ~ 20 red
                else if (cur.size >= 5 && cur.size < 20) {
                    clr = color(255, 100,100 );
                    stroke(clr);
                    point(x,y)
                }
                
                // >30 green
                else {
                    clr = color(100, 255,100);
                    stroke(clr);
                    point(x,y)
                
                }
            }
            
        }
    }



    let next = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j].state;

            
                let sum = 0;
                for (let k = 0; k < 8; k++) {
                    let col = (i + dxy[k][0] +cols) % cols
                    let row = (j + dxy[k][1] + rows) % rows;
                    sum += grid[col][row].state
                }
                let neighbors = sum;

                if (state === 0 && neighbors === 3) {
                    next[i][j] = new Cell(1,grid[i][j].size);
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = new Cell(0,grid[i][j].size);
                } else {
                    next[i][j] = new Cell(state,grid[i][j].size);
                }
        }
    }

    grid = next;

    vi = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
                resetVi(vi);
                cnt=0
                dfs(i, j)
                grid[i][j].size = cnt;
        }
    }

}

const dfs = (y,x) => {
    if (y < 0 || x < 0 || y >= cols || x >= rows) return;
    if (vi[y][x] ===1) return;
    if (grid[y][x].state === 0) return;
    vi[y][x] = 1;
    cnt++;
    dfs(y + 1, x);
    dfs(y - 1, x);
    dfs(y, x + 1);
    dfs(y, x - 1);

    dfs(y+1, x + 1);
    dfs(y+1, x - 1);
    dfs(y-1, x + 1);
    dfs(y-1, x - 1);
}


const resetVi = (x) => {
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++) {
            x[i][j] = 0;
        }
    }

}

function mouseClicked(e) {
    console.log(e.target)
    stroke(255);
}



const a = document.appendChild()