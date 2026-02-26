export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({ message: "API working" });
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

    const data = await telegramResponse.json();

    return res.status(200).json({ success: true, telegram: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
