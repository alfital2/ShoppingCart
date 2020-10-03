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

    render(){
        const elementToBeAdded = document.createElement('li');
        elementToBeAdded.className = 'product-item';
        elementToBeAdded.innerHTML = `
        <div>
            <img src="${this.product.imageurl}" alt= ${this.product.name}">
            <div class="product-item_content">
              <h2>${this.product.name}</h2>
              <h3>${this.product.price}</h3>
              <p> ${this.product.description}</p>
              <button>
              Add to cart
              </button>
            </div>
        </div>
        `;
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
          const renderHook = document.getElementById('app');
          const productsList = document.createElement('ul');
          productsList.className = 'product-list';
          for (const product of this.products){
            print(product);
            const productToBeAdded = new ProductItem(product);
            const renderedProduct = productToBeAdded.render();
            productsList.append(renderedProduct);
        }
            renderHook.append(productsList);
    }

}

let productsList = new ProductList();
productsList.render();
