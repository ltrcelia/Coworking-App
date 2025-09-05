import React from "react";
import { useState, useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "axios";

interface Member {
    id: string;
    firstname: string;
    lastname: string;
    profession: string;
    company: string;
    city: string;
    skills: string[];
    bio: string;
    photo: string;
    joinDate: string;
    memberShip: string;
    compagny: string;
    country: string;
}

const Community: React.FC = () => {
    const [member, setMember] = useState<Member[]>([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get("/api/members");
                setMember(response.data);
            } catch (err) {
                console.error("Erreur lors du chargement des membres :", err);
            }
        };

        fetchMembers();
    }, []);

    return (
        <div className="communityPage">
            <div className="intro">
                <h1>Découvrez la communauté</h1>
                <p>Rencontrez des professionnels passionnés, échangez vos compétences et <br /> développez votre réseau</p>
            </div>

            <div className="stats">
                <div className="card">
                    <h2>45</h2>
                    <p>Membres actifs</p>
                </div>
                <div className="card">
                    <h2>15</h2>
                    <p>Professions</p>
                </div>
                <div className="card">
                    <h2>8</h2>
                    <p>Viles</p>
                </div>
                <div className="card">
                    <h2>23</h2>
                    <p>Projets en cours</p>
                </div>
            </div>

            <div className="community">
                {member.map((member) => (
                    <div className="card">
                        <span>{member.memberShip}</span>
                        <div className="name">
                            <div className="blocImg">
                                <img src={member.photo} alt={member.firstname} />
                            </div>
                            <div className="blocText">
                                <h3>{member.firstname}</h3>
                                <p className="profession">{member.profession}</p>
                                <p> <FaBuilding fill="grey" /> {member.compagny}</p>
                            </div>
                        </div>
                        <p><RiMapPin2Fill fill="grey" /> {member.city}, {member.country}</p>
                        <div className="skills">
                            <p>{member.skills}</p>
                        </div>
                        <div className="cta">
                            <button><FaHandshake fill="white" size={17} /> Se connecter</button>
                            <button><FaEye fill="grey" size={17} />Voir profil</button>
                        </div>
                        <p className="linkedin">
                            <FaLinkedin fill="#2577B5" /> Voir sur Linkedin</p>
                        <p><FaCalendar fill="grey" /> Membre depuis {member.joinDate}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Community;