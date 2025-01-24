// api/getNews.js
import { PrismaClient } from '/prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const news = await prisma.post.findMany();
    res.status(200).json(news);
  } catch (error) {
    console.error("Error al obtener las noticias", error);
    res.status(500).json({ error: "Error al obtener las noticias" });
  }
}
