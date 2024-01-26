import { chatService } from "../dao/factory.js";


export class ChatService{

    static getChats(){
        return chatService.getChats();
    };

        static createChat(user,message,timestamp){
        return chatService.createChat(user,message,timestamp);
    };

    

    
}