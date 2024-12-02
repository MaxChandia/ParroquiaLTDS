import '../styles/footer.css'
import Link from 'next/link'
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
    return(
        <div className='footerContainer'>
            <div> <Link href="/">
                <p className="navbarSubtitle">Parroquia</p>
                <p className="navbarSubtitle">La Transfiguración del Señor</p>
                </Link>
            </div>
            <div>
                <ul className='footerContact'>
                    <li><FaPhone/> +56 552 606216
                    </li>
                    <li><FaEnvelope/> tuparroquiainforma@gmail.com</li>
                    <li>Antilhue 01991, Antofagasta,
                    Chile</li>
                </ul>
            </div>
            <div>
                <ul className='footerPages'>
                    <li><Link href="/nuestraparroquia">Nuestra Parroquia</Link></li>
                    <li><Link href="/noticias">Noticias</Link></li>
                    <li><Link href="/materiales">Materiales</Link></li>
                    <li><Link href="/contacto">Contacto</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;