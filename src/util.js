/**
 * Common variables
 */
const escapeQuoteRe = /\\"/g;
const tokenRe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

/**
 * Supplant the placeholders of a template
 * with the value of the matching key in
 * an object literal
 *
 * @param {String} tpl
 * @param {Object} values
 * @return {String}
 * @api private
 */
function interpolate(tpl, values) {
    return tpl.replace(tokenRe, (all, key) => {
        return values[key] || '';
    });
}

/**
 * Get the template for an element
 * held within the `:before` pseudo-
 * element
 *
 * @param {String} tpl
 * @param {Object} values
 * @return {String}
 * @api private
 */
export function getTemplate(el) {
    const tpl = window.getComputedStyle(el, ':before').getPropertyValue('content');
    return tpl.slice(1, -1).replace(escapeQuoteRe, '"');
}

/**
 * Interpolate the template string with the
 * elements data attributes and convert into
 * DOM nodes
 *
 * @param {Element} el
 * @param {String} tpl
 * @return {Element}
 * @api private
 */
export function parseTemplate(el, tpl) {
    const newElement = el.cloneNode();
    newElement.innerHTML = interpolate(tpl, el.dataset);
    return newElement;
}

/**
 * Does the string start with the provided
 * prefix
 *
 * @param {String} str
 * @param {String} prefix
 * @return {Boolean}
 * @api private
 */
export function startsWith(str, prefix) {
    if (str.startsWith) {
        return str.startsWith(prefix);
    }
    return str.indexOf(prefix, 0) === 0;
}
