export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Why Choose Our 24/7 Emergency Tire Service?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              When tire emergencies strike, you need fast, reliable mobile tire repair near you. 
              Our certified technicians provide professional 24/7 emergency tire replacement services that get you back on the road safely. 
              Based in Palm Coast, FL, we deliver mobile tire repair and roadside assistance 
              across Daytona Beach, Jacksonville, and all of Northeast Florida.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-mobile-alt text-blue-500 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Fast Arrival</h3>
                <p className="text-gray-400">We come to you wherever you are, ensuring minimal downtime</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-tools text-blue-500 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Fully Equipped</h3>
                <p className="text-gray-400">Professional tools and parts ready for any tire emergency</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-clock text-blue-500 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">24/7 Coverage</h3>
                <p className="text-gray-400">Round-the-clock emergency tire and roadside service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}