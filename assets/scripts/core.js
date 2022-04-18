class RenderEngine {
    
    render = (template, model) => {
        if(!model) return template;
        for(let key of Object.keys(model)) {
            template = template.replaceAll(new RegExp(`{ *${key} *}`, 'g'), model[key]);
        }
        return template;
    };
    
    renderItems = (template, items) => {
        return items.map(
            item => this.render(template, item)
        ).join('');
    };
}

class Cart {

    constructor() {
        this.subscribtions = [];
        this.cart = this.get();
    }

    get = () => {
        return JSON.parse(localStorage.getItem('CART') || '[]');
    };
    
    save = () => {
        localStorage.setItem('CART', JSON.stringify(this.cart))
    }
    
    add = (id) => {
        let line = this.cart.find(item => item.product.id == id);
        if(!line) {
            this.cart.push({ product: DATA.products.find(p => p.id == id), quantity: 1 });
        }
        else {
            line.quantity++;
        }
        this.save();
        this.publishChanges();
    }

    remove = (id) => {
        let line = this.cart.find(item => item.product.id == id);
        if(!line) {
            return;
        }
        line.quantity--;
        if(!line.quantity) {
            this.cart.splice(this.cart.indexOf(line), 1);
        }
        this.save();
        this.publishChanges();
    }

    count = () => {
        return this.cart.reduce((reducer, item) => {
            return reducer+item.quantity;
        }, 0);
    }

    total = () => {
        return this.cart.reduce((reducer, item) => {
            return reducer+(item.quantity * item.product.price);
        }, 0);
    }

    onChanged(cb) {
        this.subscribtions.push(cb);
    }

    publishChanges() {
        for(let sub of this.subscribtions) {
            sub();
        }
    }
}

const cart = new Cart();
const renderEngine = new RenderEngine();