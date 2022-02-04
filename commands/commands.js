 
function i_fill(width, height, char = "") {
    if (width != undefined) {
        let fillString = "";
        for (let j = 0; j < Math.min(height,22); j++) {
            fillString += "\n. ";
            for (let i = 0; i < Math.min(width,64); i++) {
                fillString += char[0];
            }
        }
        write(fillString, "0", 1);
    } else {
        write(`[ fill usage : fill (width) (height) [character] ]`);
    }
}

 function i_help(string) {
    switch (string) {
        case 'reset':
        case 'restart':
            write('\n. [ reset usage : reset ]\n. reset operating system\n.\n. aliases : reset , restart');
            break;
        case 'load':
        case 'l':
            write('\n. [ load usage : load (file/program) ]\n. load files and programs\n.\n. aliases : load, L');
            break;
        case 'help':
            write('\n. [ help usage : help (command) ]');
            break;
        case 'fill':
            write(`\n. [ fill usage : fill (width) (height) [character] ]`);
            break;
        case 'print':
            write('\n. [ print usage : print (string) ]\n. print the string on paper');
            break;
        case 'shred':
            write('\n. [ shred usage : shred ]\n. shred printed paper');
            break;
        case 'upgrade':
            write('\n. [ upgrade usage : upgrade (version / changelog)]\n. update system hardware and read changelogs   ')
        break;
        case 'tictactoe':
        case 'tictac':
        case 'tic':
            write('\n. [ tictactoe usage : tictactoe ]\n. play a round of tic tac toe\n.\n. aliases : tictactoe, tictac, tic ');
        break;
        case 'clear':
            write('\n. [ clear usage : clear ]\n. clear the screen');
        break;
        case 'color':
            write('\n. [ color usage : color (color) ]\n. change text color ( accepts both color names and hex codes )');
        break;
        default:
            write('\n. [ help usage : help (command) ]\n. ------ Commands ------\n.   color\n.   load\n.   help\n.   fill\n.   reset\n.   print\n.   shred\n.  *upgrade\n.   tictactoe\n.   clear\n. ------==========------');
            break;
    }
}
 
