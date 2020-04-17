window.onload = function () {
    var c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    c.addEventListener('click', handleClick);
}



function mousePOS(c, evt) {
    var rect = c.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function handleClick(e) {
    var pos = mousePOS(canvas, e);
    posx = pos.x;
    posy = pos.y;

    var xpos = Math.trunc(posx / 63);
    var ypos = Math.trunc(posy / 63);

    alert(xpos + " " + ypos);
    var square = (ypos * 16) + xpos;
    alert("Square chosen: " + square);
}
//when a position on the board is clicked
//check the coordinates to find cell  
//check if cell is alive or dead from the array 
//if alive do nothing 
//if dead delete the cell 
//update cell w/color representing the user, 
//update the array that represents the gameboard
//send to server side 

//GETTING SQUARE CHOSEN ON GAME BOARD ALGORITHM 
// SQUARECLICKED = (YCOORDINATE +16) + XCOORDINATE
// have to account of size of border for game board since size is 4px



function draw() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    for (var x = 0; x < 16; x++) {

        for (var y = 0; y < 16; y++) {
            ctx.strokeRect(63 * x, 63 * y, 63, 63);
        }
    }
}

draw();
