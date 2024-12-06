"use client";

import Navbar from "@/src/components/navbar.jsx";
import Footer from "@/src/components/footer";
import emailjs from "emailjs-com";
import Link from "next/link";
import "../../styles/contacto.css"
import { useState } from "react";

export default function Contacto() {
  const [contactInfo, setContactInfo] = useState({
    nombre:"",
    mail:"",
    mensaje:""
  });

  const saveContactInfo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };
  
  const cleanContactInfo = (e: React.FormEvent) => {
    e.preventDefault();

  if (!contactInfo.nombre || !contactInfo.mail || !contactInfo.mensaje) {
    alert("Todos los campos son obligatorios");
    return;
  }

  emailjs.send(
    '',
    ''

  )
  .then((result: { text: string })=> {
    console.log('Email enviado:', result.text)
    alert("formulario enviado correctamente")
    setContactInfo({
      nombre: '',
      mail: '',
      mensaje: ''
    });
  }, (error: { text: string }) => {
    console.log ("error al enviar el formulario", error.text);
    alert("Error al enviar el formulario. Intente de nuevo");
  });
};

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
              <form onSubmit={cleanContactInfo}>
                <input placeholder="Nombre" name="nombre" value={contactInfo.nombre} onChange={saveContactInfo}></input>
                <input placeholder="Correo" name="mail" value={contactInfo.mail} onChange={saveContactInfo}></input>
                <textarea placeholder="Mensaje..." name="mensaje" value={contactInfo.mensaje} onChange={saveContactInfo}></textarea>
                <button type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  );
}
