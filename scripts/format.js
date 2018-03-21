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
    
    $("#catch-phrase-0, #catch-phrase-4").css("marginTop",
      Math.max(h/2 - 38, 120));
    
    $("#catch-phrase-2").css("marginTop", Math.max(h/2 - $("#content-2").height()/2, 120));
    
    $("#catch-phrase-3").css("marginTop", Math.max(h/2 - 500, 120));
    
    // about page
    $("#catch-phrase-1").css("marginTop", Math.max(h/2 - $("#content-1").height()/2, 120));
    
    // download page - Math.max ensures margin never crowds the nav bar
    $("#catch-phrase-3").css("marginTop", Math.max(h/2 - $("#content-3").height()/2, 120)); // $("#content-3").height()/2
    
    let edges = $(".edge-wrapper");
    for (let i = 0; i < edges.length; i++) {
      edges[i].style.height = h - 6 + "px"; // -6 is to prevent scroll bars from appearing under normal use
    }
    
    $("#canvas").fadeIn(2000);
    // could switch this section to a loop
    $("#nav-0").fadeIn(2000);
    $("#nav-1").fadeIn(2300);
    $("#nav-2").fadeIn(2600);
    $("#nav-3").fadeIn(2900);
    $("#nav-4").fadeIn(3200);
    
    $("#external-icon-logos").css("marginTop", Math.max(h/2 - 80, 120));
    $("#external-icon-logos img:first-child").animate({"opacity": 1}, 3000);
    $("#external-icon-logos img:nth-child(2)").animate({"opacity": 1}, 3400);
    $("#external-icon-logos img:nth-child(3)").animate({"opacity": 1}, 3800);
    $("#background-squares").fadeIn(2500);
    
    // 1300 is the width at which a media query hides the ticker
    if (window.innerWidth > 1300) {
      $("#omb-ticker").fadeIn(3800);
    }
    
  } // EOF
  
  $(document).ready(() => {

    updateRelativePositions();
    // animateMainUp();
    
    
    $(window).resize(() => {
      updateRelativePositions();
    });
  });
})();

