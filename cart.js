window.onload=function(){//j'execute request au chargement de la page


}

//déclaration de la variable dans laquelle on met les key et values qui sont dans le local
let productAddLocalStorage=JSON.parse(localStorage.getItem("product"));

//sélection de la classe où je vais injecter le code
const containRecap= document.getElementById("containRecap");



//si le panier est vide : afficher "le panier est vide"
if(productAddLocalStorage === null){
    const emptyCart=`
        <div class="containEmptyCart">
            <p>There are no items in your shopping cart.</p>
        </div>
        <div class="buttonContinue">
            <a href="index.html">Continue shopping</a>
        </div>
    `;
    containRecap.innerHTML=emptyCart;
}
//si le panier n'est pas vide: on affiche les produits contenus dans le localStorage
else{
   /*  function listResponse(productAdd){
        const containRecap= document.getElementById('containRecap');
        productAdd.forEach(productAddLocalStorage =>{        
            containRecap.innerHTML=`
                <h2>Name:</h2><p>${productAddLocalStorage.name}</p>
                <h2>Price:</h2><p>${productAddLocalStorage.price}€</p>
                <h2>Quantity:</h2><p>${productAddLocalStorage.quantity}</p>            
            `
            
           
        });
        listResponse();        
    }; */

    let listProductCart=[];
    for(i=0; i < productAddLocalStorage.length; i++){
        listProductCart=listProductCart +`
            <div class="infoProduct">                  
                <img class="imageTeddy"src="${productAddLocalStorage[i].imageUrl}" alt="teddy"/>
                <h3>Name:</h3><p>${productAddLocalStorage[i].name}</p>                
                <h3>Quantity:</h3><p>${productAddLocalStorage[i].quantity}</p>   
                <h3>Price:</h3><p>${parseFloat(productAddLocalStorage[i].price * productAddLocalStorage[i].quantity).toFixed(2)}€</p>    
                <button id="suppArticle">Remove</button>
            </div> 
            
        `;        
    }
    if(i === productAddLocalStorage.length){
        containRecap.innerHTML=listProductCart;
    }
        
};

//Bouton supprimer article du panier
let suppArticle=document.getElementById('suppArticle');




/* <div class="total">
                    <p>Total = 190€</p>
                    <p>Clear the basket</p>
            </div>
            <div class="buttonCart">
                <a href="index.html">Continue shopping</a>
                <button>Validate my basket</button>
            </div> */
    

   
    

