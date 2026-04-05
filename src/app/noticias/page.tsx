import Link from "next/link";
import Navbar from "src/components/navbar.jsx";
import Footer from "src/components/footer";
import NewsContainer from "src/components/newsContainer/newsContainer.jsx";
import '../../styles/noticias.css';
import NewsGrid from "@/components/newsGrid/newsGrid";



export default function News() {
  

  return (
    <div>
      <Navbar />
      <div className="noticiasContainer">
        <h1>Noticias</h1>
        <div className="noticiasLink">
          <p>
            <Link href="/">Inicio</Link> | Noticias
          </p>
        </div>
        <div className="noticiasListPage">
          <NewsGrid />
        </div>
        </div>
      <Footer />
    </div>
  );
}
