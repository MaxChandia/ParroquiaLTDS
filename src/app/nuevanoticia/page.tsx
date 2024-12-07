"use client";

import React, { useEffect, useState } from "react";
import "../../styles/nuevaNoticia.css";
import { Editor } from "@tinymce/tinymce-react";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

interface Noticia {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  slug: string;
  imageUrl: string;
}

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState<string>(""); // Cambiado de image a imageUrl (para aceptar una URL directamente)
  const [isLoading, setIsLoading] = useState(false);
  const [getNews, setGetNews] = useState<Noticia[]>([]);

  const handlePost = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug: title.toLowerCase().replace(/ /g, "-"),
          content: body,
          imageUrl: imageUrl || null, 
          authorId: "64bfcdd1f4f29b1234567890", 
        }),
      });

      if (!response.ok) {
        throw new Error("Error al publicar el post");
      }

      const data = await response.json();
      console.log("Post creado con éxito:", data);
      alert("Post publicado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al publicar el post");
    } finally {
      setIsLoading(false);
      setTitle("");
      setBody("");
      setImageUrl("");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("/api/getNews");
        const data = await response.json();
        setGetNews(data);
      } catch (error) {
        console.error("Hubo un error", error);
      }
    };
    fetchPost();
  }, []);

 /* const handleEdit = async (id: string, updatedData: Partial<Noticia>) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar la publicación");
      }

      const updatedPost = await response.json();
      setGetNews((prevNews) =>
        prevNews.map((noticia) =>
          noticia.id === id ? { ...noticia, ...updatedPost } : noticia
        )
      );
      alert("Publicación actualizada correctamente.");
    } catch (error) {
      console.error("No se ha podido actualizar los datos", error);
      alert("Error al actualizar los datos");
    }
  }; */

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar la publicación");
      }

      setGetNews((prevNews) => prevNews.filter((noticia) => noticia.id !== id));
      alert("Noticia eliminada correctamente");
    } catch (error) {
      console.error("No se pudo eliminar la noticia", error);
      alert("No se pudo eliminar la noticia");
    }
  };

  return (
    <div >
      <Navbar/>
      <div className="nuevaNoticia">
      <div className="nuevaNoticiaContainer">
        <div className="noticiaText">
          <h2>Escribir nueva publicación</h2>
          <input
            className="tituloNoticia"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor
             apiKey='8axg3jyj5eczh039dz73ejlm43c97ft2vrlgosz4fkeqd6et'  // Si tienes una API Key de TinyMCE, la puedes agregar aquí
            value={body}
            onEditorChange={(newValue) => setBody(newValue)}  // Actualiza el estado del contenido
            init={{
              height: 400,
              menubar: false,
              plugins: ["link", "image", "lists", "wordcount"], // Puedes añadir más plugins si es necesario
              toolbar: "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | link image", // Personaliza la barra de herramientas
            }}
          />

          {/* Aquí agregamos un input para ingresar una URL de la imagen */}
          <input
            type="text"
            placeholder="URL de la imagen"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button onClick={handlePost} disabled={isLoading}>
            {isLoading ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </div>

      <div className="noticiasCreadasContainer">
        <h2>Noticias creadas</h2>
        {getNews.length > 0 ? (
          getNews.map((noticia) => (
            <div className="noticiasCreadas" key={noticia.id}>
              <h4>{noticia.title}</h4>
              {/* <button onClick={() => handleEdit(noticia.id, { title: "Nuevo Título", content: "Nuevo Contenido" })}>Editar</button> */}
              <button onClick={() => handleDelete(noticia.id)}>Borrar</button>
            </div>
          ))
        ) : (
          <p>No hay noticias</p>
        )}
      </div>
      </div>
      <Footer/>
    </div>
  );
}
