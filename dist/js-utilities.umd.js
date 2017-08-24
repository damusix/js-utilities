var Utilities = (function (reqwest,Cookies) {
'use strict';

reqwest = reqwest && reqwest.hasOwnProperty('default') ? reqwest['default'] : reqwest;
Cookies = Cookies && Cookies.hasOwnProperty('default') ? Cookies['default'] : Cookies;

/**
 * AJAX Utility
 * Rewraps `reqwest` variable for a simpler, uniform API when
 * making XHR requests. Accepts `defaultsOverride` for when
 * there is a need for custom configurations.
 */

var defaults = {

    method: 'GET',
    crossOrigin: true,
    type: 'json',
    headers: {}
};

function requestObject(opts) {

    return Object.assign({}, defaults, opts);
}

function extend(opts) {

    return Object.assign(defaults, opts);
}

function get(url) {
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


    var request = requestObject({ url: url, headers: headers });
    return reqwest(request);
}

function put(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    var request = requestObject({ method: 'PUT', url: url, data: data, headers: headers });
    return reqwest(request);
}

function post(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    var request = requestObject({ method: 'POST', url: url, data: data, headers: headers });
    return reqwest(request);
}

function remove(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


    var request = requestObject({ method: 'DELETE', url: url, data: data, headers: headers });
    return reqwest(request);
}

var crud = {

    create: post,
    read: get,
    update: put,
    delete: remove
};

var ajax = Object.freeze({
	extend: extend,
	get: get,
	put: put,
	post: post,
	remove: remove,
	crud: crud
});

/** Base64 encoder and decode */

var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function _utf8_encode(e) {
    e = e.replace(/rn/g, "n");
    var t = "";
    for (var n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r);
        } else if (r > 127 && r < 2048) {
            t += String.fromCharCode(r >> 6 | 192);
            t += String.fromCharCode(r & 63 | 128);
        } else {
            t += String.fromCharCode(r >> 12 | 224);
            t += String.fromCharCode(r >> 6 & 63 | 128);
            t += String.fromCharCode(r & 63 | 128);
        }
    }
    return t;
}

function _utf8_decode(e) {
    var t = "";
    var n = 0;
    var r = 0;
    var c2 = 0;
    while (n < e.length) {
        r = e.charCodeAt(n);
        if (r < 128) {
            t += String.fromCharCode(r);
            n++;
        } else if (r > 191 && r < 224) {
            c2 = e.charCodeAt(n + 1);
            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
            n += 2;
        } else {
            c2 = e.charCodeAt(n + 1);
            c3 = e.charCodeAt(n + 2);
            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            n += 3;
        }
    }
    return t;
}

function encode(e) {

    var t = "";
    var n, r, i, s, o, u, a;
    var f = 0;
    e = _utf8_encode(e);
    while (f < e.length) {
        n = e.charCodeAt(f++);
        r = e.charCodeAt(f++);
        i = e.charCodeAt(f++);
        s = n >> 2;
        o = (n & 3) << 4 | r >> 4;
        u = (r & 15) << 2 | i >> 6;
        a = i & 63;
        if (isNaN(r)) {
            u = a = 64;
        } else if (isNaN(i)) {
            a = 64;
        }
        t = t + _keyStr.charAt(s) + _keyStr.charAt(o) + _keyStr.charAt(u) + _keyStr.charAt(a);
    }
    return t;
}

function decode(e) {

    var t = "";
    var n, r, i;
    var s, o, u, a;
    var f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
    while (f < e.length) {
        s = _keyStr.indexOf(e.charAt(f++));
        o = _keyStr.indexOf(e.charAt(f++));
        u = _keyStr.indexOf(e.charAt(f++));
        a = _keyStr.indexOf(e.charAt(f++));
        n = s << 2 | o >> 4;
        r = (o & 15) << 4 | u >> 2;
        i = (u & 3) << 6 | a;
        t = t + String.fromCharCode(n);
        if (u != 64) {
            t = t + String.fromCharCode(r);
        }
        if (a != 64) {
            t = t + String.fromCharCode(i);
        }
    }
    t = _utf8_decode(t);
    return t;
}

var base64 = Object.freeze({
	encode: encode,
	decode: decode
});

/**
 * Caret Position
 * Gets or sets caret position for a given element
 * @param { HTMLElement } - oField - Element whose caret position we want to inspect
 * @return { Object } an object with `get` and `set` functions
 */

var caret_position = function (oField) {
    return {
        get: function get() {

            // Initialize
            var iCaretPos = 0;

            // IE Support
            if (document.selection) {

                // Set focus on the element
                oField.focus();

                // To get cursor position, get empty selection range
                var oSel = document.selection.createRange();

                // Move selection start to 0 position
                oSel.moveStart('character', -oField.value.length);

                // The caret position is selection length
                iCaretPos = oSel.text.length;
            }

            // Firefox support
            else if (oField.selectionStart || oField.selectionStart == '0') {
                    iCaretPos = oField.selectionStart;
                }

            // Return results
            return iCaretPos;
        },
        set: function set(position) {
            if (oField !== null) {
                if (oField.createTextRange) {
                    var range = oField.createTextRange();
                    range.move('character', position);
                    range.select();
                } else {
                    if (oField.setSelectionRange) {
                        oField.focus();
                        oField.setSelectionRange(position, position);
                    } else oField.focus();
                }
            }

            return this;
        }
    };
};

/**
 * Stores `val` into cookie as a Base64 encoded stringified JSON.
 * @param {String} key - Required. Name of the cookie to store.
 * @param {String|Object|Array|Number|Boolean} val - Any variable that holds data
 * @returns The original stored value, or the value of `val` if it is set.
 */

