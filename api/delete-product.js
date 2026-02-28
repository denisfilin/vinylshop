import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Only DELETE allowed' })
  }

  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return res.status(500).json({ error: "Missing environment variables" })
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { id } = req.query

    if (!id) {
      return res.status(400).json({ error: 'ID is required' })
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Delete error:", error)
      return res.status(500).json({ error })
    }

    return res.status(200).json({ success: true })

  } catch (err) {
    console.error("Server error:", err)
    return res.status(500).json({ error: err.message })
  }
}
