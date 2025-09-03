import { Route, Routes } from "react-router-dom";
import './styles/index.css'
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Community from "./pages/Community";
import Events from "./pages/Events";
import Parameters from "./pages/Parameters";
import Profil from "./pages/Profil";
import Footer from './components/Footer';

function App() {

  return (
    <> 
    <header role="banner">
      <Navbar />
    </header>

    <main role="main">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Home />}></Route>
        <Route path="/communaute" element={<Community />}></Route>
        <Route path="/evenements" element={<Events />}></Route>
        <Route path="/parametres" element={<Parameters />}></Route>
        <Route path="/mon-profil" element={<Profil />}></Route>
        <Route path="/connexion" element={<Login />}></Route>
      </Routes>
    </main>

    <footer role="contentinfo">
      <Footer />
    </footer>
    </>
  )
}

export default App
