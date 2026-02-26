import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

export default function handler(req, res) {
  try {
    const fileData = fs.readFileSync(filePath);
    const products = JSON.parse(fileData);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Cannot read products" });
  }
}
