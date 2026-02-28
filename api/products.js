import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET allowed' })
  }

  try {

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: "Missing Supabase environment variables" })
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return res.status(500).json({ error })
    }

    return res.status(200).json(data)

  } catch (err) {
    console.error("Server error:", err)
    return res.status(500).json({ error: err.message })
  }
}
