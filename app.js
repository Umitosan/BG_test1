/*jshint esversion: 6 */


let canv, ctx;
let winW, winH;
let vis;
let anim;
let btnGo, btnReset;

let frame = 0;

function animLoop() {
  anim = window.requestAnimationFrame(animLoop);
  console.log(frame);
  frame += 1;
}


function resetCanvasSize() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
}

function loadDoc() {

  canv = document.getElementById("canvas");
  ctx = canv.getContext("2d");
  resetCanvasSize();

  vis = new Visualization();
  vis.init();

  btnGo = document.getElementById('btn-go');
  btnReset = document.getElementById('btn-reset');

  window.addEventListener('resize', function() { // auto resize canvas to fit window
    winW = window.innerWidth;
    winH = window.innerHeight;
    resetCanvasSize();
  });

  btnGo.addEventListener('click', function() {
    console.log('GO clicked');
    anim = window.requestAnimationFrame(animLoop);
  });

  btnReset.addEventListener('click', function() {
    console.log('RESET clicked');
    window.cancelAnimationFrame(anim);
    anim = undefined;
    frame = 0;
  });

} // end loadDoc()
