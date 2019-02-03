import { observe } from '../setup';
import '../../src/pet';

describe('pet', () => {
    it('should support HTML injection on page load', (done) => {
        const foo = document.querySelector('.foo');

        requestAnimationFrame(() => {
            expect(foo.innerHTML).to.equal('<em>foo</em>');
            done();
        });
    });

    it('should support HTML interpolation using data attributes', (done) => {
        const bar = document.querySelector('.bar');

        requestAnimationFrame(() => {
            expect(bar.innerHTML).to.equal('<div id="name">John Doe</div>');
            done();
        });
    });

    it('should support HTML injection on dynamically inserted elements', (done) => {
        const baz = document.createElement('div');
        baz.className = 'baz';
        baz.setAttribute('pet', '');
        baz.dataset.title = 'Baz';

        observe(document.body, {childList: true}, () => {
            expect(baz.innerHTML).to.equal('<i>Baz</i>');
            done();
        });

        document.body.appendChild(baz);
    });

    it('should support DOM updates when data attributes are changed dynamically', (done) => {
        const bar = document.querySelector('.bar');

        observe(bar, {attributes: true}, () => {
            expect(bar.innerHTML).to.equal('<div id="name2">Joe Blow</div>');
            done();
        });

        bar.dataset.id = 'name2';
        bar.dataset.firstName = 'Joe';
        bar.dataset.lastName = 'Blow';
    });

    it('should support DOM updates via CSS specificity', (done) => {
        const foo = document.querySelector('.foo');

        observe(foo, {attributes: true}, () => {
            expect(foo.innerHTML).to.equal('<strong>FOO</strong>');
            done();
        });

        foo.classList.add('active');
    });

    it('should support templates nested within templates', (done) => {
        const qux = document.querySelector('.qux');

        expect(qux.innerHTML).to.equal('<div class="foo" pet=""><em>foo</em></div>');

        observe(qux, {attributes: true}, () => {
            expect(qux.innerHTML).to.equal('<div class="foo active" pet=""><strong>FOO</strong></div>');
            done();
        });

        qux.dataset.class = 'foo active';
    });

    it('should not unnecessarily remove elements when updating', (done) => {
        const quux = document.querySelector('.quux');
        const div = quux.firstChild;

        expect(div.textContent).to.equal('foo');

        observe(quux, {attributes: true}, () => {
            expect(quux.firstChild).to.equal(div);
            expect(div.textContent).to.equal('bar');
            done();
        });

        quux.dataset.content = 'bar';
    });

    it('should support interpolation of HTML', (done) => {
        const quux = document.querySelector('.quux');

        observe(quux, {attributes: true}, () => {
            expect(quux.innerHTML).to.equal('<div><section></section></div>');
            done();
        });

        quux.dataset.content = '<section></section>';
    });

    it('should support DOM updates of multiple elements', (done) => {
        const baz1 = document.createElement('div');
        baz1.className = 'baz';
        baz1.setAttribute('pet', '');

        const baz2 = document.querySelector('div');
        baz2.className = 'baz';
        baz2.setAttribute('pet', '');

        document.body.appendChild(baz1);
        document.body.appendChild(baz2);

        const baz1Spy = sinon.spy(() => {
            expect(baz1.innerHTML).to.equal('<i>Hello World</i>');
            if (baz2Spy.called) {
                done();
            }
        });

        const baz2Spy = sinon.spy(() => {
            expect(baz2.innerHTML).to.equal('<i>Hello World 2</i>');
            if (baz1Spy.called) {
                done();
            }
        });

        observe(baz1, {attributes: true}, baz1Spy);
        observe(baz2, {attributes: true}, baz2Spy);

        baz1.dataset.title = 'Hello World';
        baz2.dataset.title = 'Hello World 2';
    });

    it('should dispatch a custom render event when a pseudo-element template is rendered', (done) => {
        const baz = document.querySelector('.baz');

        baz.addEventListener('render', (e) => {
            expect(e.type).to.equal('render');
            expect(e.target).to.equal(baz);
            expect(baz.innerHTML).to.equal('<i>AAA</i>');
            done();
        });

        baz.dataset.title = 'AAA';
    });

    it('should automatically hide templates from displaying as plain text', () => {
        const foo = document.querySelector('.foo');
        const before = window.getComputedStyle(foo, ':before');
        expect(before.display).to.equal('none');
    });
});
