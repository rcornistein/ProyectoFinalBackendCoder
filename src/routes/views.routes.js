

import { Router } from "express";
import {escape} from "querystring"

//import { productsModel } from "../dao/models/product.model.js";
import { chatModel } from "../dao/models/chat.model.js";

import { ProductsService } from "../service/products.service.js";
import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";
import { ViewsController } from "../controller/views.controller.js";
import {isAuth,checkRole} from "../middlewares/auth.js"
import { CartsController } from "../controller/carts.controller.js";
import { logger } from "../helpers/logger.js";
import { now } from "mongoose";

const viewsRouter = Router();


viewsRouter.get("/realTimeProducts", ViewsController.GetRealTimeProducts);

viewsRouter.get("/chat", passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["user"]),ViewsController.getChat);

viewsRouter.get("/updateProduct/:productId", ViewsController.UpdateProduct);      
viewsRouter.get("/createProduct", ViewsController.CreateProduct);   

viewsRouter.post("/createProduct",passport.authenticate("jwtAuth",{session:false}), checkRole(["admin","premium"]),
ViewsController.postCreateProduct) ;

viewsRouter.get("/products", passport.authenticate("jwtAuth",{session:false}),ViewsController.getProducts);


viewsRouter.get("/carts/:cid",  ViewsController.GetCartsCid);


viewsRouter.get("/api/users",passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["admin"]) ,ViewsController.GetAdminUsers);

viewsRouter.get("/:cid/purchase", passport.authenticate("jwtAuth",{session:false}),CartsController.purchaseCart);


viewsRouter.get("/adminProducts", passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["admin","premium"]),
ViewsController.getAdminProducts
);


viewsRouter.get("/loggerTest",(req,res)=>{
    logger.debug(`Este es un mensaje de debug ${now()}`);
    logger.http(`Este es un mensaje de http ${now()}`);
    logger.warn(`Este es un mensaje de warn ${now()}`);
    logger.error(`Este es un mensaje de error ${now()}`);
    res.send("peticion recibida");
});


viewsRouter.put("/updateProduct",passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["admin","premium"]), ViewsController.putUpdateProduct);


export default viewsRouter;


