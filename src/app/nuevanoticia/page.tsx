"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/nuevanoticia.css";
import { Editor } from "@tinymce/tinymce-react";
import Navbar from "src/components/navbar";
import Footer from "src/components/footer";

interface Noticia {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  slug: string;
  imageUrls: string;
}

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [getNews, setGetNews] = useState<Noticia[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [isAuthenticating, setIsAuthenticating] = useState(true); // Estado de verificación de autenticación
  const router = useRouter();

  // Comprobamos el token inmediatamente al cargar el componente
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      // Si no hay token, redirige a la página de error
      router.push("/error");
    } else {
      // Si hay un token válido, cambiamos el estado de autenticación
      setIsAuthenticated(true);
      setIsAuthenticating(false);
    }
  }, [token, router]);

  const cleanHtml = (html: string): string => {
    return html
      .replace(/<span[^>]*>/g, "") // Remueve etiquetas <span>
      .replace(/<\/span>/g, "")
      .replace(/\s?dir="ltr"/g, ""); // Elimina dir="ltr"
  };

  const removeDiacritics = (str: string): string => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remueve los diacríticos
  };
  
  const handlePost = async () => {
    setIsLoading(true);
    const cleanedBody = cleanHtml(body);
    const cleanedTitle = removeDiacritics(title.toLowerCase().replace(/ /g, "-")); // Elimina tildes y genera slug
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug: cleanedTitle,
          content: cleanedBody,
          imageUrls, // Enviar todas las URLs de las imágenes
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
      setImageUrls([]);
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

  const handleImageUpload = async (files: FileList) => {
    const newImageUrls: string[] = [];
    const progressElement = document.getElementById("progressBar") as HTMLDivElement;
  
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");
  
      try {
        // Usamos fetch para subir el archivo con el progreso
        const response = await fetch(`https://api.cloudinary.com/v1_1/dqp4mnozy/image/upload`, {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Error al subir la imagen");
        }
  
        const data = await response.json();
        console.log("URL de la imagen subida:", data.secure_url);
        newImageUrls.push(data.secure_url);
  
        // Al completar la subida de la imagen, actualizamos la barra de progreso
        progressElement.style.width = "100%";
        progressElement.textContent = "¡Carga completa!";
  
      } catch (error) {
        console.error("Error al cargar el archivo:", error);
        alert("Error al cargar una imagen. Intenta nuevamente.");
      }
    }
  
    // Después de cargar todas las imágenes, actualizamos el estado
    setImageUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
  };
  

  // Si aún estamos verificando la autenticación, mostramos el mensaje correspondiente
  if (isAuthenticating) {
    return <div>Verificando autenticación...</div>;
  }

  // Si no está autenticado, redirigimos a la página de error
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
              multiple
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  handleImageUpload(files);
                }
              }}
            />
            <div className="progressContainer">
            <div id="progressBar" className="progressBar"></div>
          </div>
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
            getNews
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              )
              .map((noticia) => (
                <div className="noticiasCreadas" key={noticia.id}>
                  <h4>{noticia.title}</h4>
                  <button onClick={() => handleDelete(noticia.id)}>Borrar</button>
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
