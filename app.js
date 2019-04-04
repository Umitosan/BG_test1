/*jshint esversion: 6 */


let canv, ctx;
let winW, winH;
let vis;
let myReq;
let btnGo, btnReset;
let timeSinceResize;


function animLoop() {
  myReq = window.requestAnimationFrame(animLoop);
  clearCanvas(ctx);
  vis.update();
  vis.draw();
}


function resetCanvasSize() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
  winW = window.innerWidth;
  winH = window.innerHeight;
}

function loadDoc() {

  canv = document.getElementById("canvas");
  ctx = canv.getContext("2d");
  resetCanvasSize();

  btnGo = document.getElementById('btn-go');
  btnReset = document.getElementById('btn-reset');
  btnScan1 = document.getElementById('btn-scan1');

  window.addEventListener('resize', function() { // auto resize canvas to fit window
    resetCanvasSize();
  });

  btnGo.addEventListener('click', function() {
    console.log('GO clicked');
    vis = new Visualization();
    vis.init();
    myReq = window.requestAnimationFrame(animLoop);
  });

  btnReset.addEventListener('click', function() {
    console.log('RESET clicked');
    window.cancelAnimationFrame(myReq);
    myReq = undefined;
    clearCanvas(ctx);
  });

  btnScan1.addEventListener('click', function() {
    console.log('SCAN1 clicked');
    if (typeof(vis) === 'object') {
      if (vis.scan1Switch) {
        vis.scan1Switch = false;
      } else {
        vis.scan1Switch = true;
      }
      console.log('SCAN1 toggled');
    }
  });

} // end loadDoc()
