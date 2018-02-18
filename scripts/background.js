(function() {
  // alert("working");
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  
  function clearCanvas() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
  
  function updateCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function drawCircle() { // radius, color
    ctx.beginPath();
    ctx.arc(100,75,50,0,2*Math.PI);
    ctx.stroke();
  }
  
  (function backgroundLoop() {
    updateCanvasDimensions();
    clearCanvas();
    
    drawCircle();
    
    
    
    
    
  
    window.requestAnimationFrame(backgroundLoop);
  })();
  
  
})();