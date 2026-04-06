"use client";

import Navbar from 'src/components/navbar';
import Footer from 'src/components/footer';
import { Noticia } from '@/app/nuevanoticia/noticiaModel';
import "../../../styles/editar.css";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';



export default function EditarNoticia() {
  const params = useParams();
  const slug = params?.slug as String;
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!slug) return;
    
    const fetchNoticia = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/slug/${slug}`);
        const data = await response.json();
        console.log(data);
        setNoticia(data);
        setTitle(data.title || '')
        setContent(data.content || '')
      } catch (error) {
        console.error('No se pudo encontrar la noticia', error);
        setError('No se pudo encontrar la noticia');
      }
    };
    
    fetchNoticia();
  }, [slug]);

  const handleUpdate = async () => {


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/slug/${slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error('Failed to update noticia');
      }

      const updatedNoticia = await response.json();
      console.log('Noticia actualizada:', updatedNoticia);
      alert('Noticia actualizada exitosamente');
    } catch (error) {
      console.error('No se pudo actualizar:', error);
      alert('Ocurrió un error al actualizar la noticia');
    }
  };

  if (error) {
    return (
      <div className="editarContainer">
        <Navbar />
        <div className="editarContainerText">
          <div>{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!noticia) {
    return (
      <div className="editarContainer">
        <Navbar />
        <div className="editarContainerText">
          <div>No hay noticia</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="editarContainer">
      <Navbar />
      <div className="editarContainerText">
        <h1>Editar: {noticia.title}</h1>
        <div className="editForm">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            name="content"
          />
          <button onClick={handleUpdate}>Actualizar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
