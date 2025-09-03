import { Routes, Route } from "react-router-dom";
import './styles/index.css'
import Navbar from './components/Navbar.tsx';
import Home from "./pages/Home";
import Community from "./pages/Community";
import Events from "./pages/Events";
import Parameters from "./pages/Parameters";
import Profil from "./pages/Profil";
import Login from "./pages/Login";
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <header role="banner">
        <Navbar />
      </header>

      <main role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/communaute" element={<Community />} />
          <Route path="/evenements" element={<Events />} />
          <Route path="/parametres" element={<Parameters />} />
          <Route path="/mon-profil" element={<Profil />} />
          <Route path="/connexion" element={<Login />} />
        </Routes>
      </main>

      <footer role="contentinfo">
        <Footer />
      </footer>
    </>
  );
}

export default App;
