export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(221,83%,53%)] to-blue-800 dark:from-gray-800 dark:to-gray-900">
      {/* Background overlay with truck image */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
        }}
      ></div>
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <i className="fas fa-truck text-6xl mb-4 text-red-500"></i>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-red-500">DIESEL</span> BREAKDOWN?<br />
          <span className="text-4xl md:text-6xl">24/7 <span className="text-red-500">HEAVY DUTY</span> HELP</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl">
          Professional heavy duty diesel repair and emergency service in Palm Coast, Jacksonville, Daytona & beyond.
        </p>
        
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
            <div className="text-3xl font-bold text-[hsl(43,96%,56%)]">24/7</div>
            <div className="text-sm text-gray-300">Emergency Service</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[hsl(43,96%,56%)]">15+</div>
            <div className="text-sm text-gray-300">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[hsl(43,96%,56%)]">100%</div>
            <div className="text-sm text-gray-300">Satisfaction Rate</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection("services")}
          className="text-white hover:text-[hsl(43,96%,56%)] transition-colors"
        >
          <i className="fas fa-chevron-down text-2xl"></i>
        </button>
      </div>
    </section>
  );
}
