'use strict';

import reqwest from 'reqwest';

/**
 * AJAX Utility
 * Rewraps `reqwest` variable for a simpler, uniform API when
 * making XHR requests. Accepts `defaultsOverride` for when
 * there is a need for custom configurations.
 */


const defaults = {

    method: 'GET',
    crossOrigin: true,
    contentType: 'application/json',
    withCredentials: false
}

function requestObject(opts) {


    return Object.assign({}, defaults, opts);
}

export function extend(opts) {

    return Object.assign(defaults, opts);
}

export function get(url, headers={}) {

    const request = requestObject({ url, headers });
    return reqwest(request);
}

export function put(url, data={}, headers={}) {

    const request = requestObject({ method: 'PUT', url, data, headers });
    return reqwest(request);
}

export function post(url, data={}, headers={}) {

    const request = requestObject({ method: 'POST', url, data, headers });
    return reqwest(request);
}

export function remove(url, data={}, headers={}) {

    const request = requestObject({ method: 'DELETE', url, data, headers });
    return reqwest(request);
}

export const crud = {

    create: post,
    read: get,
    update: put,
    delete: remove
};

