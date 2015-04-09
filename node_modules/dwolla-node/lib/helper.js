module.exports = function(exports, API_PATH) {
    // ************************
    // Helper Methods
    // ************************
    var restler = require('restler');
    var util = require('util');
    var vars = exports.vars;

    function parseResponse(data, fn) {
      if (data.Success) {
        fn(null, data.Response);
      } else {
        fn(new Error(data.Message));
      }
    }

    exports.setToken = function(token) {
        vars._token = token;

        return true;
    };

    exports.getToken = function() {
        return vars._token;
    };

    exports._request = function(path, params, fn) {
      var host = exports.sandbox ? 'uat.dwolla.com' : 'www.dwolla.com';
      var fullPath = exports.vars.API_PATH + path;
      var url = util.format("%s%s%s", 'https://', host, fullPath);

      restler.get(url, {query: params})
        .on('complete', function(result, response) {
          if (result instanceof Error) fn(result.message);
          else parseResponse(result, fn);
        });
    };

    exports._post = function(path, data, fn) {
      var host = exports.sandbox ? 'uat.dwolla.com' : 'www.dwolla.com';
      var fullPath = exports.vars.API_PATH + path;
      var url = util.format("%s%s%s", 'https://', host, fullPath);

      restler.postJson(url, data)
        .on('complete', function(result, response) {
          if (result instanceof Error) fn(result.message);
          else parseResponse(result, fn);
        });
    };
};
