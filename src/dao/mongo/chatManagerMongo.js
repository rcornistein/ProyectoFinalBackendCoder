import { chatModel } from "../models/chat.model.js";

export class ChatManagerMongo{
    
    constructor(){
        this.model=chatModel;
    }



    async getChats(){
        try {
            const resultado= await this.model.find().lean();
            return resultado;
             
         } catch (error) {
             
             throw  new Error(`Could not get chats ${error.message}`);
         }
        }
    async createChat(user,message,timestamp){
        try {
            const resultado= await this.model.create({"user": user,"message": message, "timestamp": timestamp});
            return resultado;
             
         } catch (error) {
             console.log("Create Chat",error.message);
             throw  new Error(`Could not create chatt ${error.message}`);
         }


    }


}