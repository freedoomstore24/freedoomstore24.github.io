/*===== MENU SHOW =====*/ 
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

/*===== CART STORAGE =====*/
const CART_KEY = "freedomCart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/*===== CART BADGE =====*/
function updateCartBadges() {
  const count = getCartCount();
  const badges = document.querySelectorAll("#cart-count, .cart-badge");

  badges.forEach((badge) => {
    badge.textContent = count;
  });
}

/*===== TOAST =====*/
function showCartToast(message) {
  let toast = document.getElementById("cart-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cart-toast";
    toast.className = "cart-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.cartToastTimeout);
  window.cartToastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

/*===== ADD TO CART =====*/
function addToCart(product) {
  const cart = getCart();
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart(cart);
  updateCartBadges();
  showCartToast(product.name + " sepete eklendi.");
}

/*===== BUTTON EVENTS =====*/
function bindAddToCartButtons() {
  const addButtons = document.querySelectorAll(".add-to-cart");

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: Number(button.dataset.price),
        image: button.dataset.image,
      };

      addToCart(product);
    });
  });
}

/*===== INIT =====*/
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();
  bindAddToCartButtons();
});
