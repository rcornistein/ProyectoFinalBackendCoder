import mongoose from "mongoose";
import { productsModel } from "../models/product.model.js";


export class ProductManagerMongo{

    constructor(){
        this.model= productsModel;
    };

    async createProduct(productInfo){

        try {
           const resultado= await this.model.create(productInfo);
           return resultado;
            
        } catch (error) {
            console.log("Create Product",error.message);
            throw  new Error(`Could not create product, ${error.message}`);
        }


    }

    async getProducts(){
        try {
            const resultado = await this.model.find().lean();
            return resultado;
            
        } catch (error) {


            console.log("Get Products   ",error.message);
            throw  new Error(`Could not get products ${error.message}`);
            
        }


    }

    async getProductById(productId){
        try {
            const resultado = await this.model.findById(productId).lean();
           
            return resultado;
            
        } catch (error) {


            console.log("GetProductById   ",error.message);
            throw  new Error(`Could not get product ${error.message}`);
            
        }


    }

    async updateProduct(productId,productInfo){
        try {
            const result= await this.model.findByIdAndUpdate(productId,productInfo);
            if(!result){
                throw new Error('Could not find product');
            }
            return result;
            
        } catch (error) {
            console.log("UpdateProduct   ",error.message);
            throw  new Error(`Could not update product ${error.message}`);
            
        }


    }

    async deleteProduct(productId){
        try {

            const result= await this.model.findByIdAndDelete(productId);
            if(!result){
                throw new Error('Could not find product');
            }
            return result;
            
        } catch (error) {
            console.log("deleteProduct   ",error.message);
            throw  new Error(`Could not delete product ${error.message}`);
            
        }


    }

    async paginateProducts(limit,page,order,filters){
        try {


            let orderNum=0;
           if(order==='asc'){orderNum=1}
           else{orderNum=-1};

           let options={};

           const myCustomLabels = {
               
            docs: 'payload',
            totalDocs: 'totalPages'
           
          };
            if (order ==='none'){
                options={limit,page,lean:true,customLabels: myCustomLabels}
            }
            else{options={limit,page,lean:true, customLabels: myCustomLabels,sort:{price: orderNum}}}
           
          
             let products = await this.model.paginate(      
                filters,
                options
                 );
                 
            return products;
            
        } catch (error) {
            console.log("paginateproduct   ",error.message);
            throw  new Error(`Could not get paginate ${error.message}`);
            
        }


    }



    async getCategories(){
        try {
            const categories= await this.model.distinct('category').lean();
          
            let result= [];
            
            categories.forEach(element => {
                result.push({category: element})
             
            });
           
             
            
           
            return result;
        } catch (error) {

            console.log("paginateproduct   ",error.message);
            throw  new Error(`Could not get categories ${error.message}`);
            
        }

    }

}