import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';
import Whatsapp from './Whatsapp';

function AppShell({ children, showPublicChrome }) {
  return (
    <>
      <ScrollToTop />
      {showPublicChrome ? <Header /> : null}
      {children}
      {showPublicChrome ? <Whatsapp /> : null}
      {showPublicChrome ? <Footer /> : null}
    </>
  );
}

export default AppShell;
