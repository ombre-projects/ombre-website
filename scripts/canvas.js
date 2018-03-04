(function() {
  const PI = Math.PI;
  const SQUARE_RANGE = 10;
  const SQUARE_RATE = PI / 480; // ROUGHLY 8 SECONDS AT 60FPS
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let count = 0;
  // let left_square = document.querySelector("#background-squares img:first-child");
  let left_square = $("#background-squares img:first-child");
  let right_square = $("#background-squares img:nth-child(2)");
  
  // the canvas is currently a glorified piece of shit
  function updateCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // sinusuodal motion of background squares
  function getSin() {
    return Math.sin(count) * SQUARE_RANGE;
  }
  
  function getCos() {
    return Math.cos(count) * SQUARE_RANGE;
  }

  $(document).ready(() => {
    updateCanvasDimensions();
    
    $(window).resize(() => {
      updateCanvasDimensions();
    });
    
    let r_start_margin = parseInt(right_square.css("marginTop"));
    let l_start_margin = parseInt(left_square.css("marginTop"));
    
    // main loop
    //*
    (function mainLoop() {
      // cycle count to ensure overflow never happens
      count = count > 200000 * PI ? 0 : count + SQUARE_RATE;//0.001
      right_square.css("marginTop",  + r_start_margin + getSin() + "px");
      left_square.css("marginTop",  + l_start_margin + getCos() +  "px");
      
      // @TODO add sparkles to background that fade in and out, move around etc

      window.requestAnimationFrame(mainLoop);
    })();
    //*/
  });
  
})();