import Link from "next/link";
import "../newsGrid/newsGrid.css";
import { Noticia, NoticiaImages } from "@/app/nuevanoticia/noticiaModel";

// Buscamos los datos directamente en el servidor
async function fetchNoticias() {
  try {
    const response = await fetch("https://etjsmpnny3.us-east-1.awsapprunner.com/api/post", {
      cache: 'no-store' // Para que siempre traiga las noticias más recientes
    });
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error trayendo las noticias:", error);
    return [];
  }
}

// Recibe un "limit" opcional para saber cuántas mostrar
export default async function NoticiasGrid({ limit }: { limit?: number }) {
  const noticias = await fetchNoticias();

  // Ordenamos por fecha
  const sortedNews = noticias.sort(
    (a: Noticia, b: Noticia) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Si le pasamos un límite (ej: 3 para el home), lo recorta. Si no, muestra todas.
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