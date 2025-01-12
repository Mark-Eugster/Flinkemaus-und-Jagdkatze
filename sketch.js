let mouseFood = [];
let score;
let claw1;
let claw2;
let timer;
let lastTime;
let customCursor;
let clawIcon;
let foodIcon;
let sceneMgr;
let attract;
let intro;
let success;
let fail;
let win;
let audioStart;
let audioFood;
let audioClaw;
let audioWin;
let audioDie;
let audioVictory;
let loopFlag;
let lvl;
let winMouse;
let winHole;
let winMx;
let clickFlag;
 
function preload() {
  customCursor = loadImage("Maus.png");
  clawIcon = loadImage("Claw.png");
  foodIcon = loadImage("FoodCrumb.png");
  attract = loadImage("attract.png");
  intro = loadImage("intro.png");
  success = loadImage("success.png");
  fail = loadImage("fail.png");
  win = loadImage("win.png");
  winMouse = loadImage("winMouse.png");
  winHole = loadImage("winHole.png");
  audioStart = loadSound("audioStart.mp3");
  audioFood = loadSound("audioFood.mp3");
  audioClaw = loadSound("audioClaw.mp3");
  audioWin = loadSound("audioWin.wav");
  audioDie = loadSound("audioDie.wav");
  audioVictory = loadSound("victory.wav");
}
 
function setup() {
  createCanvas(600, 600);
  textFont("Silkscreen");
  lastTime = millis();
  rectMode(CENTER);
  imageMode(CENTER);
  for (let i = 0; i < 6; i++) {
    mouseFood.push(new food());
  }
  claw1 = new claw(0, 300);
  claw2 = new claw(300, 600);
  sceneMgr = 1;
  loopFlag = 0;
}
 
function draw() {
  if (sceneMgr == 3) {
    lvl = 1;
  } else if (sceneMgr == 4) {
    lvl = 2;
  } else if (sceneMgr == 6) {
    lvl = 3;
  }
 
  if (sceneMgr === 1) {
    sceneAttract();
  } else if (sceneMgr === 2) {
    sceneIntro();
  } else if (sceneMgr === 3) {
    game(60, 0.05, 20, 20, 200, -200);
  }
  //Game variables: timerlength, reduction of score with each timer cycle, food socre value, claw score demerit, level pass score, lose game score
  else if (sceneMgr === 4 || sceneMgr === 6) {
    sceneMaus();
  } else if (sceneMgr === 5) {
    game(40, 0.05, 20, 50, 500, 80);
  } else if (sceneMgr === 7) {
    game(30, 0.05, 30, 30, 700, 300);
  } else if (sceneMgr === 8) {
    sceneWin();
  } else if (sceneMgr === 9) {
    sceneDie();
  }
}
 
class food {
  constructor() {
    this.posX = random(0, 600);
    this.posY = random(0, 600);
    this.rWidth = random(4, 40);
    this.rad = this.rWidth * 0.5;
  }
 
  checkMouse(_fs, _tt) {
    if (dist(this.posX, this.posY, mouseX, mouseY) < this.rad) {
      score += _fs;
      timer = _tt;
      audioFood.play();
      claw1.interact();
      claw2.interact();
      this.interact();
    }
  }
 
  interact() {
    this.posX = random(0, 600);
    this.posY = random(0, 600);
    this.rWidth = random(8, 60);
    this.rad = this.rWidth * 0.5;
  }
  show() {
    image(foodIcon, this.posX, this.posY, this.rWidth, this.rWidth);
  }
}
 
class claw {
  constructor(raL, raH) {
    this.posX = random(raL, raH);
    this.posY = random(0, 600);
    this.rWidth = random(350, 650);
    this.rad = this.rWidth * 0.5;
    if (dist(this.posX, this.posY, mouseX, mouseY) < this.rad) {
      this.interact();
    }
    if (dist(this.posX, this.posY, mouseX, mouseY) < this.rad) {
      this.interact();
    }
  }
  checkMouse(_cs, _tt) {
    if (dist(this.posX, this.posY, mouseX, mouseY) < this.rad) {
      score -= _cs;
      timer = _tt;
      audioClaw.play();
      for (let food of mouseFood) {
        food.interact();
      }
      this.interact();
    }
  }
 
