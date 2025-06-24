import truck1 from "@assets/image_1750232639530.jpeg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Image - Using actual truck photo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${truck1})`,
        }}
      ></div>
      
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <img 
            src="/attached_assets/7938bab5-b302-4cf1-8a69-78cfce3c9be4_1750802043592.png" 
            alt="AA Trust Roadside Logo" 
            className="h-24 w-auto mx-auto mb-4"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-blue-500">Mobile Tire Repair</span> & Roadside Help<br />
          <span className="text-4xl md:text-6xl text-white">24/7</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-3xl">
          Fast tire replacement + essential repairs in Palm Coast, Daytona, Jacksonville & beyond.
        </p>
        
        {/* Star Rating Display */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <i key={i} className="fas fa-star text-xl"></i>
            ))}
          </div>
          <span className="text-lg font-semibold text-white">
            4.8 out of 5 stars
          </span>
          <span className="text-gray-300">
            (62+ verified reviews)
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a 
            href="tel:+13863728412"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <i className="fas fa-phone"></i>
            Call Now
          </a>
          <a 
            href="#contact"
            className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <i className="fas fa-clipboard-list"></i>
            Get Free Quote
          </a>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-blue-500 text-2xl font-bold">✅ 15min</div>
            <div className="text-gray-300 text-sm">Avg Response</div>
          </div>
          <div className="text-center">
            <div className="text-blue-500 text-2xl font-bold">✅ 100%</div>
            <div className="text-gray-300 text-sm">Mobile</div>
          </div>
          <div className="text-center">
            <div className="text-blue-500 text-2xl font-bold">✅ 60+</div>
            <div className="text-gray-300 text-sm">Trusted Drivers</div>
          </div>
        </div>
        
        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-red-500">24/7</div>
            <div className="text-sm text-gray-300">Emergency Service</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-500">15min</div>
            <div className="text-sm text-gray-300">Response Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-500">100%</div>
            <div className="text-sm text-gray-300">Mobile Service</div>
          </div>
        </div>
      </div>
    </section>
  );
}