/* THIS FILE IS PRIMARILY USED FOR THE RESPONSIVE POSITIONING OF ITEMS ON THE SCREEN*/
(function() {
  // @TODO rename this function to describe what its actually doing now
  /* UPDATES ITEMS THAT ARE RELATIVELY POSITIONED (EX/ WHEN SCREEN SIZE IS ALTERED AFTER LOAD) */
  function updateRelativePositions() {
    let h = window.innerHeight;
    
    let title = $("#main-title");
    title.fadeIn(2000);
    
    let logo = $("#main-logo");
    // logo.css("marginTop", h/2 - logo.height() - 20); // -20 looks better in testing
    logo.animate({ // fadeIn won't work as this element needs to be a block
      opacity: 1
    }, 3500);
    
    let cPhrase = $(".catch-phrase");
    cPhrase.fadeIn(3000);
    
    let edges = $(".edge-wrapper");
    for (let i = 0; i < edges.length; i++) {
      edges[i].style.height = h - 6 + "px"; // -6 is to prevent scroll bars from appearing under normal use
    }
    
    let lArrow = $("#left-arrow");
    lArrow.css("marginTop", h/2 - 50);
    lArrow.fadeIn(3000);
    
    let rArrow = $("#right-arrow");
    rArrow.css("marginTop", h/2 - 50);
    rArrow.fadeIn(3000);
    
    $("#canvas").fadeIn(2000);
    // could switch this section to a loop
    $("#nav-0").fadeIn(2000);
    $("#nav-1").fadeIn(2300);
    $("#nav-2").fadeIn(2600);
    $("#nav-3").fadeIn(2900);
    $("#nav-4").fadeIn(3200);
    
    $("#external-icon-logos").css("marginTop", h/2 - 120);
    $("#external-icon-logos img:first-child").animate({"opacity": 1}, 3000);
    $("#external-icon-logos img:nth-child(2)").animate({"opacity": 1}, 3400);
    $("#external-icon-logos img:nth-child(3)").animate({"opacity": 1}, 3800);
    $("#background-squares").fadeIn(2500);
  } // EOF
  
  /*
  function animateMainUp() {
    let h = window.innerHeight;
    let logo = $("#main-logo");
    let startHeight = h/2 - logo.height() - 20;
    logo.animate({ // fadeIn won't work as this element needs to be a block
      marginTop: startHeight - 150
    }, 1000);
  }
  */
  
  $(document).ready(() => {

    updateRelativePositions();
    // animateMainUp();
    
    
    $(window).resize(() => {
      updateRelativePositions();
    });
  });
})();

