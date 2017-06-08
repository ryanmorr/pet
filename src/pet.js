/**
 * Common variables
 */
const doc = window.document;
const trimQuoteRe = /^['"]|['"]$/g;
const tokenRe = /\{([^}]+)\}/g;
const escapeQuoteRe = /\\"/g;

/**
 * supplant the placeholders of a template
 * with the value of the matching key in
 * an object literal
 *
 * @param {String} tpl
 * @param {Object} values
 * @return {String}
 * @api private
 */
function interpolate(tpl, values) {
    return tpl.replace(trimQuoteRe, '').replace(escapeQuoteRe, '"').replace(tokenRe, (all, key) => {
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
function parseHTML(html) {
    const fragment = doc.createDocumentFragment();
    const div = doc.createElement('div');
    div.innerHTML = html;
    while (div.firstChild) {
        fragment.appendChild(div.firstChild);
    }
    return fragment;
}

/**
 * Update the current `pet` elements currently
 * in the DOM
 */
const elements = doc.querySelectorAll('.pet');
for (let i = 0, len = elements.length; i < len; i++) {
    const el = elements[i];
    const tpl = window.getComputedStyle(el, ':before').getPropertyValue('content');
    if (tpl) {
        const html = interpolate(tpl, el.dataset);
        const frag = parseHTML(html);
        el.appendChild(frag);
    }
}
