import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Phone, ChevronDown } from "lucide-react";
import { useLocation, useRouter } from "wouter";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (location !== "/") {
      // Use router to navigate to home page
      router.navigate("/");
      
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
      setIsMobileMenuOpen(false);
      return;
    }
    
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
          <a href="/" className="flex items-center cursor-pointer">
            <img 
              src="/attached_assets/7938bab5-b302-4cf1-8a69-78cfce3c9be4_1750802043592.png" 
              alt="AA Trust Roadside Logo" 
              className="h-10 w-auto mr-3"
            />
            <div className="text-xl font-bold">
              <span className="text-white">AA TRUST </span>
              <span className="text-blue-500">ROADSIDE</span>
            </div>
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="/"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Home
            </a>
            <a 
              href="/about"
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              About
            </a>
            {/* Services Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                Services
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <a 
                      href="/mobile-tire-repair-near-me"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Mobile Tire Repair
                    </a>
                    <a 
                      href="/jump-start-battery-service-fl"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Jump Start & Battery Service
                    </a>
                    <a 
                      href="/mobile-engine-diagnostics-fl"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Mobile Engine Diagnostics
                    </a>
                    <a 
                      href="/vehicle-lockout-service-fl"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Vehicle Lockout Service
                    </a>
                    <a 
                      href="/emergency-fuel-delivery-fl"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Emergency Fuel Delivery
                    </a>
                    <div className="border-t border-gray-700 my-2"></div>
                    <a 
                      href="/diesel-roadside-assistance-near-me"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Diesel Roadside Assistance
                    </a>
                    <a 
                      href="/engine-services-near-me"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      Engine Services
                    </a>
                    <a 
                      href="/24-7-tire-shop-near-me"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-blue-400 transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      24/7 Tire Shop
                    </a>
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={() => scrollToSection("service-areas")} 
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Locations
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
            {/* Desktop Phone Numbers */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-xs text-gray-400">24/7 Emergency Line</div>
                <a 
                  href="tel:+13863728412"
                  className="text-blue-400 hover:text-blue-300 font-semibold text-sm"
                >
                  (386) 372-8412
                </a>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">After Hours Phone</div>
                <a 
                  href="tel:+13863387945"
                  className="text-blue-400 hover:text-blue-300 font-semibold text-sm"
                >
                  (386) 338-7945
                </a>
              </div>
            </div>
            
            <a 
              href="tel:+13863728412"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-blue-500"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 bg-black border-t border-gray-800">
            <div className="flex flex-col space-y-3 px-4 pt-4">
              <a 
                href="/"
                className="text-gray-300 hover:text-blue-500 transition-colors text-left"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/about"
                className="text-gray-300 hover:text-blue-500 transition-colors text-left"
              >
                About
              </a>
              {/* Mobile Services Menu */}
              <div className="space-y-2">
                <div className="text-gray-300 font-medium">Services</div>
                <a 
                  href="/mobile-tire-repair-near-me"
                  className="block text-gray-400 hover:text-blue-500 transition-colors text-left ml-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mobile Tire Repair
                </a>
                <a 
                  href="/jump-start-battery-service-fl"
                  className="block text-gray-400 hover:text-blue-500 transition-colors text-left ml-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jump Start & Battery Service
                </a>
                <a 
                  href="/mobile-engine-diagnostics-fl"
                  className="block text-gray-400 hover:text-blue-500 transition-colors text-left ml-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mobile Engine Diagnostics
                </a>
                <a 
                  href="/vehicle-lockout-service-fl"
                  className="block text-gray-400 hover:text-blue-500 transition-colors text-left ml-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Vehicle Lockout Service
                </a>
                <a 
                  href="/emergency-fuel-delivery-fl"
                  className="block text-gray-400 hover:text-blue-500 transition-colors text-left ml-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Emergency Fuel Delivery
                </a>
              </div>
              <button 
                onClick={() => scrollToSection("service-areas")} 
                className="text-gray-300 hover:text-blue-500 transition-colors text-left"
              >
                Locations
              </button>
              <button 
                onClick={() => scrollToSection("testimonials")} 
                className="text-gray-300 hover:text-blue-500 transition-colors text-left"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection("contact")} 
                className="text-gray-300 hover:text-blue-500 transition-colors text-left"
              >
                Contact
              </button>
              <a 
                href="tel:+13863728412" 
                className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-lg text-base font-medium mt-4 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
