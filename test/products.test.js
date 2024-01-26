import {app} from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { ProductsController } from "../src/controller/products.controller.js";
import productsRouter from "../src/routes/products.routes.js";
import {v4 as uuidv4} from 'uuid';


const requester = supertest(app);//Elemento para hacer peticiones http

    describe('Test routes ecommerce',()=>{

        describe('Routes PRODUCTS',()=>{
      
            
            it('GET the api/products should return status 200 and field result. Result should have array payload', async function(){

                let response = await requester.get('/api/products')
                expect(response.status).to.eql(200);   
                expect(response.body).to.have.property("result");  
                expect(Array.isArray(response.body.result.payload)).to.be.equal(true);

            })

            it('GET for an nonexistent product should return status 400', async function(){
                let response = await requester.get('/api/products/fdfsdf123')
                expect(response.status).to.eql(400)
            })


            it('POST a new product should return status 200 and a message equal to Product added!', async()=>{
                const newPto = {
                    title: "Model TEST",
                    description: "Tergo aestus tener veniam uter.",
                    price: 6905,
                    thumbnail: ["https://loremflickr.com/400/600/car?lock=6967498677157888"],
                    code: uuidv4(),
                    stock: 1,
                    category: "convertible"

                  };
                let response = await requester.post('/api/products').send(newPto)
              
        
               expect(response.status).to.eql(200)
               expect(response.body.message).to.eql(" Product added")
            })
            


        })

    })