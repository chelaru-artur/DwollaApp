var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Requests', function() {


    describe('make money request', function () {
        it('Should make the correct request', function (done) {

            dwolla.setToken(init.fakeKeys.accessToken);
            dwolla.request('812-111-1111', '5.00', function () {});

            init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/');
            init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken, sourceId: '812-111-1111', amount: '5.00'});

            done();
        });
    });

    describe('list pending requests', function () {
        it('Should make the correct request', function (done) {

            dwolla.setToken(init.fakeKeys.accessToken);
            dwolla.requests(function () {});

            init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/');
            init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

            done();
        });
    });

    describe('get request details by id', function () {
        it('Should make the correct request', function (done) {

            dwolla.setToken(init.fakeKeys.accessToken);
            dwolla.requestById('12345678', function () {});

            init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/12345678');
            init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

            done();
        });
    });

    describe('cancel a request', function () {
        it('Should make the correct request', function (done) {

            dwolla.setToken(init.fakeKeys.accessToken);
            dwolla.cancelRequest('12345678', function () {});

            init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/12345678/cancel');
            init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken});

            done();
        });
    });

    describe('fulfill a request', function () {
        it('Should make the correct request', function (done) {

            dwolla.setToken(init.fakeKeys.accessToken);
            dwolla.fulfillRequest('1234', '12345678', '10.00', function () {});

            init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/requests/12345678/fulfill');
            init.restlerMock.lastRequest.options.should.eql({oauth_token: init.fakeKeys.accessToken, pin: '1234', request_id: '12345678', amount: '10.00'});

            done();
        });
    });

});