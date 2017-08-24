/**
 * Retries a function N number of times every M seconds
 *
 * @param {Object} opts:
 * * @param {Function} execute - Function to execute for result. Should pass `err` and `results`
 * * @param {Number} retries - Number of times to retry this function
 * * @param {Number} interval - Time between each retry
 * * @param {Number} backoff - Multiplier to increment `interval` on next retry
 * @returns {Promise} - resolves desired results or rejects and passes an Error
 */


export default function retry(opts) {

    const self = this;

    const { execute } = opts;
    let { retries, delay, backoff } = opts;

    backoff = backoff || 1;

    if (retries < 1) {

        throw Error('must retry at least 1 time');
    }

    // Defer promise for later
    self.promise = new Promise((resolve, reject) => {

        self.resolve = resolve;
        self.reject = reject;
    });

    const promise = self.promise;

    // Give the option to cancel the retry
    promise.cancel = function() {

        clearTimeout(promise.timeout);
    }

    // Calculate delay times into an array
    // Pop them into timeout later
    const delays = [];

    for (var i = 0; i < retries; i++) {

        if (i === 0) {

            delays.push( delay );
        }
        else {

            delays.push( delays[i-1] * backoff );
        }
    }

    function evaluate(err, results) {

        if (!!err) {

            // Decrement `retries`
            retries--;

            if (retries === 0) {

                // Reject promise if retry doesn't yield results
                self.reject(new Error('no retries left'));

                // Cancel the timeout
                promise.cancel();
                return;
            }

            // Try again in `delays.pop()` ms
            promise.timeout = setTimeout(() => {

                execute(evaluate);

            }, delays.pop());
        }
        else if (results !== undefined) {

            self.resolve(results);
        }
        else {

            self.reject(new Error('retry callback received no arguments'));
        }
    }

    execute(evaluate);

    Object.freeze(self);

    return promise;
}
