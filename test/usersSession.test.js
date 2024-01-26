import {app} from "../src/app.js";
import { expect } from "chai";
import supertest from "supertest";

import { UsersController } from "../src/controller/users.controller.js";
import { ne } from "@faker-js/faker";
import { userModel } from "../src/dao/models/user.model.js";


const requester = supertest(app);//Elemento para hacer peticiones http

    describe('Test routes ecommerce',()=>{

        describe('Routes USER SESSIONS',()=>{

            const mockUser = {
                first_name: "Romina",
                last_name:"Cornistein",
                email:"rominacornistein@gmail.com",
                password:"coder"
            };

            const newUser = {
                first_name: "Romina",
                last_name:"Cornistein",
                age: 25,
                email:"rominacornisteinNew@gmail.com",
                password:"coderNew"
            };
            const loginForm = { InputEmail: mockUser.email,InputPassword: mockUser.password}

            const newLoginForm = { InputName: newUser.first_name, InputLastname: newUser.last_name, InputAge: newUser.age,
                InputEmail: newUser.email,InputPassword: newUser.password}


    
            before(async function(){
                this.cookie;
                await userModel.deleteMany({email:"rominacornisteinNew@gmail.com" });
                
            });
      

            it("El endpoint /api/users/signin should registrer a new user correctly", async function(){
                const response = await requester.post("/api/users/signin").send(newLoginForm);
                expect(response.status).to.be.equal(200);
            });

            
            it('POST http://localhost:8080/api/users/login should log the user correctly and return status 302 beacuase it redirects to product page and set the cookie of user CookieToken', async function(){

                let response = await requester.post('/api/users/login').send(loginForm)       
                const cookieResult = response.header['set-cookie'][0];
                // console.log(cookieResult);
                const cookieData = {
                    name:cookieResult.split("=")[0],
                    value: cookieResult.split("=")[1]
                };
       
                this.cookie=cookieData;
                expect(response.status).to.eql(302); 
               expect(this.cookie.name).to.be.equal("cookieToken");

            })

            it("GET  endpoint /api/users/current gets the user information with result output", async function(){

                const response = await requester.get("/api/users/current").set("Cookie",[`${this.cookie.name}=${this.cookie.value}`]);
              
                expect(response.status).to.be.equal(200);
                expect(response.body.result.email).to.be.equal(mockUser.email);
            });
         
            
            


        })

    })