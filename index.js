function request(url, cb) {
  // j'execute request pour accéder à l'API des Teddies
  fetch(url)
    .then((res) => res.json())
    .then((json) => cb(json));
}

function response(teddies) {
  // je créé une reponse qui s'ajoutera à divTeddies
  const divTeddies = document.getElementById('listTeddies');
  teddies.forEach((teddy) => {
    const teddyElement = document.createElement('a');
    teddyElement.href = `product.html?_id=${teddy._id}`;
    teddyElement.classList.add('teddiesArticles');
    teddyElement.innerHTML = /* html */ ` 
      <div class="couture">
        <img src="${teddy.imageUrl}" alt="teddy"/>
        <div class="teddiesDescription">
          <div class="textDescription">
          <h4>Name:</h4> <p>${teddy.name}</p>
          </div>
          <div class="textDescription">
          <h4>Price:</h4><p>${parseFloat(teddy.price / 100).toFixed(2)} €</p>
          </div>
          <h4>Description:</h4><p class="pDescription">${teddy.description}</p>
        </div>
      </div>
  `;
    divTeddies.appendChild(teddyElement);
  });
}

window.onload = () => {
  // j'execute request au chargement de la page
  request('http://localhost:3000/api/teddies', response);
};

/* --- on affiche la liste ul au click sur l'icone --- */
const barMenu = document.getElementById('barMenu');
const mainMenu = document.getElementById('mainMenu');

barMenu.addEventListener('click', () => {
  mainMenu.classList.toggle('show');
});
