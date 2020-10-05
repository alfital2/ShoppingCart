
class OrdersSummary{

  itemsToOrder = [];

  constructor(){
    this.init();
  }

  init(){
    this.getElements();
    const test = document.getElementById('order');
    console.log(this.itemsToOrder);
  }

  getElements(){
    let itemIndex = localStorage.length-1;
    while(itemIndex>=0){
      this.itemsToOrder.push(JSON.parse(localStorage.getItem(itemIndex--)));
    }
  }

}


let fart = new OrdersSummary;
