var pointsArray = document.getElementsByClassName('point');

var revealPoint = function(point) {
    points.style.opacity = 1; 
    points.style.transform = "scaleX(1) translatey(0)";
    points.style.msTransform = "scaleX(1) translate(0)";
    points.style.webkitTransform = "scaleX(1) translate(0)";
  };


var animatePoints = function(points){
  forEach(points, revealPoint);
  
  for(var i = 0; i < points.length; i++){
    revealPoint(i);
  }
};




window.onload = function(){
    if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
  
  window.addEventListener('scroll', function(event){ 
       if(pointsArray[0].getBoundingclientRect().top <= 500){
          animatePoints(pointsArray);
          }
        });
      }


