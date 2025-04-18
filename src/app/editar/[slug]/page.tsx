"use client";

import Navbar from 'src/components/navbar';
import Footer from 'src/components/footer';
import "../../../styles/editar.css";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';  //

interface Noticia {
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  imageUrls: string[];
}

export default function EditarNoticia() {
  const params = useParams();  

  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!params?.slug) return; 


    const fetchNoticia = async () => {
      try {
        const response = await fetch(`/api/edit/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setNoticia(data);
          setTitle(data.title);
          setContent(data.content);
        } else {
          throw new Error('No se pudo obtener la noticia');
        }
      } catch (error) {
        console.error('Error fetching noticia:', error);
      }
    };

    fetchNoticia();
  }, [params?.slug]);  

  const handleUpdate = async () => {
    if (!noticia) return;

    try {
      const response = await fetch(`/api/edit/${params?.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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

  if (!noticia) {
    return <div>Cargando...</div>;
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
