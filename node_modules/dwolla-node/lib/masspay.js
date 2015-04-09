module.exports = function(exports) {
    // ************************
    // MassPay Methods
    // ************************
    var vars = exports.vars;

    /**
     * Creates a MassPay Job for the user for the authorized access token.
     * Takes an array of objects, each containing amount, destination, 
     * destinationType, and note as items.
     *
     * https://developers.dwolla.com/dev/docs/masspay/create

     * Required arguments:
     * 
     * @param {string}      fundsSource
     * @param {int}         pin
     * @param {array}       items
     * @param {object}      params
     * @param {function}    fn   
     *
     * Optional params:
     *
     * boolean assumeCosts
     * string userJobId
     *
     **/

    exports.createMassPayJob = function(fundsSource, pin, items, params, fn) {
      // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }

      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }
      if (!pin) { throw new Error('Missing arg pin'); }
      if (!fundsSource) { throw new Error('Missing arg fundsSource'); }
      if (!items) { throw new Error('Missing arg items'); }

      params = params || {};
      params.oauth_token = vars._token;
      params.fundsSource = fundsSource;
      params.pin = pin;
      params.items = items;
      exports._post('/masspay/', params, fn);
    };

    /**
     * Fetches details about an existing MassPay Job, given a job_id.
     *
     * https://developers.dwolla.com/dev/docs/masspay/job

     * Required arguments:
     * 
     * @param {string}      job_id
     * @param {function}    fn   
     *
     **/

    exports.getMassPayJob = function(job_id, fn) {
      if (!job_id) { throw new Error('Missing Job ID'); }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      params = {};
      params.oauth_token = vars._token;

      exports._request('/masspay/' + job_id, params, fn);
    };

    /**
     * Fetches all Items for a MassPay Job, given a job_id.
     *
     * https://developers.dwolla.com/dev/docs/masspay/jobs/items

     * Required arguments:
     * 
     * @param {string}      job_id
     * @param {function}    fn   
     *
     * Optional arguments:
     *
     * @param {integer}     limit
     * @param {integer}     skip
     *
     **/

    exports.getMassPayJobItems = function(job_id, params, fn) {
       // params are optional
      if (!fn || typeof params === 'function') {
        fn = params;
        params = {};
      }

      if (!job_id) { throw new Error('Missing Job ID'); }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      params = params || {};
      params.oauth_token = vars._token;

      exports._request('/masspay/' + job_id + '/items', params, fn);
    };

    /**
     * Retrieve a single Item for a particular MassPay Job, given a job_id.
     *
     * https://developers.dwolla.com/dev/docs/masspay/jobs/items

     * Required arguments:
     * 
     * @param {string}      job_id
     * @param {string}      item_id
     * @param {function}    fn
     *
     **/

    exports.getMassPayJobItem = function(job_id, item_id, fn) {
      if (!job_id) { throw new Error('Missing Job ID'); }
      if (!item_id) { throw new Error('Missing item ID'); }
      if (typeof fn !== 'function') { throw new Error('Missing callback'); }
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      params = {};
      params.oauth_token = vars._token;

      exports._request('/masspay/' + job_id + '/items/' + item_id, params, fn);
    };

    /**
     * Fetches all MassPay Jobs for the authenticated user
     *
     * https://developers.dwolla.com/dev/docs/masspay/jobs

     * Required arguments:
     * 
     * @param {function}    fn   
     *
     **/

    exports.getMassPayJobs = function(fn) {
      if (!vars._token) { throw new Error('Missing arg oauth_token'); }

      params = {};
      params.oauth_token = vars._token;

      exports._request('/masspay/', params, fn);
    };
};
