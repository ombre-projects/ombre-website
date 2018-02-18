// THIS FILE HANDLES *MOST* OF THE ANIMATIONS IN RESPONSE TO USER INTERACTION
(function() {
  
  
  $(document).ready(() => {
    $("#left-arrow").mousedown(() => {
      $("#left-arrow").attr("src", "assets/left-arrow-pressed.png");
    });
    
    $("#left-arrow").mouseup(() => {
      $("#left-arrow").attr("src", "assets/left-arrow.png");
    });
    
    $("#right-arrow").mousedown(() => {
      $("#right-arrow").attr("src", "assets/right-arrow-pressed.png");
    });
    
    $("#right-arrow").mouseup(() => {
      $("#right-arrow").attr("src", "assets/right-arrow.png");
    });
    
    // play 'animation' when arrow keys are used to navigate
    $(document).keydown((e) => {
      let key = e.key;
      if (key === "ArrowLeft") {
        $("#left-arrow").attr("src", "assets/left-arrow-pressed.png");
      } else if (key === "ArrowRight") {
        $("#right-arrow").attr("src", "assets/right-arrow-pressed.png");
      }
    });
    
    $(document).keyup((e) => {
      let key = e.key;
      if (key === "ArrowLeft") {
        $("#left-arrow").attr("src", "assets/left-arrow.png");
      } else if (key === "ArrowRight") {
        $("#right-arrow").attr("src", "assets/right-arrow.png");
      }
    });
    
    

    
    
  });
})();