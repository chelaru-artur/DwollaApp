var cfg = require('./_config'); 
var Dwolla = require('dwolla-node')(cfg.apiKey, cfg.apiSecret);


// Seed the user's OAuth token
Dwolla.setToken(cfg.accessToken);

// use sandbox API environment
Dwolla.sandbox = true;

/**
 * EXAMPLE 1: 
 *   Fetch all funding sources for the
 *   account associated with the provided
 *   OAuth token
 **/

Dwolla.fundingSources(function(err, data) {
   if (err) { console.log(err); }
   console.log(data);
});
    
/**
 * EXAMPLE 2: 
 *   Fetch detailed information for the
 *   funding source with a specific ID
 **/

Dwolla.fundingSourceById('pJRq4tK38fiAeQ8xo2iH9Q==', function(err, data) {
    if (err) { console.log(err); }
    console.log(data);
});

/**
 * Example 3:
 *
 * Add a funding source with account number '12345678',
 * routing number '87654321', of type 'Checking' and with
 * name 'My Bank'
 */

Dwolla.addFundingSource('12345678', '87654321', 'Checking', 'My Bank', function(err, data) {
    if (err) { console.log(err); }
    console.log(data);
});

/**
 * Example 4:
 *
 * Verify a funding source with micro-deposits of 0.02, 0.05,
 * and funding ID '12345678'
 */

Dwolla.verifyFundingSource('0.02', '0.05', '12345678', function(err, data) {
    if (err) { console.log(err); }
    console.log(data);
});

/**
 * Example 5:
 *
 * Withdraw $10 from the user's account balance to a funding source with ID '12345678'
 */

Dwolla.withdrawToFundingSource(cfg.pin, '10.00', '12345678', function(err, data) {
   if (err) { console.log(err); }
   console.log(data);
});

/**
 * Example 6:
 *
 * Deposit $10 from the user's funding source of ID '12345678' to the user's Dwolla account balance.
 */

Dwolla.depositFromFundingSource(cfg.pin, '10.00', '12345678', function(err, data) {
   if (err) { console.log(err); }
   console.log(data);
});
