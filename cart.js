// déclaration de la variable dans laquelle on met les key et values qui sont dans le local
const productAddLocalStorage = JSON.parse(localStorage.getItem('product'));

// sélection de la classe où je vais injecter le code
const containRecap = document.getElementById('containRecap');

// si le panier est vide : afficher "le panier est vide"
if (!productAddLocalStorage || productAddLocalStorage.length === 0) {
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
      <div class="buttonSuppArticle">
        <button class="suppArticle" id="${product.id}">Remove</button>
      </div>
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
  /* ---------------------------------------------------- */

  const total = document.createElement('div');
  total.className = 'total';
  total.innerHTML = /* html */ `
    <p>Total = ${parseFloat(totalPriceCalcul).toFixed(2)} €</p>
    <button id="validateBasket">Validate my basket</button>
  `;
  containTotal.appendChild(total);

  const buttonCart = document.createElement('div');
  buttonCart.className = 'buttonCart';
  buttonCart.innerHTML = /* html */ `
    <a href="index.html"><i class="fas fa-arrow-left"></i>Continue shopping</a>    
    <button id="clearBasket">Clear the basket</button>
  `;
  containTotal.appendChild(buttonCart);

  // Bouton supprimer article du panier
  const suppArticle = document.getElementsByClassName('suppArticle');

  for (let j = 0; j < suppArticle.length; j += 1) {
    suppArticle[j].addEventListener('click', () => {
      const checkId = suppArticle[j].getAttribute('id');
      const checkIdCondition = (product) => product.id === checkId;
      const index = productAddLocalStorage.findIndex(checkIdCondition);
      productAddLocalStorage.splice(index, 1);
      window.location.reload();
      localStorage.setItem('product', JSON.stringify(productAddLocalStorage));
    });
  }

  // Bouton vider Panier
  const clearBasket = document.getElementById('clearBasket');
  clearBasket.addEventListener('click', () => {
    localStorage.removeItem('product');
    window.location.reload();
  });

  // bouton valider Panier
  const form = document.getElementById('form');
  const validateBasket = document.getElementById('validateBasket');
  validateBasket.addEventListener('click', () => {
    form.innerHTML = /* html */ `
    <h3>Fill out the form to validate your basket</h3>
    <form method="post" action="php">
      <div class="input">
        <label for="firstName">FirstName:</label>
        <input type="text" name="firstName" id="firstName" required/>
      </div>
      <div class="input">
        <label for="lastName">LastName:</label>
        <input type="text" name="laststName" id="lastName" required/>
      </div>
      <div class="input">
        <label for="adress">Adress:</label>
        <input type="text" name="adress" id="adress" required/>
      </div>
      <div class="input">
        <label for="city">City:</label>
        <input type="text" name="city" id="city" required/>
      </div>
      <div class="input">
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required/>
      </div>
      <input type="submit" value="Validate my basket" id="buttonForm"/>
    </form>
  `;
  });
}
