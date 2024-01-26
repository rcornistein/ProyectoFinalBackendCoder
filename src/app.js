

import express, { request, response } from "express";
import { engine } from 'express-handlebars';

import { __dirname } from "./utils.js";
 
import viewsRouter  from "./routes/views.routes.js";
import  productsRouter from './routes/products.routes.js';
import  cartsRouter from './routes/cart.routes.js';
import  userRouter from './routes/user.routes.js';
import mockingRouter from "./routes/mocking.routes.js";

import {Server} from "socket.io";

import path from "path";

import mongoose from "mongoose";
import { mongoConnect } from "./config/db.js";


import fs from "fs";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from  "cookie-parser";
import passport from "passport";
import { ChatService } from "./service/chat.service.js";
 import {isAuth,checkRole} from "./middlewares/auth.js"
 import { errorHandler } from "./middlewares/errorHandler.js";
 import { logger } from "./helpers/logger.js";

import { ProductMocker } from "./Mocking/randomProduct.js";
import { ProductsService } from "./service/products.service.js";

import { swaggerSpecs } from './config/swagger.config.js';
import swaggerUI from "swagger-ui-express";


//servidor express
const port=process.env.PORT|| 8080;
const app=express();







// se activa el servidor
//console.log(process.env.PORT)
const httpServer= app.listen(port,()=> logger.info(`Server listening on port ${port}`));



//conexion con mongoose

mongoConnect();

app.use(express.json()); //datos en json
app.use(express.urlencoded({extended:true})); //data formularios en json



//servidor de websocket para el backend
const socketServer = new Server(httpServer);



//configuracion del motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views")); //=> /src/views

//dominio publico
app.use(express.static(path.join(__dirname,"/public")));

app.use(cookieParser());

app.use(passport.initialize());

app.use((req, res, next) => {
  req.socketServer = socketServer;
  return next();
});




socketServer.on("connection",async (socket)=>{

    try {

        console.log("cliente conectado", socket.id);
        let history = await ChatService.getChats(); 
        socket.emit("messages", history);


    //recibimos el mensaje de cada usuario
      socket.on("msgChat", async (data)=>{
        //chat.push(data);
       //console.log(data)
        let result = await ChatService.createChat(data.user,data.message,new Date()); 
        //ChatManagerMongo.createChat(data.user,data.message);
        socket.broadcast.emit("chatHistory", data);
        socket.emit("chatHistory", data);
        //enviamos el historial del chat a todos los usuarios conectados
        
      });

    //recibimos mensaje de conection de nuevo cliente
    socket.on("authenticated", (data)=>{
        socket.broadcast.emit("newUser",`El usuario ${data} se acaba de conectar`);
     })
              
    } catch (error) {
        
    }
    
});




//Routers
app.use('/api/products',productsRouter);
app.use('/mockingProducts',mockingRouter);
app.use('/api/carts',cartsRouter);
app.use(viewsRouter);
app.use('/api/users',userRouter);
app.get('/', function(req, res){
  res.redirect('api/users/login');
});

app.use(errorHandler);
app.use("/api/docs", swaggerUI.serve , swaggerUI.setup(swaggerSpecs));
export {app};
