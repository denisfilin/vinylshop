async function loadProducts(){
  const res = await fetch(`${serverUrl}/api/products`);
  const data = await res.json();
  // отображение продуктов на странице
}
