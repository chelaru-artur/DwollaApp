var cfg = require('./_config'); 
var Dwolla = require('dwolla-node')(cfg.apiKey, cfg.apiSecret);


// Seed the user's OAuth token
Dwolla.setToken(cfg.accessToken);

// use sandbox API environment
Dwolla.sandbox = true;

/**
 * EXAMPLE 1: 
 *   Fetch last 10 contacts from the 
 *   account associated with the provided
 *   OAuth token
 **/

Dwolla.contacts(function(err, data){
   if (err) { console.log(err); }
   console.log(data);
});

/**
 * EXAMPLE 2: 
 *   Search through the contacts of the
 *   account associated with the provided
 *   OAuth token
 **/

Dwolla.contacts({search: 'Ben'}, function(err, data){
   if (err) { console.log(err); }
   console.log(data);
});