  interact() {
    if (this.posX <= 299) {
      this.posX = random(0, 299);
    } else {
      this.posX = random(300, 600);
    }
    this.posY = random(0, 600);
    this.rWidth = random(350, 650);
    this.rad = this.rWidth * 0.5;
    let distanceToMouse = dist(this.posX, this.posY, mouseX, mouseY);
    if (distanceToMouse < this.rad) {
      let offset = createVector(this.posX - mouseX, this.posY - mouseY);
      offset.setMag(this.rad + 10)
      this.posX += offset.x;
      this.posY += offset.y;
    }
  }
  show() {
    image(clawIcon, this.posX, this.posY, this.rWidth, this.rWidth);
  }
}
 
function sceneAttract() {
  image(attract, 300, 300, 600, 600);
  if (!audioStart.isPlaying()) {
    audioStart.play();
  }
  score = 0;
  if (mouseX >= 140 && mouseX <= 460 && mouseY >= 532 && mouseY <= 568) {
    stroke(255);
    fill(0);
    rect(300, 550, 320, 36);
    noStroke();
    fill(255);
    text("Klicken Sie zum Starten", 210, 554);
    clickFlag = 1;
  } else {
    stroke(100);
    fill(0);
    rect(300, 550, 320, 36);
    noStroke();
    fill(150);
    text("Klicken Sie zum Starten", 210, 554);
    clickFlag = 0;
  }
  cursor();
}
 
function sceneIntro() {
  image(intro, 300, 300, 600, 600);
  audioStart.stop();
  stroke(100);
  fill(0);
  rect(300, 530, 420, 36);
  noStroke();
  fill(150);
  text("Nein, ich habe Angst vor der Jagdkatze", 160, 534);
 
  stroke(100);
  fill(0);
  rect(300, 470, 420, 36);
  noStroke();
  fill(150);
  text("Ja, ich werde der flinkeMäuse helfen!", 170, 474);
 
  if (mouseX >= 90 && mouseX <= 510 && mouseY >= 512 && mouseY <= 548) {
    stroke(255);
    fill(0);
    rect(300, 530, 420, 36);
    noStroke();
    fill(255);
    text("Nein, ich habe Angst vor der Jagdkatze", 160, 534);
    clickFlag = 2;
  } else if (mouseX >= 90 && mouseX <= 510 && mouseY >= 452 && mouseY <= 488) {
    stroke(255);
    fill(0);
    rect(300, 470, 420, 36);
    noStroke();
    fill(255);
    text("Ja, ich werde der flinkeMäuse helfen!", 170, 474);
    clickFlag = 1;
  } else {
    clickFlag = 0;
  }
  cursor();
}
 
function sceneDie() {
  image(fail, 300, 300, 460, 400);
  audioDie.setLoop(false);
  if (!audioDie.isPlaying() && loopFlag == 0) {
    audioDie.play();
    loopFlag = 1;
    setTimeout(() => {
      audioDie.stop();
    }, 3500);
  }
  if (mouseX >= 140 && mouseX <= 460 && mouseY >= 432 && mouseY <= 468) {
    stroke(255);
    fill(0);
    rect(300, 450, 320, 36);
    noStroke();
    fill(255);
    text("Klicken Sie zum Neustart", 210, 454);
    clickFlag = 1;
  } else {
    stroke(100);
    fill(0);
    rect(300, 450, 320, 36);
    noStroke();
    fill(150);
    text("Klicken Sie zum Neustart", 210, 454);
    clickFlag = 0;
  }
  cursor();
}
 
function sceneMaus() {
  image(success, 300, 300, 460, 400);
  winMx = 426;
  if (!audioWin.isPlaying() && loopFlag == 0) {
    audioWin.play();
    loopFlag = 1;
    setTimeout(() => {
      audioWin.stop();
    }, 2500);
  }
  if (mouseX >= 140 && mouseX <= 460 && mouseY >= 432 && mouseY <= 468) {
    stroke(255);
    fill(0);
    rect(300, 450, 320, 36);
    noStroke();
    fill(255);
    text("Klicken Sie für Level " + lvl, 210, 454);
    clickFlag = 1;
  } else {
    stroke(100);
    fill(0);
    rect(300, 450, 320, 36);
    noStroke();
    fill(150);
    text("Klicken Sie für Level " + lvl, 210, 454);
    clickFlag = 0;
  }
  cursor();
}
 
