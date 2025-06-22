import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      rating: 5,
      text: "These guys saved the day! Our delivery truck broke down on I-95 and they were there within 30 minutes. Professional, fast, and got us back on the road quickly.",
      author: "Mike Rodriguez",
      title: "Logistics Manager",
      initial: "M"
    },
    {
      rating: 5,
      text: "Outstanding service! They handle all our fleet maintenance and their mobile service means zero downtime for our business. Highly recommend for any commercial operation.",
      author: "Sarah Thompson", 
      title: "Fleet Operations Director",
      initial: "S"
    },
    {
      rating: 5,
      text: "Fair pricing, expert technicians, and they actually show up when they say they will. Hard to find that level of reliability these days. Will definitely use them again.",
      author: "James Parker",
      title: "Construction Contractor", 
      initial: "J"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Don't just take our word for it - hear from satisfied customers across Florida
          </p>
        </div>
        
        {/* Slideshow Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-xl mx-2">
                    <div className="flex items-center justify-center mb-6">
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <i key={i} className="fas fa-star text-xl"></i>
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600 dark:text-gray-400 text-lg">{testimonial.rating}.0</span>
                    </div>
                    <blockquote className="text-gray-700 dark:text-gray-300 mb-6 text-lg italic text-center leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center justify-center border-t pt-6">
                      <div className="w-12 h-12 bg-[hsl(221,83%,53%)] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.initial}
                      </div>
                      <div className="ml-4 text-center">
                        <div className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.author}</div>
                        <div className="text-gray-600 dark:text-gray-400">{testimonial.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}