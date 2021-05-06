window.onload = function () {
  // j'execute request au chargement de la page
};

// déclaration de la variable dans laquelle on met les key et values qui sont dans le local
const productAddLocalStorage = JSON.parse(localStorage.getItem('product'));

// sélection de la classe où je vais injecter le code
const containRecap = document.getElementById('containRecap');

// si le panier est vide : afficher "le panier est vide"
if (productAddLocalStorage === null) {
  const emptyCart = `
    <div class="containEmptyCart">
        <p>There are no items in your shopping cart.</p>
    </div>
    <div class="buttonContinue">
        <a href="index.html">Continue shopping</a>
    </div>
  `;
  containRecap.innerHTML = emptyCart;
} else {
  // si le panier n'est pas vide: on affiche les produits contenus dans le localStorage
  productAddLocalStorage.forEach((product) => {
    const infoProduct = document.createElement('div');
    infoProduct.className = 'infoProduct';
    infoProduct.innerHTML = /* html */ `
      <img class="imageTeddy" src="${product.imageUrl}" alt="teddy"/>
      <h3>Name:</h3><p>${product.name}</p>
      <h3>Quantity:</h3><p>${product.quantity}</p>
      <h3>Price:</h3>
      <p>${parseFloat(product.price * product.quantity).toFixed(2)}€</p>
      <button class="suppArticle">Remove</button>
  `;
    containRecap.appendChild(infoProduct);
  });
  // Bouton supprimer article du panier
  const suppArticle = document.getElementsByClassName('suppArticle');
  console.log(suppArticle);
}

/* <div class="total">
                    <p>Total = 190€</p>
                    <p>Clear the basket</p>
            </div>
            <div class="buttonCart">
                <a href="index.html">Continue shopping</a>
                <button>Validate my basket</button>
            </div> */
