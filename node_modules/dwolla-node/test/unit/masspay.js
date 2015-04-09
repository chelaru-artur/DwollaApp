var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('MassPay', function() {

	describe('create masspay job', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);

		  /*
		  This is not the correct items syntax for creating an MP job in production,
		  however, all we are testing is if the request sends with the same correct
		  initial data. We can use any dummy object in order to mock this and verify
		  if there are any points of failure. 
		  */
	      dwolla.createMassPayJob('12345678', '1234', { item: 'test' }, {}, function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/masspay/');
	      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken, fundsSource: '12345678', pin: '1234', items: { item: 'test' }});

	      done();
	    });
	});

	describe('get masspay job', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.getMassPayJob('12345678', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/masspay/12345678');
	      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

	      done();
	    });
	});

	describe('get masspay job items', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.getMassPayJobItems('12345678', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/masspay/12345678/items');
	      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

	      done();
	    });
	});

	describe('get a masspay job item', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.getMassPayJobItem('12345678', '987654321', function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/masspay/12345678/items/987654321');
	      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

	      done();
	    });
	});

	describe('get all masspay jobs created by a user', function() {
		it('Should make the correct request', function(done) {

		  dwolla.setToken(init.fakeKeys.accessToken);
	      dwolla.getMassPayJobs(function() {});

	      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/masspay/');
	      init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

	      done();
	    });
	});

});