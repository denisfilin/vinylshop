export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Only POST allowed" });
    }

    const { name, phone, product, price } = req.body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: `🛒 Новый заказ!
Имя: ${name}
Телефон: ${phone}
Товар: ${product}
Цена: ${price}`,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const details = await telegramResponse.text();
      return res.status(502).json({ success: false, error: details });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!token || !chatId) {
  return res.status(500).json({ error: "Telegram environment variables missing" });
}
}


