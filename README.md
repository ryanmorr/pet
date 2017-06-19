# pet

[![Version Badge][version-image]][project-url]
[![Build Status][build-image]][build-url]
[![Dependencies][dependencies-image]][project-url]
[![License][license-image]][license-url]
[![File Size][file-size-image]][project-url]

> A proof of concept, pet (pseudo-element templating) expands on the capabilities of pseudo-elements by adding support for HTML and data attribute interpolation within the CSS content property.

## Configuration

The beauty of pet is that it's a zero API library, meaning there are no functions to import, just the library itself:

```javascript
import from 'pet';
```

Signify an element as a pet element by adding the "pet" class name. Then define its template within the `::before` pseudo-element:

```html
<div class="pet component"></div>
```

```css
.component::before {
    content: '<span>Hello World</span>';
}
```

Generates:

```html
<div class="pet component">
    <span>Hello World</span>
</div>
```

Remember to add the following to your CSS to ensure the pseudo-element templates are not displayed as plain text:

```css
.pet::before {
    display: none !important;
}
```

## Interpolation

Use data attributes and ES6 template literal syntax to perform interpolation. [Name conversion](https://developer.mozilla.org/en/docs/Web/API/HTMLElement/dataset#Name_conversion) works the same as HTML data attributes (data-*) to/from the JavaScript `element.dataset` property:

```html
<div class="pet component" data-first-name="John" data-last-name="Doe"></div>
```

```css
.component::before {
    content: '<span>Hello world, my name is ${firstName} ${lastName}</span>';
}
```

Generates:

```html
<div class="pet component" data-first-name="John" data-last-name="Doe"></div>
    <span>Hello world, my name is John Doe</span>
</div>
```

Programmatically changing a data attribute will automatically patch the changes in the DOM in a performant manner.

When a template is initially rendered, and every time a template is patched, a custom "render" event is dispatched on the pet element:

```javascript
document.querySelector('.component').addEventListener('render', (e) => {
    // React to changes
});
```

## Harness the Power of CSS

Create micro templates easily for common patterns:

```css
.phone::before {
    content: '<span><i class="icon-phone"></i> ${number}</span>';
}

.email::before {
    content: '<a href="mailto:${email}"><i class="icon-email"></i> ${email}</a>';
}
```

Alter a template based on class names and attributes:

```css
.avatar::before {
    content: '<img src="default.jpg" />';
}

.avatar[data-src]::before {
    content: '<img src="${src}" />';
}
```

## Installation

pet is [CommonJS](http://www.commonjs.org/) and [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) compatible with no dependencies. You can download the [development](http://github.com/ryanmorr/pet/raw/master/dist/pet.js) or [minified](http://github.com/ryanmorr/pet/raw/master/dist/pet.min.js) version, or install it in one of the following ways:

``` sh
npm install ryanmorr/pet

bower install ryanmorr/pet
```

## Tests

Open `test/runner.html` in your browser or test with PhantomJS by issuing the following commands:

``` sh
npm install
npm install -g gulp
gulp test
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/pet
[version-image]: https://badge.fury.io/gh/ryanmorr%2Fpet.svg
[build-url]: https://travis-ci.org/ryanmorr/pet
[build-image]: https://travis-ci.org/ryanmorr/pet.svg
[dependencies-image]: https://david-dm.org/ryanmorr/pet.svg
[license-image]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: UNLICENSE
[file-size-image]: https://badge-size.herokuapp.com/ryanmorr/pet/master/dist/pet.min.js.svg?color=blue&label=file%20size