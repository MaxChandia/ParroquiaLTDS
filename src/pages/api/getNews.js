import { prisma } from "@/prisma";

export default async function handler(req, res) {
  const { id } = req.query; // Obtén el id de la URL

  if (req.method === "GET") {
    try {
      if (id) {
        // Obtener una noticia específica
        const news = await prisma.post.findUnique({
          where: {
            id: parseInt(id), // Asegúrate de convertir el id si es necesario
          },
        });
        if (!news) {
          return res.status(404).json({ error: "Noticia no encontrada" });
        }
        return res.status(200).json(news);
      } else {
        // Obtener todas las noticias
        const news = await prisma.post.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
        return res.status(200).json(news);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las noticias" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
