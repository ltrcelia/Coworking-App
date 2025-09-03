import { Routes, Route } from "react-router-dom";
import './styles/index.css';
import Navbar from './components/Navbar.tsx';
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Events from "./pages/Events";
import Parameters from "./pages/Parameters";
import Profil from "./pages/Profil";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <>
      <header role="banner">
        <Navbar />
      </header>

      <main role="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/communaute" element={<Community />} />
          <Route path="/evenements" element={<Events />} />
          <Route path="/parametres" element={<Parameters />} />
          <Route path="/mon-profil" element={<Profil />} />
          <Route path="/connexion" element={<Login />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
