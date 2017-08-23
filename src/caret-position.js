/**
 * Caret Position
 * Gets or sets caret position for a given element
 * @param { HTMLElement } - oField - Element whose caret position we want to inspect
 * @return { Object } an object with `get` and `set` functions
 */

export default function (oField) {
    return {
        get: function () {

            // Initialize
            var iCaretPos = 0;

            // IE Support
            if (document.selection) {

               // Set focus on the element
               oField.focus ();

               // To get cursor position, get empty selection range
               var oSel = document.selection.createRange ();

               // Move selection start to 0 position
               oSel.moveStart ('character', -oField.value.length);

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
        set: function(position) {
            if (oField !== null) {
                if (oField.createTextRange) {
                    var range = oField.createTextRange();
                    range.move('character', position);
                    range.select();
                } else {
                    if (oField.setSelectionRange) {
                        oField.focus();
                        oField.setSelectionRange(position, position);
                    } else
                        oField.focus();
                }
            }

            return this;
        }
    }
}
