import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
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
        title="Mobile Tire Repair Palm Coast – AA Trust Roadside"
        description="Affordable, fast tire replacement and light roadside repair for Palm Coast, Daytona, Jacksonville, and St. Augustine. Call (386) 372-8412 for immediate help!"
        keywords="mobile tire repair Palm Coast, tire replacement Daytona Beach, roadside tire service Jacksonville, emergency tire help St Augustine, mobile mechanic Florida"
        canonicalUrl="https://aatrustroadside.com"
      />
      <Navigation />
      <HeroSection />
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
