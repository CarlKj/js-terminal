const maintext = document.getElementById('maintext');
const body = document.getElementById('body');
const input = document.getElementById('input');
const arrow = document.getElementById('arrow');
const power = document.getElementById('power');
const textcontainer = document.getElementById('text-container');
const ratio = document.getElementById('ratio');
let fastGraphics = false;
let newBoard;
let writing = false;
let lastLines = [];
let roundnumber = 0;
let CurrentLine = -1;
let arrowStat = 0;
let arrowPos = ["\\", "\\", "|", "|", "/", "/", "-", "-"];
let bootUp = true;
let lineNum = 0;
let state = {
    current:"default",
    last:"default",
    version:"v1.04",
    user:"guest",
    username:"Lorem I. Dolor"
}


function reloadFastGraphics() {
    
    if (fastGraphics) {
        let elements = document.querySelectorAll('.f');
        for (let i = 0; i < elements.length; i++) {
            const e = elements[i];
            e.style.textShadow = "none";
        }
    }
}
reloadFastGraphics();


// commands import
// import { i_reset, reset, i_help, i_fill, i_print, i_shred, testprint, i_upgrade, version, i_changelog } from './commands/commands.js';
// screen height max 22 !! //
// screen width  max 64 !! //

power.addEventListener('click', () => {
    if (bootUp) {
        CurrentLine = -1;
        lastLines = [];
        reset();
        lineNum = 0;
        maintext.innerText = "";
        power.classList.add("power-on");
        textcontainer.classList.remove("hide");
        input.classList.remove("hide");
        arrow.classList.remove("hide");
        arrow.classList.remove("hide");
        ratio.classList.remove("gradient-hide");
        ratio.classList.add("gradient-show");
        // automatically focus on input field
        input.focus();
        input.select();

        state.current = "username";
        state.last = "username";
        //startup message
        write(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n   *   '*\n           *\n                *\n                       *\n               *\n                     *\n\n               .                      .\n               .                      ;\n               :                  - --+- -\n               !           .          !\n               |        .             .\n               |_         +\n            ,  | '.\n -- - -- + - < # > - + - -- - -- - \n            '._|_,'\n               T\n               |\n               !\n               :         . : \n               .       *\n - -  demOS ${version}  - -`, "0", 1, true, maintext, false);
        
        bootUp = false;
    } else {
        roundnumber = 0;
        lineNum = 0;
        power.classList.remove("power-on")
        textcontainer.classList.add("hide");
        input.classList.add("hide");
        arrow.classList.add("hide");
        arrow.classList.add("hide");
        ratio.classList.add("gradient-hide");
        ratio.classList.remove("gradient-show");
        maintext.innerText = "";
        bootUp = true;
    }

});



//string = input    
//color = change text color / TODO / never happening
//speed = ms between outputs
//disable = disable writing while running
//object = element to output to
// spin = spin arrow on input side
// func = run function when done writing // has to be a string

function write(string = "(string missing)", color = "0", speed = 24, disable = true, object = maintext, spin = true, func = "") {
    let msg = string;
    if (!(color == "0" || color == 0 || color == "")) {
        object.insertAdjacentHTML("beforeend", `<em class="${color}">`);
    }
    if (disable) {
        writing = true;
    }
    let output = setInterval(() => {
        switch (msg[0]) {
            case "\b":
                object.innerText = object.innerText.slice(0, -1);
                msg = msg.slice(1);
                break;
            case "\n":
                object.innerText += msg[0];
                msg = msg.slice(1);
                lineNum++;
                maintext.scrollIntoView(false); 
                if (lineNum >= 25) { // 23 max line 
                    if (maintext.childNodes[1].nodeName == "#text") {
                        maintext.removeChild(maintext.childNodes[1]);
                    }
                    maintext.removeChild(maintext.childNodes[0]);
                    lineNum--;
                }
            break;
            case " ":
                maintext.scrollIntoView(false);
                object.innerText += msg[0];
                msg = msg.slice(1);
                break;
            default:
                object.innerText += msg[0];
                msg = msg.slice(1);
                break;
        }
        if (spin) {
            arrow.innerText = `${arrowPos[arrowStat]}>`
            arrowStat++;
            if (arrowStat > 7) {
                arrowStat = 0
            }
        }
        if (msg.length == 0 || bootUp == true) {
            clearInterval(output);
            if (func != "") {
                eval(func);
            }
            writing = false;
            maintext.scrollIntoView(false);
        }
    }, speed);
}

document.addEventListener('keydown', event => {
    if (event.key == "Enter") {
        if (!writing && !(input.value == "")) {
            readText(input);
        }
    }
    if (event.key == "ArrowDown") {
        if (!(CurrentLine <= 0) && lastLines[0] != undefined) {
            CurrentLine--;
            input.value = lastLines[CurrentLine];
        } else {
            CurrentLine = -1;
            input.value = "";
        }
    }
    if (event.key == "ArrowUp") {
        if (lastLines[0] != undefined && lastLines.length > CurrentLine + 1) {
            CurrentLine++;
            input.value = lastLines[CurrentLine];
        }
    }
});

function readText(input) {
    CurrentLine = -1;
    if (!(lastLines[0] == input)) {
        lastLines.unshift(input.value);
        if (lastLines.length > 15) {
            lastLines = lastLines.slice(1);
        }
    }
    parseText(input.value);
    input.value = "";
}

function parseText(string = "") {

    string = string.toLowerCase();
    let command = string.split(" ");
    switch(state.current) {
        case 'default':
            c_default(string,command);
        break;
        case 'username':
            if (string == "wk0jy8e") {
                write("\n!\n.");
                state.current = "default";
                state.last = "default";
                state.user = "admin";
            } else {
                write(`\n. username: ${string}\n. welcome ${command[0]}! \n. please enter your password..`);
                state.username = command[0];
                state.last = state.current;    
                state.current = "password";
            }
        break;
        case 'password':
            let pass = "";
            for (let i = 0; i < string.length; i++) {
                pass += "#";
                
            }
        if (command[0] != "placeholder") {
            write(`\n. password: ${pass}\n. Password incorrect... logging in as guest\n. [ retry login with command : login ]`);
            state.current = "default";
            state.last = "default";
        } else {
            write(`\n. password: ${pass}\n. Password correct! Welcome ${state.username}!`);
            state.current = "default";
            state.last = "default";
            state.user = "admin";
        }
        break;
        case 'guest':

        break;
        case 'tictac':
            switch (string) {
                case 'help':
                    write('\n. [ tic usage ]\n. [ (row:number) (column:number) to place your piece on the board ]\n. [ type "exit" to exit ]');
                break;
                case 'exit':
                    write(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n  - - demOS ${version} - -`)
                    state.last = state.current;   
                    state.current = "default";
                    roundnumber = 0;
                break;
                default:
                        
                    try {
                        roundnumber++;
                            newBoard = ticChange(newBoard,command[0] - 1,command[1] - 1, (roundnumber % 2 == 0) ? 1 : 2);
                            if (roundnumber >= 5) {
                                
                                if (ticDetectWin(newBoard)) {
                                    roundnumber--; // to make winner print on last board
                                    write(`\n. \n. [ Game over! Player ${(roundnumber % 2 == 0) ? "O" : "X"} won! ]\n.\n.  ${tictac(newBoard)}`);
                                    roundnumber = 0;
                                    state.last = state.current;   
                                    state.current = "default";
                                } else if (roundnumber >= 9) {
                                    write(`\n.\n. [ Game over! Draw... ]\n. ${tictac(newBoard)}\n. `);
                                    roundnumber = 0;
                                    state.last = state.current;   
                                    state.current = "default";
                                } else {    
                                    write(tictac(newBoard) + "\n. ");
                                }
                            } else {
                                write(tictac(newBoard) + "\n. ");
                            }
                            } catch (error) {
                                write('\n. ( wrong syntax, type "help" for help)');
                                roundnumber--;
                            }
                    break;
            }        
        break;
        default:
        write("\n!!!!!!!!!!");
        if (state.current != state.last) {
            state.current = state.last;
            parseText(string);
        }

        break;
    } 
}

function c_default(string = "",command = []) {

    switch (command[0]) {
        case 'load':
        case 'l':
            if (!(command[1] >= -10)) {
                write(parseList(loadList));
            } else {
                write(i_load(command[1]));
            }
            break;
        case 'help':
            i_help(command[1]);
            break;
        case 'shred':
        case 'rip':
            i_shred();
            break;
        case 'fill':
            i_fill(command[1], command[2], command[3]);
            break;
        case 'print':
            i_print(string.replace(/^[^ ]+/, ''));
            break;
        case 'reset':
        case 'restart':
            lineNum = 0;
            i_reset(CurrentLine, lastLines);
            break;
        case 'tictactoe':
        case 'tictac':
        case 'tic':
        case 'three-in-a-row':
            newBoard = boardCreate(3,3);
            write("\n. [to exit, type 'exit']\n. [for help, type 'help']\n." + tictac(newBoard,1) + "\n.");
        state.last = state.current;    
        state.current = "tictac";
        break;
        case 'clear':
            lineNum = 0;
            maintext.innerText = "";
            write(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`, "0", 1, true, maintext, false);
            break;
        case 'upgrade':
        case 'update':
        case 'upg':
            if (command[1] == "changelog") {
                i_changelog();
            } else {
                i_upgrade(command[1]);
            }
            break;
        case 'login':
            if (state.user == "guest") {
                write("\n. please input new username");
                state.last = state.current;    
                state.current = "username";
            } else {
                write("\n. already logged in!");
            }
        break;
        case 'teeest':
            testprint();
            break;
            case 'color':
            changeColor(command[1]);
            break;
        default:
            write(`\n. unknown command \n. "${string}"`);
            break;
    }
};


// flashlight
const flash = document.getElementById('flash');
// teehee
let px = 0;
let py = 0;

let Dx = 0;
let Dy = 0;

let displayFlash = false;

document.onmousedown = function(e) {
    var x = e.clientX;
    var y = e.clientY;

    flash.style.marginLeft = x + "px";
        flash.style.marginTop = y + "px";

    flash.style.display = "block";
    displayFlash = true;
}
document.onmouseup = function(e) {
    flash.style.display = "none";
    displayFlash = false;
}

document.onmousemove = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    
    if (displayFlash) {
        
        
        // ??????
        px = (((flash.getBoundingClientRect().left * 4) + x ) / 5) + 95;
        py = (((flash.getBoundingClientRect().top  * 4) + y ) / 5) + 95;
        
        
        
        
        flash.style.marginLeft = px + "px";
        flash.style.marginTop = py + "px";
        
    }
    }
    
    
    function boardCreate(width,height) {
        let boardContent = [];
        let board = [];
        for (let i = 0; i < width; i++) {
            boardContent.push(0);
    }
    for (let i = 0; i < height; i++) {
        board.push(boardContent.slice(0));
    }
    return board;
}

const ticvalues = [
    "-",
    "X",
    "O"
];

function tictac(array) {
    let output = "";
    output += `\n.${(roundnumber % 2 == 0) ? "O" : "X"} `;
    for (let i = 0; i < array.length; i++) {
        output += `${i + 1} `;
    }
    let j = 0;
    array.forEach(element => {
        j++;
        output += `\n.${j}|`;
        element.forEach(e => {
            output += (ticvalues[e] + "|")
        });
    });
    return output;
}

function ticChange(array, x, y, val) {
    if (array[x][y] == 0) {   
        array[x][y] = val;
    } else {
        roundnumber--;
    }
    return array;
}




function ticDetectWin(array) {
    if (ticR(array,[0,0],[1,0],[2,0])||
        ticR(array,[0,1],[1,1],[2,1])||
        ticR(array,[0,2],[1,2],[2,2])||
        ticR(array,[0,0],[0,1],[0,2])||
        ticR(array,[1,0],[1,1],[1,2])||
        ticR(array,[2,0],[2,1],[2,2])||
        ticR(array,[0,0],[1,1],[2,2])||
        ticR(array,[2,0],[1,1],[0,2])
        ) {
        return true;
    }
}

// tic row
function ticR(array,r1 = [],r2 = [],r3 = []) {
    let type = array[r1[0]][r1[1]];
    if (array[r1[0]][r1[1]] == 0 ) {
        return false;
    } else if (array[r2[0]][r2[1]] == 0 || array[r2[0]][r2[1]] != type) {
        return false;
    } else if (array[r3[0]][r3[1]] == 0 || array[r3[0]][r3[1]] != type) {
        return false;
    } else {
        return true;
    }
}


sweepValues = [
    "X",
    "-",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
]

function minesweeperDraw(array) {
    let output = "   ";
    let l = 0;
    for (let i = 0; i < array.length; i++) {
        output += `${i + 1} `;
    }
    let j = 0;
    array.forEach(element => {
        j++;
        output += `\n.${j}`;
        if (j < 10 && array.length >= 10) {
            output += " ";
        }
        l = 0;
        element.forEach(e => {
            l++
            output += (ticvalues[e + 1]) + " "
            if (l >= 10 && array.length >= 10) {
                output += " ";  
            }
        });
    });
    return output;
}



function changeColor(color = "aqua") {
    maintext.style.color = color;
    maintext.style.textShadow = "0 0 10px " + color;
    arrow.style.color = color;
    arrow.style.textShadow = "0 0 10px " + color;
    console.log(document.querySelector('.power-on').style.color);
    document.querySelector('.power-on').style.background = color;
    document.querySelector('.power-on').style.boxShadow = "0 0 10px " + color;
    console.log(document.querySelector('.power-on').style.color);

    input.style.color = color;
    input.style.textShadow = "0 0 10px " + color;
    
}