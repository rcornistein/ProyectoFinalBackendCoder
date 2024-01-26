import mongoose from "mongoose";

const userCollection='chats';


const userSchema=new mongoose.Schema({

    user: {

        type: String,
        required: true
    },
    message:{
        type: String,
        require: true
    },
    
    timestamp: {
        type: Date,
        default: Date.now
    }
    


});


export const chatModel =mongoose.model(userCollection,userSchema);