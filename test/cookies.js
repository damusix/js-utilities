describe('Cookies functions', function() {

    var assert = chai.assert;
    var cookies = Utilities.cookies;

    it('should save value as base64 string to cookie', function(done) {

        cookies.set('hey', 'ya');
        assert.include(document.cookie, 'hey=InlhIg==');

        done();
    });

    it('should get cookie in plaintext from base64', function(done) {

        var decoded = cookies.get('hey');
        assert.equal(decoded, 'ya');

        done();
    });

    it('should get all cookies in plaintext from base64', function(done) {

        cookies.set('1', 1);
        cookies.set('2', 2);
        cookies.set('3', 3);
        cookies.set('4', 4);
        cookies.set('5', 5);

        var decoded = cookies.getAll();

        assert.equal(decoded['1'], 1);
        assert.equal(decoded['2'], 2);
        assert.equal(decoded['3'], 3);
        assert.equal(decoded['4'], 4);
        assert.equal(decoded['5'], 5);
        assert.equal(decoded['hey'], 'ya');

        done();
    });

    it('should remove cookie', function(done) {

        var decoded = cookies.remove('hey');
        assert.notInclude(document.cookie, 'hey');

        done();
    });

    it('should save object as base64 string to cookie', function(done) {

        cookies.set('obj', { saved: 'asObject' });
        assert.include(document.cookie, 'eyJzYXZlZCI6ImFzT2JqZWN0In0=');

        done();
    });

    it('should get object from base64 to real js object', function(done){

        var decoded = cookies.get('obj');

        assert.equal(decoded.saved, 'asObject');

        done();
    });

    it('should remove all cookies except one', function(done){

        cookies.set('1', 1);
        cookies.set('2', 2);
        cookies.set('3', 3);
        cookies.set('4', 4);
        cookies.set('5', 5);

        cookies.removeAll('3');

        assert.include(document.cookie, '3=');
        assert.notInclude(document.cookie, '1=');
        assert.notInclude(document.cookie, '2=');
        assert.notInclude(document.cookie, '4=');
        assert.notInclude(document.cookie, '5=');

        done();
    });

    it('should remove all cookies except keys in array', function(done){

        cookies.set('1', 1);
        cookies.set('2', 2);
        cookies.set('3', 3);
        cookies.set('4', 4);
        cookies.set('5', 5);

        cookies.removeAll(['3', '5']);

        assert.include(document.cookie, '3=');
        assert.include(document.cookie, '5=');
        assert.notInclude(document.cookie, '1=');
        assert.notInclude(document.cookie, '2=');
        assert.notInclude(document.cookie, '4=');

        done();
    });

    it('should remove all cookies', function(done){

        cookies.set('1', 1);
        cookies.set('2', 2);
        cookies.set('3', 3);
        cookies.set('4', 4);
        cookies.set('5', 5);

        cookies.removeAll();

        assert.equal(document.cookie.length, 0);

        done();
    });
});
