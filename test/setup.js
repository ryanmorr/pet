// Define template in CSS
const css = [];
css.push('#foo::before { content: "<em>foo</em>"; }');
css.push('#foo.active::before { content: "<strong>FOO</strong>";}');
css.push('#bar::before { content: "<div id=\'${id}\'>${firstName} ${lastName}</div>";}');
css.push('#baz::before { content: "<i>${title}</i>";}');

// Append CSS templates to the DOM
const style = document.createElement('style');
style.appendChild(document.createTextNode(css.join('')));
document.head.appendChild(style);

// Append example elements for templates
document.body.innerHTML += `
    <div id="foo" class="pet"></div>
    <div id="bar" class="pet" data-id="name" data-first-name="John" data-last-name="Doe"></div>
`;

// Observe changes to an element
export function observe(el, config, callback) {
    const observer = new MutationObserver(() => {
        requestAnimationFrame(callback);
        observer.disconnect();
    });
    observer.observe(el, config);
}
