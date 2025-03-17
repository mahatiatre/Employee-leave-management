
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 shadow-md backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Logo 
            textClassName={`${
              !isScrolled && location.pathname === "/" 
                ? "text-white" 
                : "text-blue"
            }`} 
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium text-base transition-all hover:scale-105 ${
                  location.pathname === link.path
                    ? "text-blue font-semibold"
                    : !isScrolled && location.pathname === "/"
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="button-hover px-4 py-2 bg-blue text-white rounded-md shadow-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="button-hover px-4 py-2 bg-blue text-white rounded-md shadow-md"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full px-4 pt-20 pb-6">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xl font-medium ${
                  location.pathname === link.path
                    ? "text-blue font-semibold"
                    : "text-gray-700"
                }`}
                onClick={closeMobileMenu}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="w-full py-3 bg-blue text-white rounded-md shadow-md text-center"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block w-full py-3 bg-blue text-white rounded-md shadow-md text-center"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>

          <div className="mt-auto">
            <Logo className="justify-center" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
