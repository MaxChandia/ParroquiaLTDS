import Navbar from "@/src/components/navbar.jsx";
import Footer from "@/src/components/footer";
import "../../styles/aportes.css"

export default function Aportes() {
  return (
      <div>
        <Navbar/>
        <div className="aportesContainer " style={{height:"370px"}}>
        <h1>Aportes</h1>
          <div>
            <p>Inicio | Aportes</p>
          </div>
        </div>
        <Footer/>
      </div>
  );
}
