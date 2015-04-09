var cfg = require('./_config'); 
var Dwolla = require('dwolla-node')(cfg.apiKey, cfg.apiSecret);

// use a pre-set OAuth access token
Dwolla.setToken(cfg.accessToken);

// use the sandbox environment's API
Dwolla.sandbox = true;

/**
 * Example 1:
 *
 * Retrieve the 10 recentmost transactions for
 * the user associated with the configured OAuth
 * token.
 */

Dwolla.transactions(function(err, data) {
  if (err) { console.log(err); }
  console.log(data);
});

/**
 * Example 2:
 *
 * Retrieve information about transaction ID '12345'
 * from the user with the authorized OAuth token.
 */

Dwolla.transactionById('12345', function(err, data) {
  if (err) { console.log(err); }
  console.log(data);
});

/**
 * Example 3:
 *
 * Retrieve transaction statistics for the user
 * with the authorized OAuth token.
 */

Dwolla.transactionsStats(function(err, data){
  if (err) { console.log(err); }
  console.log(data);
});

/**
 * Example 4:
 *
 * Retrieve the 10 recentmost transactions which
 * have been facilitated by the requesting application.
 */

Dwolla.transactionsByApp(function(err, data) {
  if (err) { console.log(err); }
  console.log(data);
});

/**
 * Example 5:
 *
 * Process a refund for transaction '123456'
 * with pin set in cfg.pin and funding source ID '7654321'
 * for amount $10.00
 */

Dwolla.refund(cfg.pin, '12345', '7654321', '10.00', function(err, data) {
  if (err) { console.log(err); }
  console.log(data);
});