"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleLogin = async () => {
    if (!user || !password) {
      alert("Por favor, ingresa tu cuenta y contraseña.");
      return;
    } 
    setLoading(true);
    

    try {
      console.log("Mi variable de entorno es:", process.env.NEXT_PUBLIC_API_URL);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user, password }),
      });

      if (!response.ok) { 
        
          throw new Error("Credenciales inválidas. Por favor, inténtalo de nuevo.");
        }

        const data = await response.json();

        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          router.push("/nuevanoticia");
        } else {
          throw new Error("Respuesta del servidor no contiene token");
        }
    } catch (error) {
      console.error("Error durante el login:", error);
    } finally {
      setLoading(false);
    }
  };

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
