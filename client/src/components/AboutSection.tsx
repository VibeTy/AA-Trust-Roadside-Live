export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About AA Trust Roadside
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              AA Trust Roadside was founded by Fritzner with a mission to keep truckers and everyday drivers 
              moving safely and efficiently. Based in Palm Coast, we offer mobile tire and light repair services 
              across Daytona, Jacksonville, and surrounding areas.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-red-100 dark:bg-red-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-mobile-alt text-red-600 dark:text-red-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mobile Service</h3>
                <p className="text-gray-600 dark:text-gray-400">We come to you wherever you are, ensuring minimal downtime</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-clock text-blue-600 dark:text-blue-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Response</h3>
                <p className="text-gray-600 dark:text-gray-400">Quick service to get you back on the road in no time</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shield-alt text-green-600 dark:text-green-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trusted Quality</h3>
                <p className="text-gray-600 dark:text-gray-400">Professional service you can rely on, every time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}