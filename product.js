window.onload=function(){//j'execute request au chargement de la page  
    const url=new URLSearchParams(window.location.search);    
    const id=url.get("_id");
    request("http://localhost:3000/api/teddies/" + id, response);    
} 


function request(url, cb){//j'execute request pour accéder à l'API des Teddies
    fetch(url)
    .then(response => response.json())
    .then(json => cb(json))
}


function response(teddy){
    const divTeddies=document.getElementById("coutureParent");
    divTeddies.innerHTML=/*html*/` 
    <div class="coutureProduct">         
        <img class="imageTeddy"src="${teddy.imageUrl}" alt="teddy">   
        <div class="teddyDescriptionProduct">
            <div class="teddyDescriptionChild">               
                <div class="textTeddyDescription"><h2>Name:</h2> <p>${teddy.name}</p></div>
                <div class="textTeddyDescription"><h2>Price:</h2> <p>${parseFloat(teddy.price / 100).toFixed(2)} €</p></div>
                <h2>Description:</h2><p class="pDescription">${teddy.description}</p> 
                <nav>
                    <button id="buttonColor">
                        Sélectionner une couleur 
                        <span id="down" class="fas fa-chevron-down"></span>                                
                    </button>
                    <ul id="navColors"></ul>
                </nav> 
            </div> 

            <label for="q">Quantité: </label>
            <select id="qt" name="q">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
            </select>

            <div class="buttonCart">         
                <button class="addCart" id="addCart" type="submit" name="addCart"> ajouter au panier </button> 
            </div> 
        </div>        
    </div>    
`
    const colors=teddy.colors; 
    const navColors=document.getElementById("navColors"); 
    const buttonColor=document.getElementById("buttonColor");    
    const down=document.getElementById("down");  
    let x= Boolean(down);

    colors.forEach(colorFunction);    
    function colorFunction(item){
        navColors.innerHTML += "<li>" + item + "</li>";
    }     

    buttonColor.addEventListener('click', () =>{
    navColors.classList.toggle('showColor'); 
    if(x){
        down.className="fas fa-chevron-up"; 
    }  
    else{
        down.className="fas fa-chevron-down";
    }   
    })

    /* ajout des produits dans le panier */

    //selection de l'id du formulaire
    const qt=document.getElementById("qt");

    

    //Selection du bouton ajouter l'article au panier
    const addCart=document.getElementById("addCart");

    //Ecouter le bouton et envoyer au panier
    addCart.addEventListener("click", (event)=>{
        event.preventDefault();

        //mettre le choix de l'utilisateur dans une variable
        const choiceQt=qt.value;
    
        //récupération des valeurs du formulaire
        let valueProduct={
            name:teddy.name,
            id:teddy._id,
            price:parseFloat(teddy.price / 100).toFixed(2),
            description:teddy.description,
            quantity:choiceQt
        };
        

        /*stocker la récupération des valeurs du formulaire dans le local storage*/

        //déclaration de la variable dans laquelle on met les key et values qui sont dans le local
        let productAddLocalStorage=JSON.parse(localStorage.getItem("product"));

        //fonction fenêtre pop up
        const popup = () =>{
            if(window.confirm(`${teddy.name} a bien été ajouté au panier
            Consultez le panier OK ou revenir à l'accueil ANNULER`)){
                window.location.href="Cart.html";
            }
            else{
                window.location.href="index.html";
            }
        }

        //fonction addProductStorage
        const addProductStorage = () =>{
            //ajout dans l'array de l'objet avec les values choisi par l'utilisateur
            productAddLocalStorage.push(valueProduct);

            //transformation en format JSON et l'envoyer dans la key product du localStorage
            localStorage.setItem("product", JSON.stringify(productAddLocalStorage));   
        };

        //s'il y a deja des produits dans le local storage
        if(productAddLocalStorage){            
            addProductStorage();
            popup();         
        }

        //s'il n'y a pas de produit
        else{
            productAddLocalStorage=[];
            addProductStorage();
            popup();                
        }
        

    });   
    
   


};



const barMenu= document.getElementById('barMenu');
const mainMenu= document.getElementById('mainMenu');

barMenu.addEventListener('click', () => {
    mainMenu.classList.toggle('show');
});

