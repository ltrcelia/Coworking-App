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
                        <NavLink to="/communaute">
                            <span className="round"></span>
                            <li>Communauté</li>
                        </NavLink>
                        <NavLink to="/evenements">
                            <span className="round"></span>
                            <li>Événement</li>
                        </NavLink>
                        <NavLink to="/parametres">
                            <span className="round"></span>
                            <li>Paramètres</li>
                        </NavLink>
                        <NavLink to="/mon-profil">
                            <span className="round"></span>
                            <li> 
                                <div className="profilMember">
                                    <div className="name">
                                        {member.firstname} {member.lastname}
                                    </div>
                                    <p>{member.profession}</p>
                                </div> 
                            </li>
                        </NavLink>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar