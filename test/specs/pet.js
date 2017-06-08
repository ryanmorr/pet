/* eslint-disable max-len */

import { expect } from 'chai';
import '../../src/pet';

describe('pet', () => {
    it('supports HTML injection on page load', () => {
        const foo = document.querySelector('#foo');
        const el = foo.firstChild;
        expect(el).to.not.equal(null);
        expect(el.tagName.toLowerCase()).to.equal('em');
        expect(el.textContent).to.equal('foo');
    });

    it('supports HTML interpolation using data attributes', () => {
        const bar = document.querySelector('#bar');
        const el = bar.firstChild;
        expect(el).to.not.equal(null);
        expect(el.tagName.toLowerCase()).to.equal('strong');
        expect(el.id).to.equal('name');
        expect(el.textContent).to.equal('John Doe');
    });
});
