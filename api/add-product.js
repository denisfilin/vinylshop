export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  const response = await fetch(`${supabaseUrl}/rest/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(req.body),
  });

  if (!response.ok) {
    const error = await response.text();
    return res.status(500).json({ error });
  }

  res.status(200).json({ success: true });
}
