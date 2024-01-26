import { faker } from '@faker-js/faker';

export class ProductMocker {

    constructor(amount) {
        this.amount = amount;
    }
    
    generateRandomProducts() {
        const randomProducts = [];
        
        for (let i = 1; i < this.amount; i++) {
            const randomProduct = {
             
             
                title: faker.vehicle.model(),
                description: faker.lorem.sentence(5),
                price: faker.number.int({min: 1000, max: 10000}),
                thumbnail:faker.image.urlLoremFlickr({width:400,height:600, category: 'car' }),
                code: i,
                stock: faker.number.int({min: 10, max:100}),
                category: faker.vehicle.type(),
                owner: i %2===0 ? "657c62b6e298e465d8cf73e0": "657b191efbcc09cbe8da58e7"
            }
       //     console.log(randomProduct);
            randomProducts.push(randomProduct);        
        }
    
        return randomProducts;
    }
}

/*
const fillProductCollection =()=>{

    let productos= new ProductMocker(5);
  
    console.log(productos.generateRandomProducts());


}

fillProductCollection();
*/