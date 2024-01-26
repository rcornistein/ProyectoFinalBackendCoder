import dotenv from "dotenv";
dotenv.config();


export const config = {
    server:{
        secretSession: process.env.SECRET_SESSION
    },
    mongo:{
        url: process.env.MONGO_URL
    },
    github:{
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    token:{
        privateKey: process.env.PRIVATE_KEY
    },
    admin:{
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
    },
    persistence: process.env.persistence,
    currentEnv:process.env.NODE_ENVIRONMENT,
    gmail:{
        account: process.env.MAILACCOUNT,
        appgoogle: process.env.appgoogle,
        passgoogle: process.env.passgoogle
    },
  

    
};