import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";
import SEOHead from "@/components/SEOHead";
import SmartServiceForm from "@/components/SmartServiceForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Diesel Roadside Assistance Near Me | 24/7 Emergency Mobile Tire Repair | AA Trust Roadside"
        description="Expert diesel roadside assistance & mobile tire repair near you! 24/7 emergency service in Palm Coast, Jacksonville & Northeast FL. Call (386) 372-8412 for immediate help!"
        keywords="diesel roadside assistance near me, mobile tire repair near me, 24/7 tire shop near me, emergency roadside service, diesel mechanic near me, Palm Coast FL, Jacksonville FL"
        canonicalUrl="https://aatrustroadside.com"
      />
      <Navigation />
      <HeroSection />

      {/* Smart Service Analyzer Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🤖 Smart Analyzer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Not sure what service you need? Our smart analyzer will match your vehicle problem 
              with the right service and give you an instant price estimate.
            </p>
          </div>
          <SmartServiceForm />
        </div>
      </section>

      <ServicesSection />
      <AboutSection />
      <ServiceAreaSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <StickyCallButton />
    </div>
  );
}