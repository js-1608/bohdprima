// routes.js
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Global from "../pages/Global";
import About from "../pages/About";
import Services from "../pages/Services";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/about-us", element: <About /> },
    { path: "/services", element: <Services /> },
    { path: "/global", element: <Global /> },
    { path: "/blog", element: <Home /> },
    { path: "/contact", element: <Contact /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/terms-of-service", element: <TermsOfService /> },
];