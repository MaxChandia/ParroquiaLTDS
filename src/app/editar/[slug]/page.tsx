"use client";

import Navbar from '@/src/components/navbar';
import Footer from '@/src/components/footer';
import "../../../styles/noticia.css";
import { title } from 'process';

interface Noticia {
  title: string;
  content: string;
  slug: string;
  createdAt: string;
  imageUrls: string[];
}

interface EditarNoticiaProps {
  params: { slug: string };
}

async function fetchNoticia(slug: string): Promise<Noticia> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/edit/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch noticia');
  }
  return response.json();
}

export default async function EditarNoticia({ params }: EditarNoticiaProps) {
  const noticia = await fetchNoticia(params.slug);

  const handleUpdate = async (slug: string) => {
    const title = (document.querySelector('input[name="title"]') as HTMLInputElement).value;
    const content = (document.querySelector('textarea[name="content"]') as HTMLTextAreaElement).value;

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

  return (
    <div>
      <Navbar />
      <div className="noticiaContainer">
        <h1>Editar: {noticia.title}</h1>
        <div className="editForm">
          <input
            type="text"
            defaultValue={noticia.title}
            name="title"
          />
          <textarea
            defaultValue={noticia.content}
            name="content"
          />
          <button onClick={() => handleUpdate(params.slug)}>Actualizar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}