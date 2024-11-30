import { prisma } from "@/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, authorId } = req.body;

    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          author: { connect: { id: authorId } }, // Conecta con el usuario único
        },
      });
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el post" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}