import { observe } from '../setup';
import '../../src/pet';

describe('pet', () => {
    it('should support HTML injection on page load', (done) => {
        const foo = document.querySelector('#foo');
        requestAnimationFrame(() => {
            const el = foo.firstChild;
            expect(el).to.not.equal(null);
            expect(el.tagName.toLowerCase()).to.equal('em');
            expect(el.textContent).to.equal('foo');
            done();
        });
    });

    it('should support HTML interpolation using data attributes', (done) => {
        const bar = document.querySelector('#bar');
        requestAnimationFrame(() => {
            const el = bar.firstChild;
            expect(el).to.not.equal(null);
            expect(el.tagName.toLowerCase()).to.equal('div');
            expect(el.id).to.equal('name');
            expect(el.textContent).to.equal('John Doe');
            done();
        });
    });

    it('should support HTML injection on dynamically inserted elements', (done) => {
        const baz = document.createElement('div');
        baz.id = 'baz';
        baz.setAttribute('pet', '');
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

    it('should dispatch a custom render event when a pseudo-element template is rendered', (done) => {
        const baz = document.querySelector('#baz');
        baz.addEventListener('render', (e) => {
            expect(e.type).to.equal('render');
            expect(e.target).to.equal(baz);
            expect(baz.firstChild.textContent).to.equal('AAA');
            done();
        });
        baz.dataset.title = 'AAA';
    });
});
