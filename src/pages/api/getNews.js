import { prisma } from "@/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const news = await prisma.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      res.status(200).json(news);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las noticias" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
