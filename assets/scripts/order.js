class OrdersSummary{

    itemsToOrder = [];
    itemsWithoutDuplications = new Map();

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

      this.itemsToOrder.forEach((obj) =>{
        let key = JSON.stringify(obj);
        if (this.itemsWithoutDuplications.has(key)){
          let appear = this.itemsWithoutDuplications.get(key) +1;//increment the amount of appereance by 1
          this.itemsWithoutDuplications.set(key,appear)
        }
        else{
          this.itemsWithoutDuplications.set(key,1)
        }
      });
    }
  
    creatTableBodyElements(){
      let outPut='';
      this.itemsWithoutDuplications.forEach((val, item) => {
        let itemProperties = JSON.parse(item);
        let totalPriceForItem = itemProperties.price * val;
        outPut+= `
        <div class="tr">
          <div class="td">${itemProperties.name} </div>
          <div class="td">${val}</div>
          <div class="td" ><img src=${itemProperties.imageurl}></div>
          <div class="td"><b>$ ${totalPriceForItem.toFixed(2)}</b></div>
        </div>
        `
      });
      return outPut;
    }

    calcTotalPrice(){
      return this.itemsToOrder.reduce(( prev,curItem)=> prev+= curItem.price,0);

    }

    countAmountOfProductsInCart(){
      let totalProductsInCart=0;
      // for (const [key,val] of this.itemsWithoutDuplications){
      //   totalProductsInCart += val;
      // }
      return totalProductsInCart;
    }

    render(){
        document.body.innerHTML +=`
        <div class="table">
        ${this.creatTableBodyElements()}
        <div class="tr">
          <div class="td"> 
          Total price: 
          </div>
          <div class="td">${this.countAmountOfProductsInCart()}</div>
          <div class="td">f</div>
          <div class="td"><b>$ ${this.calcTotalPrice()}</b></div>
        </div>
        </div>
        `;
    }
  
  }//CLASS ends here

  new OrdersSummary();

