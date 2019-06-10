class Cart {
    constructor(source, container = '#cart'){
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров
        this.amount = 0; // Общая стоимость товаров
        this.cartItems = []; // Массив товаров
        this._init();
    }
    _render(){
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalCount = $('<div/>', {
            class: 'cart-summary sum-count'
        });
        let $totalPrice = $('<div/>', {
            class: 'cart-summary sum-price'
        });
        $(this.container).text('Корзина');
        $cartItemsDiv.appendTo($(this.container));
        $totalCount.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
    }
    _init(){
        this._render();
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents){
                    this.cartItems.push(product);
                    this._renderProduct(product);
                }
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this._renderSum();
            })
    }
    _renderProduct(product){
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product
        });
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $container.append($(`<p class="product-price">${product.price} руб.</p>`));
        let $remBtn = $('<button/>', {
            class: 'rem-btn',
            text: '-',
            'data-id': product.id_product,
            'data-price': product.price});
        $remBtn.click(e => this.remProduct(e.target));                
        $container.append($remBtn);
        $container.appendTo($('.cart-items-wrap'));
        
    }
    
    _renderSum(){
        $('.sum-count').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`Всего товаров в корзине: ${this.amount}`);
    }
    _updateCart(product){
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity*product.price} руб.`);
    }
    addProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if(find){
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                price: +$(element).data('price'),
                product_name: $(element).data('title'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderProduct(product);
        }
        this._renderSum();
    }
    
    remProduct(element){
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if(find){
            find.quantity--;
            this.countGoods--;
            this.amount -= find.price;
        
            if (find.quantity <=0){
                let $divItem = $(`div[data-product="${productId}"]`);
                $divItem.remove();
               this.cartItems.splice(this.cartItems.indexOf(find), 1);
            } else {
                this._updateCart(find);
            }
        }
        this._renderSum();
    }
    _remove(){
        //TODO: удаление товара
    }

}