/**
 * Import dependencies
 */
import update from './update';

/**
 * If the element is a `pet` element
 * then add to the array
 *
 * @param {Array} elements
 * @param {Element} el
 * @api private
 */
function addElement(elements, el) {
    if (el.nodeType === 1 && el.hasAttribute('pet') && !elements.includes(el)) {
        elements.push(el);
    }
    if (el.hasChildNodes()) {
        for (const child of el.children) {
            addElement(elements, child);
        }
    }
}

/**
 * Collect any `pet` elements that have
 * been inserted into the DOM or had
 * data attributes changed so that the
 * template can be rendered/updated
 */
const observer = new MutationObserver((mutations) => {
    update(mutations.reduce((elements, mutation) => {
        if (mutation.addedNodes != null) {
            for (const node of mutation.addedNodes) {
                addElement(elements, node);
            }
        }
        if (mutation.attributeName != null) {
            addElement(elements, mutation.target);
        }
        return elements;
    }, []));
});

/**
 * Create the mutation observer and start
 * observing the document for dynamically
 * inserted elements and changed attributes
 */
observer.observe(document.documentElement, {
    childList: true,
    attributes: true,
    subtree: true
});
