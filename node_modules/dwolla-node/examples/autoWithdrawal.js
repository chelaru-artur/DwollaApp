var cfg = require('./_config'); 
var Dwolla = require('dwolla-node')(cfg.apiKey, cfg.apiSecret);

// Seed the user's OAuth token
Dwolla.setToken(cfg.accessToken);

// use sandbox API environment
Dwolla.sandbox = true;

/***
 * Example 1:
 *
 * Enable auto-withdraw for the user associated with the OAuth token,
 * for the funding ID '1234567'.
 */

Dwolla.toggleAutoWithdraw('true', '1234567', function(err, data) {
    if (err) { console.log(err); }
    console.log(data);
});

/***
 * Example 2:
 *
 * Find out whether or not auto-withdrawal is enabled for the user
 * associated with the OAuth token
 */

Dwolla.getAutoWithdrawalStatus(function(err, data) {
    if (err) { console.log(err); }
    console.log(data);
});
