import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { slug } = req.query; 

  if (req.method === 'GET') {
    try {
      const publicacion = await prisma.post.findUnique({
        where: { slug: String(slug) },
      });

      if (!publicacion) {
        return res.status(404).json({ error: 'Publicación no encontrada' });
      }

      return res.status(200).json(publicacion);
    } catch (error) {
      console.error('Error al obtener la publicación:', error);
      return res.status(500).json({ error: 'Error al obtener la publicación' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { title, content } = req.body; 
  
      const updatedPost = await prisma.post.update({
        where: { slug: String(slug) },
        data: { title, content },
      });
  
      return res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error al actualizar la publicación:', error);
      return res.status(500).json({ error: 'Error al actualizar la publicación' });
    }
  }
  
  return res.status(405).json({ error: 'Método no permitido' });
}
