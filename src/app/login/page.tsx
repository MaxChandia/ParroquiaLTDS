"use client";

import React, { useState } from "react";
import "../../styles/login.css";

export default function Login() {
  // Manejar los valores de las entradas
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  // Función para manejar el inicio de sesión
  function handleLogin() {
    fetch("/api/loginUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }), // Asegúrate de que esto contenga los valores correctos
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          alert("Login exitoso");
          // Aquí puedes redirigir al usuario o guardar la sesión
        } else {
          alert("Credenciales incorrectas");
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="loginContainer">
      <div className="loginText">
        <p>Parroquia La Transfiguración del Señor</p>
        <input
          type="user"
          placeholder="Cuenta"
          value={user}
          onChange={(e) => setUser(e.target.value)} // Actualiza el estado del email
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
        />
      </div>
      <button onClick={handleLogin}>Ingresar</button> {/* Ejecuta handleLogin al hacer clic */}
    </div>
  );
}
