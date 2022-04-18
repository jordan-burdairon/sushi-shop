'use strict';

function init() {
    const templates = {
        cartLine: `
            <tr>
                <td><img src="assets/images/{ image }"></td>
                <td>{ name }</td>
                <td>{ lineQuantity }</td>
                <td>
                    <button data-id="{ id }" class="decreaseButton">-</button>
                    <button data-id="{ id }" class="increaseButton">+</button>
                </td>
                <td>{ subtotal }€<td>
            </tr>
        `,
    };

    const dom = {
        linesContainer: document.querySelector('#lines-container'),
        total: document.getElementById('total'),
    };

    const updateTotal = () => {
        dom.total.innerText = cart.total().toFixed(2) + '€';
    };

    const decreaseItem = e => {
        const id = e.target.getAttribute('data-id');
        cart.remove(id);
    };

    const increaseItem = e => {
        const id = e.target.getAttribute('data-id');
        cart.add(id);
    };

    const loadCart = () => {
        dom.linesContainer.innerHTML = renderEngine.renderItems(templates.cartLine, cart.cart.map(l => ({
            lineQuantity: l.quantity,
            subtotal: (l.product.price * l.quantity).toFixed(2),
            ...l.product
        })));
        const dButtons = document.querySelectorAll('.decreaseButton');
        const iButtons = document.querySelectorAll('.increaseButton');
        for(let button of dButtons) {
            button.addEventListener('click', decreaseItem)
        }
        for(let button of iButtons) {
            button.addEventListener('click', increaseItem)
        }
        updateTotal();
    };

    loadCart();
    cart.onChanged(loadCart);
};

document.addEventListener("DOMContentLoaded", init);
