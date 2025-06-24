import { Link } from "wouter";
import { Phone, MapPin, Wrench, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";

export default function Palatka() {
  const services = [
    "24/7 Emergency Roadside Assistance",
    "Mobile Diesel Engine Repair",
    "Heavy Duty Truck Diagnostics",
    "DPF Filter Cleaning & Replacement",
    "Transmission & Clutch Service",
    "Brake System Repair", 
    "Electrical System Diagnostics",
    "Mobile Oil Changes & Maintenance"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <SEOHead 
        title="Mobile Truck Repair Palatka FL | 24/7 Diesel Service | AA Trust Roadside"
        description="Reliable mobile truck repair in Palatka, FL. 24/7 emergency roadside diesel help along the St. Johns River. Call (386) 372-8412 for professional service."
        keywords="mobile truck repair Palatka, roadside diesel help Palatka FL, heavy duty truck repair Putnam County, emergency truck service St Johns River"
        canonicalUrl="https://aatrustroadside.com/locations/palatka"
      />
      {/* Header */}
      <header className="bg-red-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              AA Trust Roadside
            </Link>
            <a 
              href="tel:+13863728412"
              className="bg-white text-red-600 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
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
            Mobile Truck Repair in Palatka, Florida
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Reliable heavy-duty diesel repair and emergency roadside assistance along the St. Johns River
          </p>
          <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-8">
            <MapPin className="w-5 h-5 mr-2" />
            <span>Serving Palatka, Putnam County, and North Central Florida</span>
          </div>
        </div>

        {/* Location-Specific Content */}
        <div className="prose prose-lg max-w-none mb-12 text-gray-700 dark:text-gray-300">
          <p>
            When your heavy-duty truck needs professional mobile truck repair in Palatka, AA Trust Roadside delivers 
            expert roadside diesel help throughout this historic St. Johns River community and surrounding areas. From 
            the busy US-17 corridor to the industrial areas near Palatka Municipal Airport, our certified diesel mechanics 
            provide 24/7 emergency truck repair services. Whether you're broken down near Ravine Gardens State Park, 
            stuck on SR-20, or need service at your business location along the St. Johns River, we bring fully equipped 
            mobile repair units directly to your location.
          </p>
          
          <p>
            Our Palatka mobile truck repair specialists understand the unique needs of commercial vehicles operating 
            in this important transportation hub. From delivery trucks serving the agricultural operations throughout 
            Putnam County to heavy equipment working forestry and construction projects in the region, we provide fast 
            roadside diesel help that minimizes your downtime. Our mobile truck repair near Crescent City, Interlachen, 
            and Welaka ensures comprehensive coverage throughout the area, whether you're hauling agricultural products 
            to processing facilities or transporting goods along the busy SR-19 corridor.
          </p>

          <p>
            Don't let a diesel breakdown disrupt your operations in Palatka's agricultural and industrial economy. 
            Our experienced technicians provide comprehensive mobile truck repair services for all major diesel engines 
            including Cummins, Caterpillar, Detroit Diesel, and International. From emergency roadside diesel help near 
            the historic downtown district to scheduled maintenance for your fleet operations, we keep your heavy-duty 
            trucks running reliably in Putnam County's diverse business environment and challenging rural conditions.
          </p>
        </div>

        {/* Services Section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Palatka Mobile Truck Repair Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center">
                <Wrench className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{service}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-red-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need Emergency Roadside Diesel Help in Palatka?</h3>
          <p className="text-lg mb-6">
            Our certified mobile truck repair technicians are ready 24/7 to provide expert service anywhere in Palatka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+13863728412"
              className="bg-white text-red-600 px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: (386) 372-8412
            </a>
            <Link 
              href="/quote"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-white hover:text-red-600 transition-colors inline-flex items-center justify-center"
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