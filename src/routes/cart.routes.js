import Router from "express";



import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";
import {isAuth,checkRole} from "../middlewares/auth.js"
import { CartsController } from "../controller/carts.controller.js";

const cartsRouter = Router();

  cartsRouter.post("/",CartsController.post);

  cartsRouter.delete("/:cid",CartsController.deleteProducts);


  cartsRouter.put("/:cid/products/:pid",passport.authenticate("jwtAuth",{session:false}),CartsController.putCidPid
  );

  cartsRouter.put("/:cid",CartsController.putCid);


  cartsRouter.delete("/:cid/products/:pid",CartsController.delete);


  cartsRouter.get("/",CartsController.get);

  cartsRouter.get("/:cid",CartsController.getCid);




export default cartsRouter;

