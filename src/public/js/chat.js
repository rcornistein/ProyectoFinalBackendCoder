console.log("javascript en el frontend");
//socket del cliente
const socketClient = io();

const userName = document.getElementById("userName");
const inputMsg = document.getElementById("content");
const sendMsg = document.getElementById("sendMessage");
const chatPanel = document.getElementById("messages_container");
 




let user;//variable de identidad del usuario
Swal.fire({
    title: 'chat',
    text: 'Please, enter a username',
    input: 'text',
    inputValidator: (value)=>{
        return !value && 'You must enter a username to log in'
    },
    allowOutsideClick:false,
    allowEscapeKey:false
}).then((inputValue)=>{
    console.log(inputValue);
    user = inputValue.value;
    userName.innerHTML = user;
    socketClient.emit("authenticated", user);
});

//cliente recibe el historial de mensajes
socketClient.on("messages", (historyData)=>{
  console.log(historyData);

  historyData.forEach(element => {

    let msgElements="";
    msgElements=printMessage(element.user,element.timestamp, element.message);

    let div= document.createElement("div");
  
    div.innerHTML=msgElements;
   chatPanel.appendChild(div );
      
  });
  


});

sendMsg.addEventListener("click",()=>{
   // console.log('entro');
    //scrollDown();
    let now =  new Date().toLocaleString().replace(",","").replace(/:.. /," ");
   
    const msg = { user:user, message:inputMsg.value,timestamp: now};
    socketClient.emit("msgChat", msg);
    inputMsg.value="";
});

socketClient.on("chatHistory", (dataServer)=>{
    
    let msgElements="";
    
       // msgElements += `<p>Usuario: ${dataServer.user} >>>> ${dataServer.message}</p>`
       msgElements=printMessage(dataServer.user,dataServer.timestamp, dataServer.message);
    
       let div= document.createElement("div");

       div.innerHTML=msgElements;
      
        chatPanel.appendChild(div );





});

socketClient.on("newUser", (data)=>{
    if(user){ //si el usuario ya se autentico
        Swal.fire({
            text:data,
            toast:true,
            position:"top-right"
        });
    }
});



function scrollDown() {
    $('#messages_container').animate({scrollTop:$('#messages_container').prop('scrollHeight')}, 1000);
  }


  const printMessage=(user,time,message)=>{
    let result = 
  `
            <div class="chat-log_item chat-log_item-own z-depth-0">
            <div class="row justify-content-end mx-1 d-flex">
              <div class="col-auto px-0">
                <span class="chat-log_author" style="color:blue; font-weight: bold; ">
                  ${user}
                </span>
              </div>
              <div class="col-auto px-0">
              </div>
            </div>
            <hr class="my-1 py-0 col-8" style="opacity: 0.5">
            <div class="chat-log_message">
              <p>${message}</p>
            </div>
            <hr class="my-1 py-0 col-8" style="opacity: 0.5">
            <div class="row chat-log_time m-0 p-0 justify-content-end" >
            <span style="font-style: italic; "> ${time} </span>
            </div>
          </div>  

  `;
  //console.log(result);
  return (result);
  }



