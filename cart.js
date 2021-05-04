//déclaration de la variable dans laquelle on met les key et values qui sont dans le local
let productAddLocalStorage=JSON.parse(localStorage.getItem("product"));

//sélection de la classe où je vais injecter le code
const containProduct= document.getElementById("containProduct");



//si le panier est vide : afficher "le panier est vide"
if(productAddLocalStorage === null){
    const emptyCart=`
        <div class="containEmptyCart">
            <p>Le panier est vide</p>
        </div>
    `;
    containProduct.innerHTML=emptyCart;
}
//si le panier n'est pas vide: on affiche les produits contenus dans le localStorage
else{
    /* function listResponse(productAdd){
        const containRecap= document.getElementById('containRecap');
        productAdd.forEach(productAddLocalStorage =>{        
            listProductCart.innerHTML=/*html`
                <h2>Name:</h2><p>${productAddLocalStorage.name}</p>
                <h2>Price:</h2><p>${productAddLocalStorage.price}€</p>
                <h2>Quantity:</h2><p>${productAddLocalStorage.quantity}</p>            
            `
            
            containRecap.appendChild(listProductCart);
        });
        listResponse();        
    };*/

    let listProductCart=[];
    for(i=0; i < productAddLocalStorage.length; i++){
        listProductCart=listProductCart +`
            <div class="containRecap">
                <h2>Name:</h2><p>${productAddLocalStorage[i].name}</p>
                <h2>Price:</h2><p>${productAddLocalStorage[i].price}€</p>
                <h2>Quantity:</h2><p>${productAddLocalStorage[i].quantity}</p>
            </div>
        `;        
    }
    if(i === productAddLocalStorage.length){
        containProduct.innerHTML=listProductCart;
    }
        
};
    

   
    

