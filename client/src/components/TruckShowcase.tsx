import truck1 from "@assets/image_1750232639530.jpeg";
import truck2 from "@assets/image_1750233313706.jpeg";

export default function TruckShowcase() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Heavy Duty Mobile Service Fleet</h2>
          <p className="text-xl text-gray-300">
            Fully equipped trucks bringing professional diesel and heavy equipment repair directly to you
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* First truck image */}
          <div className="relative">
            <img 
              src={truck1}
              alt="AA Trust Roadside heavy duty diesel service truck"
              className="w-full h-80 object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white mb-2">Heavy Duty Service Unit</h3>
              <p className="text-gray-200">Equipped with professional diesel diagnostic tools and heavy equipment parts</p>
            </div>
          </div>
          
          {/* Second truck image */}
          <div className="relative">
            <img 
              src={truck2}
              alt="AA Trust Roadside diesel repair truck ready for emergency service"
              className="w-full h-80 object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
            <div className="absolute bottom-6 left-6">
              <h3 className="text-2xl font-bold text-white mb-2">Diesel Specialists</h3>
              <p className="text-gray-200">Standing by 24/7 for heavy duty diesel and equipment emergencies</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">
                <i className="fas fa-tools"></i>
              </div>
              <h4 className="text-xl font-bold mb-2">Fully Equipped</h4>
              <p className="text-gray-300">Complete mobile workshop with all necessary tools and parts</p>
            </div>
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">
                <i className="fas fa-clock"></i>
              </div>
              <h4 className="text-xl font-bold mb-2">Fast Response</h4>
              <p className="text-gray-300">Quick arrival times across all our service areas</p>
            </div>
            <div className="text-center">
              <div className="text-red-500 text-4xl mb-4">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h4 className="text-xl font-bold mb-2">Professional Service</h4>
              <p className="text-gray-300">Licensed, insured, and experienced technicians</p>
            </div>
          </div>
          
          <div className="mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+13863728412"
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <i className="fas fa-phone mr-3"></i>
                Call Now: (386) 372-8412
              </a>
              <a 
                href="#contact"
                className="inline-flex items-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300"
              >
                <i className="fas fa-clipboard-list mr-3"></i>
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}