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
                        <img src="https://randomuser.me/api/portraits/women/1.jpg" alt="member.firstname" />
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
                            <h3><FaUser fill="#6A72D9" /> Informations personnelles</h3>
                            <div className="form">
                                <div className="bloc">
                                    <label htmlFor="firstname">Prénom</label>
                                    <input type="text" id="firstname" name="firstname" value="member.firstname" />
                                </div>

                                <div className="bloc">
                                    <label htmlFor="lastname">Nom</label>
                                    <input type="text" id="lastname" name="lastname" value="member.lastname" />
                                </div>

                                <div className="bloc">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" value="member.email" />
                                </div>

                                <div className="bloc">
                                    <label htmlFor="phone">Téléphone</label>
                                    <input type="text" id="phone" name="phone" value="member.phone" />
                                </div>

                                <div className="bloc">
                                    <label htmlFor="city">Ville</label>
                                    <input type="text" id="city" name="city" value="member.city" />
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <h3><FaBriefcase fill="#6A72D9" /> Informations professionnelles</h3>
                            <div className="form">
                                <div className="bloc">
                                    <label htmlFor="profession">Profession</label>
                                    <input type="text" id="profession" name="profession" value="member.profession" />
                                </div>
                                <div className="bloc">
                                    <label htmlFor="company">Entreprise</label>
                                    <input type="text" id="company" name="company" value="member.company" />
                                </div>
                                <div className="bloc">
                                    <label htmlFor="skills">Compétences</label>
                                    <input type="text" id="skills" name="skills" value="member.skills" />
                                </div>
                                <div className="bloc">
                                    <label htmlFor="linkedin">Linkedin</label>
                                    <input type="text" id="linkedin" name="linkedin" value="member.linkedin" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="blocBio">
                        <h3><GrTextAlignLeft fill="#6A72D9" /> À propose de moi</h3>
                        <div className="bloc">
                            <label htmlFor="bio">Biographie</label>
                            <textarea id="bio" name="bio" />
                        </div>
                    </div>
                    <div className="security">
                        <h3><FaLock fill="#EA580D" /> Sécutiré</h3>
                        <div className="bloc relative">
                            <label htmlFor="password">Mot de passe actuel</label>
                            <input type="text" id="password" name="password" placeholder="Mot de passe actuel" />
                            <div className="icone">
                                <FaEye size={20} />
                            </div>
                        </div>

                        <div className="bloc relative">
                            <label htmlFor="newPassword">Nouveau mot de passe</label>
                            <input type="text" id="newPassword" name="newPassword" placeholder="Nouveau mot de passe" />
                            <div className="icone">
                                <FaEye size={20} />
                            </div>
                        </div>

                        <div className="bloc relative">
                            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            <input type="text" id="confirmPassword" name="skconfirmPasswordills" placeholder="Confirmer le mot de passe" />
                            <div className="icone">
                                <FaEye size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil;