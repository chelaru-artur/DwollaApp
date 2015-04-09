module.exports = function(exports) {
    // ************************
    // Funding Sources Methods
    // ************************
    var vars = exports.vars;

    /**
     * Retrieves verified funding source by identifier for the user associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/fundingsources/details
     *
     * @param {String}     fundingId
     * @param {Function}   fn
     **/
    exports.fundingSourceById = function(id, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: vars._token };
      exports._request('/fundingsources/' + id, params, fn);
    };
    
    /**
     * Retrieves a list of verified funding sources for the user
     * associated with the authorized access token.
     * https://www.dwolla.com/developers/endpoints/fundingsources/list
     *
     * @param {Function}   fn
     **/
    exports.fundingSources = function(fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
    
      var params = { oauth_token: vars._token };
      exports._request('/fundingsources/', params, fn);
    };

    /**
     * Use this method to add a new funding source for the user with the given authorized access token.
     * https://developers.dwolla.com/dev/docs/funding/add
     *
     * @param {String} account_number
     * @param {String} routing_number
     * @param {String} account_type
     * @param {String} name
     * @param {Function} fn
     */

    exports.addFundingSource = function(account_number, routing_number, account_type, name, fn) {
        if (typeof fn !== 'function') { throw new Error('Missing callback'); }
        if (!vars._token) { throw new Error('Missing arg oauth_token'); }
        if (!account_number) { throw new Error('Missing arg account_number'); }
        if (!routing_number) { throw new Error('Missing arg routing_number'); }
        if (!account_type) { throw new Error('Missing arg account_type'); }
        if (!name) { throw new Error('Missing arg name'); }

        var params = {};

        params.oauth_token = vars._token;
        params.account_number = account_number;
        params.routing_number = routing_number;
        params.account_type = account_type;
        params.name = name;

        exports._post('/fundingsources/', params, fn);
    };

    /**
     * Use this method to verify a new funding source for the user with the given authorized access token.
     * https://developers.dwolla.com/dev/docs/funding/verify
     *
     * @param {String} deposit1
     * @param {String} deposit2
     * @param {String} fundingId
     * @param {Function} fn
     */

    exports.verifyFundingSource = function(deposit1, deposit2, fundingId, fn) {
        if (typeof fn !== 'function') { throw new Error('Missing callback'); }
        if (!vars._token) { throw new Error('Missing arg oauth_token'); }
        if (!deposit1) { throw new Error('Missing arg deposit1'); }
        if (!deposit2) { throw new Error('Missing arg deposit2'); }
        if (!fundingId) { throw new Error('Missing arg fundingId'); }

        var params = {};
        params.oauth_token = vars._token;
        params.deposit1 = deposit1;
        params.deposit2 = deposit2;

        exports._post('/fundingsources/' + fundingId + '/verify', params, fn);
    };

    /**
     * Use this method to withdraw funds from a Dwolla account, and into a bank account, for the user with the given authorized access token.
     * https://developers.dwolla.com/dev/docs/funding/withdraw
     *
     * @param {Number} pin
     * @param {String} amount
     * @param {String} fundingId
     * @param {Function} fn
     */

    exports.withdrawToFundingSource = function(pin, amount, fundingId, fn) {
        if (typeof fn !== 'function') { throw new Error('Missing callback'); }
        if (!vars._token) { throw new Error('Missing arg oauth_token'); }
        if (!pin) { throw new Error('Missing arg pin'); }
        if (!amount) { throw new Error('Missing arg amount'); }
        if (!fundingId) { throw new Error('Missing arg fundingId'); }

        var params = {};
        params.oauth_token = vars._token;
        params.pin = pin;
        params.amount = amount;

        exports._post('/fundingsources/' + fundingId + '/withdraw', params, fn);
    };

    /**
     * Use this method to deposit funds from a bank account, and into a Dwolla account balance for the user with the given authorized access token.
     * https://developers.dwolla.com/dev/docs/funding/withdraw
     *
     * @param {Number} pin
     * @param {String} amount
     * @param {String} fundingId
     * @param {Function} fn
     */

    exports.depositFromFundingSource = function(pin, amount, fundingId, fn) {
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!amount) { throw new Error('Missing arg amount'); }
      if (!fundingId) { throw new Error('Missing arg fundingId'); }

      var params = {};
      params.oauth_token = vars._token;
      params.pin = pin;
      params.amount = amount;

      exports._post('/fundingsources/' + fundingId + '/deposit', params, fn);
    };
};