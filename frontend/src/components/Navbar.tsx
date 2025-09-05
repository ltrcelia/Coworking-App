import { NavLink } from "react-router-dom";
import React from "react";
import { FaHouse } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

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
          <NavLink to="/">
            <li>
              <FaHouse fill="grey" /> Dashboard
            </li>
          </NavLink>
          <NavLink to="/communaute">
            <li>
              <FaUsers fill="grey" size={22} /> Communauté
            </li>
          </NavLink>
          <NavLink to="/evenements">
            <li>
              <FaCalendar fill="grey" /> Événements
            </li>
          </NavLink>
          <NavLink to="/parametres">
            <li>
              <FaGear fill="grey" /> Paramètres
            </li>
          </NavLink>
          {/* <NavLink to="/mon-profil">
            <span className="round"></span>
            <li>
              Mon profil
            </li>
          </NavLink> */}
          <NavLink to="/connexion">
            <li>
              <FaUser fill="grey" /> Mon profil
            </li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
