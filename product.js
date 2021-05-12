function request(url, cb) {
  // j'execute request pour accéder à l'API des Teddies
  fetch(url)
    .then((res) => res.json())
    .then((json) => cb(json));
}

function response(teddy) {
  const divTeddies = document.getElementById('coutureParent');
  divTeddies.innerHTML = /* html */ ` 
  <div class="coutureProduct">
    <img class="imageTeddy"src="${teddy.imageUrl}" alt="teddy"/>
      <div class="teddyDescriptionProduct">
        <div class="teddyDescriptionChild">
          <div class="textTeddyDescription">
            <h2>Name:</h2> <p>${teddy.name}</p>
          </div>
          <div class="textTeddyDescription">
            <h2>Price:</h2> <p>${parseFloat(teddy.price / 100).toFixed(2)} €</p>
          </div>
          <h2>Description:</h2><p class="pDescription">${teddy.description}</p>
          <div class="infoProductTeddy">
            <nav id="colorSelect">              
              <select id="navColors" required>
                <option value=""disabled selected='selected'>Choose a color</option>
              </select>
            </nav> 
            <div class="colorChoice">
              <label for="q">Quantity:</label>
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
            </div>
          </div>
        </div>
          <div class="buttonCart">         
            <button class="addCart" id="addCart" type="submit" name="addCart"> Add to cart </button> 
          </div> 
      </div>        
  </div>    
`;
  const { colors } = teddy;
  const navColors = document.getElementById('navColors');

  function colorFunction(item) {
    navColors.innerHTML += `<option value="${item}">${item}</option>`;
  }
  colors.forEach(colorFunction);

  /* ajout des produits dans le panier */

  // selection de l'id du formulaire
  const qt = document.getElementById('qt');
  // + navColors pour le choix des couleurs, déjà défini plus haut

  // Selection du bouton ajouter l'article au panier
  const addCart = document.getElementById('addCart');

  // Ecouter le bouton et envoyer au panier
  addCart.addEventListener('click', (event) => {
    event.preventDefault();

    // mettre le choix de l'utilisateur dans une variable
    const choiceQt = Number(qt.value);
    const choiceColor = navColors.value;
    console.log(choiceColor);
    if (!choiceColor) {
      alert('Thanks to add a color');
      return;
    }

    // récupération des valeurs du formulaire
    const valueProduct = {
      imageUrl: teddy.imageUrl,
      name: teddy.name,
      // eslint-disable-next-line
      id: teddy._id,
      color: choiceColor,
      price: parseFloat(teddy.price / 100).toFixed(2),
      description: teddy.description,
      quantity: choiceQt,
    };

    /* stocker la récupération des valeurs du formulaire dans le local storage */

    // déclaration de la variable dans laquelle on met les key et values qui sont dans le local
    let productAddLocalStorage = JSON.parse(localStorage.getItem('product'));

    // fonction fenêtre pop up
    const popup = () => {
      if (
        // eslint-disable-next-line no-alert
        window.confirm(
          `${teddy.name} has been added to cart View basket OK ou return to home ANNULER`,
        )
      ) {
        window.location.href = 'cart.html';
      } else {
        window.location.href = 'index.html';
      }
    };

    // fonction addProductStorage
    const addProductStorage = () => {
      const sameId = productAddLocalStorage.findIndex(
        (v) => v.id === valueProduct.id && v.color === valueProduct.color,
      );
      if (sameId < 0) {
        productAddLocalStorage.push(valueProduct);
      } else {
        productAddLocalStorage[sameId].quantity += choiceQt;
        // permet d'explorer l'interieur d'une valeur
      }
      // ajout dans l'array de l'objet avec les values choisi par l'utilisateur

      // transformation en format JSON et l'envoyer dans la key product du localStorage
      localStorage.setItem('product', JSON.stringify(productAddLocalStorage));
    };

    // s'il y a deja des produits dans le local storage
    if (productAddLocalStorage) {
      addProductStorage();
      popup();
    } else {
      // s'il n'y a pas de produit
      productAddLocalStorage = [];
      addProductStorage();
      popup();
    }
  });
}

window.onload = () => {
  // j'execute request au chargement de la page
  const url = new URLSearchParams(window.location.search);
  const id = url.get('_id');
  request(`http://localhost:3000/api/teddies/${id}`, response);
};

const barMenu = document.getElementById('barMenu');
const mainMenu = document.getElementById('mainMenu');

barMenu.addEventListener('click', () => {
  mainMenu.classList.toggle('show');
});
