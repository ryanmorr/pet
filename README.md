# pet

[![Version Badge][version-image]][project-url]
[![Build Status][build-image]][build-url]
[![License][license-image]][license-url]

> Pseudo-element templating

A proof of concept, pet (pseudo-element templating) expands on the capabilities of pseudo-elements by adding support for HTML and data attribute interpolation within the CSS content property.

## Install

Download the [development](http://github.com/ryanmorr/pet/raw/master/dist/pet.js) or [minified](http://github.com/ryanmorr/pet/raw/master/dist/pet.min.js) version, or install via NPM:

``` sh
npm install @ryanmorr/pet
```

## Configuration

The beauty of pet is that it's a zero API library, meaning there are no functions to import, just the library itself:

```javascript
import from '@ryanmorr/pet';
```

Signify an element as a pet element by adding the "pet" attribute. Then define its template within the `content` property of the `::before` pseudo-element:

```html
<div class="component" pet></div>
```

```css
.component::before {
    content: '<span>Hello World</span>';
}
```

Generates:

```html
<div class="component" pet>
    <span>Hello World</span>
</div>
```

If you experience [FOUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content), try adding the following to your CSS to ensure the pseudo-element templates are not displayed as plain text:

```css
[pet]::before {
    display: none !important;
}
```

## Interpolation

Interpolation is achieved through data attributes set on the pet element and double curly braces ({{ }}) serving as delimiters for tokens within the template. The token found between the delimiters reference the data attribute using the same [name conversion](https://developer.mozilla.org/en/docs/Web/API/HTMLElement/dataset#Name_conversion) as the `element.dataset` property in JavaScript. For example, an attribute of `data-foo-bar-baz-qux` would be referenced as `{{fooBarBazQux}}` within a template.

```html
<div class="component" data-first-name="John" data-last-name="Doe" pet></div>
```

```css
.component::before {
    content: '<span>Hello world, my name is {{firstName}} {{lastName}}</span>';
}
```

Generates:

```html
<div class="component" data-first-name="John" data-last-name="Doe" pet></div>
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

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/pet
[version-image]: https://badge.fury.io/gh/ryanmorr%2Fpet.svg
[build-url]: https://travis-ci.org/ryanmorr/pet
[build-image]: https://travis-ci.org/ryanmorr/pet.svg
[license-image]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: UNLICENSE