"use client";

import "../styles/navbar.css";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500"],
});

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={`Navbar ${montserrat.className}`}>
      <div className="navbarLogo">
        <Link href="/">
          <p className="navbarSubtitle">Parroquia</p>
          <p className="navbarSubtitle">La Transfiguración del Señor</p>
        </Link>
      </div>
      <div className="navbarSections">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="icons">
          <FaBars />
        </label>
        <ul>
          <li>
            <Link href="/">INICIO</Link>
          </li>
          <li
            className="dropdown"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}
          >
            NUESTRA PARROQUIA ▾
            <ul
              className="dropdown-menu"
              style={{ display: isDropdownOpen ? "block" : "none" }}
            >
              <li>
                <Link href="/nuestraparroquia">COMUNIDAD</Link>
              </li>
              <li>
                <Link href="/nuestraparroquia/pastores">PASTORES</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/noticias">NOTICIAS</Link>
          </li>
          <li>
            <Link href="/materiales">MATERIALES</Link>
          </li>
          <li>
            <Link href="/contacto">CONTACTO</Link>
          </li>
          <li className="donations">
            <Link href="/aportes">
              <button>APORTES</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
