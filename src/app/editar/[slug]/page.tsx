import Navbar from '@/src/components/navbar';
import Footer from '@/src/components/footer';
import "../../../styles/noticia.css";

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

  const handleUpdate = async (slug:string) => {
    try {
        const response = await fetch('/api/edit/${slug}')
    }catch(error){
        console.error("No se pudo actualizar")
    }
  }

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
          <button>Actualizar</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
