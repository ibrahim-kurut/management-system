let title    = document.querySelector("#title");
let price    = document.querySelector("#price");
let taxes    = document.querySelector("#taxes");
let ads      = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let totle    = document.querySelector("#totle");
let count    = document.querySelector("#count");
let category = document.querySelector("#category");
let submit   = document.querySelector("#submit");
let modal    = document.querySelector(".modal");
let mood = "create";
let tmp ;

let tbody = document.querySelector("#tbody");
let alrt = document.querySelector(".alrt");

/* ======================== START GET TOTAL ======================== */
function getTotal(){
    if(price.value != ""){
        let result= ( +price.value + +taxes.value + +ads.value) - +discount.value;
        totle.innerHTML = result;
        totle.style.backgroundColor = "#198754";
    }else{
        totle.innerHTML = "";
        totle.style.backgroundColor = "#dc3545";
    }
}
/* ======================== END GET TOTAL ======================== */

/* ======================== START CREATE PRODUCT ======================== */
// localStorage'ten dataların silinmemesi için refreshten sonra bunu yaparız
let dataProduct;
if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
     dataProduct = [];
}


//CREATE PRODUCT
submit.onclick = function(){
    // inputtan verileri almak ve new objecte depolamak
    let newProduct = {
        title    : title.value.toLowerCase(),
        price    : price.value,
        taxes    : taxes.value,
        ads      : ads.value,
        count    : count.value,
        discount : discount.value,
        category : category.value.toLowerCase(),
        totle    : totle.innerHTML,
    }
    // bu objecti bi arraye atmak ve yeni product yapmak
  
  if(title.value === ""){
   alrt.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
   <strong>Title !</strong> field cannot be empty .
   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`;
}else if(price.value === ""){
    alrt.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>price !</strong> field cannot be empty .
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;

  }else if(category.value === ""){
    alrt.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>category !</strong> field cannot be empty .
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  }else{
    if(mood === "create"){
        dataProduct.push(newProduct);
      }else{
          dataProduct[tmp] = newProduct;
          mood = "create";
          submit.value="create";
          count.style.display ="block";
      }
      clearData ();
  }

    // save this array in localStorge
    localStorage.setItem("product", JSON.stringify(dataProduct));
    
    showData ();
}
/* ======================== END CREATE PRODUCT ======================== */

/* ======================== START CLEAR İNPUTS ======================== */
/*
bu fanctionın çalışmasını submite baztığımıza istiyoruz
o yüzden submit fuctionın içine yazarız
 */ 
function clearData (){

    title.value      = "";
    price.value      = "";
    taxes.value      = "";
    ads.value        = "";
    count.value      = "";
    discount.value   = "";
    category.value   = "";
    totle.innerHTML  = "";
}
/* ======================== END CLEAR İNPUTS ======================== */

/* ======================== START READ ======================== */
function showData (){
    // let tbody = document.querySelector("#tbody");
    let table = "";
    for(let i=0; i<dataProduct.length; i++){
        table += `
            <tr>
                <th>${i+1}</th>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].totle}</td>
                <td>${dataProduct[i].category}</td>
                <td><button  id="update" class="btn btn-success" onclick="updateData(${i})" >update <i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button  id="delete" class="btn btn-danger" onclick="deleteData(${i})">delete <i class="fa-solid fa-trash-can"></i></button></td>
            </tr>
        `;
    }
    tbody.innerHTML = table;
    getTotal();
}
showData ();
/* ======================== END READ ======================== */
/* ======================== START DELETE ======================== */
function deleteData(i){
    // alert(i);
    // arraydan secilen i silmek
    dataProduct.splice(i,1);
    // localstorge git ve arrayi ekle silme işleminden sonra 
    localStorage.product = JSON.stringify(dataProduct);


    // datayı göster slime işleminden sonra eğer de bu fuc yazmasak silmeyi göremeyiz 
    showData();
}
/* ======================== END DELETE ======================== */
/* ======================== START UPDATE ======================== */

function updateData(i){
// alert(`${i}`);
title.value      = dataProduct[i].title;
price.value      = dataProduct[i].price;
taxes.value      = dataProduct[i].taxes;
ads.value        = dataProduct[i].ads;
discount.value   = dataProduct[i].discount;
category.value   = dataProduct[i].category;
getTotal();
count.style.display = "none";
// change btn submit to save , update, ok
submit.value = "update";
mood = "update";
tmp = i;

scroll({
    top:0,
    behavior : "smooth",
})



}


/* ======================== END UPDATE ========================== */
/* ======================== START SEARCH ======================== */
let searchMood = "title";

function getSearch(id){
    let search =document.querySelector("#search");
    // console.log(id);
    if(id === "searchTitle"){
        searchMood = "title";
    }else{
        searchMood = "category";
    }
    search.placeholder = `search by ${searchMood}`;
    //console.log(searchMood);
    search.focus();
    search.value = "";
    showData();
}

function searchData(value){
    let table = "";
    // console.log(value);
    if (searchMood == "title"){ // search by title
        for ( let i=0; i<dataProduct.length; i++){
            if(dataProduct[i].title.includes(value.toLowerCase())){
                // console.log(i+1);
                table += `
            <tr>
                <th>${i+1}</th>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].totle}</td>
                <td>${dataProduct[i].category}</td>
                <td><button  id="update" class="btn btn-success" onclick="updateData(${i})" >update <i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button  id="delete" class="btn btn-danger" onclick="deleteData(${i})">delete <i class="fa-solid fa-trash-can"></i></button></td>
            </tr>
        `;
            }
        }
    }else{ // search by category
        for ( let i=0; i<dataProduct.length; i++){
            if(dataProduct[i].category.includes(value.toLowerCase())){
                // console.log(i+1);
                table += `
            <tr>
                <th>${i+1}</th>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].totle}</td>
                <td>${dataProduct[i].category}</td>
                <td><button  id="update" class="btn btn-success" onclick="updateData(${i})" >update <i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button  id="delete" class="btn btn-danger" onclick="deleteData(${i})">delete <i class="fa-solid fa-trash-can"></i></button></td>
            </tr>
        `;
            }
        }
    }
    tbody.innerHTML = table;
}


/* ======================== END SEARCH ======================== */

/* ======================== CLEAN DATA ======================== */
/* ======================== CLEAN DATA ======================== */