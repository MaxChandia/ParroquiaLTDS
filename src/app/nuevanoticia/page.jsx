"use client";
import React, { useState } from "react";
import "../../styles/nuevanoticia.css";

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Para mostrar feedback de carga

  async function handlePost() {
    if (!title || !body) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setIsLoading(true); // Activamos el estado de carga
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content: body }),
      });

      if (!response.ok) {
        // Si el servidor devuelve un error
        const errorMessage = await response.text();
        console.error("Error del servidor:", errorMessage);
        alert(`Error al crear el post: ${response.statusText}`);
        return;
      }

      const data = await response.json();
      if (data.success) {
        alert("Post creado exitosamente");
        setTitle(""); // Limpiamos el formulario
        setBody("");
      } else {
        alert("Ocurrió un error al crear el post.");
      }
    } catch (error) {
      console.error("Error de red o cliente:", error);
      alert("No se pudo conectar con el servidor. Inténtalo más tarde.");
    } finally {
      setIsLoading(false); // Desactivamos el estado de carga
    }
  }

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
