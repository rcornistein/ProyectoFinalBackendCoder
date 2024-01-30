

/* Seteo de variables */


let limit = document.getElementById('limit');

let nextLink=document.getElementById('pag_sig').textContent;
let prevLink=document.getElementById('pag_ant').textContent;
let total=( document.getElementById('pag_TotalPages').textContent);
let page=(document.getElementById('pag_Page').textContent);


let url_string =document. documentURI;
let url = new URL(url_string);







let order = document.getElementById('order');
let selOrder='none'

let orderUrl=url.searchParams.get("order");

if (orderUrl){order.value=orderUrl};




let page_ant_state='';
let page_prox_state='';

if(prevLink.length>1){ page_ant_state= ''} else{ page_ant_state='disabled'};
if(nextLink.length>1){ page_prox_state= ''} else{ page_prox_state='disabled'};


/* paginator */

let paginator_ul = document.getElementById('paginator_ul');
const makePaginator = async ()=>{

     paginator_ul.innerHTML= `
    
     <li class="page-item ${page_ant_state}">
      <a class="page-link"  tabindex="-1" aria-disabled="true" href=${prevLink} >Previous</a>
     </li>
   
     <li class="page-item active" aria-current="page">
     <a class="page-link" >${page}</a>
     </li>
     
     <li class="page-item ${page_prox_state}"">
      <a class="page-link" href=${nextLink} >Next</a>
     </li>`;

     

}

const hostname= `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
makePaginator();


let search= document.getElementById('search');
let category = document.getElementById('category');
let valueCategory='All categories'

category.addEventListener('change',()=>{
     valueCategory = category.value;
    
});




let categoryUrl = url.searchParams.get("category");

if(categoryUrl){
category.value=categoryUrl;
}




let stock = document.getElementById('stock');

let logout=document.getElementById('logout');

logout.addEventListener('click',()=>{
    
     window.location.href=`${hostname}/api/users/logout`;
}
)

let adminProducts=document.getElementById('adminProducts');
if (adminProducts !== null) {
adminProducts.addEventListener('click',()=>{
     window.location.href=`${hostname}/adminProducts`;
}
)
}


let adminUsers=document.getElementById('adminUsers');
if (adminUsers !== null) {
     adminUsers.addEventListener('click',()=>{
     window.location.href= `${hostname}/api/users` //'http://localhost:8080/api/users';
}
)
}


let createProducts=document.getElementById('createProducts');
if (createProducts !== null) {
     createProducts.addEventListener('click',()=>{
     window.location.href=`${hostname}/createProduct`;
}
)
}



let chat=document.getElementById('chat');

if (chat !== null) {

chat.addEventListener('click',()=>{
     window.location.href=`${hostname}/chat`;
}
)
}






let selStock='Available'
stock.addEventListener('change',()=>{
     selStock = stock.value;
    
});

let getLimit = url.searchParams.get("limit");

if(getLimit){
     limit.value=getLimit;
     }


search.addEventListener('click',()=>{
     limit = document.getElementById('limit');
     order= document.getElementById('order');
     category=document.getElementById('category')
     selStock=stock.value;
     let link=`${hostname}/products?limit=${limit.value}&page=1&order=${order.value}&category=${category.value}&stock=${stock.value}`

     window.location=link;


})

const  setCookie = (cName, cValue, expDays)=> {
     let date = new Date();
     date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
     const expires = "expires=" + date.toUTCString();
     document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

const getCookie = (cName) => {
     const name = cName + "=";

     const cDecoded = decodeURIComponent(document.cookie); //to be careful
    
    const cArr = cDecoded .split('; ');
     let res;
     cArr.forEach(val => {
         if (val.indexOf(name) === 0) res = val.substring(name.length);
     })
     return res;
}




let badge=document.getElementById('badge');
if(badge){

badge.style.display ='none'
}
//badge.innerHTML

if (getCookie('products')!= undefined){

     badge.style.display ='inline'
     badge.innerHTML=getCookie('products');
  
}

let viewCart=document.getElementById('viewCart');


viewCart.addEventListener('click',()=>{

     let cid=getCookie('cartId');

     let link=`${hostname}/carts/${cid}`

     window.location=link;


})



const addproductToCart= async(pid) =>{
try {

     let cid=getCookie('cartId');
     


     const url = `${hostname}/api/carts/${cid}/products/${pid}`;
    
     const requestOptions = {
          method: 'PUT',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
              "quantity": 1          })
      };
    
      const result = await fetch(url, requestOptions)
      const final = await result.json();

      if (final.products){
        const products=final.products;  
        let totalProducts=0;



        for (const prod of  products) {
          totalProducts = totalProducts+prod.quantity;
         
        }

          
        let badge=document.getElementById('badge');
          badge.style.display = "inline";
         badge.innerHTML =totalProducts.toString();


         setCookie ('products', totalProducts.toString(), 1);
  

        alert('Producct added!');

     }

     else{
          alert('Cannot add product to chat due to ownership constraints');
     }
} catch (error) {

     console.log(error);
     
}

}

const deleteProductToCart= async(pid) =>{
     try {
     
          let cid=getCookie('cartId');
          
     
     
          const url = `${hostname}/api/carts/${cid}/products/${pid}`;
         
          const requestOptions = {
               method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                   "quantity": 1          })
           };
         
           const result = await fetch(url, requestOptions)
           const final = await result.json();
 
          if (!final.message){

              
          
             const products=final.cart.products;  
             let totalProducts=0;
     
     
        
               
               for (const prod of  products) {
                         totalProducts = totalProducts+prod.quantity;
              
                         }
               
               
             let badge=document.getElementById('badge');
               badge.style.display = "inline";
              badge.innerHTML =totalProducts.toString();
     
     
              setCookie ('products', totalProducts.toString(), 1);
        
             alert('Product removed!');
          
        
     
          }
          else
          {
               alert(final.message);
          }
     } catch (error) {
     
          console.log(error);
          
     }
     
     }