# pet

[![Version Badge][version-image]][project-url]
[![License][license-image]][license-url]
[![Build Status][build-image]][build-url]

> Pseudo-element templating

## Install

Download the [CJS](https://github.com/ryanmorr/pet/raw/master/dist/cjs/pet.js), [ESM](https://github.com/ryanmorr/pet/raw/master/dist/esm/pet.js), [UMD](https://github.com/ryanmorr/pet/raw/master/dist/umd/pet.js) versions or install via NPM:

``` sh
npm install @ryanmorr/pet
```

## Usage

Pseudo-element templating (pet for short) expands on the capabilities of pseudo-elements by adding support for HTML and data attribute interpolation within the CSS content property.

The beauty of pet is that it's a zero API library, meaning there are no functions to import, just the library itself:

```javascript
import from '@ryanmorr/pet';
```

Then add the following to your CSS to ensure the pseudo-element templates are not displayed as plain text:

```css
[pet]::before {
    display: none !important;
}
```

To begin, indicate an element as a `pet` element by adding the "pet" attribute. Then define its template within the `content` property of the `::before` pseudo-element:

```html
<div class="component" pet></div>
```

```css
.component::before {
    content: '<span>Hello World</span>';
}
```

This will generate the following HTML:

```html
<div class="component" pet>
    <span>Hello World</span>
</div>
```

Interpolation is achieved through data attributes set on the `pet` element and mustache-style double curly braces serving as delimiters for tokens within the template. The token found between the delimiters reference the data attribute using the same [name conversion](https://developer.mozilla.org/en/docs/Web/API/HTMLElement/dataset#Name_conversion) as the DOM element `dataset` property in JavaScript. For example, an attribute of `data-foo-bar-baz-qux` would be referenced as `fooBarBazQux` within a template:

```html
<div class="component" data-first-name="John" data-last-name="Doe" pet></div>
```

```css
.component::before {
    content: '<span>Hello world, my name is {{firstName}} {{lastName}}</span>';
}
```

This will generate the following HTML:

```html
<div class="component" data-first-name="John" data-last-name="Doe" pet></div>
    <span>Hello world, my name is John Doe</span>
</div>
```

Programmatically changing a data attribute will automatically patch the changes in the DOM. When a template is updated, a custom "render" event is dispatched on the `pet` element:

```javascript
document.querySelector('.component').addEventListener('render', (e) => {
    // React to changes
});
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/pet
[version-image]: https://img.shields.io/github/package-json/v/ryanmorr/pet?color=blue&style=flat-square
[build-url]: https://github.com/ryanmorr/pet/actions
[build-image]: https://img.shields.io/github/actions/workflow/status/ryanmorr/pet/node.js.yml?style=flat-square
[license-image]: https://img.shields.io/github/license/ryanmorr/pet?color=blue&style=flat-square
[license-url]: UNLICENSE