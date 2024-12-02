import { prisma } from "@/prisma";
import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";

export default async function Noticia({ params }) {
    const { id } = await params; // Resolver params
    const noticia = await prisma.post.findUnique({
      where: {
        id: id.toString(), // Convertir a String
      },
    });
  
    if (!noticia) {
      return <p>No se encontró la noticia.</p>;
    }
  
    return (
      <div>
        <Navbar/>
        <h1>{noticia.title}</h1>
        <p>{new Date(noticia.createdAt).toLocaleDateString()}</p>
        <p>{noticia.content}</p>
        <img src={noticia.imageUrl}/>
        <Footer/>
      </div>
    );
  }
  
