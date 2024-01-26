import { ProductManagerMongo } from "./mongo/productManagerMongo.js";
import { CartManagerMongo } from "./mongo/cartManagerMongo.js";
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";
import { userManagerMongo} from "./mongo/userManagerMongo.js"
import {TicketManagerMongo} from './mongo/ticketsManagerMongo.js'



import {CartManagerFS} from "./files/CartManagerFS.js"
import {ProductManagerFS} from "./files/ProductManagerFS.js"

import {config} from "../config/config.js";

import { __dirname } from "../utils.js";
import path from "path";




const persistence = config.persistence;
let productsDao;
let cartsDao;
let chatService;
let usersDao;
let ticketsService;

switch(persistence){
    case "mongo":{

          productsDao = new ProductManagerMongo();
          chatService= new ChatManagerMongo();
          cartsDao = new CartManagerMongo();
          usersDao = new userManagerMongo();  
          ticketsService= new TicketManagerMongo();

         break;

    }
    case "memory": {

         productsDao = new ProductManagerFS(path.join(__dirname,"/dao/memory/carts.json"));
         chatService= new ChatManagerMongo();   
         cartsDao = new CartManagerFS(path.join(__dirname,"/dao/memory/products.json"));
         ticketsService= new TicketManagerMongo();
         
         usersDao = new userManagerMongo();  
        break;   

    }
}


export {productsDao,chatService,cartsDao,usersDao,ticketsService}