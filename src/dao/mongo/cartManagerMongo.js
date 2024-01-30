import mongoose from "mongoose";
import { cartsModel } from "../models/cart.model.js";


export class CartManagerMongo{

    constructor(){
        this.model= cartsModel;
    };


    async createCart(){
        try {
            const result= await this.model.create({});
            return result;
             
         } catch (error) {
         
             throw  new Error(`Could not create cart ${error.message}`);
         }


    }

    async getCart(){
        try {
            const resultado = await this.model.find();
            return resultado;
            
        } catch (error) {


            console.log("Get Carts   ",error.message);
            throw  new Error(`Could not carts ${error.message}`);
            
        }


    }

    async getCartById(cartId){

        try {
            const resultado = await this.model.findById(cartId).populate('products.pid').lean();
            return resultado;
            
        } catch (error) {


           // console.log("GetCartById   ",error.message);
            throw  new Error(`Could not get ${cartId} because it doesn't exist. Mongo Atlas error message:  ${error.message}`);
            
        }

    }
    async updateCart(cartId,updateProperties){
        try {
         
            const res= await this.model.findByIdAndUpdate({"_id": cartId},updateProperties); 

            return res;
        } catch (error) {

            throw  new Error(`Could not  update products from cart. Mongo atlas error message: ${error.message}`);
            
        }
    }


    async addProductToCart(cartId,productId,quantity=1){
        try {
           
            const cart= await this.model.findById(cartId).lean();      
            let product= cart.products.find(prod=> prod.pid._id.toString()===productId);
          
            if(product){
                cart.products.find(prod=>prod.pid._id.toString()===productId).quantity +=quantity;   
            }
            else{
                cart.products.push({"pid": productId, quantity:quantity});
            }
    
            const res= await this.model.findByIdAndUpdate({"_id": cartId},cart);
           
            return res;

            
        } catch (error) {
            
            throw  new Error(`Could not add product to cart ${error.message}`);
            
        }


    }

    async deleteProductToCart(cartId,productId){
        try {
           
          
            let cart= await this.model.findById(cartId).lean(); 
     

         if(cart){

                let product= cart.products.find(prod=> prod.pid._id.toString()==productId); 
          
        
                if(!product ){
               
                    return ({cart,messageWarning: "This product wasn't in the cart!"})

                }
      
                if(product.quantity>1){

                      
                    
                    for(let elem of cart.products){
                        
                                if(elem.pid._id.toString()== productId){
                                elem.quantity= elem.quantity-1                
                                 }                 
                         }
             
                   

                     }
                 else{

                    let newProducts2=cart.products.filter(prod=>prod.pid._id.toString()!=productId);   
                    cart.products= newProducts2
                    console.log(cart)
            }
              
                let res= await this.model.findByIdAndUpdate({"_id": cartId},cart);

                res=await this.model.findById(cartId)
            
                return {cart: res};
              
              
            }
            
        
        else{
            throw  new Error(`Could not delete product to cart because the cart doesn't exist`);
        }
            
        } catch (error) {
            
            throw  new Error(`Could not delete product to cart ${error.message}`);
            
        }


    }


    async deleteCart(cartId){
        try {

            const result= await this.model.findByIdAndDelete(cartId);
            if(!result){
                throw new Error('Could not find cart');
            }
            return result;
            
        } catch (error) {
            console.log("deleteCart   ",error.message);
            throw  new Error(`Could not delete cart ${error.message}`);
            
        }


    }


}