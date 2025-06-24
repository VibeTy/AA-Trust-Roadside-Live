export default function ServicesSection() {
  const services = [
    {
      icon: "fas fa-tire",
      title: "Mobile Tire Services (Primary - 70%)",
      color: "text-red-600",
      services: [
        "Mobile Tire Replacement",
        "Tire Repair (Punctures, Flats)",
        "Tire Rotation & Balancing",
        "Wholesale Tire Sourcing",
        "Emergency Flat Tire Service"
      ]
    },
    {
      icon: "fas fa-tools",
      title: "Light Mechanic Services (30%)",
      color: "text-blue-600",
      services: [
        "Brake Pad Replacement",
        "Oil Changes",
        "Engine Diagnostics",
        "Battery & Alternator Service",
        "Flapper Replacement"
      ]
    },
    {
      icon: "fas fa-road",
      title: "Emergency Roadside Help",
      color: "text-green-600",
      services: [
        "Emergency Jumpstarts",
        "Light Mobile Roadside Help",
        "Lockout Service",
        "Fuel Delivery",
        "Towing Coordination"
      ]
    },
    {
      icon: "fas fa-clock",
      title: "24/7 Mobile Service",
      color: "text-purple-600",
      services: [
        "Same-Day Service Available",
        "Emergency After-Hours Help",
        "Fleet Tire Maintenance",
        "Roadside Safety Inspections",
        "Mobile Service Coverage"
      ]
    },
    
    {
      icon: "fas fa-tools",
      title: "General Automotive",
      color: "text-indigo-600",
      services: [
        "Transmission Service",
        "Cooling System Repair",
        "Air Conditioning Service",
        "Suspension & Steering",
        "Custom Repairs - Just Ask!"
      ]
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Professional mobile mechanic and roadside assistance services across Northeast Florida. We bring our expertise directly to your location, 24/7.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center mb-4">
                <i className={`${service.icon} text-4xl ${service.color} mb-3`}></i>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                {service.services.map((item, itemIndex) => (
                  <li key={itemIndex} className={`flex items-center ${item.includes("Need Something Else") ? "text-[hsl(43,96%,56%)] font-medium" : ""}`}>
                    <i className={`fas ${item.includes("Need Something Else") ? "fa-phone" : "fa-check"} text-green-500 mr-2`}></i>
                    {item}
                  </li>
                ))}
              </ul>
              
              {/* Call to Action for each service */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <a 
                  href="tel:+13863728412"
                  className="inline-flex items-center justify-center w-full bg-[hsl(0,84%,60%)] hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm"
                >
                  <i className="fas fa-phone mr-2"></i>
                  Call Now
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+13863728412" 
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <i className="fas fa-phone mr-3"></i>
              Call Now: (386) 372-8412
            </a>
            <a 
              href="tel:+13863387945" 
              className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <i className="fas fa-phone mr-3"></i>
              Backup: (386) 338-7945
            </a>
          </div>
          <div className="mt-4">
            <a 
              href="/quote"
              className="inline-flex items-center bg-[hsl(43,96%,56%)] hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <i className="fas fa-clipboard-list mr-3"></i>
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
