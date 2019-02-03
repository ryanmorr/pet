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
});
