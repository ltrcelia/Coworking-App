import React from "react";
import { FaUsers } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa";
import { FaRocket } from "react-icons/fa";
import { FaCoffee } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

const Login: React.FC = () => {

  return (
    <div className="page">
      <div className='LoginPage'>
        <div className="loginHead">
          <div className="square">
            <div className="img">
              <FaUsers fill="white" size={37} />
            </div>
          </div>
          <h1>CoworkSpace</h1>
          <p>Connectez-vous à votre communauté</p>
        </div>

        <div className="loginForm">
          <form>
            <div className="inputBloc">
              <div className="inputInfos">
                <label htmlFor="email">Adresse email</label>
                <div className="icon">
                  <FaEnvelope fill="#6A72D9" />
                </div>
                <input type="email" id='email' required />
              </div>

              <div className="inputInfos">
                <label htmlFor="password">Mot de passe</label>
                <div className="icon">
                  <FaLock fill="#6A72D9" />
                </div>
                <input type="password" id='password' required />
              </div>
            </div>

            <button type="submit" className="connect">
              <MdLogin fill="white" size={23} />
              Se connecter
            </button>

            <p className='forgot'>Mot de passe oublié ?</p>

          </form>

          <div className="discoverCS">
            <span className="line"></span>
            <p>Découvrez CoworkSpace</p>
            <span className="line"></span>
          </div>

          <div className="moreBloc">
            <div className="card">
              <FaNetworkWired fill="#6A72D9" size={27} />
              <p><strong>Networking</strong></p>
              <p>Connectez-vous avec des professionnels</p>
            </div>
            <div className="card">
              <FaRocket fill="#6A72D9" size={25} />
              <p><strong>Innovation</strong></p>
              <p>Collaborez sur des projets</p>
            </div>
            <div className="card">
              <FaCoffee fill="#6A72D9" size={27} />
              <p><strong>Convivialité</strong></p>
              <p>Espaces de travail modernes</p>
            </div>
            <div className="card">
              <FaCalendar fill="#6A72D9" size={23} />
              <p><strong>Flexibilité</strong></p>
              <p>Abonnements adaptés</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;