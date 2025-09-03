// import { useState } from "react";
import React from "react";

const Dashboard: React.FC = () => {
  // const [member, setMember] = useState([]);

  return (
    <div className="dashboard">
      <div className="intro">
        <h1>Bonjour member.name !</h1>
        <p>Découvrez votre communauté Corworkspace et connecter-vous avec vos collègues</p>
      </div>

      <div className="stats">
        <div className="card">
          <span className="square"></span>
          <h2>45</h2>
          <p>Membres actifs</p>
          <p><span></span> +3 ce mois</p>
        </div>
        <div className="card">
          <span className="square"></span>
          <h2>12</h2>
          <p>Connexions cette semaine</p>
          <p><span></span> +5 vs semaine dernière</p>
        </div>
        <div className="card">
          <span className="square"></span>
          <h2>3</h2>
          <p>Évenements à venir</p>
          <p><span></span> Cette semaine</p>
        </div>
        <div className="card">
          <span className="square"></span>
          <h2>8</h2>
          <p>Projets collaboratifs</p>
          <p><span></span> +2 ce mois</p>
        </div>
      </div>

      <div className="discoverCommunity">
        <h2>Découvrir la communauté</h2>
        <p>Rencontrer un nouveau membre et élarissez votre réseau</p>
        {/* <div className="card">
            <img src={member.photo} alt={member.firstname} />
            <h2>{member.firstname} {member.lastname}</h2>
            <p>{member.profession}</p>
            <p>{member.company} • {member.city}</p>
            <div className="skills">
            {member.map((member) => {
              <div className="skill" key={member.id}>{member.skill}</div>
            })}
            </div> */}
        <p>"Description"</p>
        <button><span></span> Découvrir un autre membre</button>
      </div>

      <div className="recentActivity">
        <h2>Activité récente</h2>
        <p>Les dernières nouvelles de votre communauté</p>
        {/* {member.map((member) => {
            <div className="newMembers">
            <div className="membersInfos" key={member.id}>
            <p>Nouveau membre rejoint</p>
            <p>{member.nom} ({member.profession}) a rejoint la communauté</p>
            </div>
            <p>Il y a (datedujour - connexion)</p>
            </div>
            })} */}
      </div>

    </div>
  );
}

export default Dashboard;
