/*jshint esversion: 6 */


function Visualization() {
  this.nodes = undefined;
  this.colTotal = undefined;
  this.rowTotal = undefined;
  this.spacing = 50;

  this.init = function() {
    this.colTotal = Math.floor(winH/this.spacing) - 1;
    this.rowTotal = Math.floor(winW/this.spacing) - 1;
    console.log('dimensinos = '+this.colTotal+","+this.rowTotal);
    this.nodes = [];
    for (let i = 0; i < this.rowTotal; i++) {
      for (let j = 0; j < this.colTotal; j++) {
        let someNode = new Node(((i+1)*this.spacing),((j+1)*this.spacing));
        this.nodes.push(someNode);
      }
    }
  };

  this.draw = function() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].draw();
    }
  };

  this.update = function() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].update();
    }
  };

} // end Visualization()


function Node(x,y) {
  this.x = x;
  this.y = y;
  this.baseX = x;
  this.baseY = y;
  this.color = randColor('rgba');

  this.init = function() {

  };

  this.draw = function() {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.x,this.y);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'rgba(0,0,200,1)';
    ctx.lineWidth = 2;
    ctx.moveTo(0,0);
    ctx.lineTo(0,10);
    ctx.strokeRect(-2,-2,4,4);  // void ctx.fillRect(x, y, width, height);
    ctx.fill();
    ctx.restore();
  };

  this.update = function() {

  };

}
