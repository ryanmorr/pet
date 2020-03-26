import update from './update';

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

observer.observe(document.documentElement, {
    childList: true,
    attributes: true,
    subtree: true
});
