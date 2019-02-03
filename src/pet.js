/**
 * Import dependencies
 */
import './observer';
import update from './update';

/**
 * Ensure `pet` elements do not display
 * the template as plain text
 */
const style = document.createElement('style');
const css = '[pet]::before { display: none !important; }';
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

/**
 * Update the current `pet` elements currently
 * in the DOM
 */
update(document.querySelectorAll('[pet]'));
