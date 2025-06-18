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

export default function Home() {
  return (
    <div className="min-h-screen">
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
