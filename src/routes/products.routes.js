
import Router from "express";
import { uploader } from "../utils.js";
import {escape} from "querystring"
import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";
import {isAuth,checkRole} from "../middlewares/auth.js"


//import { productsModel } from "../dao/models/product.model.js";


import { ProductsController } from "../controller/products.controller.js";



const productsRouter = Router();


productsRouter.get("/"   ,passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["admin"]) ,ProductsController.getProducts)


productsRouter.get("/:pid",passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["admin"]), ProductsController.GetPid)


productsRouter.post("/",uploader.single("file"),passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["admin",'premium'])
,  ProductsController.postProduct);






productsRouter.delete("/:productId",passport.authenticate("jwtAuth",{session:false}),isAuth, checkRole(["admin","premium"]),ProductsController.DeleteProduct)


export default productsRouter;
