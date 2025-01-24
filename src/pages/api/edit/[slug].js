import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Crear una nueva instancia del cliente de Prisma

// Manejar las solicitudes GET y PUT para editar una publicación
export default async function handler(req, res) {
  const { slug } = req.query; // Capturar el slug de la URL (por ejemplo, /api/edit/my-post)

  if (req.method === 'GET') {
    try {
      // Buscar la publicación por slug
      const publicacion = await prisma.post.findUnique({
        where: { slug: String(slug) },
      });

      if (!publicacion) {
        return res.status(404).json({ error: 'Publicación no encontrada' });
      }

      // Retornar la publicación encontrada
      return res.status(200).json(publicacion);
    } catch (error) {
      console.error('Error al obtener la publicación:', error);
      return res.status(500).json({ error: 'Error al obtener la publicación' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { title, content } = req.body; // Asegúrate de usar 'content' en lugar de 'body'
  
      // Actualizar la publicación con el slug correspondiente
      const updatedPost = await prisma.post.update({
        where: { slug: String(slug) },
        data: { title, content }, // Usa 'content' aquí también
      });
  
      // Retornar la publicación actualizada
      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error al actualizar la publicación:', error);
      return res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
  }

  // Si el método no es ni GET ni PUT, retornar un error 405 (Método no permitido)
  return res.status(405).json({ error: 'Método no permitido' });
}
