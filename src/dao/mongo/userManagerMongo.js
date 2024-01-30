import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";
import { CartManagerMongo } from "./cartManagerMongo.js";

//createCart
export class userManagerMongo{

    constructor(){
        this.model= userModel;
    };



    async createUser(object){
        try {
            const resultado = await this.model.create(object);
           
            return resultado;
            
        } catch (error) {


            console.log("CreateUser   ",error.message);
            throw  new Error(`Could not create user ${error.message}`);
            
        }


    }

    async getUsers(){

        try {
       
            const resultado = await this.model.find().lean();  
             return resultado;
             
         } catch (error) {
           
             throw  new Error(`Could not get user ${error.message}`);
             
         }
 
 
     }


     async getUserById(userId){
        try {
       
           const resultado = await this.model.findById(userId).lean();

    
      
            return resultado;
            
        } catch (error) {


            console.log("GetUser   ",error.message);
            throw  new Error(`Could not get user ${error.message}`);
            
        }


    }

    

    async getUserByMail(object){
        try {
       
           const resultado = await this.model.find({email: object.email}).lean();
           

        
           
            return resultado;
            
        } catch (error) {


            console.log("GetUser   ",error.message);
            throw  new Error(`Could not get user ${error.message}`);
            
        }


    }
    async deleteUser(id){
        try {
          const result= await this.model.findByIdAndDelete(id);
            
        } catch (error) {

            throw  new Error(`Could not delete user ${error.message}`);
            
        }

       

    }

    async updateUser(id, updateProperties){
        try {
            const user =await this.model.findByIdAndUpdate(id,updateProperties).lean();

            const userUp =await this.model.findById(id).lean();

            if(!user){
                throw new Error('Could not update user ');
            }
            return userUp;
            
        } catch (error) {
           
            throw  new Error(`Could not update user ${error.message}`);
        }
    }

    



}