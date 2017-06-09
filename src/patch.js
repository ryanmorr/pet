/**
 * Patch a source node to match
 * another node
 *
 * @param {Node} node
 * @param {Node} newNode
 * @api private
 */
export default function patch(node, newNode) {
    if (node.nodeType !== newNode.nodeType || node.nodeName !== newNode.nodeName) {
        node.parentNode.replaceChild(newNode.cloneNode(true), node);
        return;
    }
    if (newNode.nodeType === 3) {
        const data = newNode.data;
        if (node.data !== data) {
            node.data = data;
        }
        return;
    }
    const childNodes = node.childNodes;
    const newChildNodes = newNode.childNodes;
    for (let i = Math.min(childNodes.length, newChildNodes.length) - 1; i >= 0; i--) {
        patch(childNodes[i], newChildNodes[i]);
    }
    if (!node.isEqualNode(newNode)) {
        const nodeAttrs = node.attributes;
        const newNodeAttrs = newNode.attributes;
        if (childNodes.length > newChildNodes.length) {
            for (let i = childNodes.length - 1; i >= newChildNodes.length; i--) {
                node.removeChild(childNodes[i]);
            }
        } else if (childNodes.length < newChildNodes.length) {
            const frag = document.createDocumentFragment();
            for (let i = childNodes.length; i < newChildNodes.length; i++) {
                frag.appendChild(newChildNodes[i].cloneNode(true));
            }
            node.appendChild(frag);
        }
        for (let i = nodeAttrs.length - 1; i >= 0; i--) {
            const name = nodeAttrs[i].name;
            if (!newNode.hasAttribute(name)) {
                node.removeAttribute(name);
            }
        }
        for (let i = newNodeAttrs.length - 1; i >= 0; i--) {
            const attr = newNodeAttrs[i];
            const name = attr.name;
            const value = attr.value;
            if (node.getAttribute(name) !== value) {
                node.setAttribute(name, value);
            }
        }
    }
}
