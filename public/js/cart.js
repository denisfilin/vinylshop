const userId = "demo-user";
const serverUrl = "https://vercel.com/denisfilin0-4840s-projects/vinylshop/5aa2CxLNcg2g286om2ZRuyxDmLdj";

// Добавление товара
async function addToCart(product){
  await fetch(`${serverUrl}/api/cart/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "add", product })
  });
}

// Удаление товара
async function removeItem(product){
  await fetch(`${serverUrl}/api/cart/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "remove", product })
  });
}

// Создание заказа
async function createOrder(fullName, email, phone, delivery){
  await fetch(`${serverUrl}/api/order/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, phone, delivery })
  });
}
