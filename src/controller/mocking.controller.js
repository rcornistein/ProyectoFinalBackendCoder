import { MockingService } from "../service/mockingService.js";



export class MockingController{


    static getMockingProducts = (req,res) => {

        try {

            let products = MockingService.createProducts(100);
            return res.json(products);
            
        } catch (error) {

            res.status(error.status || 500).send({
                error: {
                  status: error.status || 500,
                  message: error.message || "Server error",
                },
              });
            
        }


  

    }




}