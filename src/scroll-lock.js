/**
 * Locks or unlocks scrolling on an element
 *
 * @param {HTMLElement} element - Element to scroll lock
 * @returns {Function} - Execute to toggle, or set desired state
 */


export default function scroll_lock(element) {

    // Locking is false initially
    let on = false;

    // Return function receives boolean
    // to override `on` variable and force
    // the lock state
    return function (force) {

        if (force === undefined) {

            on = !on;
        }
        else {

            on = force;
        }

        element.style.overflow = on ? "hidden" : "auto";
    }
}
