// Define template in CSS
const css = `
    .foo::before {
        content: '<em>foo</em>';
    }

    .foo.active::before {
        content: '<strong>FOO</strong>';
    }

    .bar::before {
        content: '<div id="{{id}}">{{firstName}} {{lastName}}</div>';
    }

    .baz::before {
        content: "<i>{{title}}</i>";
    }
`;

// Append CSS templates to the DOM
const style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

// Append example elements for templates
document.body.innerHTML += `
    <div class="foo" pet></div>
    <div class="bar" data-id="name" data-first-name="John" data-last-name="Doe" pet></div>
`;

// Observe changes to an element
export function observe(el, config, callback) {
    const observer = new MutationObserver(() => {
        requestAnimationFrame(callback);
        observer.disconnect();
    });
    observer.observe(el, config);
}
