/*jshint esversion: 6 */


function Visualization() {
  this.nodes = undefined;
  this.colTotal = undefined;
  this.rowTotal = undefined;
  this.spacing = 50;
  this.timeSinceLastMove = undefined;
  this.moveTimer = 4000;
  this.scan1Switch = false;
  this.totalColorPhaseTimer = 5000;
  this.colorPhaseTimeGap = undefined;

  this.init = function() {
    this.scan1Switch = false;
    this.colTotal = Math.floor(winW/this.spacing) - 1;
    this.rowTotal = Math.floor(winH/this.spacing);
    console.log('dimensinos = '+this.colTotal+","+this.rowTotal);
    this.colorPhaseTimeGap = Math.ceil(this.totalColorPhaseTimer / (this.colTotal * this.rowTotal));
    let colorPhasePos = 0;
    this.nodes = [];
    for (let cRow = 0; cRow < this.rowTotal; cRow++) {
      let newRow = [];
      for (let cCol = 0; cCol < this.colTotal; cCol++) {
        colorPhasePos += 1;
        let someNode = new Node(  ((cCol+1)*this.spacing),
                                  ((cRow+1)*this.spacing),
                                  {r:cRow,c:cCol},
                                  // ( this.colorPhaseTimeGap * (cRow+1) * (cCol+1) )
                                  (this.totalColorPhaseTimer - (this.colorPhaseTimeGap * colorPhasePos))
                              );
        newRow.push(someNode);
      }
      this.nodes.push(newRow);
    }
    console.log(this.nodes);
    for (let cRow = 0; cRow < this.nodes.length; cRow++) {
      for (let cCol = 0; cCol < this.nodes[cRow].length; cCol++) {
        this.nodes[cRow][cCol].init();
      }
    }
    this.timeSinceLastMove = performance.now();
  };

  this.draw = function() {
    for (let cRow = 0; cRow < this.nodes.length; cRow++) {
      for (let cCol = 0; cCol < this.nodes[cRow].length; cCol++) {
        this.nodes[cRow][cCol].draw();
      }
    }
  };

  this.update = function() {
    if ((performance.now() - this.timeSinceLastMove) > this.moveTimer) {
      for (let cRow = 0; cRow < this.nodes.length; cRow++) {
        for (let cCol = 0; cCol < this.nodes[cRow].length; cCol++) {
          // this.nodes[cRow][cCol].updateConnection();
        }
      }
      console.log('update happened');
      this.timeSinceLastMove = performance.now();
    }
    for (let cRow = 0; cRow < this.nodes.length; cRow++) {
      for (let cCol = 0; cCol < this.nodes[cRow].length; cCol++) {
        this.nodes[cRow][cCol].update();
      }
    }
  };

} // end Visualization()


function getRandomDir(goodNums, badDirs = undefined) {
  let newGood;
  if (badDirs !== undefined) {
    newGood = goodNums.filter( function(num) {
      if ( badDirs.includes(num) === false ) {
        return num;
      }
    });
    // console.assert(typeof(newGood) === 'object', 'not and object');
    // console.log('badDirs = ', badDirs);
    // console.log('goodNums,newGood = '+goodNums+"  --  "+newGood);
    goodNums = newGood;
  }
  let randNum = getRandomIntInclusive(1,8);
  while (goodNums.includes(randNum) !== true) {
    randNum = getRandomIntInclusive(1,8);
  }
  return randNum;
}

