import Navbar from '@/src/components/navbar';
import Footer from '@/src/components/footer';
import { PrismaClient } from '@prisma/client';
import "../../../styles/noticia.css"

const prisma = new PrismaClient();

async function fetchNoticia(slug) {
  const noticia = await prisma.post.findUnique({
    where: { slug: slug },
  });

  return noticia;
}

export default async function Noticia({ params }) {
  const { slug } = params;

  const noticia = await fetchNoticia(slug);

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
