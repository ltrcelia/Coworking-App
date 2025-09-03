const Login = () => {

  return (
    <>
      <div className='LoginPage'>
        <div className="loginHead">
          <h1>CoworkSpace</h1>
          <p>Connectez-vous à votre communauté</p>
        </div>

        <div className="loginForm">
            <form>
                <div className="InputBloc">
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

                <p className='forgot'>Mot de passe oublié ?</p>

                <button type="submit"><span className='round'></span> Se connecter</button>

                <p>Mot de passe oublié ?</p>

            </form>

            <div className="discoverCS">
                <span></span>
                Découvrez CoworkSpace
                <span></span>
            </div>
            
            <div className="moreBloc">
                <div className="card">
                    <span className='round'></span>
                    <h3>Networking</h3>
                    <p>Connectez-vous avec des professionnels</p>
                </div>
                <div className="card">
                    <span className='round'></span>
                    <h3>Innovation</h3>
                    <p>Collaborez sur des projets</p>
                </div>
                <div className="card">
                    <span className='round'></span>
                    <h3>Convivialité</h3>
                    <p>Espaces de travail modernes</p>
                </div>
                <div className="card">
                    <span className='round'></span>
                    <h3>Flexibilité</h3>
                    <p>Abonnements adaptés</p>
                </div>
            </div>

        </div>
        
      </div>
      
    </>
  );
}

export default Login