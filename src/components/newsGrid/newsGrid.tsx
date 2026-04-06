import Link from "next/link";
import "../newsGrid/newsGrid.css";
import { Noticia } from "@/app/nuevanoticia/noticiaModel";

async function fetchNoticias() {
  try {
    const response = await fetch("https://etjsmpnny3.us-east-1.awsapprunner.com/api/post", {
      cache: 'no-store' 
    });
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error trayendo las noticias:", error);
    return [];
  }
}

export default async function NoticiasGrid({ limit }: { limit?: number }) {
  const noticias = await fetchNoticias();

  
  const sortedNews = noticias.sort(
    (a: Noticia, b: Noticia) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );


  const displayedNews = limit ? sortedNews.slice(0, limit) : sortedNews;

  const getImageUrls = (images: string[]) => {
    return images?.length > 0 ? images[0] : "/images/default.jpg";
  };

  return (
    <div className="gridNoticias">
      {displayedNews.length > 0 ? (
        displayedNews.map((noticia: Noticia) => (
          <Link href={`/noticias/${noticia.slug}`} key={noticia.id} className="tarjetaNoticia">
            <img src={getImageUrls(noticia.images.map((img) => img.url))} alt={`Imagen de ${noticia.title}`} />
            
            <div className="tarjetaContenido">
              <h3>{noticia.title}</h3>
              <div 
                className="tarjetaTexto"
                dangerouslySetInnerHTML={{ __html: noticia.content.substring(0, 150) + "..." }}
              />
              <button>Leer más</button>
            </div>
          </Link>
        ))
      ) : (
        <p>No hay noticias disponibles.</p>
      )}
    </div>
  );
}