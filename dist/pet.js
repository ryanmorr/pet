/*! pet v0.1.0 | https://github.com/ryanmorr/pet */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pet = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resolve the supported `MutationObserver`
 * implementation
 */
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

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
/**
 * Import dependencies
 */
function onChange(mutations) {
    var elements = [];
    for (var i = 0, len = mutations.length; i < len; i++) {
        var mutation = mutations[i];
        if (mutation.addedNodes != null) {
            for (var n = 0, nLen = mutation.addedNodes.length; n < nLen; n++) {
                addElement(elements, mutation.addedNodes[n]);
            }
        }
        if (mutation.attributeName != null) {
            addElement(elements, mutation.target);
        }
    }
    (0, _update2.default)(elements);
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
    if (el.nodeType === 1 && el.classList.contains('pet') && elements.indexOf(el) === -1) {
        elements.push(el);
    }
    if (el.hasChildNodes()) {
        for (var i = 0, children = el.children, len = children.length; i < len; i++) {
            addElement(elements, children[i]);
        }
    }
}

/**
 * Create the mutation observer and start
 * observing the document body for dynamically
 * inserted elements and changed attributes
 */
var observer = new MutationObserver(onChange);
observer.observe(document.documentElement, {
    childList: true,
    attributes: true,
    subtree: true
});

},{"./update":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = patch;
/**
 * Patch a source node to match
 * another node
 *
 * @param {Node} node
 * @param {Node} newNode
 * @api private
 */
function patch(node, newNode) {
    if (node.nodeType !== newNode.nodeType || node.nodeName !== newNode.nodeName) {
        node.parentNode.replaceChild(newNode.cloneNode(true), node);
        return;
    }
    if (newNode.nodeType === 3) {
        var data = newNode.data;
        if (node.data !== data) {
            node.data = data;
        }
        return;
    }
    var childNodes = node.childNodes;
    var newChildNodes = newNode.childNodes;
    for (var i = Math.min(childNodes.length, newChildNodes.length) - 1; i >= 0; i--) {
        patch(childNodes[i], newChildNodes[i]);
    }
    if (!node.isEqualNode(newNode)) {
        var nodeAttrs = node.attributes;
        var newNodeAttrs = newNode.attributes;
        if (childNodes.length > newChildNodes.length) {
            for (var _i = childNodes.length - 1; _i >= newChildNodes.length; _i--) {
                node.removeChild(childNodes[_i]);
            }
        } else if (childNodes.length < newChildNodes.length) {
            var frag = document.createDocumentFragment();
            for (var _i2 = childNodes.length; _i2 < newChildNodes.length; _i2++) {
                frag.appendChild(newChildNodes[_i2].cloneNode(true));
            }
            node.appendChild(frag);
        }
        for (var _i3 = nodeAttrs.length - 1; _i3 >= 0; _i3--) {
            var name = nodeAttrs[_i3].name;
            if (!newNode.hasAttribute(name)) {
                node.removeAttribute(name);
            }
        }
        for (var _i4 = newNodeAttrs.length - 1; _i4 >= 0; _i4--) {
            var attr = newNodeAttrs[_i4];
            var _name = attr.name;
            var value = attr.value;
            if (node.getAttribute(_name) !== value) {
                node.setAttribute(_name, value);
            }
        }
    }
}
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

require('./observer');

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Update the current `pet` elements currently
 * in the DOM
 */
/**
 * Import dependencies
 */
(0, _update2.default)(document.querySelectorAll('.pet'));

},{"./observer":1,"./update":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = update;

var _patch = require('./patch');

var _patch2 = _interopRequireDefault(_patch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Common variables
 */
var escapeQuoteRe = /\\['"]/g; /**
                                * Import dependencies
                                */

var tokenRe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

/**
 * Get the template for an element
 * held within the `:before` pseudo-
 * element
 *
 * @param {String} tpl
 * @param {Object} values
 * @return {String}
 * @api private
 */
function getTemplate(el) {
    var tpl = window.getComputedStyle(el, ':before').getPropertyValue('content');
    return tpl ? tpl.slice(1, -1).replace(escapeQuoteRe, '"') : null;
}

/**
 * Interpolate the template string with the
 * elements data attributes and convert into
 * DOM nodes
 *
 * @param {Element} el
 * @param {String} tpl
 * @return {Element}
 * @api private
 */
function parseTemplate(el, tpl) {
    var data = el.dataset;
    var newElement = el.cloneNode();
    newElement.innerHTML = tpl.replace(tokenRe, function (all, key) {
        return data[key] || '';
    });
    return newElement;
}

/**
 * Schedule an animation frame to
 * update each element in the array
 *
 * @param {Array} elements
 * @api private
 */
function update(elements) {
    if (elements.length) {
        requestAnimationFrame(function () {
            for (var i = 0, len = elements.length; i < len; i++) {
                var el = elements[i];
                var tpl = getTemplate(el);
                if (tpl) {
                    (0, _patch2.default)(el, parseTemplate(el, tpl));
                    el.dispatchEvent(new CustomEvent('render', {
                        bubbles: false,
                        cancelable: false
                    }));
                }
            }
        });
    }
}
module.exports = exports['default'];

},{"./patch":2}]},{},[3])(3)
});

