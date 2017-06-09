/**
 * Import dependencies
 */
import { patch } from './patch';
import { interpolate, parseHTML } from './util';

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
            const tpl = window.getComputedStyle(el, ':before').getPropertyValue('content');
            if (tpl) {
                const frag = parseHTML(interpolate(tpl.slice(1, -1), el.dataset));
                const newElement = el.cloneNode();
                newElement.appendChild(frag);
                patch(el, newElement);
            }
        }
    });
}
