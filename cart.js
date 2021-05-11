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
      <div class="buttonSuppArticle"><button class="suppArticle" >Remove</button></div>
  `;
    containRecap.appendChild(infoProduct);
  });

  // Total du panier
  const totalPrice = [];
  const localLength = productAddLocalStorage.length;
  for (let i = 0; i < localLength; i += 1) {
    const localPrice = productAddLocalStorage[i].price;
    const localQuantity = productAddLocalStorage[i].quantity;
    const cartPrice = localPrice * localQuantity;
    totalPrice.push(cartPrice);
  }
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPriceCalcul = totalPrice.reduce(reducer);
  const containTotal = document.getElementById('containTotal');

  const total = document.createElement('div');
  total.className = 'total';
  total.innerHTML = /* html */ `
    <p>Total = ${parseFloat(totalPriceCalcul).toFixed(2)} €</p>
    <button>Clear the basket</button>
  `;
  containTotal.appendChild(total);

  const buttonCart = document.createElement('div');
  buttonCart.className = 'buttonCart';
  buttonCart.innerHTML = /* html */ `
    <a href="index.html"><i class="fas fa-arrow-left"></i>Continue shopping</a>
    <button>Validate my basket</button>
  `;
  containTotal.appendChild(buttonCart);

  // Bouton supprimer article du panier
  const suppArticle = document.getElementsByClassName('suppArticle');

  for (let j = 0; j < suppArticle.length; j += 1) {
    suppArticle[j].addEventListener('click', (event) => {
      event.preventDefault();
      const idLocal = productAddLocalStorage[j].id;
      idLocal.remove();
    });
  }

  // vider le panier
}
