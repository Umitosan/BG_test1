/*jshint esversion: 6 */


let canv, ctx;
let winW, winH;

function resetCanvasSize() {
  canv.width = window.innerWidth;
  canv.height = window.innerHeight;
}

function loadDoc() {

  canv = document.getElementById("canvas");
  ctx = canv.getContext("2d");
  resetCanvasSize();

  window.addEventListener("resize", function() {
    winW = window.innerWidth;
    winH = window.innerHeight;
    resetCanvasSize();
  });

} // end loadDoc()
