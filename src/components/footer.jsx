import '../styles/footer.css'
import Link from 'next/link'
import { FaEnvelope, FaPhone, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return(
        <div className='footerContainer'>
            <div className='socialLinksContainer'> <Link href="/">
                <p className="navbarSubtitle">Parroquia</p>
                <p className="navbarSubtitle">La Transfiguración del Señor</p>
                <ul className='socialLinks'>
                    <li><a href="https://www.facebook.com/groups/233445130185735" target="_blank" rel="noopener noreferrer"><FaFacebook/></a></li>
                    <li><a href="https://www.instagram.com/pq_transfiguracionantofa/" target="_blank" rel="noopener noreferrer"><FaInstagram/></a></li>
                </ul>
                </Link>
            </div>
            <div>
                <ul className='footerContact'>
                    <div style={{display:'flex', gap: '10px'}}>
                        <span style={{height:'20px'}}><FaPhone/></span>
                        <li> +56 552 606216</li>
                    </div>
                     <div style={{display:'flex', justifyContent: 'center', gap: '10px'}}>
                        <span ><FaEnvelope style={{height:'22px'}}/></span>
                        <li>tuparroquiainforma@gmail.com</li>
                    </div>
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