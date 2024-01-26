import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "./config/config.js";


export const __dirname = path.dirname(fileURLToPath(import.meta.url));
// console.log("dirname: ", __dirname);


 const storage = multer.diskStorage({
    //destination:carpeta donde se guardan los archivos
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"/public/images"))
    },

    // filename:con que nombre vamos a guardar el archivo
    filename:function(req,file,cb){
        
        cb(null,`${req.body.code}-${file.originalname}`)
    }
});
    

export const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};

export const inValidPassword = (password,user)=>{
  
    return bcrypt.compareSync(password,user.password);
};


export const uploader = multer({storage});


export const generateToken = (user)=>{
  
    const token = jwt.sign(
        {   first_name:user.first_name,
            last_name:user.last_name,
            age: user.age,
            email:user.email,
            cart: user.cart||"0",
            role: user.role,
            id:user._id.toString()
        }
        ,config.token.privateKey,{expiresIn:"24h"});
  
    return token;
};


export const generateTokenMail = (user)=>{
    const token = jwt.sign(
        {  user: user
        }
        ,config.token.privateKey,{expiresIn:"1h"});
    return token;
};

export const validateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);
    if(!authHeader) return res.sendStatus(401);

    //se hace el split ya que el token viene en el header de la siguiente manera: "Bearer <token>", y solo nos interesa el token
    const token = authHeader.split(" ")[1];
    // console.log(token);

    if(token === null) return res.sendStatus(401);

    //jwt.verify toma como argumentos:
    //1. El token recibido
    //2. La clave privada, que es la que usamos antes para firmar el token.
    //3. Un callback que se ejecutará cuando el token sea verificado.
    //De esta manera verificamos que el token sea válido y que no haya sido modificado externamente, y lo agregamos al objeto request para que pueda ser usado en las rutas.
    jwt.verify(token,config.token.privateKey,(err,payload)=>{
        if(err) return res.sendStatus(403);
        req.user = payload;
        next();
    });
};

/* documentos de usuario multer */

const documentsStorage = multer.diskStorage({
    //donde vamos a guardar las imagenes
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,"/multer/documents") )
    },

    //con que nombre vamos a guardar la imagen
    filename: function(req,file,cb){
        cb(null,`${req.params.uid}-document-${file.fieldname}`)
    }
});

//creamos el uploader de las imagenes de perfil

const uploadDocuments = multer({storage:documentsStorage});


const profilesStorage = multer.diskStorage({
    //donde vamos a guardar las imagenes
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,"/multer/profiles") )
    },

    //con que nombre vamos a guardar la imagen
    filename: function(req,file,cb){
        cb(null,`${req.params.uid}-document-${file.fieldname}`)
    }
});

const uploadProfiles = multer({storage:profilesStorage});



const productsStorage = multer.diskStorage({
    //donde vamos a guardar las imagenes
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,"/multer/profiles") )
    },

    //con que nombre vamos a guardar la imagen
    filename: function(req,file,cb){
        cb(null,`${req.params.uid}-document-${file.fieldname}`)
    }
});

const uploadProducts = multer({storage:productsStorage});


//creamos el uploader de las imagenes de perfil


export {  uploadDocuments,uploadProfiles ,uploadProducts }