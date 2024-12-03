import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, slug, content, imageUrl, authorId } = req.body || {};

    // Validar los campos obligatorios
    if (!title || !slug || !content || !authorId) {
      return res.status(400).json({
        error: "El título, slug, contenido y authorId son obligatorios",
      });
    }

    try {
      // Crear el post en la base de datos
      const newPost = await prisma.post.create({
        data: {
          title,
          slug,
          content,
          imageUrl: imageUrl || null, // Opcional
          authorId,
        },
      });

      return res.status(201).json(newPost);
    } catch (error) {
      console.error("Error al crear el post:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
        details: error.message,
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
