"use client";

import React, { useState } from "react";
import "../../styles/nuevanoticia.css";

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
          slug: title.toLowerCase().replace(/ /g, "-"), // Generar slug automáticamente
          content: body,
          imageUrl: image ? URL.createObjectURL(image) : null,
          authorId: "64bfcdd1f4f29b1234567890", // Reemplazar con el ID real del autor
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
      setImage(null);
    }
  };

  return (
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
          <textarea
            className="cuerpoNoticia"
            placeholder="Escribe el texto aquí"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="buttons">
          <button onClick={handlePost} disabled={isLoading}>
            {isLoading ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </div>
    </div>
  );
}
