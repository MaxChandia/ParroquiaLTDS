import Navbar from '@/src/components/navbar';
import Footer from '@/src/components/footer';
import { PrismaClient } from '@prisma/client';
import "../../../styles/noticia.css"

const prisma = new PrismaClient();

async function fetchNoticia(slug) {
  // Encuentra la noticia usando el slug
  const noticia = await prisma.post.findUnique({
    where: { slug: slug },
  });

  return noticia;
}

export default async function Noticia({ params }) {
  const { slug } = params;

  // Traer la noticia usando la función asincrónica
  const noticia = await fetchNoticia(slug);

  // Si no se encuentra la noticia, muestra un mensaje de error
  if (!noticia) {
    return <p>No se encontró la noticia.</p>;
  }

  return (
    <div>
      <Navbar />
      <div className='noticiaContainer'>
        <h1>{noticia.title}</h1>
        <p>Fecha: {new Date(noticia.createdAt).toLocaleDateString()}</p>
        <p>{noticia.content}</p>
        <img src={noticia.imageUrl} alt={`Imagen de ${noticia.title}`} />
        </div>
      <Footer />
    </div>
  );
}
