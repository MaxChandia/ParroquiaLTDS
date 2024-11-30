"use client";

import Navbar from "@/src/components/navbar.jsx";
import Footer from "@/src/components/footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import '../../styles/noticias.css';

// Definir la interfaz para una noticia
interface Noticia {
  id: number;
  title: string;
  createdAt: string;
  // Agrega otros campos necesarios, como el contenido, autor, etc.
}

export default function News() {
  const [news, setNews] = useState<Noticia[]>([]); // Especificar el tipo de noticias

  useEffect(() => {
    fetch("/api/getNews")
      .then((res) => res.json())
      .then((data) => {
        setNews(data); 
      })
      .catch((error) => console.error("Error al obtener las noticias", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="noticiasContainer">
        <h1>Noticias</h1>
        <div>
          <p>
            <Link href="/">Inicio</Link> | Noticias
          </p>
        </div>
        
        {/* Mostrar las noticias */}
        <div className="noticiasList">
          {news.length > 0 ? (
            news.map((noticia) => (
              <div className="noticiaItem" key={noticia.id}>
                <img alt="nota1"/>
                <h3>{noticia.title}</h3>
                <p>{new Date(noticia.createdAt).toLocaleDateString()}</p>
                <p>Leer más</p>
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
