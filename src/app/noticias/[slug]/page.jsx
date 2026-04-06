import Navbar from 'src/components/navbar';
import Footer from 'src/components/footer';
import Image from 'next/image';
import "../../../styles/noticia.css";

async function fetchNoticia(slug) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/slug/${slug}`, {
      cache: 'no-store' 
    });
    console.log("Respuesta de la API:", response);
    if (!response.ok) return (
      <div>
        <Navbar />
        <div className="noticiaContainer">
          <h1>Noticia no encontrada</h1>
          <p>La noticia que estás buscando no existe o ha sido eliminada.</p>
        </div>
        <Footer />
      </div>
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener la noticia:", error);
    return null;
  }
}

export default async function NoticiaPage({ params }) {
  const { slug } = params;
  const noticia = await fetchNoticia(slug);



  return (
    <div>
      <Navbar />
      <div className="noticiaContainer">
        <h1>{noticia.title}</h1>
        <p className='noticiaContainerDate'>Fecha: {new Date(noticia.createdAt).toLocaleDateString()}</p>
        
        <div className="noticiasContainerText" dangerouslySetInnerHTML={{ __html: noticia.content }} />
      </div>
      
      <div className="noticiaImagen">
        {noticia.images && noticia.images.length > 0 &&
          noticia.images.map((image, index) => (
            <Image
              key={image.id || index}
              src={image.url}
              alt={`Imagen de ${noticia.title}`}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}