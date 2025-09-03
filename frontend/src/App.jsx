import { Route, Routes } from "react-router-dom";
import './styles/index.css'
import Navbar from './components/Navbar';
import Home from "./pages/Home";
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
