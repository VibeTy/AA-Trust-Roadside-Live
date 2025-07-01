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
            <h3 className="text-lg font-semibold mb-4">Emergency Services</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/emergency-24-hour-tire-repair"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  24/7 Emergency Tire Repair
                </a>
              </li>
              <li>
                <a 
                  href="/mobile-tire-repair-near-me"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mobile Tire Repair Near Me
                </a>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Roadside Assistance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Emergency Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              <li>
                <a href="/locations/palm-coast" className="text-gray-400 hover:text-white transition-colors">Palm Coast Mobile Tire Repair</a>
              </li>
              <li>
                <a href="/locations/daytona-beach" className="text-gray-400 hover:text-white transition-colors">Daytona Beach Tire Service</a>
              </li>
              <li>
                <a href="/locations/jacksonville" className="text-gray-400 hover:text-white transition-colors">Jacksonville Emergency Tire</a>
              </li>
              <li>
                <a href="/locations/ormond-beach" className="text-gray-400 hover:text-white transition-colors">Ormond Beach Roadside</a>
              </li>
              <li>
                <a href="/locations/deland" className="text-gray-400 hover:text-white transition-colors">DeLand Mobile Tire</a>
              </li>
              <li>
                <span className="text-gray-400">+ All Northeast Florida</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 AA Trust Roadside. All rights reserved. | 
            <span className="text-red-500 ml-1">24/7 Emergency Service Available</span>
          </p>
          <div className="mt-2">
            <a href="/admin" className="text-sm text-gray-500 hover:text-blue-400 opacity-60 hover:opacity-100 transition-all">Admin</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
