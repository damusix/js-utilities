describe('Retrier', function() {

    var assert = chai.assert;
    var retry = Utilities.retry;

    it('should return a promise', function(done) {

        var promise = new retry({ execute: ()=>{}, retries: 1, delay: 1 });

        assert.equal(promise.constructor, Promise);
        done();
    });

    it('should retry a function x number of times', function(done) {

        // Try 3 times
        var retries = 3;
        var delay = 100;

        var i = 0;

        function execute (callback) {

            i++;

            callback(i !== 3, i);
        }

        var promise = new retry({ execute, retries, delay });

        promise.then(function(num_retries) {

            assert.equal(num_retries, 3);
        });

        setTimeout(() => {

          assert.equal(i, 3)
          done();
        }, 350);
    });

    it('should multiply delay by `backoff` each time to incrementally retry', function(done) {

        // Try 3 times
        var retries = 3;
        var delay = 100;
        var backoff = 2;

        var i = 0;
        var timestamps = [];

        function execute (callback) {

            i++;

            timestamps.push(+new Date);

            callback(i !== 3, i);
        }

        var promise = new retry({ execute, retries, delay, backoff });

        promise.then(function(num_retries) {

            assert.equal(num_retries, 3);

            var now = +new Date;

            timestamps = timestamps.map((date) => {

                return Math.round((now - date)/100) * 100;
            });

            assert.equal(timestamps[0] - timestamps[1], 400);
            assert.equal(timestamps[1] - timestamps[2], 200);
            assert.equal(timestamps[2], 0);

            done();

        });
    });

    it('should cancel a retry', function() {


        // Try 3 times
        var retries = 3;
        var delay = 1000;
        var i = 0;

        function execute (callback) {

            i++;

            callback(i !== 3, i);
        }

        var promise = new retry({ execute, retries, delay });

        promise.then(function(num_retries) {

            assert.equal(num_retries, 0);
        });

        setTimeout(() => {

            promise.cancel();

            setTimeout(() => {

                assert.equal(i, 0);
                done();
            }, 500)
        }, 500)

    });


});
