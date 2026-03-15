// routes.js
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Global from "../pages/Global";

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/about-us", element: <Home /> },
    { path: "/services", element: <Home /> },
    { path: "/global", element: <Global /> },
    { path: "/blog", element: <Home /> },
    { path: "/contact", element: <Contact /> },
];