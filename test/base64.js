describe('Base64 functions', function() {

    var assert = chai.assert;
    var base64 = Utilities.base64;

    it('should properly encode the word HELLO', function(done) {

        var encoded = base64.encode('HELLO');

        assert.equal(encoded, 'SEVMTE8=');

        done();
    });

    it('should properly decode SEVMTE8= to the word HELLO', function(done) {

        var decoded = base64.decode('SEVMTE8=');

        assert.equal(decoded, 'HELLO');

        done();
    });
});
