// Define template in CSS
const css = `
    #foo::before {
        content: '<em>foo</em>';
    }

    #foo.active::before {
        content: '<strong>FOO</strong>';
    }

    #bar::before {
        content: '<div id="{{id}}">{{firstName}} {{lastName}}</div>';
    }

    #baz::before {
        content: '<i>{{title}}</i>';
    }
`;

// Append CSS templates to the DOM
const style = document.createElement('style');
style.appendChild(document.createTextNode(css));
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
