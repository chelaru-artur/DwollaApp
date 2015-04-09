var init = require('./testInit');
var should = require('should');
var util = require('util');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Authentication', function() {
	describe('oauth initiation URL', function() {
		it('Should be valid for sandbox environment', function(done) {
			dwolla.sandbox = true;
			var redirect = "https://www.google.com/";
			var url = dwolla.authUrl(redirect);

			var format = 'https://uat.dwolla.com/oauth/v2/authenticate?client_id=%s&response_type=code&scope=Send%7CTransactions%7CBalance%7CRequest%7CContacts%7CAccountInfoFull%7CFunding%7CManageAccount&redirect_uri=%s';

			url.should.equal(util.format(format, encodeURIComponent(init.fakeKeys.appKey), encodeURIComponent(redirect)));
			done();
		});

		it('Should be valid for production environment', function(done) {
			dwolla.sandbox = false;
			var redirect = "https://www.google.com/";
			var url = dwolla.authUrl(redirect);

			var format = 'https://www.dwolla.com/oauth/v2/authenticate?client_id=%s&response_type=code&scope=Send%7CTransactions%7CBalance%7CRequest%7CContacts%7CAccountInfoFull%7CFunding%7CManageAccount&redirect_uri=%s';

			url.should.equal(util.format(format, encodeURIComponent(init.fakeKeys.appKey), encodeURIComponent(redirect)));
			done();
		});

		after(function() {
			// tearDown: set sandbox back to false so other tests expecting www don't get messed up!
			dwolla.sandbox = false;
		});
	});

	describe('Finish Auth', function() {
		it('Should make the correct request', function(done) {
      dwolla.finishAuth('1234', 'https://fakeredirect.com/', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/v2/token');
      init.restlerMock.lastRequest.options.should.eql({client_id: init.fakeKeys.appKey, client_secret: init.fakeKeys.appSecret, grant_type: 'authorization_code', code: '1234', redirect_uri: 'https://fakeredirect.com/'});

      done();
    });
	});

	describe('Refresh Auth', function() {
		it('Should make the correct request', function(done) {
      dwolla.refreshAuth('fake_refresh_token', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/v2/token');
      init.restlerMock.lastRequest.options.should.eql({client_id: init.fakeKeys.appKey, client_secret: init.fakeKeys.appSecret, grant_type: 'refresh_token', refresh_token: 'fake_refresh_token'});

      done();
    });
	});
});