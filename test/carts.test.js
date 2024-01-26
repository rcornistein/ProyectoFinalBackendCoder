import {app} from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { ProductsController } from "../src/controller/products.controller.js";
import productsRouter from "../src/routes/products.routes.js";
import {v4 as uuidv4} from 'uuid';


const requester = supertest(app);//Elemento para hacer peticiones http

    describe('Test routes ecommerce',()=>{

        describe('Routes CARTS',()=>{
      
            
            it('GET the api/carts should return status 200 and field payload. Payload should have array payload', async function(){

                let response = await requester.get('/api/carts')
                expect(response.status).to.eql(200);   
                expect(response.body).to.have.property("payload");  
                expect(Array.isArray(response.body.payload)).to.be.equal(true);

            })

            it('GET for an nonexistent carts should return status 400', async function(){
                let response = await requester.get('/api/carts/fdfsdf123')
                expect(response.status).to.eql(400)
            })

            it('DELETE a product from a cart should return a status 400  if either the product is not in the cart  or if it doesnt exist', async function(){
                let response = await requester.delete('/api/carts/6563d82d51c7e8aee80930b3/products/1254')
                expect(response.status).to.eql(400)
            })


            it('POST should return a field payload with _id property', async()=>{
           
                let response = await requester.post('/api/carts');
               // response    = response.lean();
              
        
               expect(response.status).to.eql(200)
      
              expect(response.body.payload).to.have.property("_id");
            })
            
            


        })

    })