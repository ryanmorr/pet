/**
 * Common variables
 */
const escapeQuoteRe = /\\"/g;
const tokenRe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
const supportsTemplate = 'content' in document.createElement('template');

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
export function interpolate(tpl, values) {
    return tpl.replace(escapeQuoteRe, '"').replace(tokenRe, (all, key) => {
        return values[key] || '';
    });
}

/**
 * Convert an HTML string into a document
 * fragment
 *
 * @param {String} html
 * @return {DocumentFragment}
 * @api private
 */
export function parseHTML(html) {
    if (supportsTemplate) {
        const template = document.createElement('template');
        template.innerHTML = html;
        return document.importNode(template.content, true);
    }
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    div.innerHTML = html;
    while (div.firstChild) {
        fragment.appendChild(div.firstChild);
    }
    return fragment;
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

/**
 * Empty an element of all child nodes
 *
 * @param {Element} el
 * @api private
 */
export function empty(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}
