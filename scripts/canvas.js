(function() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  
  function updateCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  $(document).ready(() => {
    updateCanvasDimensions();
    
    $(window).resize(() => {
      updateCanvasDimensions();
    });
  });
  
})();