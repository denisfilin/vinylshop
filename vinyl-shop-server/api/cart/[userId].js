import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === "GET") {
    // Получить корзину
    const { data, error } = await supabase.from("carts").select("*").eq("user_id", userId).single();
    if (error) return res.status(400).json({ error: error.message });
    return res.json(data || { user_id: userId, items: [] });
  }

  if (req.method === "POST") {
    const { action, product } = req.body;

    // Получаем текущую корзину
    const { data } = await supabase.from("carts").select("*").eq("user_id", userId).single();
    let items = data?.items || [];

    if (action === "add") {
      items.push(product);
    } else if (action === "remove") {
      items = items.filter(i => i.product_id !== product.product_id);
    }

    const { data: updated, error } = await supabase.from("carts").upsert({ user_id: userId, items }).select();
    if (error) return res.status(400).json({ error: error.message });

    return res.json(updated[0]);
  }

  res.status(405).json({ error: "Method not allowed" });
}
