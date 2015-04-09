# dwolla-node: official Dwolla API node.js wrapper 
===========
Bindings for the Dwolla API.  All API methods are asynchronous.

Contributions are welcomed with open arms.

## Version
1.1.1

## Installation

    npm install dwolla-node

## Documentation

[http://developers.dwolla.com/dev/docs](http://developers.dwolla.com/dev/docs)

## Usage

You'll need [Dwolla API Credentials](https://www.dwolla.com/applications) to interact with the Dwolla API.

```javascript
// Instantiate a Dwolla API client
var Dwolla = require('dwolla-node')(['{CLIENT_ID}', '{CLIENT_SECRET}']);

// Set a user's OAuth token
Dwolla.setToken('[TOKEN]');

// Use the Sandbox API environment, instead of production
Dwolla.sandbox = true;

// Send money to a Dwolla ID: 812-626-8794
Dwolla.send('[PIN]', '812-626-8794', 1.00, function(error, transactionId) {
    if(error) { console.log('Error: ' + error); }

    console.log('Transaction ID: ' + transactionId);
});
```
    
## Examples / Quickstart

This repo includes various usage examples, including:

* Authenticating with OAuth [oauth.js]
* Sending money [send.js]
* Fetching account information [accountInfo.js]
* Grabbing a user's contacts [contacts.js]
* Listing a user's funding sources [fundingSources.js]
* Creating Gateway Checkout sessions [checkouts.js]
* Enable or check an account's Auto-Withdrawal feature [autoWithdrawal.js]
* Fetch a user's account balance [balance.js]
* Listing or searching a user's contacts [contacts.js]
* Creating a money request, and listing a user's pending money requests [requests.js]
* Getting transactions, transaction statistics, and processing refunds [transactions.js]
* Creating a MassPay job, retrieving jobs, and their items [masspay.js]

## Methods

Helper Methods:

    setToken(oauth_token)   ==> (bool) did the access token change sucessfully?
    getToken()              ==> (string) the currently used oauth access token

Authentication Methods:

    authUrl([redirect_uri, scope])          ==> (string) OAuth permissions page URL
    finishAuth(code[, redirect_uri, fn])  ==> (object) access_token, refresh_token, expiration times
    refreshAuth(refresh_token, fn)      ==> (object) access_token, refresh_token, expiration times

Account Methods:

    basicAccountInfo(id, fn)                    ==> (object) user profile for given email address or Dwolla ID
    fullAccountInfo(fn)                         ==> (object) the user entity associated with the token
    balance(fn)                                 ==> (string) the Dwolla balance of the account associated with the token
    toggleAutoWithdraw(enabled, fundingId, fn)  ==> (object) current {Enabled, FundingId}
    getAutoWithdrawalStatus(fn)                 ==> (object) current {Enabled, FundingId}

Contacts Methods:

    contacts(params, fn)            ==> (array) list of contacts matching the search criteria
    nearby(lat, lon, params, fn)    ==> (array) list of nearby spots matching the search criteria
    
Funding Sources Methods:

    fundingSources(fn)          ==> (array) a list of funding sources associated with the token
    fundingSourceById(id, fn)   ==> (object) information about the {$id} funding source
    addFundingSource(account_number, routing_number, account_type, name, fn)    ==>  (object) the new, unverified funding source resource
    verifyFundingSource(deposit1, deposit2, fundingId, fn)  ==> (object) funding source resource
    withdrawToFundingSource(pin, amount, fundingId, fn)  ==> (object) the resulting Withdraw transaction
    depositFromFundingSource(pin, amount, fundingId, fn) ==> (object) the resulting Deposit transaction

Transactions Methods:

    send(pin, destinationId, amount, params, fn)    ==> (string) transaction ID
    transactionById(id, fn)                         ==> (object) transaction details
    transactions(params, fn)                        ==> (array) a list of transactions matching the search criteria
    transactionsByApp(params, fn)                   ==> (array) a list of transactions facilitated by the application, matching the search criteria
    transactionsStats(params, fn)                   ==> (object) statistics about the account associated with the token
    refund(pin, transactionId, fundsSource, amount, params, fn)         => (object) resulting Refund transaction resource
    
Money Request Methods:

    request(pin, sourceId, amount, params, fn)      ==> (string) request ID
    requests(params, fn)        ==> (array) list of Request resources
    requestById(request_id, fn)     ==> (object) a Request resource
    cancelRequest(request_id, fn)   ==> (bool) true if successfully cancelled, otherwise, error 
    fulfillRequest(pin, request_id, amount, params, fn)     ==> (object) the Request resource

MassPay Methods:

    createMassPayJob(fundsSource, pin, items, params, fn)       ==> (object) resulting MassPay Job
    getMassPayJobs(fn)      ==> (array) list of MassPay Jobs
    getMassPayJob(job_id, fn)       ==> (object) MassPay Job 
    getMassPayJobItems(job_id, fn)      ==> (array) list of the job's Items
    getMassPayJobItem(job_id, item_id, fn)      ==> (object) a particular job's Item

Offsite Gateway Methods:

    createCheckout(redirect, purchaseOrder, params, fn)     ==> (object) contains checkoutId and checkoutURL parameters
    getCheckout(checkoutId, fn)     ==> (object) checkout object
    completeCheckout(checkoutId, fn)        ==> (object) results of the checkout
    verifyGatewaySignature(signature, checkout_id, amount)      ==> (bool) is signature valid?

## Changelog

1.1.1
* Change module name to 'dwolla-node'

1.1.0
* Add unit tests to validate HTTP requests
* Add support for Auto-Withdrawal endpoints
* Add support for new expiring OAuth access tokens and refresh tokens
* Add support for adding funding sources, verifying them, withdraw, deposit
* Add support for Money requests listing, cancel, fulfill, lookup
* Refactor Off-Site Gateway implementation

1.0.2
* Add support for MassPay
* Remove Register endpoint binding, since that's been deprecated
* Remove debug console output from helper.js
* Don't require app key and secret to be passed into requestToken, use credentials previously set during module instantiation instead.

1.0.1

* Add support for offsite gateway's guest checkout mode

1.0.0

* First revision of major refactor

## Tests

To run unit tests, do:
    
`mocha ./test/unit`

Currently, unit tests only ensure HTTP requests created by the bindings are valid.  We plan to add support for testing sample API responses against the bindings.  Eventually, we'd also like to support live testing against the sandbox API.

## Credits

This wrapper is a forked extension of Kenan Shifflett's 'node-dwolla' module.  Michael Schonfeld did much of the initial refactoring of `node-dwolla`.

- Kenan Shifflett &lt;kenan.shifflett@gmail.com&gt;
- Gordon Zheng &lt;gordon@dwolla.com&gt;
- David Stancu &lt;david@dwolla.com&gt;
- Michael Schonfeld &lt;michael@schonfeld.org&gt;

## Support

- Dwolla Developer Support &lt;devsupport@dwolla.com&gt;

## TODO

1. Use `nock` module to mock `http` instead of mocking `restler` with `mockery` because the former lets us validate restler's behavior, which we are today assuming will always work as expected.