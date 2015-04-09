module.exports = function(exports) {
    // ************************
    // Contacts Methods
    // ************************
    var vars = exports.vars;

    /**
     * Use this method to toggle and set the auto withdrawal feature for the user associated with the authorized access token.
     * https://developers.dwolla.com/dev/docs/accounts/autowithdraw
     *
     * @param {String}     enabled
     * @param {String}     fundingId
     * @param {Function}   fn
     **/

    exports.toggleAutoWithdraw = function(enabled, fundingId, fn){ 
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!enabled) { throw new Error('Missing arg enabled'); }
      if (!fundingId) { throw new Error('Missing arg fundingId'); }

      var params = { oauth_token: vars._token };
      params.enabled = enabled;
      params.fundingId = fundingId;

      exports._post('/accounts/features/auto_withdrawl', params, fn);
     };


    /**
     * Use this method to find out if the auto withdrawal feature is enabled for the user associated with the authorized access token
     * https://developers.dwolla.com/dev/docs/accounts/autowithdrawstatus
     *
     * @param {Function}   fn
     **/

     exports.getAutoWithdrawalStatus = function(fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      var params = { oauth_token: vars._token };
      exports._request('/accounts/features/auto_withdrawl', params, fn);
     };
    
    /**
     * Retrieves the basic account information for the Dwolla account associated with the account identifier.
     * https://developers.dwolla.com/dev/docs/accounts/autowithdrawstatus
     *
     * @param {String}     id
     * @param {Function}   fn
     **/
    exports.basicAccountInfo = function(id, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._client_id) { throw new Error('Missing arg client_id'); }
      if (!vars._client_secret) { throw new Error('Missing arg client_secret'); }
      if (!id) { throw new Error('Missing arg id'); }
    
      var path = '/users/' + id;
      var params = {};
      params.client_id = vars._client_id;
      params.client_secret = vars._client_secret;
      exports._request(path, params, fn);
    };
    
    /**
     * Retrieves the account information for the user assoicated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/users/accountinformation
     *
     * @param {Function}   fn
     **/
    exports.fullAccountInfo = function(fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: vars._token };
      exports._request('/users/', params, fn);
    };
    
    /**
     * Retrieves the account balance for the user for the authorized access token.
     * https://www.dwolla.com/developers/endpoints/balance/account
     *
     * @param {Function}   fn
     * */
    exports.balance = function(fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: vars._token };
      exports._request('/balance/', params, fn);
    };

    /**
     * Use this method to retrieve nearby Dwolla users within the range of the provided latitude and longitude.
     * https://developers.dwolla.com/dev/docs/users/nearby
     *
     * @param {String}     lat
     * @param {String}     lon
     * @param {Function}   fn
     * */

    exports.nearbyUsers = function(lat, lon, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._client_id) { throw new Error('Missing arg client_id'); }
      if (!vars._client_secret) { throw new Error('Missing arg client_secret'); }
      if (!lat) { throw new Error('Missing arg lat'); }
      if (!lon) { throw new Error('Missing arg lon'); }
    
      var path = '/users/nearby/';
      var params = {};
      params.client_id = vars._client_id;
      params.client_secret = vars._client_secret;
      params.latitude = lat;
      params.longitude = lon;
      exports._request(path, params, fn);
    };
};