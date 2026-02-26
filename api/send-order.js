export default function handler(req, res) {
  res.status(200).json({
    token_exists: !!process.env.TELEGRAM_BOT_TOKEN,
    chat_id_exists: !!process.env.TELEGRAM_CHAT_ID
  });
}
