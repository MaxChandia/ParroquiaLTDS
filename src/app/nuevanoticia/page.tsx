"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/nuevanoticia.css";
import { Editor } from "@tinymce/tinymce-react";
import Navbar from "src/components/navbar";
import Footer from "src/components/footer";
import { Noticia } from "./noticiaModel";
import { createPost, deletePost, getNewsService } from "./nuevanoticia.service";


export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [getNews, setGetNews] = useState<Noticia[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/error");
    } else {
    
      setIsAuthenticated(true);
      setIsAuthenticating(false);
    }
  }, [token, router]);

  const cleanHtml = (html: string): string => {
    return html
      .replace(/<span[^>]*>/g, "")
      .replace(/<\/span>/g, "")
      .replace(/\s?dir="ltr"/g, ""); 
  };

  const removeDiacritics = (str: string): string => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
  };
  
const handlePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Tu sesión ha expirado. Por favor, vuelve a ingresar.");
      return;
    }

    setIsLoading(true);
    const cleanedBody = cleanHtml(body);
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", cleanedBody);
    formData.append("authorId", "1"); 
    
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await createPost(formData, token);
      
      alert("Post publicado correctamente");
      
    } catch (error) {
     if (error instanceof Error) {
        alert(error.message); 
      } else {
        alert("Hubo un problema al publicar el post. Intenta nuevamente.");
      }
    } finally {
      setIsLoading(false);
      setTitle("");
      setBody("");
      setSelectedFile(null); 
    }
  };
  
  useEffect(() => {
    getNewsService()
    .then((news) => setGetNews(news))
    .catch((error) => {
      console.error("Error al obtener las noticias:", error);
      alert("Error al obtener las noticias");
    })
  }, []);

  const handleDelete = async (id: string) => {

    const token = localStorage.getItem("token");
    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      return;
    }
    try {
     await deletePost(id, token);
      setGetNews((prevNews) => prevNews.filter((noticia) => noticia.id !== id));
      alert("Noticia eliminada correctamente");
    } catch (error) {
      console.error("No se pudo eliminar la noticia", error);
      alert("No se pudo eliminar la noticia");
    }
  };

  
    

  if (isAuthenticating) {
    return <div>Verificando autenticación...</div>;
  }

  if (!isAuthenticated) {
    return <div>No estás autenticado. Acceso denegado.</div>;
  }

  return (
    <div>
      <Navbar />
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
              apiKey="8axg3jyj5eczh039dz73ejlm43c97ft2vrlgosz4fkeqd6et"
              value={body}
              onEditorChange={(newValue) => setBody(newValue)}
              init={{
                height: 400,
                width: 650,
                menubar: false,
                plugins: ["link", "image", "lists", "wordcount"],
                toolbar: "undo redo | bold italic underline | numlist bullist",
                valid_elements: "*[*]",
                content_style: `
                  body { 
                    font-family: Montserrat, sans-serif; 
                    font-size: 14px; 
                    line-height: 1.5; 
                    margin: 0; 
                  }
                  p { 
                    margin: 0 0 1em; 
                  }
                `,
              }}
            />
         <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setSelectedFile(files[0]); 
                }
              }}
            />
          <div className="uploadedImages">
            {selectedFile && (
              <div className="uploadedImage">
                <span>{selectedFile.name}</span>
                <button onClick={() => setSelectedFile(null)}>x</button>
              </div>
            )}
          </div>
          </div>
          <div className="buttons">
            <button onClick={handlePost} disabled={isLoading}>
              {isLoading ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </div>
        <div className="noticiasCreadasTitle">
        <h2>Noticias creadas</h2> 
        </div>       
        <div className="noticiasCreadasContainer">
          
          {getNews.length > 0 ? (
            getNews
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              )
              .map((noticia) => (
                <div className="noticiasCreadas" key={noticia.id}>
                  <h4 onClick={() => router.push(`/noticias/${noticia.slug}`)}>{noticia.title}</h4>
                  <div className="buttonContainer">
                  <button  onClick={() => router.push(`/editar/${noticia.slug}`)} >Editar</button>
                  <button onClick={() => handleDelete(noticia.id)}>Borrar</button>
                  </div>
                </div>
              ))
          ) : (
            <p>No hay noticias</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
