module.exports = function(RED) {
  function HEREGeoSearch( n ) {
    RED.nodes.createNode(this,n );
    var node = this;
    var name = n.name;
    var query = n.at;
    var HEREConfigNode;
    var apiKey;
    const axios = require('axios');

    // Retrieve the config node
    HEREConfigNode = RED.nodes.getNode(n.apikey);
    apiKey = HEREConfigNode.credentials.apikey;

    node.on('input', function (msg) {

      msg.hereparams = msg.hereparams || {};

      //at, longitude & latitude
      if( typeof msg.hereparams.at == 'undefined' ) {
        msg.hereparams.at = at; // take the default or the node setting
      } else {
        // passed in param, override default or node setting
        var at_str = msg.hereparams.at;
        var at_arr= at_str.split(",");
        at_dec[0]= parseFloat(at_arr[0]);
        at_dec[1]= parseFloat(at_arr[1]);
      }
      // saving the api call in api_str variable
      var api_str='https://geocode.search.hereapi.com/v1/geocode?q='+at_dec[0]+','+at_dec[1]+'&apiKey='+apiKey;

      (async () => {
        try {
          const response = await axios.get(api_str);
          //console.log(response.data)
          msg.payload = response.data;
          node.send(msg);
        } catch (error) {
          console.log(error.response.data);
          //console.log(error.response.status);
          node.warn(error.response.data);
          node.send(msg);
        }
      })();
    });
  }
  RED.nodes.registerType("here-rev-geocode",HEREGeoSearch);
}
