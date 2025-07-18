export default function ServicesSection() {
  const primaryServices = [
    {
      title: "Mobile Tire Repair",
      description: "Flat tire? We come to you with professional tire repair and replacement services.",
      icon: "🛞",
      features: ["24/7 availability", "All tire types", "Roadside service"]
    },
    {
      title: "Diesel Engine Repair",
      description: "Expert diesel mechanics for trucks, RVs, and commercial vehicles.",
      icon: "🔧",
      features: ["Certified technicians", "Diagnostic tools", "Fleet services"]
    },
    {
      title: "Jump Start Service",
      description: "Dead battery? Quick and reliable jump start service to get you moving.",
      icon: "🔋",
      features: ["Instant response", "Battery testing", "Replacement available"]
    },
    {
      title: "Emergency Fuel",
      description: "Ran out of gas? We deliver fuel directly to your location.",
      icon: "⛽",
      features: ["Gas & diesel", "Emergency delivery", "24/7 service"]
    },
    {
      title: "Vehicle Lockout",
      description: "Locked out? Professional lockout service without damage to your vehicle.",
      icon: "🔐",
      features: ["All vehicle types", "No damage guarantee", "Fast response"]
    },
    {
      title: "Winch Out Service",
      description: "Stuck in mud, sand, or ditch? Heavy-duty winch service available.",
      icon: "🚛",
      features: ["Heavy-duty equipment", "Safe extraction", "Damage prevention"]
    }
  ];

  const secondaryServices = [
    { title: "Mobile Oil Changes", icon: "🛢️" },
    { title: "Brake Inspections", icon: "🛑" },
    { title: "Battery Replacement", icon: "🔋" },
    { title: "Alternator Service", icon: "⚡" },
    { title: "Starter Repair", icon: "🔄" },
    { title: "Cooling System", icon: "❄️" }
  ];

  const services = [
    {
      icon: "fas fa-circle",
      title: "Mobile Tire Services",
      color: "text-blue-600",
      description: "Professional mobile tire repair and replacement services brought directly to your location.",
      link: "/mobile-tire-repair-near-me",
      services: [
        "Mobile Tire Replacement",
        "Tire Repair (Punctures, Flats)", 
        "Tire Rotation",
        "Wholesale Tire Sourcing"
      ]
    },
    {
      icon: "fas fa-battery-full",
      title: "Jump Start & Battery Service",
      color: "text-blue-600",
      description: "Emergency jump start service and mobile battery testing and replacement.",
      link: "/jump-start-battery-service-fl",
      services: [
        "Emergency Jump Start",
        "Battery Testing & Replacement",
        "Alternator Diagnostics",
        "Charging System Check"
      ]
    },
    {
      icon: "fas fa-wrench",
      title: "Mobile Engine Diagnostics",
      color: "text-blue-600",
      description: "Professional mobile engine diagnostics and light mechanical repairs.",
      link: "/mobile-engine-diagnostics-fl",
      services: [
        "Engine Diagnostics",
        "Check Engine Light",
        "Performance Issues",
        "Troubleshooting"
      ]
    },
    {
      icon: "fas fa-key",
      title: "Vehicle Lockout Service",
      color: "text-blue-600",
      description: "Professional lockout assistance without damaging your vehicle.",
      link: "/vehicle-lockout-service-fl",
      services: [
        "Car Lockout Service",
        "Truck Lockout Service",
        "Key Replacement",
        "Lock Repair"
      ]
    },
    {
      icon: "fas fa-gas-pump",
      title: "Emergency Fuel Delivery",
      color: "text-blue-600",
      description: "24/7 gasoline and diesel fuel delivery service to your location.",
      link: "/emergency-fuel-delivery-fl",
      services: [
        "Gasoline Delivery",
        "Diesel Fuel Delivery",
        "Commercial Vehicle Fuel",
        "Emergency Fuel Service"
      ]
    },
    {
      icon: "fas fa-truck",
      title: "Fleet & Commercial Service",
      color: "text-blue-600",
      description: "Comprehensive fleet maintenance and commercial vehicle repair services.",
      link: "/quote",
      services: [
        "Fleet Maintenance Programs",
        "Commercial Vehicle Repair",
        "DOT Inspection Prep",
        "Preventive Maintenance"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Tire Services Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Tire Services – Fast, Mobile, & Affordable</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our specialty: professional mobile tire repair and replacement services across Northeast Florida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {primaryServices.map((service, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white p-3 rounded-lg mr-4">
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{service.description}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300 text-sm">
                    <i className="fas fa-check text-blue-500 mr-2 text-xs"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Secondary Services Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Also Offering Light Repair Services</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Essential roadside and mechanic services to keep you moving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {secondaryServices.map((service, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-all duration-300">
              <div className="flex items-center mb-3">
                <i className="fas fa-tools text-gray-400 text-xl mr-3"></i>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services Categories */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Complete Service Categories</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive mobile repair solutions for all your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-500">
              <div className="text-center mb-4">
                <div className="bg-blue-600 text-white p-4 rounded-lg inline-block mb-4">
                  <i className={`${service.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              </div>
              <ul className="space-y-2 text-gray-300 mb-4">
                {service.services.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-sm">
                    <i className="fas fa-check text-blue-500 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <a 
                  href={service.link}
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300"
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
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <i className="fas fa-phone mr-3"></i>
              Call Now: (386) 372-8412
            </a>
            <a 
              href="tel:+13863387945" 
              className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <i className="fas fa-phone mr-3"></i>
              After Hours: (386) 338-7945
            </a>
          </div>
          <div className="mt-4">
            <a 
              href="/quote"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
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