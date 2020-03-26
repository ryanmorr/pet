import './observer';
import update from './update';

const style = document.createElement('style');
const css = '[pet]::before { display: none !important; }';
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

update(document.querySelectorAll('[pet]'));
