var cfg = require('./_config')                            // Include any required keys
    , dwolla = require('dwolla-node')(cfg.apiKey, cfg.apiSecret)   // Include the Dwolla REST Client
    , $ = require('seq')
    , express = require('express')
    , app = express()
    , util = require('util')
    ;

// Some constants...
var redirect_uri = 'http://localhost:3000/redirect';

// Use Dwolla Sandbox API
dwolla.sandbox = true;

/**
 * EXAMPLE 1: (simple example) 
 *   Create a new standard offsite gateway checkout
 **/
app.get('/', function(req, res) {
    var purchaseOrder = {
     destinationId: '812-740-4294',
     total: '5.00'
    };

    var params = {
     allowFundingSources: true,
     orderId: 'blah',
    };

    dwolla.createCheckout(redirect_uri, purchaseOrder, params, function(err, checkout) {
     if (err) console.log(err);

      // example checkout result:
      // { checkoutURL: 'https://uat.dwolla.com/payment/checkout/d0429a55-c338-4139-b273-48d2f8c45693',
      //   checkoutId: 'd0429a55-c338-4139-b273-48d2f8c45693' }

     res.send(util.format('Checkout created.  Click to continue: <a href="%s">%s</a>', checkout.checkoutURL, checkout.checkoutURL));
    });
});


/**
 * EXAMPLE 2: (in-depth example) 
 *   Create a standard offsite gateway checkout
 *   session, with 2 test products, a
 *   and order ID, and a memo/note
 **/
app.get('/example2', function(req, res) {
    var purchaseOrder = {
      destinationId: '812-740-4294',
      total: '5.00',      // this total must be equal to the sum of all the products' prices * their quantities
      orderItems: [
        {
         "name": "Prime Rib Sandwich", 
         "description": "A somewhat tasty non-vegetarian sandwich", 
         "quantity": "1", 
         "price": "2.0"
        },
        {
         "name": "Ham Sandwich", 
         "description": "Yum!", 
         "quantity": "3", 
         "price": "1.00"
        }
      ],
      notes: 'Blah!!!'
    };

    var params = {
      allowFundingSources: true,  // allow the user the option to pay with a bank account or line of credit
      orderId: 'blah',            // a custom string to ID this checkout
      checkoutWithApi: false,     // don't create a PayLater checkout
      callback: 'http://requestb.in/17tq5l61' // you'll want to create your own Request Bin
    };

    dwolla.createCheckout('http://localhost:3000/redirect', purchaseOrder, params, function(err, checkout) {
      if (err) console.log(err);
      res.send(util.format('Checkout created.  Click to continue: <a href="%s">%s</a>', checkout.checkoutURL, checkout.checkoutURL));
    });
});


/**
 * EXAMPLE 3: (Verifying an offsite gateway signature) 
 *   Verify the signature returned from
 *   Dwolla's offsite gateway redirect
 **/
app.get('/redirect', function(req, res) {
    // Grab Dwolla's proposed signature
    signature = req.query['signature'];
    
    // Grab Dwolla's checkout ID
    checkout_id = req.query['checkoutId'];
    
    // Grab the reported total transaction amount
    amount = req.query['amount'];

    // Verify the proposed signature
    did_verify = dwolla.verifyGatewaySignature(signature, checkout_id, amount)

    if (did_verify) {
        return res.send("<p>Dwolla's signature verified successfully. You should go ahead and process the order.</p>");
    } else {
        return res.send("<p>Dwolla's signature failed to verify. You shouldn't process the order before some manual verification.</p>");
    }
});

/**
 * EXAMPLE 4: 
 *   Get an existing Checkout by its checkoutId
 **/

// dwolla.getCheckout('a9d7c86a-0d0d-4466-b228-e15584a1315a', console.log);

// Console output:

// null { CheckoutId: 'd0429a55-c338-4139-b273-48d2f8c45693',
//   Discount: null,
//   Shipping: null,
//   Tax: null,
//   Total: 5,
//   Status: 'Completed',
//   FundingSource: 'Balance',
//   TransactionId: 290142,
//   ProfileId: null,
//   DestinationTransactionId: 290141,
//   OrderItems: [],
//   Metadata: null }

/**
 * EXAMPLE 5: 
 *   Complete a PayLater type checkout
 **/

// dwolla.completeCheckout('a9d7c86a-0d0d-4466-b228-e15584a1315a', console.log);

// Console output:

// null { Amount: 5,
//   CheckoutId: 'a9d7c86a-0d0d-4466-b228-e15584a1315a',
//   ClearingDate: '',
//   OrderId: 'blah',
//   TestMode: false,
//   TransactionId: 290144,
//   DestinationTransactionId: 290143 }

// Start the server
app.listen(3000);