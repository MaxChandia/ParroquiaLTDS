"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleLogin() {
    fetch("/api/loginUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("token", data.token); // Guardar el token de sesión
          alert("Login exitoso");
          router.push("/nuevanoticia");
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
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}
