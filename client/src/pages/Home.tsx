import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TruckShowcase from "@/components/TruckShowcase";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import ContactSection from "@/components/ContactSection";
import PaymentSection from "@/components/PaymentSection";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead 
        title="AA Trust Roadside | 24/7 Mobile Tire Repair & Diesel Service | Palm Coast FL"
        description="Professional 24/7 mobile tire repair, replacement & light diesel service in Palm Coast, Daytona Beach, St. Augustine, Jacksonville FL. Call (386) 372-8412 now!"
        keywords="mobile tire repair Florida, truck tire replacement Palm Coast, roadside tire service Daytona Beach, emergency tire repair Jacksonville, 24/7 tire service"
        canonicalUrl="https://aatrustroadside.com"
      />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <TruckShowcase />
      <WhyChooseUsSection />
      <ServiceAreaSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <PaymentSection />
      <Footer />
      <StickyCallButton />
    </div>
  );
}
