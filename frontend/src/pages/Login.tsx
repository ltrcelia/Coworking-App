import React from "react";

const Login: React.FC = () => {

  return (
      <div className="page">
        <div className='LoginPage'>
          <div className="loginHead">
            <span className="square"></span>
            <h1>CoworkSpace</h1>
            <p>Connectez-vous à votre communauté</p>
          </div>

          <div className="loginForm">
            <form>
              <div className="inputBloc">
                <div className="inputInfos">
                  <label htmlFor="email">Adresse email</label>
                  <span className='round'></span>
                  <input type="email" id='email' required />
                </div>

                <div className="inputInfos">
                  <label htmlFor="password">Mot de passe</label>
                  <span className='round'></span>
                  <input type="password" id='password' required />
                </div>
              </div>

              <button type="submit" className="connect">
                <span className='round'></span>
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
                <span className='round'></span>
                <p><strong>Networking</strong></p>
                <p>Connectez-vous avec des professionnels</p>
              </div>
              <div className="card">
                <span className='round'></span>
                <p><strong>Innovation</strong></p>
                <p>Collaborez sur des projets</p>
              </div>
              <div className="card">
                <span className='round'></span>
                <p><strong>Convivialité</strong></p>
                <p>Espaces de travail modernes</p>
              </div>
              <div className="card">
                <span className='round'></span>
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