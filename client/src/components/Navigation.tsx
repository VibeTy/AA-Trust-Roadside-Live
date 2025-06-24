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
    <nav className={`bg-black shadow-lg fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? "shadow-xl" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection("home")}>
            <img 
              src="/attached_assets/7938bab5-b302-4cf1-8a69-78cfce3c9be4_1750802043592.png" 
              alt="AA Trust Roadside Logo" 
              className="h-10 w-auto mr-3"
            />
            <div className="text-xl font-bold">
              <span className="text-white">AA TRUST </span>
              <span className="text-blue-400">ROADSIDE</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("home")} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection("services")} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("testimonials")} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection("contact")} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Contact
            </button>
            <a 
              href="tel:+13863728412" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <i className="fas fa-phone"></i>
              Call Now
            </a>

          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-blue-400"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 bg-black border-t border-gray-800">
            <div className="flex flex-col space-y-3 px-4 pt-4">
              <button 
                onClick={() => scrollToSection("home")} 
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("services")} 
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection("testimonials")} 
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="text-gray-300 hover:text-blue-400 transition-colors text-left"
              >
                Contact
              </button>
              <a 
                href="tel:+13863728412" 
                className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-lg text-base font-medium mt-4"
              >
                <i className="fas fa-phone mr-2"></i>
                Call Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
