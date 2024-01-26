import mongoose  from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { userModel } from "./user.model.js";



const userCollection='products';

const userSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 100
    },
    description: {
        type: String,
        required: true,
        max: 500
    },
    
    price: {
        type: Number,
        required: true
    },
    thumbnail:{
        type: Array

    },
    
    code: {
        type: String,
        required: true,
        unique: true
    },
    
    stock: {
        type: Number,
        required: true    
    },
    status: {
        type: Boolean,
        default:true    
    },

    category: {
        type: String,
        required: true
          
    },
    owner:{
        type:  mongoose.Schema.Types.ObjectId,
         ref: "User",
        default: "657c62b6e298e465d8cf73e0",
        required: true

    }
})

userSchema.plugin(mongoosePaginate);

export const productsModel =mongoose.model(userCollection,userSchema);