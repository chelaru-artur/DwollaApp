var EventEmitter = require("events").EventEmitter;
var service = new EventEmitter();
var fs = require('fs');
var url = require('url');
var http = require('http');
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var gmail = google.gmail('v1');
///////////////////
var cfg = require('./config.js');
var Dwolla = require('dwolla-node')(cfg.dwolla.API_KEY, cfg.dwolla.API_SECRET); // initialize API client
var oauth2Client = new OAuth2Client(cfg.gmail.CLIENT_ID, cfg.gmail.CLIENT_SECRET, cfg.gmail.REDIRECT_URL);
//constants
var gmailToken = 'gmail_token.json';
var dwollaToken = 'dwolla_token.json';
var MINUTES = cfg.app.minutes * 60 * 1000;

// use sandbox API environment, remove this in production
Dwolla.sandbox = true;

//used to get first authorization
http.createServer(function(req, res) {
    var url_parts = url.parse(req.url, true);
    switch (url_parts.pathname) {
        case '/':
        {
            var link = oauth2Client.generateAuthUrl({
                access_type: 'offline', // will return a refresh token
                scope: ['https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/googletalk '] // can be a space-delimited string or an array of scopes
            });
            res.end('<a href="' + link + '">Google auth</a>');
            break;
        }
        case '/gmail':
        {
            var code = url_parts.query.code;
            getTokens(code, function() {
                var link = Dwolla.authUrl(cfg.dwolla.REDIRECT_URL);
                res.end('<a href="' + link + '">Dwolla auth</a>');
            });
            break;
        }
        case '/dwolla':
        {
            var code = url_parts.query.code;
            Dwolla.finishAuth(code, cfg.dwolla.REDIRECT_URL, function(error, auth) {
                if (error) res.end('error');
                Dwolla.setToken(auth.access_token);
                fs.writeFileSync(dwollaToken, JSON.stringify(auth));
                service.emit('startAction');
                return res.end('success');
            });
            break;
        }
    }
}).listen(1337, '127.0.0.1');

//helper function
function parseEmail(email) {
    var newEmail = email;
    if (email.search('<') >= 0) {
        newEmail = email.slice(email.search('<') + 1, email.search('>'));
    }
    return newEmail;
}

//gmail tokens
function getTokens(code, cb) {
    oauth2Client.getToken(code, function(err, tokens) {
        fs.writeFileSync(gmailToken, JSON.stringify(tokens));
        oauth2Client.setCredentials(tokens);
        if (!err)
            cb();
    });
}

function dwollaRefreshTokens() {
    fs.readFile(dwollaToken, {
        encoding: 'utf8'
    }, function(err, data) {
        var t = JSON.parse(data);
        Dwolla.refreshAuth(t.refresh_token, function(error, auth) {
            fs.writeFileSync(dwollaToken, JSON.stringify(auth));
            Dwolla.setToken(auth.access_token);
        });
    })
}

function googleRefreshToken() {
    oauth2Client.refreshAccessToken(function(err, tokens) {
        fs.writeFileSync(gmailToken, JSON.stringify(tokens));
        oauth2Client.setCredentials(tokens);
    });
}

function checkIfHasTransactions(email, cb) {
    Dwolla.transactions({
        types: 'money_sent',
        limit: 200
    }, function(err, data) {
        var result = false;
        if (data.length > 0) {
            data.forEach(function(t) {
                if (t.DestinationId == email)
                    result = true;
            });
        }
        cb(result);
    });
}

function sendMoney(email, cb) {
    var params = {
        destinationType: 'Email'
    };
    if (cfg.app.forbidPaymentToSameEmails) {
        checkIfHasTransactions(email, function(result) {
            if (result) {
                console.log(result);
                cb(null);
            } else {
                Dwolla.send(cfg.dwolla.PIN, email, cfg.app.sendMoney, params, function(err, tran) {
                    console.log(err);
                    if (!err)
                        console.log(email + ': transaction complete');
                    cb(err);
                });
            }
        });
    } else {
        Dwolla.send(cfg.dwolla.PIN, email, cfg.app.sendMoney, params, function(err, tran) {
            console.log(err);
            if (!err)
                console.log(email + ': transaction complete');
            cb(err);
        });
    }
}

//main action
//recieve new emails, if new email get sender email adress and send money
service.on('recieveEmails', function() {
    gmail.users.messages.list({
        userId: 'me',
        auth: oauth2Client,
        q: 'label:UNREAD'
    }, function(err, result) {
        if (err) googleRefreshToken();
        if (result && result.messages) {
            result.messages.forEach(function(message) {
                gmail.users.messages.get({
                    userId: 'me',
                    auth: oauth2Client,
                    format: 'metadata',
                    id: message.id
                }, function(err, data) {
                    var from = data.payload.headers;
                    var email;
                    // find sender email in headers
                    from.forEach(function(header) {
                        if (header.name == 'From') {
                            email = header.value;
                        }
                    });
                    email = parseEmail(email);
                    //send money to email
                    sendMoney(email, function(err) {
                        if (err) {
                            // if error then refresh token
                            dwollaRefreshTokens()
                        } else {
                            //if no errors, mark message as read
                            gmail.users.messages.modify({
                                userId: 'me',
                                id: message.id,
                                auth: oauth2Client,
                                resource: {
                                    'removeLabelIds': ['UNREAD']
                                }
                            });
                        }
                    });
                });
            });
        } else {
            console.log('no messages');
        }
    });
});

service.on('startAction', function() {
    console.log('service started')
    setInterval(function() {
        service.emit('recieveEmails');
    }, MINUTES);
});
