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
          <i className="fas fa-truck text-6xl mb-4 text-red-500"></i>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-red-500">DIESEL</span> BREAKDOWN?<br />
          <span className="text-4xl md:text-6xl">24/7 <span className="text-red-500">HEAVY DUTY</span> HELP</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-3xl">
          Professional heavy duty diesel repair and emergency service in Palm Coast, Jacksonville, Daytona & beyond.
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
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a 
            href="tel:+13863728412"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <i className="fas fa-phone"></i>
            📞 Call Now
          </a>
          <a 
            href="#contact"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i className="fas fa-clipboard-list"></i>
            📋 Get a Quote
          </a>
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