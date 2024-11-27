import Navbar from "@/src/components/navbar.jsx";
import Footer from "@/src/components/footer";
import Link from "next/link";
import '../../styles/parroquia.css';


export default function Parroquia() {

  const Slides = [
    {id:1,src:"/images/parro1.jpg",alt:"parroquia-1"},
    {id:2,src:"/images/parro2.jpg",alt:"parroquia-2"},
    {id:3,src:"/images/parro3.jpg",alt:"parroquia-3"},
  ];

  return (
      <div>
        <Navbar/>
        <div className="parroquiaContainer" style={{height:"auto"}}>
          <h1>Parroquia La Transfiguración del Señor</h1>
          <div>
            <p><Link href="/">Inicio</Link> | Parroquia</p>
          </div>
          <p>Somos una comunidad que busca acercarse a Dios, aprender de su hijo, y volverse misionera buscando vivir de su palabra, acompañados siempre del Espíritu Santo. Estamos ubicados en el sector sur de la ciudad de Antofagasta y estamos al servicio de la comunidad, entregando lo necesario para vivir y acrecentar la fe.</p>
          <p><b>Hay espacio para todos en la casa de Dios</b></p>
          <div className="parroquiaFotos">
            {Slides.map((slide)=>(
              <img key={slide.id} src={slide.src} alt={slide.alt}/>
            ))}
          </div>
        </div>
        <Footer/>
      </div>
  );
}
