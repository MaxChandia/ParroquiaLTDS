import Navbar from "@/src/components/navbar.jsx";
import Footer from "@/src/components/footer";
import Link from "next/link";
import "../../styles/contacto.css"

export default function Contacto() {
  return (
      <div>
        <Navbar/>
        <div className="contactoContainer">
          <h1>Contacto</h1>
          <div>
            <p className="contactoLink"><Link href="/">Inicio</Link> | Contacto</p>
          </div>
          <div className="contactoSection">
            <div className="contactoInformacion">
              <h2>Datos de Contacto</h2>
              <p>Sra. Marcela Quintela</p>
              <p>+56 552 606216</p>
              <p>tuparroquiainforma@gmail.com</p>
              <h2>Dirección</h2>
              <p>Calle Antilhue 01991 (coviefi)</p>
              <p>Antofagasta, Chile</p>
              <h2>Horarios de Oficina</h2>
              <p>Martes a Sábado: 18:30 a 21:00 hrs.</p>
              <p>Domingo: 10:30 a 14:00 hrs.</p>
            </div>
            <div className="contactoFormulario">
              <form>
                <input placeholder="Nombre"></input>
                <input placeholder="Correo"></input>
                <textarea placeholder="Mensaje..."></textarea>
                <button>Enviar</button>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  );
}
