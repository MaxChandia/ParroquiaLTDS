import "../styles/navbar.css"
import { Montserrat } from 'next/font/google';
import Link from "next/link";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const Navbar = () => {

  return (
    <div className={`Navbar ${montserrat.className}`}>
          <div className="navbarLogo">
              <p className="navbarSubtitle">Parroquia</p>
              <p className="navbarSubtitle">La Transfiguración del Señor</p>
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
  );
};

export default Navbar; 