import Navbar from "@/src/components/navbar.jsx";
import Footer from "@/src/components/footer";
import Link from "next/link";
import "../../styles/aportes.css"

export default function Aportes() {
  return (
      <div>
        <Navbar/>
        <div className="aportesContainer ">
        <h1>Aportes</h1>
          <div>
            <p><Link href="/">Inicio</Link> | Aportes</p>
          </div>
        </div>
          <div className="aportesContainerImage">
            <img src="/images/misa.jpg"/>
            <div className="aportesDetalles">
              <h2>La caridad de Cristo</h2>
              <p>Tu aporte nos ayuda a seguir creciendo</p>
              <p>Banco Santander</p>
              <p>cuenta cte. N°3339505924</p>
              <p>Rut 81.735.106-9 </p>
              <p>email: tuparroquiainforma@gmail.com</p>
            </div>
          </div>
        <Footer/>
      </div>
  );
}
