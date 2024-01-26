


const hostname= `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
const getTotal = ()=>{

    let price=document.getElementsByClassName('price');

    let quantity=document.getElementsByClassName('quantity'); 
    let totalCart=[];
    let totalItems=[];

   
    for(let i=0;i<quantity.length;i++){
 

        for(let j=0;j<price.length;j++){
            
        if(price[j].id.split('_')[1]===quantity[i].id.split('_')[1]){
            totalCart.push(parseFloat(price[j].textContent.replace('$','')))
            totalItems.push(parseInt(quantity[i].textContent));
        
        }
       
       }
        
       
    }
 let result ={total: totalCart, items: totalItems}

 const totalsum=result.total.reduce((elem,acum)=>{
    return acum+elem
},0);

const totalquant=result.items.reduce((elem,acum)=>{
    return acum+elem
},0);



let items=document.getElementById('items');
let total=document.getElementById('total');

items.textContent= `Items: ${totalquant}` ;
total.textContent=`Total: $${totalsum}`;


}


getTotal();

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

const purchase = document.getElementById('purcharse');


purchase.addEventListener('click',()=>{

    let cid=getCookie('cartId');

    let link=`${hostname}/${cid}/purchase`

    window.location=link;

})








/*
let result=getTotal();
const totalsum=result.total.reduce((elem,acum)=>{
    return acum+elem
},0);

const totalquant=result.items.reduce((elem,acum)=>{
    return acum+elem
},0);



let items=document.getElementById('items');
let total=document.getElementById('total');

items.textContent= `Items: ${totalquant}` ;
total.textContent=`Total: $${totalsum}`;

*/


