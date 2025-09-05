import { NavLink } from "react-router-dom";
import React from "react";
import { FaHouse } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";

const Navbar: React.FC = () => {

  return (
    <nav role="navigation">
      <div className="navbar">
        <div className="logo">
          <div className="square">
            <div className="img">
              <FaUsers fill="white" size={25} />
            </div>
          </div>

          <h2>CoworkSpace</h2>
        </div>
        <ul role="list">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <li>
              <FaHouse fill="grey" /> Dashboard
            </li>
          </NavLink>
          <NavLink to="/communaute" className={({ isActive }) => (isActive ? "active" : "")}>
            <li>
              <FaUsers fill="grey" size={22} /> Communauté
            </li>
          </NavLink>
          <NavLink to="/evenements" className={({ isActive }) => (isActive ? "active" : "")}>
            <li>
              <FaCalendar fill="grey" /> Événements
            </li>
          </NavLink>
          <NavLink to="/parametres" className={({ isActive }) => (isActive ? "active" : "")}>
            <li>
              <FaGear fill="grey" /> Paramètres
            </li>
          </NavLink>
          <NavLink to="/mon-profil" className={({ isActive }) => (isActive ? "active" : "")}>
            <span className="round"></span>
            <li>
              <FaUser fill="grey" /> Profil
            </li>
          </NavLink>
          <NavLink to="/connexion" className={({ isActive }) => (isActive ? "active" : "")}>
            <li>
              <MdLogin fill="grey" size={25} />
            </li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
