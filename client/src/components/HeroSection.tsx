import { useState, useEffect } from "react";
import truck1 from "@assets/image_1756341982828.png";

export default function HeroSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = truck1;
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Image - Lazy loaded */}
      {imageLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 transition-opacity duration-500"
          style={{
            backgroundImage: `url(${truck1})`,
          }}
        ></div>
      )}

      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16 md:pt-8">
        <div className="mb-8 md:mb-10 mt-8 md:mt-4">
          <img 
            src="/attached_assets/7938bab5-b302-4cf1-8a69-78cfce3c9be4_1750802043592.png" 
            alt="AA Trust Roadside Logo" 
            className="h-28 md:h-40 w-auto mx-auto mb-6 md:mb-8 max-w-full object-contain"
            loading="eager"
            decoding="async"
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
              <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
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