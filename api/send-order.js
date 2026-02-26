export default async function handler(req, res) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Если открыли в браузере — делаем тест
    if (req.method === "GET") {
      const telegramResponse = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: "✅ Тестовое сообщение от Vinyl Shop"
          }),
        }
      );

      const data = await telegramResponse.json();
      return res.status(200).json(data);
    }

    // Обычная отправка заказа
    if (req.method === "POST") {
      const { name, phone, product, price } = req.body;

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
      return res.status(200).json(data);
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
