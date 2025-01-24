import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      return handlePost(req, res);
    case "GET":
      return handleGet(req, res);
    case "PUT":
      return handlePut(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      return res.status(405).json({ error: `Método ${method} no permitido` });
  }
}

async function handlePost(req, res) {
  const { title, slug, content, imageUrls, authorId } = req.body || {};

  if (!title || !slug || !content || !authorId || !imageUrls) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios, incluida la imagen",
    });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        imageUrls,
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
}


async function handleGet(req, res) {
  try {
    const posts = await prisma.post.findMany();
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
}

async function handlePut(req, res) {
  const { id, title, slug, content, imageUrl } = req.body || {};

  if (!id) {
    return res.status(400).json({ error: "El ID es obligatorio para actualizar" });
  }

  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        imageUrl,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error al actualizar el post:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
}

async function handleDelete(req, res) {
  const { id } = req.body || {};

  if (!id) {
    return res.status(400).json({ error: "El ID es obligatorio para eliminar" });
  }

  try {
    await prisma.post.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Post eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el post:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      details: error.message,
    });
  }
}
