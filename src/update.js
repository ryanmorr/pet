/**
 * Import dependencies
 */
import patch from './patch';

/**
 * Common variables
 */
const escapeQuoteRe = /\\"/g;
const tokenRe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

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
function getTemplate(el) {
    const tpl = window.getComputedStyle(el, ':before').getPropertyValue('content');
    return tpl ? tpl.slice(1, -1).replace(escapeQuoteRe, '"') : null;
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
function parseTemplate(el, tpl) {
    const data = el.dataset;
    const newElement = el.cloneNode();
    newElement.innerHTML = tpl.replace(tokenRe, (all, key) => data[key] || '');
    return newElement;
}

/**
 * Schedule an animation frame to
 * update each element in the array
 *
 * @param {Array} elements
 * @api private
 */
export default function update(elements) {
    requestAnimationFrame(() => {
        for (let i = 0, len = elements.length; i < len; i++) {
            const el = elements[i];
            const tpl = getTemplate(el);
            if (tpl) {
                patch(el, parseTemplate(el, tpl));
            }
        }
    });
}
