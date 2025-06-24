import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
}

export default function SEOHead({ 
  title, 
  description, 
  keywords, 
  ogTitle, 
  ogDescription,
  canonicalUrl 
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', description);
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }
    
    // Update meta keywords
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      metaKeywords.setAttribute('content', keywords);
      if (!document.querySelector('meta[name="keywords"]')) {
        document.head.appendChild(metaKeywords);
      }
    }
    
    // Update Open Graph tags
    const ogTitleTag = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitleTag.setAttribute('property', 'og:title');
    ogTitleTag.setAttribute('content', ogTitle || title);
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitleTag);
    }
    
    const ogDescriptionTag = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescriptionTag.setAttribute('property', 'og:description');
    ogDescriptionTag.setAttribute('content', ogDescription || description);
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescriptionTag);
    }
    
    // Update canonical URL
    if (canonicalUrl) {
      const canonicalLink = document.querySelector('link[rel="canonical"]') || document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', canonicalUrl);
      if (!document.querySelector('link[rel="canonical"]')) {
        document.head.appendChild(canonicalLink);
      }
    }
    
    // Add structured data for local business
    const existingStructuredData = document.querySelector('script[type="application/ld+json"]');
    if (!existingStructuredData) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": "AA Trust Roadside",
        "description": "Professional heavy-duty mobile diesel repair and roadside assistance across Northeast Florida",
        "url": "https://aatrustroadside.com",
        "telephone": "+1-386-372-8412",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Palm Coast",
          "addressRegion": "FL",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "29.5844",
          "longitude": "-81.2081"
        },
        "openingHours": "Mo-Fr 07:00-18:00",
        "serviceArea": {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": "29.5844",
            "longitude": "-81.2081"
          },
          "geoRadius": "100000"
        },
        "areaServed": [
          "Palm Coast, FL",
          "Daytona Beach, FL", 
          "St. Augustine, FL",
          "Ormond Beach, FL",
          "Jacksonville, FL",
          "Palatka, FL",
          "Gainesville, FL",
          "DeLand, FL"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Mobile Diesel Repair Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "24/7 Emergency Roadside Assistance"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Mobile Diesel Engine Repair"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Heavy Duty Truck Diagnostics"
              }
            }
          ]
        }
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, ogTitle, ogDescription, canonicalUrl]);

  return null;
}