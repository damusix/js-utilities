describe('Debounce', function() {

    var assert = chai.assert;
    var debounce = utilities.debounce;

    it('should return a function', function(done) {

        var fn = debounce(()=>{}, 10);

        assert.equal(typeof fn, 'function');

        done();
    });

    it('should not execute function for N given time after it is called', function(done) {

        var debounced = false;
        var fn = debounce(() => {

            debounced = true;
        }, 100);

        setTimeout(() => {

            assert.equal(debounced, true);
            done();
        }, 110);

        fn();
    });

    it('should not execute the function until it stops being called for N given time', function(done) {

        var i = 0;

        var fn = debounce(() => {

            i++;
        }, 100);

        [0,1,2,3,4,5].map((t) => {

            setTimeout(fn, 95*t);
        });

        setTimeout(() => {

            assert.equal(i, 1);
            done();
        }, (95 * 6) + 100 + 100);

    });

    it('should execute the function immediately and not again until it stops being called for N given time', function(done) {

        var i = 0;
        var T = 0; // time to check

        var fn = debounce(() => {

            i++;
        }, 90, 1);

        fn();

        [5,7,11,17].map((t) => {

            T += t*t;
            setTimeout(fn, t*t);
        });

        setTimeout(() => {

            assert.equal(i, 2);
            done();
        }, T + 100);

    });

    it('should return an object when called with a cancel function that cancels the timeout', function(done) {

        var i = 0;
        var T = 0;

        var fn = debounce(() => {

            i++;
        }, 100);

        var c = fn();

        c.cancel();

        setTimeout(() => {

            assert.equal(i, 0);
            done();
        }, T + 100);

    });

});
