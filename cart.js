/* ---------- déclaration de la variable dans laquelle on met
 les key et values qui sont dans le local ------- */

// json.parse permet de convertir une chaine de texte en objet JS
const productAddLocalStorage = JSON.parse(localStorage.getItem('product'));

/* ----- sélection de la balise avec son id où je vais injecter le code---- */
const containRecap = document.getElementById('containRecap');

/* ---- si le panier est vide : afficher ce message ---- */
// mettre un ! devant un élément permet d'indiquer son message d'erreur
// || veut dire ou
// .length indique le nombre d'élément dans un tableau
if (!productAddLocalStorage || productAddLocalStorage.length === 0) {
  const emptyCart = `
    <div class="containEmptyCart">
        <p>There are no items in your shopping cart.</p>
    </div>
    <div class="buttonContinue">
        <a href="index.html">Continue shopping</a>
    </div>
  `;
  // innerHTML permet d'injecter du code dans une balise selectionnée
  containRecap.innerHTML = emptyCart;

  /* --- si le panier n'est pas vide: on affiche les produits contenus dans le localStorage --- */
} else {
  // forEach permet d'executer une fonction sur chaque élément du tableau productAddLocalStorage
  // product est le paramètre de la fonction auquel on va assigner les valeurs des éléments du local
  productAddLocalStorage.forEach((product) => {
    const infoProduct = document.createElement('div');
    infoProduct.className = 'infoProduct';
    infoProduct.innerHTML = /* html */ `
      <a href="product.html?_id=${product.id}">
        <img class="imageTeddy" src="${product.imageUrl}" alt="teddy"/>
      </a>
      <div class="elementProduct">
        <h3>Name:</h3>
        <p>${product.name}</p>
      </div>
      <div class="elementProduct"><h3>Color:</h3><p>${product.color}</p></div>
      <div class="elementProduct">
        <h3>Quantity:</h3><p>${product.quantity}</p>
      </div>      
      <div class="elementProduct">
        <h3>Price:</h3>
        <p>${parseFloat(product.price * product.quantity).toFixed(2)}€</p>
      </div>
      <div class="buttonSuppArticle">
        <button class="suppArticle" id="${product.id}">Remove</button>
      </div>
  `;
    containRecap.appendChild(infoProduct);
  });

  /* --- Total du panier --- */
  // on créé un tableau appelé totalPrice vide
  const totalPrice = [];
  // on indique dans localLength le nombre d'élément présent dans le tableau productAddLocalStorage
  productAddLocalStorage.forEach((total) => {
    const cartPrice = total.price * total.quantity;
    // on ajoute au tableau totalPrice le prix total d'un produit
    totalPrice.push(cartPrice);
  });
  // l'argument accumulator correspond à la valeur précedemment retourné par le dernier callback
  // l'argument currentValue correspond à la valeur actuellement manipulé dans le tableau totalPrice
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  /* la méthode reduce() permet de réduire à une seule valeur
  le tableau totalPrice en traitant chaque valeur de celui-ci à savoir cartPrice */
  const totalPriceCalcul = totalPrice.reduce(reducer);
  const containTotal = document.getElementById('containTotal');
  /* ---------------------------------------------------- */

  /* ---- On intègre le total et le bouton valider mon panier --- */
  // on créé une div avec pour classe total
  const total = document.createElement('div');
  total.className = 'total';
  // on y intègre une balise p et a
  // la fonction parseFloat() permet de transformer une chaîne de caractère en nombre
  // toFixed permet de forçer l'affichage de nombre après la virgule, ici 2 chiffres
  total.innerHTML = /* html */ `
    <p>Total = ${parseFloat(totalPriceCalcul).toFixed(2)} €</p>
  `;
  // on intègre cette nouvelle div appelé total dans containTotal
  containTotal.appendChild(total);

  /* --- on intègre le bouton continuer le shopping et supprimer le panier --- */
  const buttonCart = document.createElement('div');
  buttonCart.className = 'buttonCart';
  buttonCart.innerHTML = /* html */ `
    <a href="index.html"><i class="fas fa-arrow-left"></i>Continue shopping</a>    
    <button id="clearBasket">Clear the basket</button>
  `;
  containTotal.appendChild(buttonCart);

  /* ---  Bouton supprimer article du panier --- */
  // on récupère sous forme de tableau (grâce à className) les boutons suppArticle
  const suppArticle = document.getElementsByClassName('suppArticle');

  // on utilise la boucle for pour appliquer l'evenement sur tout les boutons remove
  // j représente l'index d'un produit
  // j=0 représente le point de départ du code
  /* j < suppArticle.length représente la condition
  la boucle doit s'arréter quand on a fait tout le tableau */
  // j +=1 signifie que l'on passe les valeurs une par une
  for (let j = 0; j < suppArticle.length; j += 1) {
    // suppArticle[j] désigne le bouton remove concerné à l'event
    suppArticle[j].addEventListener('click', () => {
      // getAttribute permet de renvoyer la valeur d'un attribut (ici l'id)
      const checkId = suppArticle[j].getAttribute('id');
      // cette fonction permet de vérifier si l'id du bouton supp est le meme que le produit
      const checkIdCondition = (product) => product.id === checkId;
      // cette ligne permet de chercher dans la key product l'index qui correspond à l'id
      const index = productAddLocalStorage.findIndex(checkIdCondition);
      /* splice permet de retirer un élément du tableau product dans le localStorage
      en fonction de son index */
      productAddLocalStorage.splice(index, 1);
      window.location.reload();
      // setItem permet de mettre à jour le tableau product apres la modif
      localStorage.setItem('product', JSON.stringify(productAddLocalStorage));
    });
  }

  /* ------ Bouton vider Panier ----- */
  const clearBasket = document.getElementById('clearBasket');
  clearBasket.addEventListener('click', () => {
    // removeItem supprime une clé du localStorage (product)
    localStorage.removeItem('product');
    window.location.reload();
  });

  /* ------ ajout du formulaire dans le localstorage ------- */
  const buttonForm = document.getElementById('buttonForm');
  const teddyId = [];
  productAddLocalStorage.forEach((product) => {
    teddyId.push(product.id);
  });
  const regex = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ' -]{2,33}$/;
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+\\\/=?^_`{|}~\-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\-]{2,63}$/;

  const url = 'http://localhost:3000/api/teddies/order';
  buttonForm.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const email = document.getElementById('email').value.trim();
    if (
      !regex.test(firstName) ||
      !regex.test(lastName) ||
      !regex.test(city) ||
      !regexEmail.test(email)
    ) {
      alert('Please fill in the form fields correctly');
      return;
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: teddyId,
        contact: {
          firstName,
          lastName,
          address,
          city,
          email,
        },
      }),
    })
      .then(async (response) => {
        // récupération de l'id et du nom de l'utilisateur
        const contenu = await response.json();
        localStorage.setItem('order', JSON.stringify(contenu.orderId));
        localStorage.setItem('name', JSON.stringify(firstName));
        localStorage.setItem('price', JSON.stringify(totalPriceCalcul));
        // Aller vers la page Order
        window.location = 'order.html';
      })
      .catch((error) => console.log(error));
  });
}

/* --- on affiche la liste ul au click sur l'icone --- */
const barMenu = document.getElementById('barMenu');
const mainMenu = document.getElementById('mainMenu');

barMenu.addEventListener('click', () => {
  mainMenu.classList.toggle('show');
});
