import Header from "./Header";
import Footer from "./Footer";
import FAQ from "./FAQ";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <FAQ />
            <Footer />
        </>
    );
}

export default Layout;