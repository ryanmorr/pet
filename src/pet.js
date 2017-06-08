/**
 * Common variables
 */
const doc = window.document;
const tokenRe = /\{([^}]+)\}/g;
const escapeQuoteRe = /\\"/g;
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

/**
 * Callback for the mutation observer,
 * collects any `pet` elements that have
 * been inserted into the DOM or had
 * data attributes changed so that the
 * template can be rendered
 *
 * @param {Array} mutations
 * @api private
 */
function onChange(mutations) {
    const elements = [];
    for (let i = 0, len = mutations.length; i < len; i++) {
        const mutation = mutations[i];
        if (mutation.addedNodes != null) {
            for (let n = 0, nLen = mutation.addedNodes.length; n < nLen; n++) {
                addElement(elements, mutation.addedNodes[n]);
            }
        }
        if (mutation.attributeName != null && startsWith(mutation.attributeName, 'data-')) {
            addElement(elements, mutation.target);
        }
    }
    update(elements);
}

/**
 * If the element is a `pet` element
 * then add to the array
 *
 * @param {Array} elements
 * @param {Element} el
 * @api private
 */
function addElement(elements, el) {
    if (el.nodeType === 1 && el.classList.contains('pet') && elements.indexOf(el) === -1) {
        elements.push(el);
    }
    if (el.hasChildNodes()) {
        for (let i = 0, children = el.children, len = children.length; i < len; i++) {
            addElement(elements, children[i]);
        }
    }
}

/**
 * For each element, retrieve the template
 * contained in the  `content` property of
 * the `:before` pseudo-element, interpolate
 * the data attributes and append to element
 *
 * @param {Array} elements
 * @api private
 */
function update(elements) {
    for (let i = 0, len = elements.length; i < len; i++) {
        const el = elements[i];
        const tpl = window.getComputedStyle(el, ':before').getPropertyValue('content').slice(1, -1);
        if (tpl) {
            empty(el);
            const html = interpolate(tpl, el.dataset);
            const frag = parseHTML(html);
            el.appendChild(frag);
        }
    }
}

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
 * Does the string start with the provided
 * prefix
 *
 * @param {String} str
 * @param {String} prefix
 * @return {Boolean}
 * @api private
 */
function startsWith(str, prefix) {
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
function empty(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

/**
 * Create the mutation observer and start
 * observing the document body for dynamically
 * inserted elements and changed attributes
 */
const observer = new MutationObserver(onChange);
observer.observe(doc.body, {
    childList: true,
    attributes: true,
    subtree: true
});

/**
 * Update the current `pet` elements currently
 * in the DOM
 */
update(doc.querySelectorAll('.pet'));
