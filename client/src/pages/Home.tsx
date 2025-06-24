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
        title="Mobile Tire Repair Palm Coast – AA Trust Roadside | Fast Tire Service FL"
        description="Affordable, fast tire replacement and light roadside repair for Palm Coast, Daytona, Jacksonville, and St. Augustine. Mobile tire service wherever you are!"
        keywords="mobile tire repair Palm Coast, tire replacement Florida, roadside tire service, mobile mechanic Palm Coast, tire repair Daytona Beach, emergency tire service"
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
