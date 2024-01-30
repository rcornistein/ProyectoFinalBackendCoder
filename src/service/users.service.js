import { usersDao,cartsDao } from "../dao/factory.js";
import { CurrentUserDTO } from "../dao/DTOs/users.dto.js";

export class UsersService{
    static createUser(object){
        return usersDao.createUser(object);
    };

    static getUserByMail(object){
      
        return usersDao.getUserByMail(object);
    };



    static getUserById(userId){
       
      
        return usersDao.getUserById(userId);
    };

    static getUsers(){
      
        return usersDao.getUsers();
    };


    static sendCurrentUser(req){
       
        return new CurrentUserDTO(req.user)}


    static async updateUser(id,user){

            const newUser=await usersDao.updateUser(id,user);
          
            return newUser
            
            
            }

    static async updateCidToUser(id){

        const cartId=  await cartsDao.createCart();
       
        const user=usersDao.updateUser(id,{cart: cartId._id.toString()});
        return user
        
        
        }

        static async deleteUser(id){
            const result= await usersDao.deleteUser(id);
            return result

        }    
    
    static async updatePasswordToUser(id,password){

          
         
            const user=usersDao.updateUser(id,{password: password});
            return user
            
            
            }
     static async updateLastLogin(id){

          //new Date().toLocaleString("es-MX", {timeZone: "America/Argentina/Buenos_Aires"}) 

     
                let today= new Date();
            
                const user=usersDao.updateUser(id,{last_connection: today});
                return user
                
                
                }
    
    static async updateRoleToUser(id,role){

          
         
                const user=usersDao.updateUser(id,{role: role});
                return user
                
                
                }

}

