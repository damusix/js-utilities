describe('Scroll Lock', function() {

    var assert = chai.assert;
    var scroll_lock = Utilities.scroll_lock;

    it('should return a function', function(done) {

        var lock = scroll_lock(document.createElement('div'));

        assert.equal(lock.constructor, Function);

        done();
    });

    it('should toggle overflow between auto and hidden', function(done) {

        var element = document.createElement('div');
        var lock = scroll_lock(element);

        lock();
        assert.equal(element.style.overflow, 'hidden');

        lock();
        assert.equal(element.style.overflow, 'auto');

        done();
    });

    it('should force overflow scroll lock', function(done) {

        var element = document.createElement('div');

        var lock = scroll_lock(element);

        lock(true);
        assert.equal(element.style.overflow, 'hidden');

        lock(true);
        assert.equal(element.style.overflow, 'hidden');

        lock(false);
        assert.equal(element.style.overflow, 'auto');

        lock(false);
        assert.equal(element.style.overflow, 'auto');

        lock(true);
        assert.equal(element.style.overflow, 'hidden');

        lock(false);
        assert.equal(element.style.overflow, 'auto');

        done();
    });

});
