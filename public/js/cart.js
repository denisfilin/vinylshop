// js/cart.js

const serverUrl = "https://vercel.com/denisfilin0-4840s-projects/vinylshop/4DxE2sHsyYqjHa33pJSL3gDA5FsW"; // <- твой Production URL
const userId = "demo-user";
let cart = JSON.parse(localStorage.getItem("vinylCart")) || [];

async function renderCart() {
  try {
    const res = await fetch(`${serverUrl}/api/cart/${userId}`);
    const data = await res.json();
    cart = data.items || [];
    localStorage.setItem("vinylCart", JSON.stringify(cart));

    let total = 0;
    const container = document.getElementById("cartItems");
    container.innerHTML = "";

    cart.forEach((item, index) => {
      total += Number(item.price);
      container.innerHTML += `
        <div class="item">
          <div class="item-info">
            <h3>${item.title}</h3>
            <p>${item.description || ""}</p>
            <p>${item.price} ₽</p>
            <button onclick="removeItem(${item.product_id})">Удалить</button>
          </div>
          <img src="${item.image}" alt="${item.title}">
        </div>
      `;
    });

    const totalEl = document.getElementById("totalPrice");
    if (totalEl) totalEl.innerText = "Итого: " + total + " ₽";
  } catch (err) {
    console.error("Ошибка загрузки корзины:", err);
  }
}

async function removeItem(productId) {
  try {
    const res = await fetch(`${serverUrl}/api/cart/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove", product: { product_id: productId } })
    });
    const updatedCart = await res.json();
    cart = updatedCart.items;
    localStorage.setItem("vinylCart", JSON.stringify(cart));
    renderCart();
  } catch (err) {
    console.error("Ошибка удаления товара:", err);
  }
}

async function createOrder() {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const delivery = document.getElementById("delivery").value;

  if (!fullName) return alert("Введите ФИО.");
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return alert("Введите корректный E-mail.");
  if (!phone || !/^\+7\d{10}$/.test(phone)) return alert("Введите телефон в формате +7XXXXXXXXXX.");
  if (!delivery) return alert("Выберите способ доставки.");

  try {
    const res = await fetch(`${serverUrl}/api/order/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, phone, delivery })
    });
    const result = await res.json();
    alert(result.message || "Заказ создан!");

    // очистка корзины
    cart = [];
    localStorage.removeItem("vinylCart");
    renderCart();
  } catch (err) {
    console.error("Ошибка создания заказа:", err);
    alert("Ошибка при создании заказа.");
  }
}

// запуск
renderCart();