function getRandomNodeCoords(someNode) {
  let loc = someNode.loc;
  let randDir = 0;
  let badDirs;

  if (someNode.connectedCoords1 !== undefined) {
    let anotherBadDir;
    switch (someNode.connectedCoords1.dir) {
      case 1:
        anotherBadDir = 5; break;
      case 2:
        anotherBadDir = 6; break;
      case 3:
        anotherBadDir = 7; break;
      case 4:
        anotherBadDir = 8; break;
      case 5:
        anotherBadDir = 1; break;
      case 6:
        anotherBadDir = 2; break;
      case 7:
        anotherBadDir = 3; break;
      case 8:
        anotherBadDir = 4; break;
      default:
        console.log('bad switch!');
        break;
    }
    badDirs = [someNode.connectedCoords1.dir,anotherBadDir];
  }

  if ( (loc.r === 0) && (loc.c === 0) ) { // top-left corner
    randDir = getRandomDir([3,4,5],badDirs);
  } else if ( (loc.r === 0) && (loc.c === (vis.colTotal-1)) ) { // top-right corner
    randDir = getRandomDir([5,6,7],badDirs);
  } else if ( (loc.r === (vis.rowTotal-1)) && (loc.c === (vis.colTotal-1)) ) { // bot-right corner
    randDir = getRandomDir([1,7,8],badDirs);
  } else if ( (loc.r === (vis.rowTotal-1)) && (loc.c === 0) ) { // bot-left corner
    randDir = getRandomDir([1,2,3],badDirs);
  } else if (loc.r === 0) { // top
    randDir = getRandomDir([3,4,5,6,7],badDirs);
  } else if (loc.c === (vis.colTotal-1)) { // right
    randDir = getRandomDir([1,5,6,7,8],badDirs);
  } else if (loc.r === (vis.rowTotal-1)) { // bot
    randDir = getRandomDir([1,2,3,7,8],badDirs);
  } else if (loc.c === 0) { // left
    randDir = getRandomDir([1,2,3,4,5],badDirs);
  } else {
    randDir = getRandomDir([1,2,3,4,5,6,7,8],badDirs);
  }

  console.assert(randDir !== 0,'randDir probs');

  let coordX,coordY;
  let coordRow, coordCol;
  let dirNum;
  switch (randDir) {
    case 1: // up
        coordX = vis.nodes[loc.r-1][loc.c].x;
        coordY = vis.nodes[loc.r-1][loc.c].y;
        coordRow = loc.r-1;
        coordCol = loc.c;
        dirNum = 1;
      break;
    case 2: // up-right
        coordX = vis.nodes[loc.r-1][loc.c+1].x;
        coordY = vis.nodes[loc.r-1][loc.c+1].y;
        coordRow = loc.r-1;
        coordCol = loc.c+1;
        dirNum = 2;
      break;
    case 3: // right
        coordX = vis.nodes[loc.r][loc.c+1].x;
        coordY = vis.nodes[loc.r][loc.c+1].y;
        coordRow = loc.r;
        coordCol = loc.c+1;
        dirNum = 3;
      break;
    case 4: // down-right
        coordX = vis.nodes[loc.r+1][loc.c+1].x;
        coordY = vis.nodes[loc.r+1][loc.c+1].y;
        coordRow = loc.r+1;
        coordCol = loc.c+1;
        dirNum = 4;
      break;
    case 5:  // down
        coordX = vis.nodes[loc.r+1][loc.c].x;
        coordY = vis.nodes[loc.r+1][loc.c].y;
        coordRow = loc.r+1;
        coordCol = loc.c;
        dirNum = 5;
      break;
    case 6:  // down-left
        coordX = vis.nodes[loc.r+1][loc.c-1].x;
        coordY = vis.nodes[loc.r+1][loc.c-1].y;
        coordRow = loc.r+1;
        coordCol = loc.c-1;
        dirNum = 6;
      break;
    case 7:  // left
        coordX = vis.nodes[loc.r][loc.c-1].x;
        coordY = vis.nodes[loc.r][loc.c-1].y;
        coordRow = loc.r+1;
        coordCol = loc.c-1;
        dirNum = 7;
      break;
    case 8: // up-left
        coordX = vis.nodes[loc.r-1][loc.c-1].x;
        coordY = vis.nodes[loc.r-1][loc.c-1].y;
        coordRow = loc.r-1;
        coordCol = loc.c-1;
        dirNum = 8;
      break;
    default:
      console.log('switch probs');
      break;
  }
  return { x:coordX, y:coordY, r:coordRow , c:coordCol, dir:dirNum };
}

function Node(x,y,indices,colorOffset) {
  this.x = x;
  this.y = y;
  this.baseX = x;
  this.baseY = y;
  this.solidColor = randColor('rgba');
  this.lineColor = randColor('rgba');
  this.loc = indices;
  this.connectedCoords1 = undefined;
  this.connectedCoords2 = undefined;
  this.xVel = (getRandomIntInclusive(1,2)/10) * randSign();
  this.yVel = (getRandomIntInclusive(1,2)/10) * randSign();
  this.lastColorChangeTime = undefined;
  this.colorTimerOffset = colorOffset;

  this.init = function() {
    this.connectedCoords1 = getRandomNodeCoords(this);
    this.connectedCoords2 = getRandomNodeCoords(this);
    this.lastColorChangeTime = performance.now() - this.colorTimerOffset;
    // console.log('node init complete: ', this.loc);
  };

  this.draw = function() {

    // ctx.save();
    // ctx.beginPath();
    // ctx.translate(this.x,this.y);
    // ctx.fillStyle = this.lineColor;
    // ctx.strokeStyle = this.lineColor;
    // ctx.fillRect(-3,-3,6,6);  // void ctx.fillRect(x, y, width, height);
    // ctx.restore();

    ctx.beginPath();
    // ctx.strokeStyle = this.lineColor;
    ctx.fillStyle = this.lineColor;
    // ctx.lineWidth = 2;
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.connectedCoords1.x,this.connectedCoords1.y);
    ctx.lineTo(this.connectedCoords2.x,this.connectedCoords2.y);
    ctx.lineTo(this.x,this.y);
    // ctx.stroke();
    ctx.fill();

  };

  this.updateConnection = function() {
    this.connectedCoords1 = getRandomNodeCoords(this);
    this.connectedCoords2 = getRandomNodeCoords(this);
  };

  this.update = function() {
      if ((performance.now() - this.lastColorChangeTime) > vis.totalColorPhaseTimer) {
        if (vis.scan1Switch) {
          this.lineColor = randColor("rgba");
        }
        this.lastColorChangeTime = performance.now();
    }
    if ( Math.abs((this.x + this.xVel) - this.baseX) > vis.spacing ) {
      this.xVel *= -1;
    }
    if ( Math.abs((this.y + this.yVel) - this.baseY) > vis.spacing ) {
      this.yVel *= -1;
    }
    this.x += this.xVel;
    this.y += this.yVel;
  };

}
