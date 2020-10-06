class OrdersSummary{

    itemsToOrder = [];
    duplicates;

    constructor(){
      this.init();
    }
  
    init(){
      this.getElements();
      this.removeDuplicationsInCart();
      this.render();
    }
  
    getElements(){
      let itemIndex = localStorage.length-1;
      while(itemIndex>=0)
        this.itemsToOrder.push(JSON.parse(localStorage.getItem(itemIndex--)));   
    }

    removeDuplicationsInCart(){
      this.duplicates = new Map();

      this.itemsToOrder.forEach((obj) =>{
        let key = JSON.stringify(obj);
        let appear = (this.duplicates[key] || 0) + 1;
        this.duplicates.set(key,appear)
        this.duplicates[key] = (this.duplicates[key] || 0) + 1
      });
    }
  
    render(){

      this.duplicates.forEach((val, item) => {
        let itemProperties = JSON.parse(item);
        const elementToAdd = document.createElement('div');
        elementToAdd.className='product-summary';
        elementToAdd.innerHTML = `
        <div>
          <h2> ${itemProperties.name} + ${val} </h2>
        </div>
        `;
        document.getElementById('order').append(elementToAdd);
      });
      
    }
  
  }//CLASS ends here
  
  new OrdersSummary();
