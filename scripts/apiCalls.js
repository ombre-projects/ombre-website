(() => {
  /*
    There is a bug in the stocks.exchange api, where requests made to market_summary
    trigger a CORS error. To bypass this, a request is made via a proxy that bypasses
    the error. This solution comes from:
    https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
  */
  // const PREFIX_URL = "https://cors-anywhere.herokuapp.com/";
  const PREFIX_URL = "/backend/cors_proxy.php?data=";
  
  /**
  * makes a request to the specified url
  * @param {String} url - the url to request
  * @param {Function} lambda - the callback to execute
  * @param {String} get_or_post - specifies whether to make a get or post request (Get by default)
  * @return {Void}
  */
  function request(url, lambda, get_or_post = "GET") {
    var xhttp = new XMLHttpRequest();
    xhttp.onload = lambda;
    xhttp.open(get_or_post, url, true);
    xhttp.send();
  }
  
  
  // USE THE FOLLOWING IF MAKING A REQUEST TO A PAGE WITH THE CORS PROBLEM:
  // PREFIX_URL + https://stocks.exchange/api2/market_summary/OMB/BTC would be better, but
  // However, the url below is not effected by the CORS problem
  request("https://stocks.exchange/api2/prices", (e) => {
    let response = JSON.parse(e.currentTarget.response);
    let omb_response = null;
    
    for (let i = 0; i < response.length; ++i) {
      let item = response[i];
      if (item.market_name == "OMB_BTC") {
        omb_response = item;
        break;
      }
    }
    if (omb_response != null) {
      document.getElementById("ticker-buy").innerHTML = omb_response.buy;
      document.getElementById("ticker-sell").innerHTML = omb_response.sell;
    } else {
      document.getElementById("ticker-buy").innerHTML = "[API ERROR]";
      document.getElementById("ticker-sell").innerHTML = "[API ERROR]";
    }
  });
  
  
})();