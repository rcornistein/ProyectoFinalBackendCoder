
import { ProductMocker} from   '../Mocking/randomProduct.js'








export class MockingService{

   static createProducts(cant){

    let productos= new ProductMocker(cant);

          return  productos.generateRandomProducts();

   }


}

