interface StructuredDataProps {
  type: 'organization' | 'local-business' | 'service' | 'article';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    const baseOrganization = {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "name": "AA Trust Roadside",
      "description": "24/7 mobile tire repair and roadside assistance service in Northeast Florida",
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
        "longitude": "-81.2077"
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$$",
      "areaServed": [
        "Palm Coast, FL",
        "Jacksonville, FL", 
        "Daytona Beach, FL",
        "Ormond Beach, FL",
        "DeLand, FL",
        "St. Augustine, FL"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mobile Roadside Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Mobile Tire Repair",
              "description": "24/7 emergency mobile tire repair and replacement service"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Jump Start Service",
              "description": "Emergency battery jump start and replacement service"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Vehicle Lockout Service",
              "description": "Professional damage-free vehicle lockout service"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Emergency Fuel Delivery",
              "description": "24/7 gasoline and diesel fuel delivery service"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150"
      }
    };

    switch (type) {
      case 'organization':
      case 'local-business':
        return baseOrganization;
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "provider": baseOrganization,
          ...data
        };
      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "publisher": baseOrganization,
          ...data
        };
      default:
        return baseOrganization;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateStructuredData())
      }}
    />
  );
}