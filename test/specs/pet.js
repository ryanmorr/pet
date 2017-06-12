/* eslint-disable max-len */

import { expect } from 'chai';
import '../../src/pet';

function observe(el, config, fn) {
    const observer = new (window.MutationObserver || window.WebKitMutationObserver)(() => {
        setTimeout(fn, 100);
        observer.disconnect();
    });
    observer.observe(el, config);
}

describe('pet', () => {
    it('should support HTML injection on page load', (done) => {
        const foo = document.querySelector('#foo');
        setTimeout(() => {
            const el = foo.firstChild;
            expect(el).to.not.equal(null);
            expect(el.tagName.toLowerCase()).to.equal('em');
            expect(el.textContent).to.equal('foo');
            done();
        }, 100);
    });

    it('should support HTML interpolation using data attributes', (done) => {
        const bar = document.querySelector('#bar');
        setTimeout(() => {
            const el = bar.firstChild;
            expect(el).to.not.equal(null);
            expect(el.tagName.toLowerCase()).to.equal('div');
            expect(el.id).to.equal('name');
            expect(el.textContent).to.equal('John Doe');
            done();
        }, 100);
    });

    it('should support HTML injection on dynamically inserted elements', (done) => {
        const baz = document.createElement('div');
        baz.id = 'baz';
        baz.className = 'pet';
        baz.dataset.title = 'Baz';
        observe(document.body, {childList: true}, () => {
            const el = baz.firstChild;
            expect(el).to.not.equal(null);
            expect(el.tagName.toLowerCase()).to.equal('i');
            expect(el.textContent).to.equal('Baz');
            done();
        });
        document.body.appendChild(baz);
    });

    it('should support DOM updates when data attributes are changed dynamically', (done) => {
        const bar = document.querySelector('#bar');
        observe(bar, {attributes: true}, () => {
            const el = bar.firstChild;
            expect(el).to.not.equal(null);
            expect(el.tagName.toLowerCase()).to.equal('div');
            expect(el.id).to.equal('name2');
            expect(el.textContent).to.equal('Joe Blow');
            done();
        });
        bar.dataset.id = 'name2';
        bar.dataset.firstName = 'Joe';
        bar.dataset.lastName = 'Blow';
    });

    it('should support DOM updates via CSS specificity', (done) => {
        const foo = document.querySelector('#foo');
        observe(foo, {attributes: true}, () => {
            const el = foo.firstChild;
            expect(el).to.not.equal(null);
            expect(el.tagName.toLowerCase()).to.equal('strong');
            expect(el.textContent).to.equal('FOO');
            done();
        });
        foo.classList.add('active');
    });
});
