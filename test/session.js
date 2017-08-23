describe('Session', function() {

    var assert = chai.assert;
    var session = utilities.session;

    it('should return a function', function(done) {

        var keys = Object.keys(session);

        var shouldHave = [ "reset", "get", "set", "remove", "init" ];

        assert.equal(keys.length, shouldHave.length);

        shouldHave.forEach((item) => {

            assert.isFunction(session[item]);
            assert.isAbove(keys.indexOf(item), -1, `${item} is not defined`);
        });

        done();
    });

    it('should initialize a new session', function(done) {

        session.init();
        assert.equal(document.cookie.indexOf('session') > -1, true);

        done();
    });

    it('should return a value using get function', function(done) {

        // Get 'started' key, which should be automatically initiated
        const started = session.get('started');
        assert.equal(started > +new Date-1000, true);

        done();
    });

    it('should set a key, timestamp "updated" key, and base64 encode to cookie', function(done) {

        const randomKey = session.set('randomKey', 12345);
        assert.equal(session.get('randomKey'), 12345);

        assert.equal(!!session.get('updated'), true);

        // You shouldn't be able to extract the value from document.cookie
        assert.equal(document.cookie.indexOf(12345), -1);

        done();
    });

    it('should remove a key', function(done) {

        const randomKey = session.remove('randomKey');
        assert.equal(session.get('randomKey'), undefined);
        done();
    });

    it('should reset the entire session', function(done) {

        const randomKey = session.set('randomKey', true);
        const randomKey2 = session.set('randomKey2', true);
        const randomKey3 = session.set('randomKey3', true);

        session.reset();

        assert.equal(session.get('randomKey'), undefined);
        assert.equal(session.get('randomKey2'), undefined);
        assert.equal(session.get('randomKey3'), undefined);
        assert.equal(session.get('updated'), undefined);
        done();
    });
});
