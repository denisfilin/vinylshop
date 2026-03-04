// js/products.js

const serverUrl = "https://vinylshop-465hio1no-denisfilin0-4840s-projects.vercel.app"; // <- твой Production URL
const userId = "demo-user"; // уникальный ID пользователя
let cart = JSON.parse(localStorage.getItem("vinylCart")) || [];

async function loadProducts() {
  try {
    const res = await fetch(`${serverUrl}/api/products`);
    const products = await res.json();
    const container = document.getElementById("products");
    container.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.price} ₽</p>
        <div class="tooltip">${product.description || ""}</div>
        <button onclick='addToCart(${JSON.stringify(product)})'>+</button>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Ошибка загрузки продуктов:", err);
  }
}

async function addToCart(product) {
  try {
    const res = await fetch(`${serverUrl}/api/cart/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", product })
    });
    const updatedCart = await res.json();
    cart = updatedCart.items;
    localStorage.setItem("vinylCart", JSON.stringify(cart));
    updateCartCount();
  } catch (err) {
    console.error("Ошибка добавления в корзину:", err);
  }
}

function updateCartCount() {
  const counter = document.getElementById("cartCount");
  if (counter) counter.innerText = cart.length;
}

// запуск
loadProducts();
updateCartCount();
