// routes.js
import Home from "../pages/Home";
import Contact from "../pages/Contact";

export const routes = [
    { path: "/", element: <Home /> },
    { path: "/home", element: <Home /> },
    { path: "/about", element: <Home /> },
    { path: "/services", element: <Home /> },
    { path: "/global", element: <Home /> },
    { path: "/blog", element: <Home /> },
    { path: "/contact", element: <Contact /> },
];