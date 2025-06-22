import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import truck1 from "@assets/image_1750232639530.jpeg";
import truck2 from "@assets/image_1750233313706.jpeg";
// Direct path to attached assets
const technicianImage = "/attached_assets/D51BAF30-01DB-4D89-A56B-6A2135C674B4_1750487527873.PNG";

export default function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const galleryImages = [
    {
      src: truck1,
      alt: "AA Trust Roadside heavy duty service truck",
      title: "Heavy Duty Service Unit"
    },
    {
      src: truck2, 
      alt: "AA Trust Roadside diesel repair truck ready for service",
      title: "Diesel Repair Specialists"
    },
    {
      src: technicianImage,
      alt: "AA Trust Roadside technician performing emergency roadside service",
      title: "Emergency Response"
    },
    {
      src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
      alt: "Professional diagnostic service",
      title: "Professional Service"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, galleryImages.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Trusted. Local. Ready.</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See our professional heavy duty service units and team in action
          </p>
        </div>
        
        {/* Slideshow Container */}
        <div className="relative overflow-hidden rounded-xl shadow-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {galleryImages.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Need heavy duty diesel repair right now? We're standing by 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+13863728412"
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <i className="fas fa-phone mr-3"></i>
              Call (386) 372-8412
            </a>
            <a 
              href="tel:+13863387945"
              className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <i className="fas fa-phone mr-3"></i>
              Backup (386) 338-7945
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}