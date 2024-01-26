


const socketClient = io();
console.log('Mensaje desde el cliente');

const table_products= document.getElementById('tabla');

const renderTable = (data)=>{

    let table = document.createElement("table");
    let head= document.createElement('thead');
    let headTitle = document.createElement("tr");

    let TitleId = document.createElement("th");
    let textId = document.createTextNode('Id');
    TitleId.appendChild(textId)

    let TitleTitle = document.createElement("th");
    let textTitle = document.createTextNode('Title');
    TitleTitle.appendChild(textTitle);

    let TitlePrice = document.createElement("th");
    let textPrice = document.createTextNode('Price');
    TitlePrice.appendChild(textPrice);

    headTitle.appendChild(TitleId);
    headTitle.appendChild(TitleTitle);
    headTitle.appendChild(TitlePrice);

    //header
    head.appendChild(headTitle);
    table.appendChild(head);

    let tbody= document.createElement('tbody');
    
    for( row in data){
        
        let elementRow=document.createElement("tr");
        let cellId=document.createElement("ts");
        let textId=document.createTextNode(data[row]._id);
        cellId.appendChild(textId);
        elementRow.appendChild(cellId)
        //titulo
        let cellTitle=document.createElement("td");
        let textTitle=document.createTextNode(data[row].title);
        cellTitle.appendChild(textTitle);
        elementRow.appendChild(cellTitle);

        //precio 

        let cellPrice=document.createElement("td");
        let textPrice=document.createTextNode(data[row].price);
        cellPrice.appendChild(textPrice);
        elementRow.appendChild(cellPrice);
        tbody.appendChild(elementRow);
    }

    table.appendChild(tbody);

    table.setAttribute('class', 'table');
    return (table);


}


socketClient.on("realTimeproducts",  (products)=>{
   

        
       let newTable=renderTable(products);
       
    
        table_products.innerHTML="";
        table_products.appendChild(newTable);
       
    

});