function reset() {
    time = 24;
    type = false;
}
let time = 24;
let type = false;
reset();



 function i_reset(CurrentLine = Number, lastLines = Array) {
    maintext.innerText = "";
    if (time > 150 && version == "v1.04" ) {
        type = false;
    } else {
        CurrentLine = -1;
        lastLines = [];
        type = true;
    }
    write(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n  - -  demOS ${version}  - -`, "0", time, type);
    if ( version == "v1.04" ) {
        time += 10 + (time / 10);
    }
}

const paper = document.getElementById('paper');
const text = document.getElementById('overlay-text')
 
function i_print(string) {
    console.log(string);
    if (!(string == null)) {


        if (paper.style.display == "block") {
            paper.style.display = "none";
        }
        text.innerText = string;
        paper.offsetWidth;
        paper.style.display = "block";
    } else {
        write('\n. [ print usage : print (string) ]');
    }
}

 function i_shred() {
    if (paper.style.display == "block") {
        write('\n. shredding...');
        paper.style.display = "none";
        text.innerText = "";
    } else {
        write('\n. [ shred usage : shred ]\n. [ required : paper ]');
    }
}



 function testprint() {
    write(textString, "0", 1);
    i_print(textString);
}

const textString =
    `
. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
. Rem deleniti placeat fuga dolorem, ut nulla laborum
. temporibus iste necessitatibus omnis, dicta id autem!
. Reprehenderit doloremque et aperiam, rem praesentium
. laudantium ut, perspiciatis quod eos nulla dolor
. molestiae exercitationem iusto suscipit, accusamus quae
. impedit consectetur voluptates animi necessitatibus unde
. tempore! Velit praesentium explicabo ut animi, tempore 
. corrupti voluptas aperiam dolorum magnam blanditiis 
. sapiente perspiciatis, saepe quis modi recusandae dolore
. quia ratione accusantium. Culpa dolore molestiae nostrum
. voluptas rerum cupiditate vitae at quaerat ratione nulla 
. nisi autem optio repellat, voluptatum corporis. Assumenda 
. aliquam accusantium nesciunt vero velit necessitatibus 
. corporis dolores illum tenetur.`



 let version = "v1.04"
let available = ["v1.05", "v2.0"]
const overlay = document.getElementById('overlay');
const video = document.getElementById('videos');

 
function i_upgrade(string) {
    switch (string) {
        case 'v1.05':
        case '1.05':
        case '.05':
        case 'v.5':
        case 'v1.5':
        case 'v0.5':
        case '0.5':   
        if (version != "v2.0" && version != "v1.05") {
            version = "v1.05";
            video.style.display = "block";
        write(
            `
. Installing v1.05 . . .
. [#- - - - - - -]
. [=# - - - - - -]
. [===# - - - - -]
. [=====# - - - -]
. [============#-]
. [=============#]
. 
.
.`, "0", 24, true, maintext, true, `document.getElementById('videos').style.display = 'none'; write(" Installation Complete!")`);
available = "v2.0";
        } else {
            write(`\n. Update Not Found ... \n. [ available versions: ${available} ]`);
        }
            break;
        case 'v2.0':
        case '2.0':
        case 'v2':
        case '2':
            if (version != "v2.0") {
                version = "v2.0";
                video.style.display = "block";
                write(
                    `
. Installing v2.0 . . .
. [#- - - - - - -]
. [#- - - - - - -]
. [#- - - - - - -]
. [#- - - - - - -]
. [#- - - - - - -]
. [#- - - - - - -]
. [=# - - - - - -]
. [=# - - - - - -]
. [=# - - - - - -]
. [===# - - - - -]
. [=====# - - - -]
. [=====# - - - -]
. [=====# - - - -]
. [=====# - - - -]
. [=====# - - - -]
. [=====# - - - -]
. [=====# - - - -]
. [=====# - - - -]
. [=====# - - - -]
. [=====# - - - -]
. [=====# - - - -]
. [========#- - -]
. [========#- - -]
. [========#- - -]
. [=========# - -]
. [==========#- -]
. [============#-]
. [============#-]
. [============#-]
. [============#-]
. [=============#]
. 
.
.`, "0", 24, true, maintext, true, `document.getElementById('videos').style.display = 'none'; write(" Installation Complete!")`);
                available = "N/A";
            } else {
                write(`\n. Update Not Found ... \n. [ available versions: ${available} ]`);
            }
            break;
        default:
            write(`\n. [ upgrade usage : upgrade (version) ]\n. [ current version: ${version} ]\n. [ available versions: ${available} ]`);
            break;

    }
}



 function i_changelog() {
    switch (version) {
        case 'v1.04':
            write("\n. v1.04 changelog:\n. -Added ability to type")
            break;
    case 'v1.05':
            write("\n. v1.05 changelog:\n. -Fixed slowdown after repeated resets")
            break;
    case 'v2.0':
            write("\n. v2.0 changelog:\n. -","0",24,true,maintext,false,'write("\\n. -Added ability to type\\n");write("\\n. Fixed slowdown [=# - - - - - ]after repeated resets\\n");write("\\n. jermacraft updae 2\\n00220 te\\n");');
            break;
        default:
            break;
    }
}



const loadList = [
    {name:"legal.txt",size:"12 KB" },
    {name:"google.txt",size:"40 KB" },
    {name:"crewmate.txt",size:"520 GB"},
]

function parseList(array = []) {
    let output = "\n.";
    let num = 0;
    array.forEach(e => {
        num++;
        output += `\n. (${num}) [file name : "${e.name}" | file size : ${e.size} ]`;
    });
    return output
}

const loadContent = [
`
. we are not legally responsible bla bla bla bla bla etc etc BUT make s awawa  \b\b\b\b\b\b\b \b\b \b\b \b\b \b\b \b\b \b\b \b\b  \b\b\b  \b\b\b  \b\b\b  \b\b\b   \b\b\b\b`,
`
.  _____________________
. /__________________[X]\\
. |                     |
. |                     |
. |        GOOGLE       |
. |                     |
. |      [________]     |
. |        _    _       |
. |                     |
. |                     |
. \\_____________________/`,
`
.  _________
. /  _____  \\
. | /     \\ |
. | |_____| |
. |         |
. |    |    |
. |    |    |
. \\___/ \\___/`,
]

function i_load(num) {
        if (loadContent[num - 1] != undefined) {
            return loadContent[num - 1];       
        } else {
            return "\n. No matching file found" + parseList(loadList);
        }
    }