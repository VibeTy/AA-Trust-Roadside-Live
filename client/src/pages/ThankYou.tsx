import { useLocation } from "wouter";

export default function ThankYou() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <i className="fas fa-check text-3xl text-green-600 dark:text-green-400"></i>
            </div>
          </div>
          
          {/* Main Message */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            We've received your service request and will get back to you shortly.
          </p>
          
          {/* Details */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-3">
              <i className="fas fa-clock text-[hsl(221,83%,53%)] mr-2"></i>
              <span className="font-semibold text-gray-900 dark:text-white">Response Time</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Our team will contact you within <strong>15 minutes</strong> during business hours to discuss your diesel repair needs and provide a competitive quote.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setLocation("/")}
              className="bg-[hsl(221,83%,53%)] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-home mr-2"></i>
              Return Home
            </button>
            <a 
              href="https://www.google.com/search?q=Florida+Diesel+Pro+reviews" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[hsl(43,96%,56%)] hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fab fa-google mr-2"></i>
              Leave a Google Review
            </a>
          </div>
          
          {/* Emergency Contact */}
          <div className="mt-8 p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              Need immediate assistance?
            </p>
            <a 
              href="tel:+15551234567" 
              className="text-[hsl(0,84%,60%)] hover:text-red-700 font-semibold text-lg"
            >
              <i className="fas fa-phone mr-2"></i>
              Call (555) 123-4567
            </a>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
              24/7 Emergency Service Available
            </p>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <i className="fas fa-truck text-2xl text-[hsl(221,83%,53%)] mb-3"></i>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mobile Service</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              We come to you with fully equipped service trucks
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <i className="fas fa-shield-alt text-2xl text-green-600 mb-3"></i>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Licensed & Insured</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Fully licensed technicians with comprehensive insurance
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <i className="fas fa-thumbs-up text-2xl text-[hsl(43,96%,56%)] mb-3"></i>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Satisfaction Guaranteed</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              100% satisfaction guarantee on all our work
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}