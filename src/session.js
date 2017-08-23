import * as cookies from './cookies';

/**
 * Retrieves or sets the user's browser session as cookie
 * @param {String} key - Session key to return or set
 * @param {String|Object|Array|Number|Boolean} val - Any variable that holds data
 * @param {Boolean} remove - Whether or not to remove this key
 * @returns The whole session object, or the value of the key password
 */

let session = {};

function updateSession() {

    // Store when the session was updated
    session.updated = +new Date;
    cookies.set('session', session);
}

// Instantiate new session if it doesn't exist
export function reset () {

    session = {

        // Store when the session was started
        started: +new Date
    };

    cookies.set('session', session);

    return session;
}

export function get (key) {

    if (key === true) {

        return session;
    }

    if (!key || typeof key !== 'string') {

        throw TypeError('Key must be a string and not undefined');
    }

    return session[key];
}

export function set (key, val) {

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

export function remove (key) {

    if (!key || typeof key !== 'string') {

        throw TypeError('Key must be a string and not undefined');
    }

    delete(session[key]);

    updateSession();

    return true;
}

export function init() {

    session = cookies.get('session');

    if (!session) {

        reset();
    }
}
