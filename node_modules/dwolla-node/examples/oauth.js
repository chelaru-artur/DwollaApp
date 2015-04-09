var cfg = require('./_config'); // require any needed keys
var Dwolla = require('dwolla-node')(cfg.apiKey, cfg.apiSecret); // initialize API client
var $ = require('seq');
var express = require('express');
var app = express();

// Some constants...
var redirect_uri = 'http://localhost:3000/oauth_return';

// use sandbox API environment
Dwolla.sandbox = true;


/**
 * STEP 1: 
 *   Create an authentication URL
 *   that the user will be redirected to
 * 
 *   Visit http://localhost:3000/ to see it in action.
 **/
app.get('/', function(req, res) {
    var authUrl = Dwolla.authUrl(redirect_uri);

    return res.send('To begin the OAuth process, send the user off to <a href="' + authUrl + '">' + authUrl + '</a>');
});


/**
 * STEP 2:
 *   Exchange the temporary code given
 *   to us in the querystring, for
 *   an access token and refresh token.
 **/
app.get('/oauth_return', function(req, res) {
    var code = req.query.code;

    Dwolla.finishAuth(code, redirect_uri, function(error, auth) {
        var output = "Your OAuth access_token is: <b>" + auth.access_token + "</b>, which will expire in " + auth.expires_in + " seconds.<br>Your refresh_token is: <b>" + auth.refresh_token + "</b>, and that'll expire in " + auth.refresh_expires_in + " seconds.";
        output += '<br><a href="/refresh?refreshToken=' + encodeURIComponent(auth.refresh_token) + '">Click here to get a new access and refresh token pair!</a>';
        return res.send(output);
    });
});

/**
 * STEP 3:
 *  Use a refresh token to get a new
 *  access token and refresh token pair.
 **/

app.get('/refresh', function(req, res) {
    Dwolla.refreshAuth(req.query.refreshToken, function(error, auth) {
        if (error) return res.send(error);

        var output = "Your OAuth access_token is: <b>" + auth.access_token + "</b>, which will expire in " + auth.expires_in + " seconds.<br>Your refresh_token is: <b>" + auth.refresh_token + "</b>, and that'll expire in " + auth.refresh_expires_in + " seconds.";
        output += '<br><a href="/refresh?refreshToken=' + encodeURIComponent(auth.refresh_token) + '">Click here to get a new access and refresh token pair!</a>';
        return res.send(output);
    });
});


// Start the server
app.listen(3000);