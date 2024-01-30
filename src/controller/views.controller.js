import {escape} from "querystring"


import { chatModel } from "../dao/models/chat.model.js";
import { ProductsService } from "../service/products.service.js";

import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";
import { CartsService } from "../service/carts.service.js";
import { logger } from "../helpers/logger.js";
import {UsersService} from  "../service/users.service.js";

import mongoose from "mongoose";

export class ViewsController {

    static GetRealTimeProducts = async (req,res)=>{

    
        try {
            
            const currentProducts = await ProductsService.getProducts();
           
            const data={
                products: currentProducts,
                style: "home.css"
            }
            res.render("realTimeProducts",data);
            
        } catch (error) {
            logger.error(error.message);
            
        }
            
    
    }


static getChat= async (req,res)=>{

    
    try {
        const data={
            style: "chat.css"
        }
        res.render("chat",data);
        
        
    } catch (error) {
        logger.error(error.message);
        
    }
        

}


static CreateProduct = async (req,res)=>{  
    try {
   

        const data={          
            style: "update.css"
        }     
        res.render("createProduct",data);
        
    } catch (error) {
        logger.error(error.message);
        
    }
}

static postCreateProduct = async (req,res)=>{  
    try {
   
        const user=req.user;
     
        let product=req.body


        let productToCreate={
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code.toString(),
            stock: product.stock,
            status: true,
            category: product.category,
            owner: new mongoose.Types.ObjectId(user.id)

        }


        let result = await ProductsService.createProduct(productToCreate)
        

        res.json({result: 'Product created'})
    } catch (error) {
        logger.error(error.message);
        
    }
}






  static UpdateProduct = async (req,res)=>{

    
    try {
        const id=req.params.productId;
        const currentProduct = await ProductsService.getProductById(id);
       
 
       
        const data={
            product: currentProduct,
            style: "update.css"
        }
     
        
        res.render("updateProduct",data);
        
    } catch (error) {
        res.status(error.status || 500).send({
            error: {
              status: error.status || 500,
              message: error.message || "Server error",
            },
          });
        
    }
}


static putUpdateProduct = async (req,res)=>{  
    try {
        
        const user=req.user;

        let product=req.body  ;
      
        let productToupdate={
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code.toString(),
            stock: product.stock,
            status: true,
            category: product.category,
            owner: new mongoose.Types.ObjectId(user.id)

        }

        let result = await ProductsService.updateProduct(product.productId,productToupdate);
        
        res.json({message: 'Product updated'})
    } catch (error) {
        logger.error(error.message);
        
    }
}


static getProducts = async (req,res)=>{
        try {
    
    
            
           
            const user=req.user.first_name;
            const cartUser= req.user.cart;
            const rol=req.user.role;
            const user_id=req.user.id;
         
            let limit = parseInt(req.query.limit);
            if(!limit){  limit=10};
            let page= parseInt(req.query.page);
            if(!page){page=1};
    
            if( !Number.isInteger(page)){
                res.render('ErrorProducts',{message: 'Page parameter is not integer'});
    
            }    
    
           
            let order = req.query.order;
            if(!order){order="none"}
            let category= escape(req.query.category).split('%20').join(' ');
            let filters={}
            if(category !='All categories' &&category !='undefined' && category){
                filters={category: category}
            }
            if(category==='undefined'){
                category='All categories'
            }
       
            let stock=req.query.stock;
    
            if(stock==='1'){
                filters={stock: {$gt: 0}, ...filters}
            }
            if(stock==='0'){
                filters={stock: 0,... filters}
            }
        
            const currentProducts =  await ProductsService.paginateProducts(limit,page,order,filters);
          
            if(parseInt(req.query.page)> currentProducts.totalPages   || parseInt(req.query.page) <1){
                res.render('ErrorProducts',{message: 'Page parameter is out of range'});
            }    
    
            let result = {status: true, totalPages: currentProducts.totalPages
                , prevPage: currentProducts.hasPrevPage? page-1:null
                , nextPage: currentProducts.hasNextPage?page+1:null
                ,page
                ,hasPrevPage: currentProducts.hasPrevPage
                ,hasNextPage: currentProducts.hasNextPage
                ,prevLink: currentProducts.hasPrevPage? `/products?limit=${limit}&page=${page-1}&order=${order}&category=${category.split(' ').join('%20')}&stock=${stock}`: null
                ,nextLink: currentProducts.hasNextPage? `/products?limit=${limit}&page=${page+1}&order=${order}&category=${category.split(' ').join('%20')}&stock=${stock}`: null
              };
             
    
             let categories= await ProductsService.getCategories();
             currentProducts.payload.forEach(element => {
                element.available= element.stock>0?'Available':'Not available';
                element.cart=   cartUser
                element.canBuy= element.owner._id.toString()!=user_id
            
             });
          
             
            const data={
                    products: currentProducts.payload,
                    user:user,
                   
                    rol:rol,
                    IsAdmin: rol==='admin',
                    IsUser: rol==='user',
                    IsPremium: rol==='premium',
                    IsPremiumOrUser: rol!='admin',
                
                    categories: categories,
                    style: "update.css",
                    page: page,
                    totalPages: result.totalPages,
                    hasPrevPage: result.hasPrevPage,
                    hasNextPage: result.hasNextPage,
                    prevLink: result.prevLink,
                    nextLink: result.nextLink
                   
                };
                
        
                res.render("products",data);
          
        } catch (error) {
    
            //console.log(error.message);
            logger.error(error.message);
            
        }       
    
    }

 static GetCartsCid = async (req,res)=>{
    try {

        let cid = req.params.cid;
        const result = await CartsService.getCartById(cid);

        result.products.forEach(prod=> {
            prod.pid.price=prod.pid.price*prod.quantity
        }
            )

  
        
        let data={
            products:result.products,
            style: 'carts.css'
        }

        res.render("carts",data);
      
    } catch (error) {

       // console.log(error.message);
       logger.error(error.message);
        
    }       

}
  static getAdminProducts =async (req,res)=>{

    
    try {
        
        const currentProducts = await ProductsService.getProducts();  

       

        for (let element of currentProducts){

           
            try {
                element.canEdit= element.owner._id.toString()===req.user.id ||req.user.role==='admin'
                let email=''
                let productOnw=await UsersService.getUserById(element.owner._id.toString());
                if(productOnw)
                {email=productOnw.email;
                }
                else{
                    email= 'admin@coder.com'
                }       
                element.ownerEmail= email;
                
            } catch (error) {

                console.log(error);
                
            }
        }
        
       

      
         
        const data={
            products: currentProducts,
            style: "home.css"
        }
       
        res.render("adminProducts",data);
        
    } catch (error) {
        res.status(error.status || 200).send({
            error: {
              status: error.status || 200,
              message: error.message || "Server error",
            },
          });
        
    }
    

}

static GetAdminUsers= async(req,res)=>{

  let currentUsers= await UsersService.getUsers();
  let currentUserId=req.user.id;

  currentUsers.forEach(element => {    
    element.name= `${element.first_name} ${element.last_name}`
    if(element.last_connection){
        element.last_connectionLocal=element.last_connection.toLocaleString("es-MX", {timeZone: "America/Argentina/Buenos_Aires"}) 
    }
        element.show= element._id.toString() !=currentUserId
    
    
    });
        /*
        let finalUsers= currentUsers.filter(elem=>{
            return elem.role !='admin'
            })
        */
    const data={
        users: currentUsers,
        style: "update.css"
    }

    res.render("adminUsers",data);
 

}

}