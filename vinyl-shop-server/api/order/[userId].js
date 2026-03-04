import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { fullName, email, phone, delivery } = req.body;

  // Получаем корзину
  const { data } = await supabase.from("carts").select("*").eq("user_id", userId).single();
  if (!data || !data.items || data.items.length === 0)
    return res.status(400).json({ error: "Корзина пуста" });

  // Создаём заказ
  const { data: orderData, error } = await supabase.from("orders").insert([{
    user_id: userId,
    customer: { fullName, email, phone },
    delivery,
    items: data.items,
    total: data.items.reduce((sum, i) => sum + Number(i.price), 0),
    date: new Date()
  }]).select();

  if (error) return res.status(400).json({ error: error.message });

  // Очищаем корзину
  await supabase.from("carts").delete().eq("user_id", userId);

  return res.json({ message: "Заказ создан!", order: orderData[0] });
}
