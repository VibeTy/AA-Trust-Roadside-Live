import { Link } from "wouter";

export default function ServiceAreaSection() {
  const serviceAreas = [
    { name: "Palm Coast", href: "/locations/palm-coast", description: "Mobile tire repair & light diesel service" },
    { name: "Daytona Beach", href: "/locations/daytona-beach", description: "24/7 emergency truck repair" },
    { name: "St. Augustine", href: "/locations/st-augustine", description: "Heavy-duty diesel repair" },
    { name: "Ormond Beach", href: "/locations/ormond-beach", description: "Mobile truck repair services" },
    { name: "Jacksonville", href: "/locations/jacksonville", description: "Commercial roadside assistance" },
    { name: "Palatka", href: "/locations/palatka", description: "Mobile diesel engine repair" },
    { name: "Gainesville", href: "/locations/gainesville", description: "University city truck repair" },
    { name: "DeLand", href: "/locations/deland", description: "Volusia County mobile service" }
  ];

  return (
    <section id="service-areas" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Service Areas
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional mobile truck repair and roadside assistance throughout Northeast Florida
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceAreas.map((area) => (
            <Link key={area.name} href={area.href}>
              <div className="bg-black border border-gray-800 rounded-lg p-6 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                <div className="flex items-center mb-4">
                  <i className="fas fa-map-marker-alt text-blue-500 text-xl mr-3"></i>
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {area.name}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {area.description}
                </p>
                <div className="mt-4 flex items-center text-blue-500 text-sm group-hover:text-blue-400 transition-colors">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-blue-600 text-white rounded-lg p-8 inline-block">
            <h3 className="text-2xl font-bold mb-4">Need Service Outside These Areas?</h3>
            <p className="text-lg mb-6">
              We also provide mobile repair services throughout Central and Northeast Florida
            </p>
            <a 
              href="tel:+13863728412"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <i className="fas fa-phone mr-2"></i>
              Call Now: (386) 372-8412
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}