print = console.log;
class Product {

    constructor(name, image, description, price){
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
    }
}



let products = [
        new Product(
          'PARALLEL UNIVERSE II UPTOWN STRAT®',
          'https://www.fmicassets.com/Damroot/ThumbnailJpg/10001/0176790760_gtr_frtbdydtl_001_nr.jpg',
          'Dapper and bold – the Uptown Strat® commands attention when it enters a room.',
          1099.99
        ),
        new Product(
          'DiMarzio AIR NORTON S',
          'https://d2emr0qhzqfj88.cloudfront.net/s3fs-public/products/DP180W.png',
          'The Air Norton S™ is the Strat® replacement version of the full-size Air Norton™. It’s warm sounding, very well balanced, and has the same unique tonal characteristics as the original.',
          79.99
        )
      ];



print(products)