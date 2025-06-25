import { Link } from "wouter";
import { Phone, MapPin, Wrench, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";

export default function PalmCoast() {
  const services = [
    "Mobile Tire Repair & Replacement",
    "24/7 Emergency Roadside Assistance", 
    "Brake System Repair & Service",
    "Mobile Oil Changes & Maintenance",
    "DPF Flapper Replacement",
    "Light Diesel Engine Diagnostics",
    "Jump Starts & Battery Service",
    "Fuel Delivery & Lockout Service"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHead 
        title="Mobile Tire Repair Palm Coast FL | 24/7 Roadside Service | AA Trust Roadside"
        description="Expert mobile tire repair in Palm Coast, FL. 24/7 emergency roadside assistance in Flagler County. Call (386) 372-8412 for immediate tire service."
        keywords="mobile tire repair Palm Coast, roadside assistance Palm Coast FL, tire service Flagler County, emergency tire repair Palm Coast"
        canonicalUrl="https://aatrustroadside.com/locations/palm-coast"
      />
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              AA Trust Roadside
            </Link>
            <a 
              href="tel:+13863728412"
              className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              <Phone className="inline w-4 h-4 mr-2" />
              (386) 372-8412
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Mobile Tire Repair in Palm Coast, Florida
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Professional mobile tire repair and emergency roadside assistance in Flagler County
          </p>
          <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-8">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Serving Palm Coast, Flagler County, and Northeast Florida</span>
          </div>
        </div>

        {/* Location-Specific Content */}
        <div className="prose prose-lg max-w-none mb-12 text-gray-700 dark:text-gray-300">
          <p>
            When your truck has tire problems in Palm Coast, you need reliable mobile tire repair that comes to you. 
            AA Trust Roadside provides professional mobile tire repair and replacement services throughout Palm Coast, from the Hammock area 
            near Washington Oaks Gardens State Park to the Palm Coast Parkway corridor and everywhere in between. Our certified 
            technicians are equipped to handle tire emergencies, light diesel repairs, and roadside assistance for commercial trucks, box trucks, 
            and heavy equipment right at your location.
          </p>

          <p>
            Our Palm Coast mobile tire repair team understands the unique challenges of operating commercial vehicles in 
            Florida's coastal environment. Whether you're stuck near Palm Coast Town Center, broken down on I-95, or need 
            tire service at your business location along US-1, we provide fast, professional mobile tire repair 24/7. From flat tire 
            repairs and tire replacements to brake service and oil changes, our experienced technicians 
            have the tools and expertise to get your truck back on the road quickly.
          </p>

          <p>
            Don't let a tire breakdown in Palm Coast cost you time and money. Our mobile tire repair near Flagler Beach, 
            Bunnell, and throughout Flagler County ensures you get back to work fast. We specialize in truck tire repair and replacement 
            for all vehicle types, providing everything from emergency tire service to light diesel maintenance and 
            brake service for Palm Coast area businesses.
          </p>
        </div>

        {/* Services Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Palm Coast Mobile Tire Repair Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center">
                <Wrench className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Emergency Tire Repair in Palm Coast?</h3>
          <p className="text-lg mb-6">
            Our mobile tire repair experts are available 24/7 to provide fast, professional service anywhere in Palm Coast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+13863728412"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: (386) 372-8412
            </a>
            <Link 
              href="/quote"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center"
            >
              Request Quote
            </Link>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-4">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-semibold">Available 24/7 for Emergency Service</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Regular business hours: Monday - Friday 7:00 AM - 6:00 PM
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">AA Trust Roadside</h4>
              <p className="text-gray-400 mb-4">
                Professional heavy-duty mobile diesel repair and roadside assistance across Northeast Florida.
              </p>
              <p className="text-gray-400">
                <Phone className="inline w-4 h-4 mr-2" />
                (386) 372-8412
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
              <div className="grid grid-cols-2 gap-2 text-gray-400">
                <Link href="/locations/palm-coast" className="hover:text-white">Palm Coast</Link>
                <Link href="/locations/daytona-beach" className="hover:text-white">Daytona Beach</Link>
                <Link href="/locations/st-augustine" className="hover:text-white">St. Augustine</Link>
                <Link href="/locations/ormond-beach" className="hover:text-white">Ormond Beach</Link>
                <Link href="/locations/jacksonville" className="hover:text-white">Jacksonville</Link>
                <Link href="/locations/palatka" className="hover:text-white">Palatka</Link>
                <Link href="/locations/gainesville" className="hover:text-white">Gainesville</Link>
                <Link href="/locations/deland" className="hover:text-white">DeLand</Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <Link href="/" className="block hover:text-white">Home</Link>
                <Link href="/quote" className="block hover:text-white">Get Quote</Link>
                <Link href="/bookings" className="block hover:text-white">Book Service</Link>
                <a href="#contact" className="block hover:text-white">Contact</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AA Trust Roadside. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}