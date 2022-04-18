'use strict';

function init() {
    const templates = {
        menuItem: `
            <li>
                <a href="{ link }">{ title }</a>
            </li>
        `
    };

    const dom = {
        nav: document.querySelector('nav>ul'),
    };

    const menuItems = [
        { title: 'Index', link: 'index.html' },
        { title: 'Panier <span id="cart-count"></span>', link: 'cart.html' },
    ];

    const updateCartCount = (el) => {
        const count = cart.count();
        if(count) {
            el.classList.remove('hidden');
        }
        else {
            el.classList.add('hidden');
        }
        el.innerText = count;
    }

    const loadNav = () => {
        dom.nav.innerHTML = renderEngine.renderItems(templates.menuItem, menuItems);
        const el = document.getElementById('cart-count');
        updateCartCount(el);
        cart.onChanged(() => {
            updateCartCount(el);
        });
    };

    loadNav();
};

document.addEventListener("DOMContentLoaded", init);
