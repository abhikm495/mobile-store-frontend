import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <Header />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
