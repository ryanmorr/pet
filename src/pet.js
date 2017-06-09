/**
 * Import dependencies
 */
import './observer';
import update from './update';

/**
 * Update the current `pet` elements currently
 * in the DOM
 */
update(document.querySelectorAll('.pet'));
