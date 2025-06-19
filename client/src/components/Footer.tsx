export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <i className="fas fa-wrench text-[hsl(221,83%,53%)] text-2xl mr-3"></i>
              <span className="text-xl font-bold">AA Trust Roadside</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Professional mobile mechanic and roadside assistance services across Northeast Florida. We bring expert technicians and fully equipped service vehicles directly to your location for fast, reliable repairs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[hsl(221,83%,53%)] transition-colors">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[hsl(221,83%,53%)] transition-colors">
                <i className="fab fa-google text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[hsl(221,83%,53%)] transition-colors">
                <i className="fab fa-yelp text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("home")} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("testimonials")} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <i className="fas fa-phone text-[hsl(0,84%,60%)] mr-3"></i>
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-envelope text-[hsl(221,83%,53%)] mr-3"></i>
                <a href="mailto:info@floridadieselpro.com" className="text-gray-400 hover:text-white transition-colors">
                  info@floridadieselpro.com
                </a>
              </div>
              <div className="flex items-center">
                <i className="fas fa-map-marker-alt text-green-600 mr-3"></i>
                <span className="text-gray-400">Palm Coast, FL</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 AA Trust Roadside. All rights reserved. | 
            <span className="text-red-500 ml-1">24/7 Emergency Service Available</span>
          </p>
          <div className="mt-2">
            <a href="/admin" className="text-xs text-gray-600 hover:text-gray-400 opacity-30 hover:opacity-70">•</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
