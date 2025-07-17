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

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-4 md:pt-0">
        <div className="mb-6 md:mb-8">
          <img 
            src="/attached_assets/7938bab5-b302-4cf1-8a69-78cfce3c9be4_1750802043592.png" 
            alt="AA Trust Roadside Logo" 
            className="h-20 md:h-32 w-auto mx-auto mb-4 md:mb-6 max-w-full object-contain"
          />
        </div>

        {/* Main Heading - SEO Optimized H1 */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-center">
          <span className="text-blue-500">24/7 Emergency Mobile Tire Repair</span> Near Me<br />
          <span className="text-3xl md:text-5xl text-white">Northeast Florida</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto text-center leading-relaxed">
          Fast emergency tire replacement + roadside assistance in Palm Coast, Daytona Beach, Jacksonville & surrounding areas.
        </p>

        {/* Premium Metric Badges */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-sm md:text-base shadow-lg">
            ⏱️ 15min Avg Response
          </div>
          <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-sm md:text-base shadow-lg">
            🚚 100% Mobile Service
          </div>
          <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-sm md:text-base shadow-lg">
            👨‍🔧 60+ Trusted Drivers
          </div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a 
            href="tel:+13863728412"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 min-w-[180px]"
          >
            📞 Call Now
          </a>
          <a 
            href="#contact"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 min-w-[180px]"
          >
            💬 Get Free Quote
          </a>
        </div>

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
      </div>
    </section>
  );
}