module.exports = function(exports) {
    // ************************
    // Authentication Methods
    // ************************
    var vars = exports.vars;
    var restler = require('restler');
    var util = require('util');
    var qs = require('querystring');

    /**
     * Generates an OAuth permissions page URL.  Synchronous.
     * http://developers.dwolla.com/dev/docs/auth
     *
     * @param {String}     redirect_uri
     * @param {String}     scope
     **/
    exports.authUrl = function(redirect_uri, scope) {
      if (!vars._client_id) { throw new Error('Missing arg client_id'); }
      if (!scope) { scope = "Send|Transactions|Balance|Request|Contacts|AccountInfoFull|Funding|ManageAccount"; }
    
      var params = {
          client_id: vars._client_id,
          response_type: 'code',
          scope: scope
      };
      
      if(redirect_uri) {
          params.redirect_uri = redirect_uri;
      }

      var host = exports.sandbox ? 'uat.dwolla.com' : 'www.dwolla.com';
      
      return 'https://' + host + '/oauth/v2/authenticate?' + qs.stringify(params);
    };
    
    /**
     * Exchanges a temporary authorization code for an access token 
     * and refresh token pair.
     *
     * http://developers.dwolla.com/dev/docs/auth
     *
     * @param {String}     code
     * @param {String}     redirect_uri
     * @param {Function}   fn
     **/
    exports.finishAuth = function(code, redirect_uri, fn) {
      if (!vars._client_id) { throw new Error('Missing arg client_id'); }
      if (!vars._client_secret) { throw new Error('Missing arg client_secret'); }
      if (!code) { throw new Error('Missing arg code'); }
    
      var params = {
          client_id: vars._client_id,
          client_secret: vars._client_secret,
          grant_type: 'authorization_code',
          code: code
      };
    
      if(redirect_uri) {
          params.redirect_uri = redirect_uri;
      }

      var host = exports.sandbox ? 'uat.dwolla.com' : 'www.dwolla.com';
      var url = util.format("%s%s%s", 'https://', host, '/oauth/v2/token');

      restler.postJson(url, params)
        .on('complete', function(result, response) {
          if (result instanceof Error) fn(result.message);
          else {
            if (result.error) {
              fn(new Error(result.error_description));
            } else {
              fn(null, result);
            }
          }
      });
    };

    /**
     * Use a refresh_token to get a new access token and refresh token pair.
     * http://developers.dwolla.com/dev/docs/auth
     *
     * @param {String}     code
     * @param {String}     redirect_uri
     * @param {Function}   fn
     **/

    exports.refreshAuth = function(refresh_token, fn) {
      if (!vars._client_id) { throw new Error('Missing arg client_id'); }
      if (!vars._client_secret) { throw new Error('Missing arg client_secret'); }
      if (!refresh_token) {throw new Error('Missing arg refresh_token'); }

      var params = {
          client_id: vars._client_id,
          client_secret: vars._client_secret,
          grant_type: 'refresh_token',
          refresh_token: refresh_token
      };

      var host = exports.sandbox ? 'uat.dwolla.com' : 'www.dwolla.com';
      var url = util.format("%s%s%s", 'https://', host, '/oauth/v2/token');

      restler.postJson(url, params)
        .on('complete', function(result, response) {
          if (result instanceof Error) fn(result.message);
          else {
            if (result.error) {
              fn(new Error(result.error_description));
            } else {
              fn(null, result);
            }
          }
      });
    };
};