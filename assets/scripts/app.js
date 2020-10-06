print = console.log;

class Product {
    constructor(name, imageurl, description, price){
        this.name = name;
        this.imageurl = imageurl;
        this.description = description;
        this.price = price;
    }
}

class ElementAttribute {
    constructor(attrName,attrValue){
        this.name = attrName;
        this.value = attrValue;
    }
}

class Component {
    constructor(renderHookId){
        this.hook = renderHookId;
    }

    createRootElement(tag,cssClass,attributes){
        const rootElement = document.createElement(tag);
        if(cssClass){
            rootElement.className = cssClass;
        }
        if(attributes && attributes.length > 0){
            for(const attr of attributes)
            {
                rootElement.setAttribute(attr.name, attr.value);
            }
        }
        console.log("--------------------");
        console.log(this.hook , tag ,cssClass);
        console.log(document.getElementById(this.hook));
        console.log(document.getElementById('order'));
        document.getElementById(this.hook).append(rootElement);
        return rootElement;
    }
}


class ProductItem extends Component{ // consider changing the class name
    
    constructor (product,renderHookId){
        super(renderHookId);
        this.product = product;
    }  

    addToCart(){
        App.addProductToCart(this.product);
    }   

    render(){
        const elementToBeAdded = this.createRootElement('li','product-item');
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
    }
}

class ProductList extends Component{
    products = [
        new Product(
          'Fender STRAT® Amircan',
          './assets/images/4(40).jpg',
          'Dapper and bold – the fender Strat® commands attention when it enters a room.',
          1099.99
        ),
        new Product(
          'DiMarzio AIR NORTON S',
          './assets/images/IMG_0101.jpg',
          'The Air Norton S™ is the Strat® replacement version of the full-size Air Norton™. It’s warm sounding, very well balanced, and has the same unique tonal characteristics as the original.',
          79.99
        ),
        new Product(
          'Vintage Staggered Strat (SSL-1)',
          './assets/images/13121714110231f.jpg',
          'The Vintage Staggered( SSL-1) delivers all the authentic chime and bell tone enjoyed by Stratocaster players during the 50s.',
          59.00
        )
      ];

      constructor(renderHookId) {
          super(renderHookId);
      }

    render(){
    this.createRootElement('ul', 'product-list', [
        new ElementAttribute('id', 'prod-list')
    ]);

    for (const product of this.products){
        const productToBeAdded = new ProductItem(product,'prod-list');
        productToBeAdded.render();
    }
  }
}

class ShoppingCart extends Component{
  
  items =[];
  
  constructor(hookId){
      super(hookId);
  }

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

  handleOrderNowButton(){
    console.log("HERE!!HERE!!!!!$#%^&*(%$#!");

    for (const itemIndex in this.items){
        localStorage.setItem(itemIndex,  JSON.stringify(this.items[itemIndex]));
    }
    window.location.href = 'orderPage.html' ;
  }

  render() {
      console.log("123")
    const cartElement = this.createRootElement('section','cart');
    cartElement.innerHTML= `
        <h2> Total \$${0}</h2>
        <button> Order Now! </button>
    `;
    cartElement.querySelector('button').addEventListener('click',()=>this.handleOrderNowButton());
    this.totalAmount = cartElement.querySelector('h2');
  }
}

class Shop {

      render(){
        this.cart = new ShoppingCart('app');
        const carEl = this.cart.render();
        const productsList = new ProductList('app');
        productsList.render();
    }
}


class App{

    static init(){
        window.localStorage.clear();
        const shop =  new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product){
        this.cart.addProduct(product);
    }
}

App.init();
