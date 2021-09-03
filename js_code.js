/* eslint-disable no-undef, no-unused-vars */
//let words = [1, 2, 3, 4, 5];

let cnv;
let watched = [];
let currentword;
let wordsCounter;
let errorCounter;
let w;
let y;
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function setup() {
  w = 700;
  y = windowHeight;
  cnv = createCanvas(w, y);
  centerCanvas();
  textAlign(CENTER, CENTER);
  watched.length = 0;
  wordsCounter = 0;
  errorCounter = 0;
  newWord("");
}

function randomFromArray(arraym) {
  return arraym[Math.floor(Math.random() * arraym.length)];
}

function newWord(lastword) {
  do {
    if (Math.random() < 0.3 && watched.length !== 0) {
      currentword = randomFromArray(watched);
    } else {
      currentword = randomFromArray(words);
    }
  } while (lastword === currentword);
}

function drawButtons() {
  fill(0, 200, 0);
  rect(50, 50, 300, 300);
  fill(0);
  textStyle(BOLD);
  textSize(30);
  text("Новое\n←", 200, 200);
  fill(200, 0, 0);
  rect(350, 50, 300, 300);
  fill(0);
  textStyle(BOLD);
  textSize(30);
  text("Видел\n→", 500, 200);
  text("Всего слов\n" + wordsCounter.toString(), 200, 700);
  text("Ошибок\n" + errorCounter, 500, 700);
}

function drawWord(string) {
  textStyle(BOLD);
  textSize(50);
  text(string, 350, 450);
}
function draw() {
  background(0, 200, 200);
  drawButtons();
  drawWord(currentword);
}
function answer(myans) {
  if (watched.includes(currentword)) {
    //green is wrong, red is right
    correct = !myans;
  } else {
    //green is right, red is wrong
    correct = myans;
  }
  wordsCounter = wordsCounter + 1;
  if (!correct) {
    errorCounter = errorCounter + 1;
  }
  if (!watched.includes(currentword)) {
    watched.push(currentword);
    words.splice(words.indexOf(currentword), 1);
  }
  newWord(currentword);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    greenPressed();
  } else if (keyCode === RIGHT_ARROW) {
    redPressed();
  }
}

function greenPressed() {
  answer(true);
}
function redPressed() {
  answer(false);
}
function mousePressed() {
  if (inRect(mouseX, mouseY, 50, 50, 300, 300)) {
    greenPressed();
  }
  if (inRect(mouseX, mouseY, 350, 50, 300, 300)) {
    redPressed();
  }
}

//return true if x,y in rect position rx ry size w*h
function inRect(x, y, rx, ry, w, h) {
  let mNormX = x - rx;
  let mNormY = y - ry;
  return mNormX >= 0 && mNormY >= 0 && mNormX <= w && mNormY <= h;
}
