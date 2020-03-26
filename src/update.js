import patch from './patch';

const ESCAPE_QUOTE_RE = /\\['"]/g;
const TOKEN_RE = /\{\{([^\\}]*(?:\\.[^\\}]*)*)\}\}/g;

function getTemplate(el) {
    const tpl = window.getComputedStyle(el, ':before').getPropertyValue('content');
    return tpl ? tpl.slice(1, -1).replace(ESCAPE_QUOTE_RE, '"') : null;
}

function parseTemplate(el, tpl) {
    const data = el.dataset;
    const newElement = el.cloneNode();
    newElement.innerHTML = tpl.replace(TOKEN_RE, (all, key) => data[key] || '');
    return newElement;
}

export default function update(elements) {
    if (elements.length) {
        requestAnimationFrame(() => {
            elements.forEach((el) => {
                const tpl = getTemplate(el);
                if (tpl) {
                    patch(el, parseTemplate(el, tpl));
                    el.dispatchEvent(new CustomEvent('render', {
                        bubbles: false,
                        cancelable: false
                    }));
                }
            });
        });
    }
}
