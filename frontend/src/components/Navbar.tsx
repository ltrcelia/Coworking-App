import { NavLink } from "react-router-dom";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav role="navigation">
      <div className="navbar">
        <NavLink to="/">
          <div className="logo">
            <span className="square"></span>
            <h2>CoworkSpace</h2>
          </div>
        </NavLink>
        <ul role="list">
          <NavLink to="/connexion">
            <li>
              <span className="round"></span>
              Connexion
            </li>
          </NavLink>
          <NavLink to="/">
            <li>
              <span className="round"></span>
              Dashboard
            </li>
          </NavLink>
          <NavLink to="/communaute">
            <li>
              <span className="round"></span>
              Communauté
            </li>
          </NavLink>
          <NavLink to="/evenements">
            <li>
              <span className="round"></span>
              Événements
            </li>
          </NavLink>
          <NavLink to="/parametres">
            <li>
              <span className="round"></span>
              Paramètres
            </li>
          </NavLink>
          <NavLink to="/mon-profil">
            <span className="round"></span>
            <li>
              Mon profil
            </li>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
