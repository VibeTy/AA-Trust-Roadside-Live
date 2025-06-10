export default function ServiceAreaSection() {
  const serviceAreas = [
    "Palm Coast",
    "Flagler Beach", 
    "Ormond Beach",
    "Daytona Beach",
    "St. Augustine",
    "Bunnell"
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Areas</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Proudly serving Palm Coast, FL and surrounding areas with mobile diesel repair
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Google Map embed centered on Palm Coast, FL */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 overflow-hidden relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56834.14087894!2d-81.24611234863282!3d29.584945300000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e6d1b1b9e1e8ab%3A0x1b1b1b1b1b1b1b1b!2sPalm%20Coast%2C%20FL!5e0!3m2!1sen!2sus!4v1632758400000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Palm Coast Florida Service Area Map"
              ></iframe>
              <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
                <div className="flex items-center">
                  <i className="fas fa-map-marker-alt text-[hsl(221,83%,53%)] mr-2"></i>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">Service Center</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Palm Coast, FL</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Coverage Areas Include:</h3>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {serviceAreas.map((area, index) => (
                <div key={index} className="flex items-center">
                  <i className="fas fa-map-pin text-[hsl(221,83%,53%)] mr-3"></i>
                  <span className="text-gray-700 dark:text-gray-300">{area}</span>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Service Radius</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We provide mobile diesel repair services within a 50-mile radius of Palm Coast, FL. Emergency roadside assistance available 24/7.
              </p>
              <div className="flex items-center text-[hsl(43,96%,56%)] font-medium">
                <i className="fas fa-clock mr-2"></i>
                Average response time: 30-45 minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
