import Navbar from 'src/components/navbar';
import Footer from 'src/components/footer';
import Image from 'next/image';
import "../../../styles/noticia.css";

async function fetchNoticia(slug) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/post/slug/${slug}`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    console.log("2. Status de la respuesta:", response.status);

    if (!response.ok) {
      console.log("3. El backend rechazó la petición o no encontró el slug.");
      return null;
    }
    
    const data = await response.json();
    console.log("4. Noticia recibida correctamente:", data.title); 
  } catch (error) {
    console.error("ERROR GRAVE DE CONEXIÓN AL BACKEND:", error.message); 
    return null; 
  }
}

export default async function NoticiaPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  console.log("0. Slug capturado de la URL:", slug); 
  const noticia = await fetchNoticia(slug);

  if (!noticia) {
    return (
      <div>
        <Navbar />
        <div className="noticiaContainer">
          <h1>Noticia no encontrada</h1>
          <p>La noticia que estás buscando no existe o ha sido eliminada.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="noticiaContainer">
        <h1>{noticia.title}</h1>
        <p className='noticiaContainerDate'>
          Fecha: {noticia.createdAt ? new Date(noticia.createdAt).toLocaleDateString() : 'Sin fecha'}
        </p>
        
        <div 
          className="noticiasContainerText" 
          dangerouslySetInnerHTML={{ __html: noticia.content || "" }} 
        />
      </div>
      
      <div className="noticiaImagen">
        {noticia.images && noticia.images.length > 0 &&
          noticia.images.map((image, index) => (
            <Image
              key={image.id || index}
              src={image.url}
              alt={`Imagen de ${noticia.title}`}
              width={800} 
              height={450}
            />
          ))}
      </div>
      <Footer />
    </div>
  );
}