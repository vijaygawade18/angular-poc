//helper functions, it turned out chrome doesn't support Math.sgn()
function signum(x) {
    return (x < 0) ? -1 : 1;
}
function absolute(x) {
    return (x < 0) ? -x : x;
}

function drawPath(svgContainer, svg, path, startX, startY, endX, endY, side) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke = 40;//parseFloat(path.attr("stroke-width"));

    var deltaX = (endX - startX) * 0.30 ;
    var deltaY = (endY - startY) * 0.30;

    // for further calculations which ever is the shortest distance
    var delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);
    svg.style.height = svgContainer.clientHeight;
    svg.style.width = svgContainer.clientWidth;

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
    if(side == "left"){
      path.setAttribute("d", "M" + startX + " " + startY +
          " H" + (startX + " " + endX) +
          " A" + delta + " " + delta + " 0 0 " + arc2 + " " + (endX + deltaX) + " " + (startY + deltaY / 2) +
          " V" + (endY - deltaY / 2) +
          " A" + delta + " " + delta + " 0 0 " + arc2 + " " + (endX) + " " + (endY)
      );
    }else{
      path.setAttribute("d", "M" + startX + " " + startY +
          " H" + (startX + " " + endX) +
          " A" + delta + " " + delta + " 0 0 " + arc2 + " " + (endX + deltaX) + " " + (startY + deltaY / 2) +
          " V" + (endY - deltaY / 2) +
          " A" + delta + " " + delta + " 0 0 " + arc2 + " " + (endX) + " " + (endY)
      );
    }
}

function offset(elm) {
  try {return elm.offset();} catch(e) {}
  var rawDom = elm;
  var _x = 0;
  var _y = 0;
  var body = document.documentElement || document.body;
  var scrollX = window.pageXOffset || body.scrollLeft;
  var scrollY = window.pageYOffset || body.scrollTop;
  _x = rawDom.getBoundingClientRect().left + scrollX;
  _y = rawDom.getBoundingClientRect().top + scrollY;
  return { left: _x, top: _y };
}

function whichSide(svgContainer, startElem){
  var svgWidth = svgContainer.clientWidth;
  var startElemX = offset(startElem).left;
  if(startElemX > svgWidth / 2){
    return "right";
  } else{
    return "left"
  }
}

export function connectElements(svgContainer, svg, path, startElem, endElem) {

    if(!!!svgContainer) return;

    // get (top, left) corner coordinates of the svg container
    var svgTop = offset(svgContainer).top;
    var svgLeft = offset(svgContainer).left;

    // get (top, left) coordinates for the two elements
    var startCoord = offset(startElem);
    var endCoord = offset(endElem);

    var side = whichSide(svgContainer, startElem);

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point

    if(side == "left"){
      var startX = startCoord.left + startElem.clientWidth - svgLeft;
      var startY = startCoord.top + 0.5 * startElem.clientHeight - svgTop;

      // calculate path's end (x,y) coords
      var endX = endCoord.left + endElem.clientWidth - svgLeft;
      var endY = endCoord.top + 0.5 * endElem.clientHeight - svgTop;
    }else{

      var startX = startCoord.left - svgLeft;
      var startY = startCoord.top + 0.5 * startElem.clientHeight - svgTop;

      // calculate path's end (x,y) coords
      var endX = endCoord.left - svgLeft;
      var endY = endCoord.top + 0.5 * endElem.clientHeight - svgTop;
    }

    // call function for drawing the path
    drawPath(svgContainer, svg, path, startX, startY, endX, endY, side);
}