function get$1(key) {

    if (!key || typeof key !== 'string') {
        throw TypeError('Key must be a string and not undefined');
    }

    var _val = Cookies.get(key);
    if (!_val) return false;
    return JSON.parse(decode(_val));
}

function getAll() {

    var cookies = Object.keys(Cookies());

    var obj = {};

    cookies.map(function (cookie) {

        obj[cookie] = get$1(cookie);
    });

    return obj;
}

function set(key, val) {

    if (!key || typeof key !== 'string') {

        throw TypeError('Key must be a string and not undefined');
    }

    // Allow false, null or 0
    if (val === undefined) {

        throw TypeError('cannot store undefined as cookie');
    }

    var _val = JSON.stringify(val);
    Cookies.set(key, encode(_val));

    return val;
}

function remove$1(key) {

    return Cookies.remove(key);
}

function removeAll(except) {

    if (typeof except === 'string') {

        except = [except];
    }

    var cookies = Object.keys(Cookies());

    if (except) {

        cookies.filter(function (c) {
            return except.indexOf(c) === -1;
        }).map(function (cookie) {

            remove$1(cookie);
        });
    } else {

        cookies.map(function (cookie) {

            remove$1(cookie);
        });
    }
}

var cookies = Object.freeze({
	get: get$1,
	getAll: getAll,
	set: set,
	remove: remove$1,
	removeAll: removeAll
});

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param {Function} - func - Function to be executed
 * @param {Number} - wait - Milliseconds before function is executed or can be executed again
 * @param {Boolean} - immediate - Whether the function should be executed immediately, or after `wait` milliseconds
 * @returns {Object} - Object with `cancel()` function for cases when timeout needs to be stopped
 */

function debounce(func, wait, immediate) {

    var timeout;

    return function () {

        var context = this,
            args = arguments;

        var later = function later() {

            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);

        return {

            cancel: function cancel() {

                clearTimeout(timeout);
            }
        };
    };
}

function getScrollbarWidth() {

    // Get Scrollbar Width
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

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

function Retry(opts) {

    var self = this;

    var execute = opts.execute;
    var retries = opts.retries,
        delay = opts.delay,
        backoff = opts.backoff;


    backoff = backoff || 1;

    if (retries < 1) {

        throw Error('must retry at least 1 time');
    }

    // Defer promise for later
    self.promise = new Promise(function (resolve, reject) {

        self.resolve = resolve;
        self.reject = reject;
    });

    var promise = self.promise;

    // Give the option to cancel the retry
    promise.cancel = function () {

        clearTimeout(promise.timeout);
    };

    // Calculate delay times into an array
    // Pop them into timeout later
    var delays = [];

    for (var i = 0; i < retries; i++) {

        if (i === 0) {

            delays.push(delay);
        } else {

            delays.push(delays[i - 1] * backoff);
        }
    }

    function evaluate(tryAgain, results) {

        if (tryAgain) {

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
            promise.timeout = setTimeout(function () {

                execute(evaluate);
            }, delays.pop());
        } else {

            self.resolve(results);
        }
    }

    execute(evaluate);

    Object.freeze(self);

    return promise;
}

/**
 * Locks or unlocks scrolling on an element
 *
 * @param {HTMLElement} element - Element to scroll lock
 * @returns {Function} - Execute to toggle, or set desired state
 */

function scroll_lock(element) {

    // Locking is false initially
    var on = false;

    // Return function receives boolean
    // to override `on` variable and force
    // the lock state
    return function (force) {

        if (force === undefined) {

            on = !on;
        } else {

            on = force;
        }

        element.style.overflow = on ? "hidden" : "auto";
    };
}

/**
 * Retrieves or sets the user's browser session as cookie
 * @param {String} key - Session key to return or set
 * @param {String|Object|Array|Number|Boolean} val - Any variable that holds data
 * @param {Boolean} remove - Whether or not to remove this key
 * @returns The whole session object, or the value of the key password
 */

var session = {};

function updateSession() {

    // Store when the session was updated
    session.updated = +new Date();
    set('session', session);
}

// Instantiate new session if it doesn't exist
function reset() {

    session = {

        // Store when the session was started
        started: +new Date()
    };

    set('session', session);

    return session;
}

function get$2(key) {

    if (key === true) {

        return session;
    }

    if (!key || typeof key !== 'string') {

        throw TypeError('Key must be a string and not undefined');
    }

    return session[key];
}

function set$1(key, val) {

    if (!key || typeof key !== 'string') {

        throw TypeError('Key must be a string and not undefined');
    }

    // Allow `false` and `0`, but error on `undefined`
    if (val === undefined) {

        throw TypeError('cannot store undefined as cookie');
    }

    session[key] = val;

    updateSession();

    return session;
}

function remove$2(key) {

    if (!key || typeof key !== 'string') {

        throw TypeError('Key must be a string and not undefined');
    }

    delete session[key];

    updateSession();

    return true;
}

function init() {

    session = get$1('session');

    if (!session) {

        reset();
    }
}

var session$1 = Object.freeze({
	reset: reset,
	get: get$2,
	set: set$1,
	remove: remove$2,
	init: init
});

/**
 * UI Javascript Utilities
 * By: Danilo Alonso
 *
 * Arbitrary, random utility tools for the browser.
 * Based on stuff I found all over the net over the years.
 */

var index = {
    ajax: ajax,
    base64: base64,
    caret_position: caret_position,
    cookies: cookies,
    debounce: debounce,
    get_scrollbar_width: getScrollbarWidth,
    retry: Retry,
    scroll_lock: scroll_lock,
    session: session$1
};

return index;

}(reqwest,Cookies));
