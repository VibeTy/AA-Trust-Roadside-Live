import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import PageOptimizer from "@/components/PageOptimizer";

export default function Contact() {
  return (
    <>
      <SEOHead 
        title="Contact AA Trust Roadside | 24/7 Emergency Service"
        description="Need immediate roadside assistance? Call us 24/7 or fill out our contact form. Serving Palm Coast, Jacksonville, and surrounding areas with fast, reliable service."
        keywords="contact AA Trust Roadside, 24/7 roadside assistance, emergency service, Palm Coast FL, Jacksonville FL, mobile tire repair contact"
        canonicalUrl="https://aatrustroadside.com/contact"
      />
      
      <PageOptimizer>
        <div className="min-h-screen bg-gray-900">
          <Navigation />
          <div className="pt-20">
            <ContactSection />
          </div>
          <Footer />
        </div>
      </PageOptimizer>
    </>
  );
}