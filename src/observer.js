/**
 * Import dependencies
 */
import update from './update';

/**
 * Callback for the mutation observer,
 * collects any `pet` elements that have
 * been inserted into the DOM or had
 * data attributes changed so that the
 * template can be rendered/updated
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
        if (mutation.attributeName != null) {
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
    if (el.nodeType === 1 && el.hasAttribute('pet') && elements.indexOf(el) === -1) {
        elements.push(el);
    }
    if (el.hasChildNodes()) {
        for (let i = 0, children = el.children, len = children.length; i < len; i++) {
            addElement(elements, children[i]);
        }
    }
}

/**
 * Create the mutation observer and start
 * observing the document body for dynamically
 * inserted elements and changed attributes
 */
const observer = new MutationObserver(onChange);
observer.observe(document.documentElement, {
    childList: true,
    attributes: true,
    subtree: true
});
