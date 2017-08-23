/**
 * Stores `val` into cookie as a Base64 encoded stringified JSON.
 * @param {String} key - Required. Name of the cookie to store.
 * @param {String|Object|Array|Number|Boolean} val - Any variable that holds data
 * @returns The original stored value, or the value of `val` if it is set.
 */

import Cookies from 'js-cookie';
import {encode, decode} from './base64';

export function get (key) {

    if (!key || typeof key !== 'string') {
        throw TypeError('Key must be a string and not undefined');
    }

    var _val = Cookies.get(key);
    if (!_val) return false;
    return JSON.parse(decode(_val));
}

export function set (key, val) {

    if (!key || typeof key !== 'string') {
        throw TypeError('Key must be a string and not undefined');
    }

    // Allow false and 0
    if (val === undefined) {
        throw TypeError('cannot store undefined as cookie');
    }

    var _val = JSON.stringify(val);
    Cookies.set(key, encode(_val));

    return val;
}

export function remove (key) {

    return Cookies.remove(key);
}
