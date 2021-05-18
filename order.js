// récupération de l'orderId, du name et du prix total
const orderId = JSON.parse(localStorage.getItem('order'));
const orderName = JSON.parse(localStorage.getItem('name'));
const orderPrice = JSON.parse(localStorage.getItem('price'));

/* --- j'integre l'html à la section confirm --- */
const confirm = document.getElementById('confirm');
confirm.innerHTML = /* html */ `
<div class="thank" id="thank">
  <h1>Order confirmed</h1>
  <p>Thanks for your order ${orderName} !</p>
</div>
<div class="orderId" id="orderId">
  <p> <h2>Order number:</h2> ${orderId}</p>
  <p><h2>Amount of the order:</h2> ${parseFloat(orderPrice).toFixed(2)}€</p>
</div>
<div class="buttonReturn"><a href="index.html" class="return">Return to home</a></div>
`;
