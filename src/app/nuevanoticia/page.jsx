"use client";

import React, { useState } from "react";
import "../../styles/nuevanoticia.css";

export default function NewEntry() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  

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
