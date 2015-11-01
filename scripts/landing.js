

var animateLogo = function(){
    var revealLogo = function(){
        $(this).css({
            opacity: 1
        })
    }
}
 var animatePoints = (function() {
   var revealPoint = function() {
      $(this).css({
          opacity: 1,
          transform: 'scaleX(1) translateY(0)'
  });   
     };
    $.each($('.point'), revealPoint);
});

 $(window).load(function() {
    if ($(window).height() > 950) {
       animatePoints();
     }

    // var pointsArray = document.getElementsByClassName('point');

    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
     

    //Automatically animates points once the screen scrolls to their position
      $(window).scroll(function(event) {
        if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();
         }
     });
});
 