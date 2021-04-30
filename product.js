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
    divTeddies.innerHTML=` 
    <div class="couture">         
        <img src="${teddy.imageUrl}" alt="teddy">   
        <div class="teddyDescription">
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
            <div class="buttonCard">         
                <button class="addCard"> ajouter au panier </button> 
            </div> 
        </div>        
    </div>    
`
    const colors=teddy.colors; 
    const navColors=document.getElementById("navColors"); 
    const buttonColor=document.getElementById("buttonColor");    
    const down=document.getElementById("down");  
    let x= new Boolean(true);

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
      
};



const barMenu= document.getElementById('barMenu');
const mainMenu= document.getElementById('mainMenu');

barMenu.addEventListener('click', () => {
    mainMenu.classList.toggle('show');
});