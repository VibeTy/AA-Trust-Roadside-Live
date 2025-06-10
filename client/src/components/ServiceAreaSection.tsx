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
            {/* Map placeholder centered on Palm Coast, FL */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 flex items-center justify-center relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Palm Coast Florida service area map" 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-[hsl(221,83%,53%)] bg-opacity-20 rounded-xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <i className="fas fa-map-marker-alt text-4xl mb-2"></i>
                  <div className="font-semibold">Palm Coast, FL</div>
                  <div className="text-sm">& Surrounding Areas</div>
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
