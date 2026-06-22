import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Whatsapp from "../../components/Whatsapp";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Whatsapp />
      <Footer />
    </>
  );
}
