// import { useState } from "react";
import React from "react";
import { FaArrowUp } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa"
import { FaTrophy } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";

const Dashboard: React.FC = () => {
  // const [member, setMember] = useState([]);

  return (
    <div className="dashboard">
      <div className="intro">
        <div className="name">
          <h1>Bonjour member.name !</h1>
          <p className="emoji">👋</p>
        </div>
        <p>Découvrez votre communauté Corworkspace et connecter-vous avec vos collègues</p>
      </div>

      <div className="stats">
        <div className="card">
          <div className="square blue">
            <div className="icone">
              <FaUsers fill="white" size={27} />
            </div>
          </div>
          <h2>45</h2>
          <p>Membres actifs</p>
          <div className="green">
            <p><FaArrowUp fill="#70C084" /> +3 ce mois</p>
          </div>
        </div>
        <div className="card">
          <div className="square green">
            <div className="icone">
              <FaHandshake fill="white" size={27} />
            </div>
          </div>
          <h2>12</h2>
          <p>Connexions cette semaine</p>
          <div className="green">
            <p><FaArrowUp fill="#70C084" /> +5 vs semaine dernière</p>
          </div>
        </div>
        <div className="card">
          <div className="square violet">
            <div className="icone">
              <FaCalendarCheck fill="white" size={23} />
            </div>
          </div>
          <h2>3</h2>
          <p>Évenements à venir</p>
          <div className="green">
            <p><GoClockFill fill="#70C084" /> Cette semaine</p>
          </div>
        </div>
        <div className="card">
          <div className="square orange">
            <div className="icone">
              <FaTrophy fill="white" size={25} />
            </div>
          </div>
          <h2>8</h2>
          <p>Projets collaboratifs</p>
          <div className="green">
            <p><FaArrowUp fill="#70C084" /> +2 ce mois</p>
          </div>
        </div>
      </div>

      <div className="grid">
        <div className="discoverCommunity">
          <h2>Découvrir la communauté</h2>
          <p>Rencontrer un nouveau membre et élarissez votre réseau</p>
          <div className="card">
            <div className="blocImg">
              <img src="" alt="member.firstname" />
            </div>
            <h2>member.firstname member.lastname</h2>
            <p>member.profession</p>
            <p>member.company • member.city</p>
            <div className="skills">
              <div className="skill">member.skill</div>
              <div className="skill">member.skill</div>
            </div>
            <p className="desc">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."</p>
            <button><TfiReload fill="white" /> Découvrir un autre membre</button>
          </div>
        </div>

        <div className="recentActivity">
          <h2>Activité récente</h2>
          <p>Les dernières nouvelles de votre communauté</p>
          {/* {member.map((member) => { */}
          <div className="newMembers">
            <div className="memberBloc">
              <div className="membersInfos">
                <p className="title">Nouveau membre rejoint</p>
                <p>member.nom (member.profession) a rejoint la communauté</p>
              </div>
              <p className="date">Il y a 2h</p>
            </div>
            <span className="line"></span>
          </div>
          {/* })} */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
