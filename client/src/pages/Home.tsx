import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyCallButton from "@/components/StickyCallButton";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ServiceAreaSection />
      <ContactSection />
      <Footer />
      <StickyCallButton />
    </div>
  );
}
