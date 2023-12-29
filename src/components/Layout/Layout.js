import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="min-h-[80vh] mt-20">{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
