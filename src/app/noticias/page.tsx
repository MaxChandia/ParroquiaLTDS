import Navbar from "@/src/components/navbar.jsx";
import Footer from "@/src/components/footer";
import '../../styles/noticias.css'

export default function News() {
  return (
      <div>
        <Navbar/>
        <div className="noticiasContainer" style={{height:"370px"}}>
          <h1>Noticias</h1>
          <div>
            <p>Inicio | Noticias</p>
          </div>
        </div>
        <Footer/>
      </div>
  );
}
