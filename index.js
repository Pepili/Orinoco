window.onload=function(){//j'execute request au chargement de la page  
    
    request("http://localhost:3000/api/teddies", response);

} 


function request(url, cb){//j'execute request pour accéder à l'API des Teddies
    fetch(url)
    .then(response => response.json())
    .then(json => cb(json))
}

function response(teddies){//je créé une reponse qui s'ajoutera à divTeddies
    const divTeddies= document.getElementById("listTeddies");    
    teddies.forEach(teddy => { 
        const teddyElement=document.createElement("a");
        teddyElement.href="product.html";
        teddyElement.classList.add("teddiesArticles");
        teddyElement.innerHTML =` 
            <div class="couture">         
            <img src="${teddy.imageUrl}" alt="teddy">   
            <div class="teddiesDescription">                
            <div class="textDescription"><h2>Name:</h2> <p>${teddy.name}</p></div>
            <div class="textDescription"><h2>Price:</h2> <p>${parseFloat(teddy.price / 100).toFixed(2)} €</p></div>
            <h2>Description:</h2><p class="pDescription">${teddy.description}</p>
            </div> 
            </div>                                 
        ` 
        divTeddies.appendChild(teddyElement); 
    });             
};

const barMenu= document.getElementById('barMenu');
const mainMenu= document.getElementById('mainMenu');

barMenu.addEventListener('click', () => {
    mainMenu.classList.toggle('show');
});

