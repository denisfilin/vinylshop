export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const { id } = req.query;

  const response = await fetch(
    `${supabaseUrl}/rest/v1/products?id=eq.${id}`,
    {
      method: "DELETE",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.text();
    return res.status(500).json({ error });
  }

  res.status(200).json({ success: true });
}
