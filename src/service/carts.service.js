import { cartsDao } from "../dao/factory.js";



export class CartsService{
    static createCart(){
        return cartsDao.createCart();
    };

    static getCart(){
        return cartsDao.getCart();
    };

    static getCartById(id){
        return cartsDao.getCartById(id);
    };

    static updateCart(cartId,updateProperties){
        
        return cartsDao.updateCart(cartId,updateProperties);
    };
    
    
    static  addProductToCart(cartId,productId,quantity=1){
        
        
        return cartsDao.addProductToCart(cartId,productId,quantity=1);
    };


    static  deleteProductToCart(cartId,productId){
        
        
        return cartsDao.deleteProductToCart(cartId,productId);
    };
    
    
}