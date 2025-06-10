import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-xl" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("home")}>
            <i className="fas fa-wrench text-diesel-blue text-2xl mr-3"></i>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Florida Diesel Pro</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-gray-700 dark:text-gray-300 hover:text-diesel-blue transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-gray-700 dark:text-gray-300 hover:text-diesel-blue transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")} 
              className="text-gray-700 dark:text-gray-300 hover:text-diesel-blue transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-gray-700 dark:text-gray-300 hover:text-diesel-blue transition-colors"
            >
              Contact
            </button>
            <button 
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-diesel-blue transition-colors"
            >
              <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-diesel-blue transition-colors mr-4"
            >
              <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection("home")} 
                className="text-gray-700 dark:text-gray-300 hover:text-diesel-blue transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("services")} 
                className="text-gray-700 dark:text-gray-300 hover:text-diesel-blue transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("testimonials")} 
                className="text-gray-700 dark:text-gray-300 hover:text-diesel-blue transition-colors text-left"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="text-gray-700 dark:text-gray-300 hover:text-diesel-blue transition-colors text-left"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
