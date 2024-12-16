"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleLogin() {
    if (!user || !password) {
      alert("Por favor, complete todos los campos");
      return;
    }

    setLoading(true);
    fetch("/api/loginUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.user) {
          localStorage.setItem("token", data.token); 
          router.push("/nuevanoticia");
        } else {
          alert("Credenciales incorrectas");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error en el login:", error);
        alert("Hubo un problema con el servidor. Intente nuevamente más tarde.");
      });
  }

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <div className="loginText">
          <p>Parroquia La Transfiguración del Señor</p>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Cuenta"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="loginButton" onClick={handleLogin} disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </div>
    </div>
  );
}
