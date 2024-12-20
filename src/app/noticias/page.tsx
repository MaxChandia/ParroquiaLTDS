"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/src/components/navbar.jsx";
import Footer from "@/src/components/footer";
import '../../styles/noticias.css';

interface Noticia {
  id: string;
  title: string;
  createdAt: string;
  slug: string;
  imageUrls: string;
}

export default function News() {
  const [news, setNews] = useState<Noticia[]>([]);

  useEffect(() => {
    const handleNews = async () => {
      try {
        const response = await fetch ("/api/getNews");
        const data = await response.json();
        setNews(data);
      } catch (error){
        console.error ("hubo un error", error);
      }
    }; handleNews();
  }, []);

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
          {news.length > 0 ? (
            news
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              )
              .map((noticia) => (
                <div className="noticiaItemPage" key={noticia.id}>
                  <img
                    src={noticia.imageUrls[0] || "default-image.jpg"}
                    alt={`Imagen de ${noticia.title}`}
                  />
                  <h3>{noticia.title}</h3>
                  <Link href={`/noticias/${noticia.slug}`}><button>Leer más</button></Link>
                </div>
              ))
          ) : (
            <p>No hay noticias disponibles.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}


