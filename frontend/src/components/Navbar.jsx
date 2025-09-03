import { NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <>
            <nav role="navigation">
                <div className="navbar">
                    <NavLink to="/">
                        <h2>CoworkSpace</h2>
                    </NavLink>
                    <ul role="list">
                        <NavLink to="/">
                            <span className="round"></span>
                            <li>Dashbord</li>
                        </NavLink>
                        <NavLink to="/collection">
                            <span className="round"></span>
                            <li>Communauté</li>
                        </NavLink>
                        <NavLink to="/collection">
                            <span className="round"></span>
                            <li>Événement</li>
                        </NavLink>
                        <NavLink to="/collection">
                            <span className="round"></span>
                            <li>Mon Profil</li>
                        </NavLink>
                        <NavLink to="/collection">
                            <span className="round"></span>
                            <li>MOn Profil</li>
                        </NavLink>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar