/**
 * UI Javascript Utilities
 * By: Danilo Alonso
 *
 * Arbitrary, random utility tools for the browser.
 * Based on stuff I found all over the net over the years.
 */

import * as ajax from './ajax';
import * as base64 from './base64';
import caret_position from './caret-position';
import * as cookies from './cookies';
import debounce from './debounce';
import get_scrollbar_width from './get-scrollbar-width';
import retry from './retry';
import scroll_lock from './scroll-lock';
import * as session from './session';

export default {
    ajax,
    base64,
    caret_position,
    cookies,
    debounce,
    get_scrollbar_width,
    retry,
    scroll_lock,
    session,
}