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
              <img 
                src="/attached_assets/7938bab5-b302-4cf1-8a69-78cfce3c9be4_1750802043592.png" 
                alt="AA Trust Roadside Logo" 
                className="h-8 w-auto mr-3"
              />
              <div>
                <span className="text-white font-bold">AA TRUST </span>
                <span className="text-blue-500 font-bold">ROADSIDE</span>
              </div>
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
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/mobile-tire-repair-near-me"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mobile Tire Repair
                </a>
              </li>
              <li>
                <a 
                  href="/jump-start-battery-service-fl"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Jump Start & Battery Service
                </a>
              </li>
              <li>
                <a 
                  href="/mobile-engine-diagnostics-fl"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mobile Engine Diagnostics
                </a>
              </li>
              <li>
                <a 
                  href="/vehicle-lockout-service-fl"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Vehicle Lockout Service
                </a>
              </li>
              <li>
                <a 
                  href="/emergency-fuel-delivery-fl"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Emergency Fuel Delivery
                </a>
              </li>
              <li>
                <a 
                  href="/diesel-roadside-assistance-near-me"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Diesel Roadside Assistance
                </a>
              </li>
              <li>
                <a 
                  href="/engine-services-near-me"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Engine Services
                </a>
              </li>
              <li>
                <a 
                  href="/24-7-tire-shop-near-me"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  24/7 Tire Shop
                </a>
              </li>
            </ul>
          </div>
          
          {/* Service Areas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/locations/palm-coast"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Palm Coast, FL
                </a>
              </li>
              <li>
                <a 
                  href="/locations/jacksonville"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Jacksonville, FL
                </a>
              </li>
              <li>
                <a 
                  href="/locations/daytona-beach"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Daytona Beach, FL
                </a>
              </li>
              <li>
                <a 
                  href="/locations/ormond-beach"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ormond Beach, FL
                </a>
              </li>
              <li>
                <a 
                  href="/locations/deland"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  DeLand, FL
                </a>
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
