'use strict';

function init() {
    const templates = {
        card: `
            <div class="card-col { categorie }">
                <div class="card" data-id="{ id }">
                    <div class="overlay">+</div>
                    <div class="card-top">
                        <img src="assets/images/{ image }">
                    </div>
                    <div class="card-content">{ name }</div>
                    <div class="card-bottom">
                        <span class="price">{ price } €</span>
                        <span class="separator">|</span>
                        <span class="quantity">{ quantity } pièce(s)</span>
                    </div>
                </div>
            </div>
        `,
        categorieOption: `
            <option>{ name }</option>
        `
    };

    const dom = {
        cardContainer: document.querySelector('.card-container'),
        categories: document.getElementById('categories'),
    };

    const addToCart = e => {
        let id = e.target.getAttribute('data-id');
        cart.add(id);
    };

    const search = e => {
        const cat = e.target.value;
        loadItems(DATA.products.filter(p => !cat || p.category === cat));
    };

    const loadItems = (items) => {
        dom.cardContainer.innerHTML = renderEngine.renderItems(templates.card, items);
        const cards = document.querySelectorAll('.card');
        for(let card of cards) {
            card.addEventListener('click', addToCart)
        }
    };

    const loadCategories = (items) => {
        dom.categories.innerHTML += renderEngine.renderItems(templates.categorieOption, items.map(c => ({ name: c })));
    };

    dom.categories.addEventListener('change', search);

    loadItems(DATA.products);
    loadCategories(DATA.categories);
};

document.addEventListener("DOMContentLoaded", init);