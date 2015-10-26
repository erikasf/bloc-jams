// var pointsArray = document.getElementsByClassName('point');

// var revealPoint = function(point) {
//     points.style.opacity = 1; 
//     points.style.transform = "scaleX(1) translatey(0)";
//     points.style.msTransform = "scaleX(1) translate(0)";
//     points.style.webkitTransform = "scaleX(1) translate(0)";
//   };


// var animatePoints = function(points){
//   forEach(points, revealPoint);
  
//   for(var i = 0; i < points.length; i++){
//     revealPoint(i);
//   }
// };




// window.onload = function(){
//     if (window.innerHeight > 950) {
//          animatePoints(pointsArray);
//      }


     var animatePoints = function() {
    var revealPoint = function() {
        $(this).css({
            opacity: 1,
            transform: 'scaleX(1) translateY(0)'
        });   
    };
    
    $.each($('.point'), revealPoint);
};

$(window).load(function() {
    if ($(window).height() > 950) {
        animatePoints();
    }
    
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    
    $(window).scroll(function(event) {
        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();   
        }
    });
});
  
  window.addEventListener('scroll', function(event){ 
       if(pointsArray[0].getBoundingclientRect().top <= 500){
          animatePoints(pointsArray);
          }
        });
      }


