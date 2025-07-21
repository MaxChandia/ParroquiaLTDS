import Navbar from "src/components/navbar.jsx";
import Footer from "src/components/footer";
import Link from "next/link";
import '../../styles/materiales.css'

export default function Materiales() {
  return (
    <>
      <Navbar />
      <div className="materialesContainer" style={{ height: "370px" }}>
        <h1>Materiales</h1>
        <div>
          <p><Link href="/">Inicio</Link> | Materiales</p>
        </div>
        <p>
          Es fundamental que podamos crecer en el conocimiento de Dios, por medio de las escrituras y también del magisterio, así como de tanta lectura complementaria,
          que nos aporta para profundizar en mi relación y amistad con Dios.
        </p>
      </div>

      <div className="materialesSection">
        <div className="section">
          <div className="imageSection">
            <img src="/images/biblia.jpg" alt="Description 1" />
          </div>
          <div className="descriptionSection">
            <h2>Biblia de Jerusalen </h2>
            <p>
              Buen material para estudiar y consultar sobre las dudas de la fe. Depende de cada uno de nosotros como queremos acercarnos a Dios y sus enseñanzas. 
            </p>
            <a href="/docs/Bibilia-de-Jersualen.pdf" className="materialButton">Descargar</a>
          </div>
        </div>

        <div className="section">
          <div className="descriptionSection">
            <h2>Catequesis para niños </h2>
            <p>
              Este material, puede aportar al crecimiento de los niños y ayudarlos para que desde temprano puedan hacerse amigos de Jesús. 
            </p>
            <a href="/docs/Catecismo para nihos - Jose Maria Palomar Garces.pdf" className="materialButton">Descargar</a>
          </div>
          <div className="imageSection">
            <img src="/images/catequesis.jpg" alt="Description 2" />
          </div>
        </div>

        <div className="section">
          <div className="imageSection">
            <img src="/images/lib.png" alt="Description 1" />
          </div>
          <div className="descriptionSection">
            <h2>Derecho canónico </h2>
            <p>
              Lo que nos permite ordenarnos al interior de la Iglesia y la comunidad, son la leyes de la Iglesia al servicio de los que aman al Señor. 
            </p>
            <a href="/docs/CODIGO+DERECHO+CANONICO.pdf" className="materialButton">Descargar</a>
          </div>
        </div>

        <div className="section">
          <div className="descriptionSection">
            <h2>Documento de Aparecida </h2>
            <p>
              La reflexión de los obispos de América Latina y el Caribe, plasmada en un documento guía para la pastoral de América en estos tiempos de cambio, con un mismo fin: Cristo 
            </p>
            <a href="/docs/Documento_Conclusivo_Aparecida" className="materialButton">Descargar</a>
          </div>
          <div className="imageSection">
            <img src="/images/dda.jpg" alt="Description 1" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
