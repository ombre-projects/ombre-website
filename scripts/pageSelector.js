(function() {
  // finite state machine being used to handle currently selected page
  let pages = {
    HOME: 0,
    ABOUT: 1,
    ROADMAP: 2,
    DOWNLOAD: 3,
    TEAM: 4
  };
  
  let events = {
    GO_HOME: 0,
    GO_ABOUT: 1,
    GO_ROADMAP: 2,
    GO_DOWNLOAD: 3,
    GO_TEAM: 4,
    PREV_PAGE: 5,
    NEXT_PAGE: 6
  };
  
  let clickToEvent = {
    "left-arrow": events.PREV_PAGE,
    "right-arrow": events.NEXT_PAGE,
    "nav-0": events.GO_HOME,
    "nav-1": events.GO_ABOUT,
    "nav-2": events.GO_ROADMAP,
    "nav-3": events.GO_DOWNLOAD,
    "nav-4": events.GO_TEAM
  };
    
  let current_state  = pages.HOME;
  
  function updateCurrentState() {
    // remove 'nav-button-current' from all classes
    let allCurrentNavElems = $(".nav-button-current");
    allCurrentNavElems.removeClass("nav-button-current");

    let current_nav_id = "#nav-" + current_state;
    $(current_nav_id).addClass("nav-button-current");
    
    let allCurrentContentElems = $(".content-current");
    allCurrentContentElems.removeClass("content-current");
    
    let current_content_id = "#content-" + current_state;
    $(current_content_id).addClass("content-current");
    
  }
  
  function stateEvent(state_event) {
    
    let error = false;
    switch (state_event) {
      case events.GO_HOME:
        current_state = pages.HOME;
        break;
      case events.GO_ABOUT:
        current_state = pages.ABOUT;
        break;
      case events.GO_ROADMAP:
        current_state = pages.ROADMAP;
        break;
      case events.GO_DOWNLOAD:
        current_state = pages.DOWNLOAD;
        break;
      case events.GO_TEAM:
        current_state = pages.TEAM;
        break;
      case events.PREV_PAGE:
        current_state = current_state == 0 ? pages.TEAM : current_state - 1;
        break;
      case events.NEXT_PAGE:
        current_state = current_state == pages.TEAM ? 0 : current_state + 1;
        break;
      default:
        error = true;
        console.error("[ERROR 000-000]");
    }
    if (!error) {
      updateCurrentState();
    }
    
  }
  
  $(document).ready(() => {
    
    // @TODO ALLOW KEYBOARD ACCESSIBILITY WITH ARROW KEYS TO FLIP THROUGH SECTIONS
    // event triggering step in finite state machine
    $("body").click((e) => {
      let key = e.target.id;
      if (key in clickToEvent) {
        stateEvent(clickToEvent[key]);
      }
    });
    
    $(document).keydown((e) => {
      let key = e.key;
      if (key === "ArrowLeft") {
        stateEvent(events.PREV_PAGE);
      } else if (key === "ArrowRight") {
        stateEvent(events.NEXT_PAGE);
      }
    });
    
  });
  
})();