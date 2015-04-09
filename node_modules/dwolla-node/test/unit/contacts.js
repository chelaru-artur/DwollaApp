var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Contacts', function() {
	describe('get contacts', function() {
		it('Should make the correct request', function(done) {
		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.contacts(function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/contacts/');
	      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

	      done();
	    });
	});

	describe('get nearby', function() {
		  it('Should make the correct request', function(done) {
	      dwolla.nearby('35', '25', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/contacts/nearby');
	      init.restlerMock.lastRequest.options.should.eql({client_id: init.fakeKeys.appKey, client_secret: init.fakeKeys.appSecret, latitude: '35', longitude: '25'});

	      done();
			});
		});
});