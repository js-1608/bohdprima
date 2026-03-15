import Header from './components/Header';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import ScrollToTop from './components/ScrollToTop';
import './index.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./components/Route";

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

      <FAQ />
      <Footer />
    </Router>
  );
}

export default App;