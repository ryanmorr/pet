/*! @ryanmorr/pet v1.0.0 | https://github.com/ryanmorr/pet */
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _update = _interopRequireDefault(require("./update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Import dependencies
 */

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
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = el.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var child = _step.value;
        addElement(elements, child);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}
/**
 * Collect any `pet` elements that have
 * been inserted into the DOM or had
 * data attributes changed so that the
 * template can be rendered/updated
 */


var observer = new MutationObserver(function (mutations) {
  (0, _update.default)(mutations.reduce(function (elements, mutation) {
    if (mutation.addedNodes != null) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = mutation.addedNodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var node = _step2.value;
          addElement(elements, node);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
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

module.exports = exports.default;

},{}],3:[function(require,module,exports){
"use strict";

require("./observer");

var _update = _interopRequireDefault(require("./update"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Import dependencies
 */

/**
 * Ensure `pet` elements do not display
 * the template as plain text
 */
var style = document.createElement('style');
var css = '[pet]::before { display: none !important; }';
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
/**
 * Update the current `pet` elements currently
 * in the DOM
 */

(0, _update.default)(document.querySelectorAll('[pet]'));

},{"./observer":1,"./update":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = update;

var _patch = _interopRequireDefault(require("./patch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Import dependencies
 */

/**
 * Common variables
 */
var escapeQuoteRe = /\\['"]/g;
var tokenRe = /\{\{([^\\}]*(?:\\.[^\\}]*)*)\}\}/g;
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
      elements.forEach(function (el) {
        var tpl = getTemplate(el);

        if (tpl) {
          (0, _patch.default)(el, parseTemplate(el, tpl));
          el.dispatchEvent(new CustomEvent('render', {
            bubbles: false,
            cancelable: false
          }));
        }
      });
    });
  }
}

module.exports = exports.default;

},{"./patch":2}]},{},[3])

