"use client";

import Navbar from '@/src/components/navbar';
import Footer from '@/src/components/footer';
import "../../../styles/editar.css";
import { useState, useEffect } from 'react';

interface Noticia {
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  imageUrls: string[];
}

interface EditarNoticiaProps {
  params: {
    slug: string; // Ajustamos para que coincida con Next.js
  };
}

export default function EditarNoticia({ params }: EditarNoticiaProps) {
  const { slug } = params;
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    async function fetchNoticia() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/edit/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch noticia');
        }
        const data = await response.json();
        setNoticia(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error('Error fetching noticia:', error);
      }
    }
    fetchNoticia();
  }, [slug]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/edit/${slug}`, {
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
