// routes.js
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Global from "../pages/Global";
import About from "../pages/About";

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/about-us", element: <About /> },
    { path: "/services", element: <Home /> },
    { path: "/global", element: <Global /> },
    { path: "/blog", element: <Home /> },
    { path: "/contact", element: <Contact /> },
];