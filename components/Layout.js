import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children, index }) {
  return (
    <div className={` min-h-screen text-white ${index ? "bg-gradient-to-r from-gray-600 to-gray-900" : "bg-gray-200"}`}>
      {children}
      {!index ? <Footer index /> : <></>}
    </div>
  );
}
