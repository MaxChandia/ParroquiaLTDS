import Navbar from '@/src/components/navbar';
import Footer from '@/src/components/footer';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function Noticia({ params }) {
  const { slug } = params;

  // Encuentra la noticia usando el slug
  const noticia = await prisma.post.findUnique({
    where: { slug: slug }, // Aquí buscamos por slug
    include: { author: true },
  });

  if (!noticia) {
    return <p>No se encontró la noticia.</p>;
  }

  // En este punto ya tenemos la noticia con todos los datos
  return (
    <div>
      <Navbar />
      <h1>{noticia.title}</h1>
      <p>{new Date(noticia.createdAt).toLocaleDateString()}</p>
      <p>{noticia.content}</p>
      <img src={noticia.imageUrl} alt={`Imagen de ${noticia.title}`} />
      {noticia.author && <p>Autor: {noticia.author.user}</p>}
      <Footer />
    </div>
  );
}
