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
        if (this.duplicates.has(key)){
          let appear = this.duplicates.get(key) +1;//increment the amount of appereance by 1
          this.duplicates.set(key,appear)
        }
        else{
          this.duplicates.set(key,1)
        }
      });
    }
  
    creatTableBodyElements(){
      let outPut;
      this.duplicates.forEach((val, item) => {
        let itemProperties = JSON.parse(item);
        let totalPriceForItem = itemProperties.price * val;
        outPut+= `
        <div class="tr">
          <div class="td">${itemProperties.name} x ${val}</div>
          <div class="td">${itemProperties.description}</div>
          <div class="td" ><img src=${itemProperties.imageurl}></div>
          <div class="td" >${totalPriceForItem.toFixed(2)}$</div>
        </div>
        `
      });
      return outPut;
    }

    render(){
        document.body.innerHTML +=`
        <div class="table">
        ${this.creatTableBodyElements()}
        </div>
        `;
    }
  
  }//CLASS ends here
  
  new OrdersSummary();
