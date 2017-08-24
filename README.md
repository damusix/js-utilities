# CommonJS UI Javascript Utilities

Library of UI utilities for use across different applications. It is compiled for CommonJS apps, but written in ES6 for developer ease and the future.

## Utilities

#### Ajax

Rewraps `reqwest` into a simpler API to represent CRUD.

``` javascript
var ajax = Utilities.ajax;

// Performs GET request using `url` with optional `headers` object
ajax.get(url, headers={});

// Similar to `ajax.get()`, b
ut performs POST request, passes `data` object as payload
ajax.post(url, data={}, headers={});

// Similar to `ajax.post()`, but performs PUT
ajax.put(url, data={}, headers={});

// Similar to `ajax.post()`, but performs PUT
ajax.remove(url, data={}, headers={});

```

#### Base64

Encodes or decodes UTF-8 strings to Base64.

``` javascript
var base64 = Utilities.base64;

// Encodes string to Base64
base64.encode(str)

// Decodes string from Base64
base64.decode(str)
```

#### Caret Position

Gets the caret cursor position of an HTML element, typically a field end-users type into, such as `INPUT` and `TEXTAREA` elements.

``` javascript
var caret_position = Utilities.caret_position;
var element = document.createElement('input');

// Wraps element and returns actionable functions
var cursor = caret_position(element);

// Returns `element`'s caret position
cursor.get();

// Sets `element`'s caret position
cursor.set(pos);
```

#### Cookies

Uses `js-cookie` library to store cookies, and uses `base64` function to encode and decode cookie values.

``` javascript
var cookie = Utilities.cookie;

// Get cookie named whatever `key` is
cookie.get(key);

// Set cookie `key` as `val`
cookie.set(key, val);

// Remove cookie `key`
cookie.remove(key);

// Get all cookies
cookie.getAll()

// Remove all cookies, except certain keys
cookie.removeAll('specialKey'); // Can be a string
cookie.removeAll(['specialKey1', 'specialKey2']); // Can be an array of strings
```


#### Debounce

Allows for a function to only be called 1 time within `N` number of seconds. Function can either be immediately invoked, or will delay execution in `N` seconds after being invoked. By default, function delays execution.

The invoked function returns an object with a `cancel()` function for when the action needs to be cancelled.

Example:

``` javascript
// Function is executed only one time, 1 second after "resize" event was last called
var resizeWindowAlert = debounce(function(e) {

    alert('RESIZED!');
}, 1000);

window.addEventListener('resize', resizeWindowAlert);


// Function executes immediately, and cannot be re-invoked until 1 second has passed
var preventUserFromMassBuying = debounce(function(e) {

    alert('YOU JUST BOUGHT SOMETHING!');
}, 1000, true);

button.addEventListener('click', preventUserFromMassBuying);

// Can cancel timeout and reuse debounced function
buy(function() {

    preventUserFromMassBuying.cancel(); // Can click buy button again
});
```

#### Get Scrollbar Width

Gets the OS's scroll bar width. This comes in handy for fixing UI bugs where the scrollbar hides if `overflow: hidden` property is set.
``` javacript
// Should return `15` in OSX
var scrollbarWidth = Utilities.get_scrollbar_width();
```

#### Retrier

Retries to execute a `execute` function `retries` number of times, every `interval` seconds extended by `backoff` multiplier with each retry after failure until a valid value is returned, or no retries left. Returns a promise.

Example:
``` javascript

var retry = Utilities.retry;
var x = 0;

// Will retry N times every 1000 * (1.5 * N) seconds until `x` is greater than 3
var checkServerInAntartica = retry({

    execute: function(tryAgain) {

        x++;

        if (x < 3) {
            
            // Execute callback and pass `true`, or any non-negative value as the first argument to try again.
            return tryAgain(true);
        }
        
        var results = x;
        
        // When desired results are received, pass a negative value as first argument, and results as second argument
        tryAgain(null, results);
    },
    retries: 5,
    interval: 1000,
    backoff: 1.5
});

if (cancelCheck) {
    
    // Cancels the retry timeout
    checkServerInAntartica.cancel();
}

checkServerInAntartica.then(function(results) { /* do stuff */ });
checkServerInAntartica.catch(function(err) { /* do stuff */ });
```

#### Scroll Lock

Sets an HTMLElement's `overflow` property to `auto` or `hidden`.

Example:
``` javascript
var bodyLocker = scrollLock(body);

bodyLocker(); // Scroll locked
bodyLocker(); // Scroll unlocked

bodyLocker(true); // Scroll locked (forced)
bodyLocker(false); // Scroll unlocked (forced)
```

#### Session

Based on this library's `cookie` and `base64` function. Creates an enconded user session. Can get, set, remove session properties, or reset it entirely. Tracks when session was started, and when it was updated.

``` javascript
var session = Utilities.session;

// Restores cookie session or initializes new session
session.init(); 

// Returns value of 1 key
session.get(key); 

// Returns object with entire session
session.get(true); 

// Sets session value
session.set(key, val); 

// Removes key from session
session.remove(key) 

// Resets session and removes all keys
session.reset() 

```
