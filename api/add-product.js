import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const newProduct = req.body;

    const fileData = fs.readFileSync(filePath);
    const products = JSON.parse(fileData);

    products.push({
      id: Date.now(),
      ...newProduct
    });

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Cannot save product" });
  }
}
