module.exports = function(exports) {
    // ************************
    // Contacts Methods
    // ************************
    var vars = exports.vars;

    /**
     * Retrieves contacts for the user for the authorized access token.
     * https://www.dwolla.com/developers/endpoints/contacts/user
     *
     * Optional params:
     *
     *   - search
     *   - types
     *   - limit
     *
     * @param {Object}     params
     * @param {Function}   fn
     * */
    exports.contacts = function(params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
    
      params = params || {};
      params.oauth_token = vars._token;
      exports._request('/contacts/', params, fn);
    };
    
    /**
     * Retrieves nearby Dwolla spots within the range of the provided latitude and longitude.
     * Half of the limit are returned as spots with closest proximity. The other half of the spots
     * are returned as random spots within the range.
     * https://www.dwolla.com/developers/endpoints/contacts/nearby
     *
     * Optional params:
     *
     *   - range
     *   - limit
     *
     * @param {String}   lat
     * @param {String}   lon
     * @param {Object}   params
     * @param {Function} fn
     **/
    exports.nearby = function(lat, lon, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._client_id) { throw new Error('Missing arg client_id'); }
      if (!vars._client_secret) { throw new Error('Missing arg client_secret'); }
      if (!lat) { throw new Error('Missing arg lat'); }
      if (!lon) { throw new Error('Missing arg lon'); }
    
      params = params || {};
      params.client_id = vars._client_id;
      params.client_secret = vars._client_secret;
      params.latitude = lat;
      params.longitude = lon;
    
      exports._request('/contacts/nearby', params, fn);
    };
}