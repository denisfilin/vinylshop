import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' })
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { title, price, category, description, image } = req.body

    const { data, error } = await supabase
      .from('products')
      .insert([{ title, price, category, description, image }])
      .select()

    if (error) {
      console.error(error)
      return res.status(500).json({ success: false, error })
    }
    if (!title || !price) {
  return res.status(400).json({ error: "Title and price are required" })
}

    return res.status(200).json({ success: true, data })

  } catch (err) {
    console.error(err)
    return res.status(500).json({ success: false, error: err.message })
  }
}
