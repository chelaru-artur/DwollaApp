var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Sandbox flag', function() {
	it('Should hit the correct production URL, when disabled', function(done) {
		dwolla.sandbox = false;
		dwolla.setToken(init.fakeKeys.accessToken);

		dwolla.balance(function() {});

		init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/balance/');
		done();
	});

	it('Should hit the correct UAT/sandbox URL, when enabled', function(done) {
		dwolla.sandbox = true;
		dwolla.setToken(init.fakeKeys.accessToken);

		dwolla.balance(function() {});

		init.restlerMock.lastRequest.url.should.equal('https://uat.dwolla.com/oauth/rest/balance/');
		done();
	});

	after(function() {
		// tearDown: set sandbox back to false so other tests expecting www don't get messed up!
		dwolla.sandbox = false;
	});
});