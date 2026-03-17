import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import './index.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./components/Route";
import Whatsapp from './components/Whatsapp';

function App() {
  return (
    <Router>

      <ScrollToTop />

      <Header />

      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>

      <Whatsapp/>
      <Footer />
    </Router>
  );
}

export default App;