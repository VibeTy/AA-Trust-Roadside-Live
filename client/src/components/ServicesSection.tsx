export default function ServicesSection() {
  const services = [
    {
      icon: "fas fa-search",
      title: "Diagnostics & Electrical",
      color: "text-[hsl(221,83%,53%)]",
      services: [
        "Engine Diagnostics",
        "Electrical Repairs", 
        "Check Engine Light",
        "Battery Service",
        "Charging Systems"
      ]
    },
    {
      icon: "fas fa-cogs",
      title: "Heavy Equipment & Hydraulics", 
      color: "text-[hsl(221,83%,53%)]",
      services: [
        "Heavy Equipment",
        "Hydraulics",
        "Welding",
        "Fabrication",
        "System Repairs"
      ]
    },
    {
      icon: "fas fa-road",
      title: "Roadside & Mobile",
      color: "text-[hsl(0,84%,60%)]",
      services: [
        "Mobile Repair",
        "Emergency Roadside",
        "Flat Tire Changes", 
        "Trailer Repair",
        "24/7 Response"
      ]
    },
    {
      icon: "fas fa-wrench",
      title: "Preventative Maintenance",
      color: "text-[hsl(43,96%,56%)]",
      services: [
        "Oil Changes",
        "Tune Ups",
        "Lube Service",
        "Filter Replacement",
        "Brake & Suspension"
      ]
    },
    {
      icon: "fas fa-building",
      title: "Fleet & Commercial",
      color: "text-[hsl(221,83%,53%)]",
      services: [
        "Commercial Repair",
        "DOT Inspections",
        "Lift Gate Service",
        "Pneumatics", 
        "Power Systems"
      ]
    },
    {
      icon: "fas fa-tools",
      title: "Specialized Services",
      color: "text-green-600",
      services: [
        "Lawn Mower Repair",
        "Marine Engines",
        "Steering Systems",
        "Troubleshooting",
        "Need Something Else? Just Call!"
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
            Complete mobile diesel repair solutions for all your heavy-duty vehicle needs. From emergency roadside assistance to scheduled maintenance, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center mb-4">
                <i className={`${service.icon} text-4xl ${service.color} mb-3`}></i>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {service.services.map((item, itemIndex) => (
                  <li key={itemIndex} className={`flex items-center ${item.includes("Need Something Else") ? "text-[hsl(43,96%,56%)] font-medium" : ""}`}>
                    <i className={`fas ${item.includes("Need Something Else") ? "fa-phone" : "fa-check"} text-green-500 mr-2`}></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => scrollToSection("contact")}
            className="bg-[hsl(221,83%,53%)] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <i className="fas fa-envelope mr-2"></i>
            Request Service Quote
          </button>
        </div>
      </div>
    </section>
  );
}
