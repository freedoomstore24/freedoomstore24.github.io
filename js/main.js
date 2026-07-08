/*==================== MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};

showMenu("nav-toggle", "nav-menu");

/*==================== CART SYSTEM ====================*/
const CART_KEY = "freedomCart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function updateCartBadges() {
  const cart = getCart();
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll("#cart-count").forEach((badge) => {
    badge.textContent = totalQuantity;
  });
}

function showToast(title, text = "") {
  let container = document.querySelector(".toast-container");

  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  toast.innerHTML = `
    <div class="toast__icon"><i class='bx bx-check-circle'></i></div>
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      ${text ? `<div class="toast__text">${text}</div>` : ""}
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 250);
  }, 2200);
}

function addToCart(product) {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart(cart);
  updateCartBadges();
  showToast("Ürün sepete eklendi", product.name);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartBadges();

  if (typeof renderCart === "function") {
    renderCart();
  }
}

/*==================== INIT ====================*/
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();

  const addButtons = document.querySelectorAll(".add-to-cart");

  addButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      image: button.dataset.image
    };

    addToCart(product);
  });
});
