/**
 * Import dependencies
 */
import patch from './patch';
import { getTemplate, parseTemplate } from './util';

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
