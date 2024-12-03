import Navbar from "@/src/components/navbar";
import Footer from "@/src/components/footer";
import Link from "next/link";
import "../../../styles/autoridades.css";

export default function AutoridadesParroquiales () {
    return (
        <div>
            <Navbar/>
            <div className="autoridadesContainer" style={{height:"auto"}}>
                <h1>Pastores</h1>
                <div>
                    <p><Link href="/">Inicio</Link> | Autoridades</p>
                </div>
            </div>
            <div className="autoridadesParroquiales">
                <div className="autoridadesCard">
                    <img src="/images/arzobispo.jpg"/>
                    <h4>Mons. Ignacio Ducasse</h4>
                    <p>Arzobispo</p>
                    <p>iducasse@iglesia.cl</p>
                </div>
                <div className="autoridadesCard">
                    <img src="/images/padrefrancisco.jpg"/>
                    <h4>Pbro. Francisco Álvarez </h4>
                    <p>Párroco</p>
                    <p>francisco.alvarez.bravo@gmail.com</p>
                </div>
                <div className="autoridadesCard">
                    <img src="/images/diacclaudio.jpg"/>
                    <h4>Diácono Claudio Pérez</h4>
                    <p>Diácono</p>
                    <p>diaconoclaudioantof@gmail.com</p>
                </div>
                <div className="autoridadesCard">
                    <img src="/images/diacrodolfo.jpg"/>
                    <h4>Diácono Rodolfo Henríquez</h4>
                    <p>Diácono</p>
                    <p>rohenze@gmail.com</p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};