/* THIS FILE IS PRIMARILY USED FOR THE RESPONSIVE POSITIONING OF ITEMS ON THE SCREEN*/
(function() {
  /* UPDATES ITEMS THAT ARE RELATIVELY POSITIONED (EX/ WHEN SCREEN SIZE IS ALTERED AFTER LOAD) */
  function updateRelativePositions() {
    let h = window.innerHeight;
    
    let title = $("#main-title");
    // title.css("marginTop", h/2 - $("#main-title").height());
    title.fadeIn(2000);
    
    let logo = $("#main-logo");
    logo.css("marginTop", h/2 - logo.height() - 20); // -20 looks better in testing
    logo.animate({ // fadeIn won't work as this element needs to be a block
      opacity: 1
    }, 3500);
    
    let cPhrase = $("#catch-phrase");
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
    
    let canvas = $("#canvas");
    canvas.fadeIn(2000);
    
    // could switch this section to a loop
    let nav0 = $("#nav-0");
    nav0.fadeIn(2000);
    
    let nav1 = $("#nav-1");
    nav1.fadeIn(2300);
    
    let nav2 = $("#nav-2");
    nav2.fadeIn(2600);
    
    let nav3 = $("#nav-3");
    nav3.fadeIn(2900);
    
    let nav4 = $("#nav-4");
    nav4.fadeIn(3200);
    
  }
  
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

