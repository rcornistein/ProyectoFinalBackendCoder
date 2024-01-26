




const validation = async(event)=>{

    let loginPass= document.getElementById('InputPassword');
    let reLoginPass=document.getElementById('ReInputPassword');
    let submitBotton= document.getElementById('submitUser');
    let mail=document.getElementById('InputEmail');

    let flgSubmit=1;
    if(loginPass.value !=reLoginPass.value ){
        
         alert('Passwords values do not match');
        flgSubmit=0;
        event.preventDefault();
    }

    if(loginPass.value===''){
       
          alert('Complete password value');
        flgSubmit=0;
        event.preventDefault();
    }

    if(mail.value===''){
        
         alert('Complete email value');
        flgSubmit=0;
        event.preventDefault();
        
    }


    if( flgSubmit===1){
    
     // alert('User created succesfully')
        return true;
  
    }
   

}