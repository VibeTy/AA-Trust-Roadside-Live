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
        title="Mobile Tire Repair Palm Coast | AA Trust Roadside"
        description="24/7 mobile tire repair, roadside assistance, and light mechanic service in Palm Coast, Daytona, and Jacksonville. Fast. Reliable. Trusted."
        keywords="mobile tire repair Palm Coast, tire replacement Daytona Beach, roadside tire service Jacksonville, emergency tire help St Augustine, mobile mechanic Florida"
        canonicalUrl="https://aatrustroadside.com"
      />
      <Navigation />
      <HeroSection />

      {/* Smart Service Analyzer Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🤖 AI-Powered Problem Solver
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