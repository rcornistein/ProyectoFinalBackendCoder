import { productsDao } from "../dao/factory.js";


export class ProductsService{
    static createProduct(productInfo){
        return productsDao.createProduct(productInfo);
    };

    

    static getProducts(){
        return productsDao.getProducts();
    };

    static getProductById(id){
        return productsDao.getProductById(id);
    };

    static updateProduct(productId,productInfo){
        return productsDao.updateProduct(productId,productInfo);
    };

    static deleteProduct(productId){
        return productsDao.deleteProduct(productId);
    };

    static paginateProducts(limit,page,order,filters){
        return productsDao.paginateProducts(limit,page,order,filters);
    };

    static getCategories(){
        return productsDao.getCategories();
    };

    
}