import Router from "express";

import { CartsService } from "../service/carts.service.js";
import {ProductsService} from "../service/products.service.js"
import { TicketsService } from "../service/ticketsService.js";


import {v4 as uuidv4} from 'uuid';
import { logger } from "../helpers/logger.js";

export class CartsController{

static post = async (req,res) => {
    try {
      
     const result =await CartsService.createCart();
     res.status(200).send({payload: result}); 

    } catch (error) {
      res.status(error.status || 400).send({
          error: {
          
            message: error.message || "Server error"
          },
        });
  
      
    }
      
      ;
  }


 static deleteProducts = async (req,res) => {
    try {

        const cid=req.params.cid;
      const cart= await CartsService.getCartById(cid);

     
      cart.products=[];
      
        const result= await CartsService.updateCart(cid, cart);

        

        res.status(200).send({payload: result}); 

    } catch (error) {
      res.status(error.status || 400).send(
           {
            
            message: error.message 
          }
        );
  
      
    }      ;
  }
 
  static putCidPid = async (req,res) => {
    try {

        const cid=req.params.cid;
        const pid= req.params.pid;
        const quantity= parseInt(req.body.quantity)||1;

        const product= await  ProductsService.getProductById(pid);
   
        
    if((req.user.role === "premium" && product.owner.toString() != req.user.id.toString()) || req.user.role === "user"){
         let result = await CartsService.addProductToCart(cid,pid,quantity);
         result=await CartsService.getCartById(cid);

        res.status(200).json(result);
    }
      else {

        res.status(200).json(`You cannot buy this product due to ownwership constraints`);

    }

    } catch (error) {
      res.status(error.status || 500).send({
          error: {
            status: error.status || 500,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  }


  static putCid = async (req,res) => {
    try {
  
        const cid=req.params.cid;
     /* arregglo de id de productos */
        let products= req.body.products;

       
        let cart = await CartsService.getCartById(cid);
    
        
          if(cart.products){
          cart.products= products}
          else{
            cart.products={};
            cart.products=products;
          };
         const result = await CartsService.updateCart(cid,cart);

        res.status(200).json(` cart ${cid} updated`);


    } catch (error) {
      res.status(error.status || 200).send({
          error: {
            status: error.status || 200,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;

    }


static delete = async (req,res) => {
    try {

        const cid=req.params.cid;
        const pid= req.params.pid;

         const result = await CartsService.deleteProductToCart(cid,pid);

        res.status(200).send({cart: result})


    } catch (error) {
      res.status(error.status || 400).send({
          error: {
            status: error.status || 400,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  }



  static get = async (req,res) => {
    try {

     

         const result = await CartsService.getCart()

        res.status(200).send({payload: result});


    } catch (error) {
      res.status(error.status || 400).send({
          error: {
            status: error.status || 400,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  }

  static getCid = async (req,res) => {
    try {

        const cid=req.params.cid;
       

         const result = await CartsService.getCartById(cid);

        res.status(200).send({payload: result});


    } catch (error) {
      res.status(error.status || 400).send({
          error: {
            status: error.status || 400,
            message: error.message || "Server error",
          },
        });
  
      
    }
      
      ;
  }



  static purchaseCart = async(req,res)=>{
    try {
        const {cid: cid} = req.params;
        const cart = await CartsService.getCartById(cid);


        if(cart.products.length){
            const ticketProducts=[];
            const rejectedProducts=[];
            //verificar el stock de cada producto
            let amountTicket=0;
            for(let i=0;i<cart.products.length;i++){
                const cartProduct =cart.products[i];
              
             
               
                //por cada producto comparar quantity con el stock
                if(cartProduct.quantity < cartProduct.pid.stock){
                    ticketProducts.push(cartProduct);
                    amountTicket=amountTicket+(cartProduct.quantity)*(cartProduct.pid.price)
                    cartProduct.pid.stock= cartProduct.pid.stock-cartProduct.quantity

                    let updatedProduct= await ProductsService.updateProduct(cartProduct.pid._id.toString(),cartProduct.pid);

                  /*
                  
                          const cid=req.params.cid;
                const cart= await CartsService.getCartById(cid);

     
                  cart.products=[];
      
        const result= await CartsService.updateCart(cid, cart);
                  */


                } else {
                    rejectedProducts.push(cartProduct);
                }
            };
      ;

        
            const newTicket = {
                code:uuidv4(),
                purchase_datetime: new Date(),
                amount:amountTicket,
                purchaser:req.user.email
            };
            if(ticketProducts.length>0){
             let finalTicket= await TicketsService.createTicket(newTicket);
           
            }
            if(rejectedProducts.length>0){
            res.json({status:"success", message:"Some products were sold out", rejectedProducts});
            }
            else{
              res.json({status:"success", message:"Thank you for your purchase! All the products where available ",ticketProducts});
            }
          } 
        else {
            res.json({status:"error", message:"El carrito esta vacio"});
        }
    } catch (error) {
        res.json({error:error.message});
    }
};


}