import Link from "next/link.js";
import Footer from "../components/footer.jsx"
import "../styles/home.css"
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
  return (
      <div>
        <div className={`NavbarHome ${montserrat.className}`}>
          <div className="navbarLogo">
            <Link href="/">
                <p className="navbarSubtitle">Parroquia</p>
                <p className="navbarSubtitle">La Transfiguración del Señor</p>
              </Link>
          <div/>
          </div>
          <div className="navbarSections">
            <ul>
              <li><Link href="/">INICIO</Link></li>
              <li><Link href="/nuestraparroquia">NUESTRA PARROQUiA</Link></li>
              <li><Link href="/noticias">NOTICIAS</Link></li>
              <li><Link href="/materiales">MATERIALES</Link></li>
              <li><Link href="/contacto">CONTACTO</Link></li>
              <li className="donations"><Link href="/aportes"><button>APORTES</button></Link></li>
            </ul>
          </div>
      </div>
      <div className="homeImage">
        <img src="/images/parroquialanding.jpg"/>
      </div>
      <div className="misasInformacion">
        <div>
          <h2>Misas</h2>
          <p>Martes a Sábado: 20:00</p>
          <p>Domigos 12:00 y 20:00</p>
        </div>
        <div>
          <h2>Adoración al santísimo</h2>
          <p>Viernes después de</p>
          <p>Misa de 20:00</p>
        </div>
        <div>
          <h2>Dirección</h2>
          <p>Antilhue 01991, Coviefi,</p>
          <p>Antofagasta</p>
        </div>
      </div>
      <section className="parroquiaInfo">
          <img src="/images/misalanding.jpg"/>
          <button><Link href="/nuestraparroquia">Conoce nuestra iglesia</Link></button>
      </section>
        <section className="noticiasLanding">
          <h3>Novedades Parroquiales</h3>
          <div className="noticiasCard"></div>
          <div className="noticiasCard"></div>
          <div className="noticiasCard"></div>
          <button><Link href='/noticias'>Ver más noticias</Link></button>
        </section>
        <section className="donacionLanding">
          <div className="donacionLandingContainer">
            <h3>La caridad de Cristo</h3>
            <p>Tu aporte nos ayuda a seguir creciendo</p>
            <p>Banco Santander</p>
            <p>cuenta cte. N°3339505924</p>
            <p>Rut 81.735.106-9 </p>
            <p>email: tuparroquiainforma@gmail.com</p>
          </div>
          <div className="donacionLandingImage">
            <img src="/images/logo1.jpg"/>
          </div>
        </section>
        <Footer/>
      </div>
  );
}