function sceneWin() {
  image(win, 300, 300, 600, 600);
  if (!audioVictory.isPlaying() && loopFlag == 0) {
    audioVictory.play();
    loopFlag = 1;
    setTimeout(() => {
      audioVictory.stop();
    }, 9000);
  }
  image(winMouse, winMx, 310, 189, 109);
  image(winHole, 96, 279, 203, 206);
  winMx--;
  if (mouseX >= 140 && mouseX <= 460 && mouseY >= 532 && mouseY <= 568) {
    stroke(255);
    fill(0);
    rect(300, 550, 320, 36);
    noStroke();
    fill(255);
    text("Klicken Sie zum Neustart", 210, 554);
    clickFlag = 1;
  } else {
    stroke(100);
    fill(0);
    rect(300, 550, 320, 36);
    noStroke();
    fill(150);
    text("Klicken Sie zum Neustart", 210, 554);
    clickFlag = 0;
  }
  cursor();
}
 
function game(_tt, _ts, _fs, _cs, win, die) {
  noCursor();
  background(0);
  let elapsed = millis() - lastTime;
  if (elapsed >= 1) {
    timer--;
    score -= _ts;
    lastTime = millis();
  }
 
  if (timer <= 0) {
    for (let food of mouseFood) {
      food.interact();
    }
    claw1.interact();
    claw2.interact();
    timer = _tt;
  }
 
  for (let food of mouseFood) {
    food.checkMouse(_fs, _tt);
  }
 
  for (let food of mouseFood) {
    food.show();
  }
  claw1.checkMouse(_cs, _tt);
  claw2.checkMouse(_cs, _tt);
  claw1.show();
  claw2.show();
  fill(255);
  noStroke();
  //text(Math.round(score), 52, 580);
  //text(Math.round(score), mouseX, mouseY - 15);
  fill(0, 255, 0);
  text(lvl, 580, 20);
 let barWidth = map(score, die, win, 0, 1200);
 let colR
 let colG
 if (barWidth < 500) { colR = 255;
colG = 0 }
else if (barWidth < 800) { colR = 255; colG = 255 }
else { colR = 0; colG = 255 }
  fill(colR, colG, 0);
  rect(0, 600, barWidth, 20);
 // let mausSize = map(score, die, win, 8, 20);
  image(customCursor, mouseX, mouseY, 38, 14);


  if (score >= win) {
    sceneMgr++;
  } else if (score <= die) {
    sceneMgr = 9;
  }
}
 
function keyPressed() {
  if (sceneMgr == 1 || sceneMgr == 4 || sceneMgr == 6) {
    audioWin.stop();
    loopFlag = 0;
    sceneMgr++;
  } else if (sceneMgr == 8) {
    audioVictory.stop();
    loopFlag = 0;
    sceneMgr = 1;
  } else if (key === "j" || key === "J") {
    if (sceneMgr == 2) {
      sceneMgr++;
    }
  } else if (key === "v" || key === "V") {
    if (sceneMgr == 9) {
      audioDie.stop();
      loopFlag = 0;
      sceneMgr = 1;
    }
  } else if (key === "n" || key === "N") {
    if (sceneMgr == 2) {
      sceneMgr = 1;
    }
  }
}
 
function mousePressed() {
  if (sceneMgr == 1 || sceneMgr == 4 || sceneMgr == 6) {
    if (clickFlag == 1) {
      audioWin.stop();
      loopFlag = 0;
      sceneMgr++;
    }
  } else if (sceneMgr == 8) {
    if (clickFlag == 1) {
      audioVictory.stop();
      loopFlag = 0;
      sceneMgr = 1;
    }
  } else if (sceneMgr == 2 && clickFlag == 1) {
    sceneMgr++;
  } else if (sceneMgr == 2 && clickFlag == 2) {
    sceneMgr = 1;
  } else if (sceneMgr == 9) {
    if (clickFlag == 1) {
      audioDie.stop();
      loopFlag = 0;
      sceneMgr = 1;
    }
  }
}
 