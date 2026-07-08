/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

  if(toggle && nav){
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show')
    })
  }
}
showMenu('nav-toggle','nav-menu')

/*===== CART SYSTEM =====*/
function getCart() {
  return JSON.parse(localStorage.getItem("freedomCart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("freedomCart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();

  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart(cart);
  alert(product.name + " sepete eklendi!");
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  if (!cartContainer || !totalContainer) return;

  const cart = getCart();

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Sepetiniz şu anda boş.</p>";
    totalContainer.textContent = "0₺";
    if (cartCount) cartCount.textContent = "0";
    return;
  }

  let total = 0;
  let totalQuantity = 0;

  cart.forEach(product => {
    total += product.price * product.quantity;
    totalQuantity += product.quantity;

    const item = document.createElement("div");
    item.classList.add("cart-product");

    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-product-info">
        <div class="cart-product-name">${product.name}</div>
        <div class="cart-product-detail">Adet: ${product.quantity}</div>
        <div class="cart-product-detail">Beden: S / M / L / XL</div>
        <div class="cart-product-detail">Renk: Siyah / Beyaz</div>
      </div>
      <div class="cart-product-price">${product.price * product.quantity}₺</div>
      <button class="cart-remove-btn" onclick="removeFromCart('${product.id}')">Sil</button>
    `;

    cartContainer.appendChild(item);
  });

  totalContainer.textContent = total + "₺";
  if (cartCount) cartCount.textContent = totalQuantity;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const addButtons = document.querySelectorAll(".add-to-cart");

  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: Number(button.dataset.price),
        image: button.dataset.image
      };

      addToCart(product);
    });
  });
});
