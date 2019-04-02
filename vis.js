/*jshint esversion: 6 */


function Visualization() {
  this.nodes = undefined;
  this.colTotal = undefined;
  this.rowTotal = undefined;
  this.spacing = 50;
  this.timeSinceLastMove = undefined;
  this.moveTimer = 4000;

  this.init = function() {
    this.colTotal = Math.floor(winH/this.spacing) - 1;
    this.rowTotal = Math.floor(winW/this.spacing) - 1;
    console.log('dimensinos = '+this.colTotal+","+this.rowTotal);
    this.nodes = [];
    for (let cRow = 0; cRow < this.rowTotal; cRow++) {
      let newRow = [];
      for (let cCol = 0; cCol < this.colTotal; cCol++) {
        let someNode = new Node(((cRow+1)*this.spacing),((cCol+1)*this.spacing),{r:cRow,c:cCol});
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
          this.nodes[cRow][cCol].updateConnection();
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


function getRandomNodeCoords(someNode) {
  let loc = someNode.loc;
  console.assert(typeof(loc.r) === "number", "nope = "+loc.r);
  console.assert(typeof(loc.c) === "number", "nope = "+loc.c);
  console.assert(vis.nodes.length !== undefined, "vis.nodes insn't an array");
  console.assert(vis.nodes[0].length !== undefined, "vis.nodes[0] insn't an array");
  if (vis.nodes) {
    let coordX,coordY;
    switch (getRandomIntInclusive(1,8)) {
      case 1: // up
        if ((loc.r-1) >= 0) {
          coordX = vis.nodes[loc.r-1][loc.c].x;
          coordY = vis.nodes[loc.r-1][loc.c].y;
        } else { coordX = someNode.x; coordY = someNode.y; }
        break;
      case 2: // up-right
        if (((loc.r+1) <= (vis.rowTotal-1)) &&  ((loc.c+1) <= (vis.colTotal-1))) {
          coordX = vis.nodes[loc.r+1][loc.c+1].x;
          coordY = vis.nodes[loc.r+1][loc.c+1].y;
        } else { coordX = someNode.x; coordY = someNode.y; }
        break;
      case 3: // right
        if ((loc.c+1) <= (vis.colTotal-1)) {
          coordX = vis.nodes[loc.r][loc.c+1].x;
          coordY = vis.nodes[loc.r][loc.c+1].y;
        } else { coordX = someNode.x; coordY = someNode.y; }
        break;
      case 4: // down-right
        if ( ((loc.r+1) <= (vis.rowTotal-1)) && ((loc.c+1) <= (vis.colTotal-1)) ) {
          coordX = vis.nodes[loc.r+1][loc.c+1].x;
          coordY = vis.nodes[loc.r+1][loc.c+1].y;
        } else { coordX = someNode.x; coordY = someNode.y; }
        break;
      case 5:  // down
        if ((loc.r+1) <= (vis.rowTotal-1)) {
          coordX = vis.nodes[loc.r+1][loc.c].x;
          coordY = vis.nodes[loc.r+1][loc.c].y;
        } else { coordX = someNode.x; coordY = someNode.y; }
        break;
      case 6:  // down-left
        if ( ((loc.r+1) <= (vis.rowTotal-1)) && ((loc.c-1) >= 0) ) {
          coordX = vis.nodes[loc.r+1][loc.c-1].x;
          coordY = vis.nodes[loc.r+1][loc.c-1].y;
        } else { coordX = someNode.x; coordY = someNode.y; }
        break;
      case 7:  // left
        if ((loc.c-1) >= 0) {
          coordX = vis.nodes[loc.r][loc.c-1].x;
          coordY = vis.nodes[loc.r][loc.c-1].y;
        } else { coordX = someNode.x; coordY = someNode.y; }
        break;
      case 8: // up-left
        if ( ((loc.r-1) >= 0) && ((loc.c-1) >= 0) ) {
          coordX = vis.nodes[loc.r-1][loc.c-1].x;
          coordY = vis.nodes[loc.r-1][loc.c-1].y;
        } else { coordX = someNode.x; coordY = someNode.y; }
        break;
      default:
        console.log('switch probs');
        break;
    }
    return { x:coordX, y:coordY };
  }
}


function Node(x,y,indices) {
  this.x = x;
  this.y = y;
  this.baseX = x;
  this.baseY = y;
  this.solidColor = randColor('rgba');
  this.lineColor = randColor('rgba');
  this.loc = indices;
  this.connectedCoords = undefined;
  this.xVel = (getRandomIntInclusive(1,2)/20) * randSign();
  this.yVel = (getRandomIntInclusive(1,2)/20) * randSign();

  this.init = function() {
    this.connectedCoords = getRandomNodeCoords(this);
  };

  this.draw = function() {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.fillStyle = this.lineColor;
    ctx.strokeStyle = this.lineColor;
    ctx.fillRect(-3,-3,6,6);  // void ctx.fillRect(x, y, width, height);
    ctx.restore();
    ctx.beginPath();
    ctx.strokeStyle = this.lineColor;
    ctx.lineWidth = 2;
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.connectedCoords.x,this.connectedCoords.y);
    ctx.stroke();
  };

  this.updateConnection = function() {
    this.connectedCoords = getRandomNodeCoords(this);
  };

  this.update = function() {
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
