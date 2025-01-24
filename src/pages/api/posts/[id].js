import { PrismaClient } from '/prisma/client';

const prisma = new PrismaClient(); // Crear una nueva instancia del cliente de Prisma

export default async function handler(req, res) {
  const { id } = req.query; // Capturar el ID de la URL (por ejemplo, /api/posts/123)

  if (req.method === 'DELETE') {
    try {
      // Eliminar la publicación con el ID proporcionado
      const deletedPost = await prisma.post.delete({
        where: { id },
      });

      // Retornar un mensaje de éxito junto con los detalles de la publicación eliminada
      return res.status(200).json({ message: 'Post eliminado con éxito', post: deletedPost });
    } catch (error) {
      console.error('Error al eliminar el post:', error);
      return res.status(500).json({ error: 'Error al eliminar el post' });
    }
  } else {
    return res.status(405).json({ error: 'Método no permitido' }); // Si no es un DELETE
  }
}


