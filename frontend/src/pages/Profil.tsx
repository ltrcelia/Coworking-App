import React from "react";
import { FaUser } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { GrTextAlignLeft } from "react-icons/gr";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdAddAPhoto } from "react-icons/md";

const Profil: React.FC = () => {

    return (
        <div className="profilPage">
            <div className="intro">
                <h1>Modifier Mon profil</h1>
                <p>Mettez à jour vos informations personnelles et professionnelles</p>
            </div>
            <div className="card">
                <div className="header">
                    <div className="blocImg">
                        <img src="" alt="" />
                        <div className="blocPhoto">
                            <MdAddAPhoto fill="#6A72D9" />
                        </div>
                    </div>
                    <h2>member.firstname member.lastname</h2>
                    <p>member.profession</p>
                </div>
                <div className="info">
                    <div className="col2">
                        <div className="card">
                            <p><FaUser fill="#6A72D9" /> Informations personnalles</p>
                            <div className="form">
                                <label htmlFor="firstname">Prénom</label>
                                <input type="text" id="firstname" name="firstname" />

                                <label htmlFor="lastname">Nom</label>
                                <input type="text" id="lastname" name="lastname" />

                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" />

                                <label htmlFor="phone">Téléphone</label>
                                <input type="text" id="phone" name="phone" />

                                <label htmlFor="city">Ville</label>
                                <input type="text" id="city" name="city" />
                            </div>
                        </div>
                        <div className="card">
                            <h3><FaBriefcase fill="#6A72D9" /> Informations professionnelles</h3>
                            <div className="form">
                                <label htmlFor="profession">Profession</label>
                                <input type="text" id="profession" name="profession" />

                                <label htmlFor="company">Entreprise</label>
                                <input type="text" id="company" name="company" />

                                <label htmlFor="skills">Compétences</label>
                                <input type="text" id="skills" name="skills" />

                                <label htmlFor="linkedin">Linkedin</label>
                                <input type="text" id="linkedin" name="linkedin" />
                            </div>
                        </div>
                    </div>
                    <div className="bloc">
                        <h3><GrTextAlignLeft fill="#6A72D9" /> À propose de moi</h3>
                        <label htmlFor="biographie">Biographie</label>
                        <textarea id="linkedin" name="linkedin" />
                    </div>
                    <div className="security">
                        <h3><FaLock /> Sécutiré</h3>
                        <label htmlFor="skills">Mot de passe actuel</label>
                        <input type="text" id="skills" name="skills" placeholder="Mot de passe actuel" />
                        <FaEye />

                        <label htmlFor="skills">Nouveau mot de passe</label>
                        <input type="text" id="skills" name="skills" placeholder="Nouveau mot de passe" />
                        <FaEye />

                        <label htmlFor="skills">Confirmer le mot de passe</label>
                        <input type="text" id="skills" name="skills" placeholder="Confirmer le mot de passe" />
                        <FaEye />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil;