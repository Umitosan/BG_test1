/*jshint esversion: 6 */


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function clearCanvas(context) {
  if (context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  } else {
    console.log('opps that\'s not a canvas context');
  }
}

function randSign() {
  let num = getRandomIntInclusive(1,2);
  if (num === 1) {
    return 1;
  } else {
    return -1;
  }
}


function randColor(type, alpha = null) { // default alpha = 1
  // more muted colors example
      // return ( "#" + Math.round((getRandomIntInclusive(0,99999999) + 0x77000000)).toString(16) );
  // full spectum below
  let finalAlpha;
  if (type === 'hex') {
    return ( "#" + Math.round((getRandomIntInclusive(0,0xffffff))).toString(16) );
  } else if (type === 'rgba') {
      if (alpha === null) {
        finalAlpha = 1;
      } else if (alpha === 'rand') {
        finalAlpha = getRandomIntInclusive(1,10) / 10;
      } else if ( (typeof alpha) === "number") {
        finalAlpha = alpha;
      } else if ( (typeof alpha) === "string") {
        finalAlpha = parseFloat(alpha);
      } else {
        // nothing
      }
      return ( 'rgba('+ getRandomIntInclusive(0,255) +','+ getRandomIntInclusive(0,255) +','+ getRandomIntInclusive(0,255) +','+finalAlpha+')' );
  } else {
    console.log("Not valid option for randColor()");
    return undefined;
  }
}
