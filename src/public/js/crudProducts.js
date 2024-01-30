
 
 const hostname= `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
 
 const deleteProduct = async (id) => {
  try {

    const result= await fetch(`api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        }
       
    });


    let message=await result.json();

    
    window.alert( message.result);
   location.reload();

    
  } catch (err) {
    console.log(err);
  }
};


const updateProduct = (id)=>{
  window.location = `updateProduct/${id}`;
}



const updateForm = document.getElementById("updateForm");

if(updateForm){
updateForm.addEventListener('submit',async(event)=>{

  try {
  
    const url = `/updateProduct`;
    
  
        let formdata = new FormData();
        const updateForm = document.getElementById("updateForm");
        const formData = new FormData(updateForm);
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);
  
        const result= await fetch(url, {
          method: "PUT",
          headers: {
          "Content-Type": "application/json",
          },
          body: formDataJsonString
     
      });
    
          const message = await result.json();
          alert(message.message);
  
        window.location.replace("/products");
  
  
  } catch (err) {
    alert(err)
    console.log(err);
    
  }


})
}

const submitUpdate = async (id) =>{

try {
  
  const url = `/updateProduct`;
  

      let formdata = new FormData();
      const updateForm = document.getElementById("updateForm");
      const formData = new FormData(updateForm);
      const plainFormData = Object.fromEntries(formData.entries());
      const formDataJsonString = JSON.stringify(plainFormData);

      const result= await fetch(url, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: formDataJsonString
   
    });
  
        const message = await result.json();
        alert(message.message);

      window.location.replace("/products");


} catch (err) {
  alert(err)
  console.log(err);
  
}

}

const postForm = document.getElementById("postForm");  

if (postForm ){
postForm.addEventListener('submit',async(event)=>{

  event.preventDefault();
  const url = `/createProduct`;



  const formData = new FormData(postForm);
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);
  
  const result= await fetch(url, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: formDataJsonString

});


  const message = await result.json();
  alert(message.result);
  window.location.replace("/products");

})

}


