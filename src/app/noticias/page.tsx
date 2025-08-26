"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "src/components/navbar.jsx";
import Footer from "src/components/footer";
import '../../styles/noticias.css';

interface Noticia {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  slug: string;
  imageUrls: string[];
}

export default function News() {
  const [news, setNews] = useState<Noticia[]>([]);
  const [loading, setLoading] =useState(true)

  useEffect(() => {
    const handleNews = async () => {
      try {
        const response = await fetch("/api/getNews");
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Hubo un error", error);
      } finally {
        setLoading(false)
      }
    };
    handleNews();
  }, []);

  const truncateHTMLContent = (html: string, maxLength: number): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.length > maxLength
      ? textContent.slice(0, maxLength) + "..."
      : textContent;
  };

  return (
    <div>
      <Navbar />
      <div className="noticiasContainer">
        <h1>Noticias</h1>
        <div className="noticiasLink">
          <p>
            <Link href="/">Inicio</Link> | Noticias
          </p>
        </div>
        <div className="noticiasListPage">
           {loading && (
            <div className="loadingContainer">
              <div className="animateSpin"></div>
            </div>
          )}
          {news.length > 0 ? (
            news
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              )
              .map((noticia) => (
                <Link href={`/noticias/${noticia.slug}`}><div className="noticiaItemPage" key={noticia.id}>
                  <img
                    src={noticia.imageUrls[0] || "default-image.jpg"}
                    alt={`Imagen de ${noticia.title}`}
                  />
                  <h3>{noticia.title}</h3>
                  <div className="NoticiasItemPageText"
                    dangerouslySetInnerHTML={{
                      __html: truncateHTMLContent(noticia.content, 100),
                    }}
                  />
                  
                    <button><Link href={`/noticias/${noticia.slug}`}>Leer más</Link></button>
                  
                </div></Link>
              ))
          ) : ( !loading &&
            <p>No hay noticias disponibles.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
