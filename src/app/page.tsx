import Link from "next/link.js";
import Footer from "../components/footer.jsx"
import "../styles/home.css"
import "../styles/navbar.css"
import { Montserrat } from 'next/font/google';
import { FaBars } from 'react-icons/fa';
import NewsContainer from "../components/newsContainer/newsContainer.jsx";
import NewsGrid from "@/components/newsGrid/newsGrid";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
      

  return (
      <div className="homeContainer">
        <div className={`NavbarHome ${montserrat.className}`}>
          <div className="navbarHomeLogo">
            <Link href="/">
                <img src='/images/logofinal.png' alt='logo'></img>
              </Link>
          <div/>
          </div>
          <div className="navbarHomeSections">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="iconsHome"> <FaBars /></label>
            <ul className="navbarHomeUl">
            <div className="navLogoQuery">
              <Link href="/">
                <p className="navbarHomeSubtitle">Parroquia</p>
                <p className="navbarHomeSubtitle">La Transfiguración del Señor</p>
              </Link>
              <input type="checkbox" id="check" />
              <label htmlFor="check" className="iconsHomeNav"> <FaBars /></label>
            </div>
              <li><Link href="/">INICIO</Link></li>
              <li className="dropdownHome">
                  NUESTRA PARROQUIA ▾
               <ul className="dropdown-menuHome">
                  <li><Link href="/nuestraparroquia">COMUNIDAD</Link></li>
                  <li> <Link href="/nuestraparroquia/pastores">PASTORES</Link></li>      
                </ul>
              </li>
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
      <section className="noticiasLanding">
          <h2>Novedades Parroquiales</h2>
          <NewsGrid limit={3}/>
          <button><Link href='/noticias'>Ver más noticias</Link></button>
        </section>
      <section className="parroquiaInfo">
          <img src="/images/misalanding.jpg"/>
          <button><Link href="/nuestraparroquia">Conoce nuestra iglesia</Link></button>
      </section>
      <div className="misasInformacion">
        <div className="misasInformacionContainer">
          <h2>Misas</h2>
          <p>Martes a Sábado: 20:00</p>
          <p>Domingos 12:00 y 20:00</p>
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
