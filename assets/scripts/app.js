print = console.log;

class Product {
    constructor(name, imageurl, description, price){
        this.name = name;
        this.imageurl = imageurl;
        this.description = description;
        this.price = price;
    }
}

class ProductItem { // consider changing the class name
    
    constructor (product){
        this.product = product;
    }  

    addToCart(){
        App.addProductToCart(this.product);
    }   

    render(){
        const elementToBeAdded = document.createElement('li');
        elementToBeAdded.className = 'product-item';
        elementToBeAdded.innerHTML = `
        <div>
            <img src="${this.product.imageurl}" alt= ${this.product.name}">
            <div class="product-item_content">
              <h2>${this.product.name}</h2>
              <h3>${this.product.price}$</h3>
              <p> ${this.product.description}</p>
              <button>
              Add to cart
              </button>
            </div>
        </div>
        `;
        const AddToCartButton = elementToBeAdded.querySelector('button')
        AddToCartButton.addEventListener('click',this.addToCart.bind(this))
        return elementToBeAdded;
    }
}

class ProductList{
    products = [
        new Product(
          'Fender STRAT® Amircan',
          'https://www.kley-zemer.co.il/Media/Uploads/4(40).jpg',
          'Dapper and bold – the fender Strat® commands attention when it enters a room.',
          1099.99
        ),
        new Product(
          'DiMarzio AIR NORTON S',
          'https://d2emr0qhzqfj88.cloudfront.net/s3fs-public/products/DP180W.png',
          'The Air Norton S™ is the Strat® replacement version of the full-size Air Norton™. It’s warm sounding, very well balanced, and has the same unique tonal characteristics as the original.',
          79.99
        )
      ];

      constructor() {}

      render(){
          const productsList = document.createElement('ul');
          productsList.className = 'product-list';
          for (const product of this.products){
            print(product);
            const productToBeAdded = new ProductItem(product);
            const renderedProduct = productToBeAdded.render();
            productsList.append(renderedProduct);
        }
        return productsList;
    }
}

class ShoppingCart {
  
  items =[];
  
  set cartItems(value){
     this.items = value;
  }

  get totalPrice(){
      const sum = this.items.reduce((pervValue,curItem) => pervValue+ curItem.price,0);
      return sum;
  }

  updateTotalPriceToScreen(){
    this.totalAmount.innerHTML = `<h2> Total \$${this.totalPrice.toFixed(2)}</h2>`;

  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
    this.updateTotalPriceToScreen();
  }

  render() {
    const cartElement = document.createElement('section');
    cartElement.className = 'cart';
    cartElement.innerHTML= `
        <h2> Total \$${0}</h2>
        <button> Order Now! </button>
    `;
    this.totalAmount = cartElement.querySelector('h2');
    return cartElement;
  }
}

class Shop {

    render(){
        const renderHook = document.getElementById('app');
        this.cart = new ShoppingCart();
        const carEl = this.cart.render();
        const productsList = new ProductList().render();
        
        renderHook.append(carEl);
        renderHook.append(productsList);
    }
}


class App{
    static init(){
        const shop =  new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product){
        this.cart.addProduct(product);
    }
}

App.init();
