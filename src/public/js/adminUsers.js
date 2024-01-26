

const hostname= `${window.location.protocol}//${window.location.hostname}:${window.location.port}`

const deleteIdleUsers = async()=>{
    try {

        
         const url= `${hostname}/api/users`
  
         const result= await fetch(url, {
              method: "DELETE",
              headers: {
            "Content-Type": "application/json",
             },
         
  
         });
    const message = await result.json();
    alert(message.message);
    window.location.replace(`${hostname}/api/users`);
        
    } catch (error) {
        console.log(error)
        
    }

}


const updateUser = async(id)=>{

    try {
        let role=document.getElementById(`role_${id}`).value;

        if(role){

         const DataJsonString = JSON.stringify({id,role});
         const url= `${hostname}/api/users`
  
         const result= await fetch(url, {
              method: "PUT",
              headers: {
            "Content-Type": "application/json",
             },
             body: DataJsonString
  
         });
    const message = await result.json();
    alert(message.message);
    window.location.replace(`${hostname}/api/users`);

}
        
    } catch (error) {
        console.log(error)
        
    }









}