export const productCreatorError = (product)=>{
    return `All fields are mandatory,  title: recieved ${product.title},  code: recieved ${product.code}, stock: recieved ${product.stock},        category: recieved${product.category}`
};