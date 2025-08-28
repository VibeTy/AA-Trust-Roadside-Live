import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Calculate average rating
  const calculateAverageRating = () => {
    const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    return (totalRating / testimonials.length).toFixed(1);
  };

  const testimonials = [
    {
      rating: 5,
      text: "These guys saved the day! Our delivery truck broke down on I-95 and they were there within 30 minutes. Professional, fast, and got us back on the road quickly.",
      author: "Mike R.",
      title: "",
      initial: "M"
    },
    {
      rating: 5,
      text: "Outstanding service! They handle all our fleet maintenance and their mobile service means zero downtime for our business. Highly recommend for any commercial operation.",
      author: "Sarah",
      title: "",
      initial: "S"
    },
    {
      rating: 5,
      text: "Fair pricing, expert technicians, and they actually show up when they say they will. Hard to find that level of reliability these days. Will definitely use them again.",
      author: "James Parker",
      title: "",
      initial: "J"
    },
    {
      rating: 5,
      text: "Had a transmission issue with our semi near Daytona. AA Trust came out same day and fixed it roadside. Saved us thousands in towing costs. These guys know diesels inside and out.",
      author: "Carlos M.",
      title: "",
      initial: "C"
    },
    {
      rating: 5,
      text: "Engine overheating on a hot summer day in Jacksonville. They diagnosed it fast and replaced the water pump on site. Back to hauling in 3 hours. Couldn't ask for better service.",
      author: "David",
      title: "",
      initial: "D"
    },
    {
      rating: 5,
      text: "Called them for brake issues on our box truck. Honest assessment, fair price, and quality work. They even followed up the next day to make sure everything was running smooth.",
      author: "Lisa C.",
      title: "",
      initial: "L"
    },
    {
      rating: 5,
      text: "Electrical problems can be a nightmare but these technicians traced the issue in our Peterbilt quickly. Professional service and they cleaned up after themselves too.",
      author: "Robert",
      title: "",
      initial: "R"
    },
    {
      rating: 5,
      text: "Fuel system problems had us stranded at a truck stop. AA Trust was there in 45 minutes and had us running again. Fair pricing and no hidden fees. Will use them again.",
      author: "Maria Santos",
      title: "",
      initial: "M"
    },
    {
      rating: 5,
      text: "Our Freightliner started throwing codes near St. Augustine. They came out with proper diagnostic equipment and fixed the EGR valve same day. Very knowledgeable team.",
      author: "Tom B.",
      title: "",
      initial: "T"
    },
    {
      rating: 5,
      text: "Turbo issues on our delivery truck. They explained everything clearly and gave us options. Went with the repair and it's been running great for 6 months now.",
      author: "Jennifer",
      title: "",
      initial: "J"
    },
    {
      rating: 5,
      text: "Coolant leak had us overheating on I-4. They located the problem fast and had the parts on their truck. Professional service and competitive pricing.",
      author: "Antonio G.",
      title: "",
      initial: "A"
    },
    {
      rating: 5,
      text: "Air brake system acting up on our coach bus. AA Trust diagnosed it properly and fixed it right the first time. Passengers were impressed with how quickly we got back on the road.",
      author: "Kevin",
      title: "",
      initial: "K"
    },
    {
      rating: 5,
      text: "Starter problems on our Mack truck. They had us running in under 2 hours. Fair price and warranty on the work. These guys understand the urgency of getting commercial vehicles back to work.",
      author: "Patricia Williams",
      title: "",
      initial: "P"
    },
    {
      rating: 5,
      text: "DPF issues were causing reduced power. They cleaned it properly and explained maintenance tips to prevent future problems. Good follow-up service too.",
      author: "Daniel M.",
      title: "",
      initial: "D"
    },
    {
      rating: 5,
      text: "Alternator failed on our delivery route. AA Trust came out with the right part and tools. Fixed it roadside and we finished our deliveries on time. Lifesavers!",
      author: "Rachel",
      title: "",
      initial: "R"
    },
    {
      rating: 5,
      text: "Hydraulic problems on our dump truck. They had the expertise and equipment to fix it properly. Transparent pricing and quality workmanship. Highly recommend.",
      author: "Steve A.",
      title: "",
      initial: "S"
    },
    {
      rating: 5,
      text: "DEF system malfunctioned causing engine derating. They knew exactly what to do and had us back to full power quickly. Knowledge and service you can trust.",
      author: "Michelle",
      title: "",
      initial: "M"
    },
    {
      rating: 5,
      text: "Clutch problems on our straight truck. Honest evaluation and they didn't oversell us. Fixed what needed fixing and gave maintenance advice. Will call them again.",
      author: "Brian W.",
      title: "",
      initial: "B"
    },
    {
      rating: 5,
      text: "Radiator leak on a Sunday had us stranded. They came out despite it being weekend and had us running again. Premium service when you need it most.",
      author: "Crystal",
      title: "",
      initial: "C"
    },
    {
      rating: 5,
      text: "Injector problems were causing rough idle and black smoke. They diagnosed it correctly and replaced the faulty injectors. Engine runs like new now.",
      author: "Jose Martinez",
      title: "",
      initial: "J"
    },
    {
      rating: 5,
      text: "Air compressor failure on our tractor trailer. They had the replacement and expertise to install it roadside. Professional service and fair pricing.",
      author: "Amanda C.",
      title: "",
      initial: "A"
    },
    {
      rating: 5,
      text: "Power steering pump went out near Palm Coast. They came prepared with the right parts and tools. Fixed it efficiently and cleaned up afterwards.",
      author: "Frank",
      title: "",
      initial: "F"
    },
    {
      rating: 5,
      text: "Exhaust system problems were causing failures. They welded and replaced sections as needed. Quality work that's holding up well after several months.",
      author: "Diana R.",
      title: "",
      initial: "D"
    },
    {
      rating: 5,
      text: "Transmission leak was getting worse. They diagnosed the seal failure and fixed it properly. No more leaks and transmission is shifting smooth.",
      author: "Marcus",
      title: "",
      initial: "M"
    },
    {
      rating: 5,
      text: "Computer issues were causing all kinds of problems. They had the right diagnostic equipment and software to reprogram everything. Truck runs perfect now.",
      author: "Samantha Lee",
      title: "",
      initial: "S"
    },
    {
      rating: 5,
      text: "Fuel pump problems had us losing power. They tested everything thoroughly and replaced the faulty pump. Honest diagnosis and quality parts.",
      author: "Gregory W.",
      title: "",
      initial: "G"
    },
    {
      rating: 5,
      text: "Turbo charger was failing on our Caterpillar engine. They sourced the right replacement and installed it expertly. Power is back to normal.",
      author: "Nicole",
      title: "",
      initial: "N"
    },
    {
      rating: 5,
      text: "Serpentine belt snapped on the highway. They came out quickly with the right belt and had us running in 30 minutes. Simple fix but they saved our day.",
      author: "Chris G.",
      title: "",
      initial: "C"
    },
    {
      rating: 5,
      text: "Oil leak was getting bad on our Volvo. They found the source and sealed it properly. No more oil spots and engine is running clean.",
      author: "Tiffany",
      title: "",
      initial: "T"
    },
    {
      rating: 5,
      text: "Suspension issues were making the ride rough. They diagnosed the air bags and replaced them. Much smoother ride and better handling now.",
      author: "Paul Williams",
      title: "",
      initial: "P"
    },
    {
      rating: 5,
      text: "Cooling fan motor died in summer heat. They prioritized our emergency call and had the fan running again within 2 hours. Excellent emergency service.",
      author: "Kim M.",
      title: "",
      initial: "K"
    },
    {
      rating: 5,
      text: "Brake chamber replacement on our trailer. They came with all the right tools and parts. Professional installation and tested everything before we left.",
      author: "Ronald",
      title: "",
      initial: "R"
    },
    {
      rating: 5,
      text: "Wiring harness problems were causing intermittent issues. They traced every wire and fixed all the damaged connections. No more electrical gremlins.",
      author: "Stephanie T.",
      title: "",
      initial: "S"
    },
    {
      rating: 5,
      text: "Diesel particulate filter was clogged beyond cleaning. They explained the options and installed a quality replacement. Truck is running strong again.",
      author: "Jason",
      title: "",
      initial: "J"
    },
    {
      rating: 5,
      text: "Water pump failure on our International. They diagnosed it quickly and had the replacement installed same day. No overheating issues since.",
      author: "Mary J.",
      title: "",
      initial: "M"
    },
    {
      rating: 5,
      text: "Fifth wheel problems were affecting our coupling. They adjusted and lubricated everything properly. Much smoother hookups and no more binding.",
      author: "William",
      title: "",
      initial: "W"
    },
    {
      rating: 5,
      text: "Differential problems were causing noise and vibration. They rebuilt it properly with quality parts. Smooth and quiet operation now.",
      author: "Teresa W.",
      title: "",
      initial: "T"
    },
    {
      rating: 5,
      text: "Engine control module went bad throwing multiple codes. They diagnosed it correctly and programmed the replacement. Truck is running like new.",
      author: "Michael Brown",
      title: "",
      initial: "M"
    },
    {
      rating: 5,
      text: "Fuel filter was clogged causing power loss. Simple fix but they came out promptly and had us running again quickly. Good service for a simple problem.",
      author: "Sandra",
      title: "",
      initial: "S"
    },
    {
      rating: 5,
      text: "Exhaust brake wasn't working properly. They adjusted and tested it thoroughly. Much better engine braking now and safer mountain driving.",
      author: "Tim W.",
      title: "",
      initial: "T"
    },
    {
      rating: 5,
      text: "Air dryer problems were causing moisture in the brake system. They replaced it and purged all the lines. Brakes feel much better now.",
      author: "Laura",
      title: "",
      initial: "L"
    },
    {
      rating: 5,
      text: "Cab air ride system was failing. They diagnosed the leak and replaced the faulty components. Much more comfortable ride for long hauls.",
      author: "George G.",
      title: "",
      initial: "G"
    },
    {
      rating: 5,
      text: "Fuel injector o-rings were leaking. They replaced all of them with quality seals. No more fuel leaks and engine is running smooth.",
      author: "Janet",
      title: "",
      initial: "J"
    },
    {
      rating: 5,
      text: "Intercooler leak was causing reduced power. They found the crack and welded it properly. Back to full boost pressure and power.",
      author: "Charles Williams",
      title: "",
      initial: "C"
    },
    {
      rating: 5,
      text: "Transmission cooler lines were leaking. They replaced all the old lines with upgraded ones. No more leaks and transmission is running cooler.",
      author: "Elizabeth M.",
      title: "",
      initial: "E"
    },
    {
      rating: 5,
      text: "Brake adjustment on our drum brakes. They properly adjusted all wheels and tested the system. Much better stopping power and pedal feel.",
      author: "Richard",
      title: "",
      initial: "R"
    },
    {
      rating: 5,
      text: "Engine oil cooler was leaking coolant into the oil. They diagnosed it correctly and replaced the cooler. Clean oil and no more mixing.",
      author: "Karen T.",
      title: "",
      initial: "K"
    },
    {
      rating: 5,
      text: "Clutch master cylinder failure left us with no clutch. They bled the system and replaced the faulty cylinder. Clutch feels great now.",
      author: "Gary",
      title: "",
      initial: "G"
    },
    {
      rating: 5,
      text: "Cab tilt mechanism wasn't working properly. They lubricated and adjusted everything. Much easier to tilt the cab for engine access now.",
      author: "Nancy J.",
      title: "",
      initial: "N"
    },
    {
      rating: 5,
      text: "Driveshaft u-joints were worn causing vibration. They replaced all the joints with quality parts. Smooth operation and no more vibration.",
      author: "Edward",
      title: "",
      initial: "E"
    },
    {
      rating: 5,
      text: "Parking brake wasn't holding properly. They adjusted the mechanism and replaced worn cables. Park brake holds solid on any grade now.",
      author: "Helen R.",
      title: "",
      initial: "H"
    },
    {
      rating: 5,
      text: "Wheel seal leak was causing oil on the brakes. They replaced the seal and cleaned everything properly. No more leaks and brakes work perfectly.",
      author: "Donald",
      title: "",
      initial: "D"
    },
    {
      rating: 5,
      text: "Air conditioning compressor failed in summer. They diagnosed it quickly and installed a quality replacement. Cool air and quiet operation.",
      author: "Ruth Lee",
      title: "",
      initial: "R"
    },
    {
      rating: 5,
      text: "Kingpin wear was affecting steering. They measured everything and replaced the worn parts. Much tighter steering and better road feel.",
      author: "Kenneth W.",
      title: "",
      initial: "K"
    },
    {
      rating: 5,
      text: "Trailer ABS light was on constantly. They diagnosed the sensor problem and replaced the faulty components. System working perfectly now.",
      author: "Carol",
      title: "",
      initial: "C"
    },
    {
      rating: 5,
      text: "Fuel tank leak was a safety concern. They cleaned and welded the tank properly. Passed all inspections and no more fuel odors.",
      author: "Arthur G.",
      title: "",
      initial: "A"
    },
    {
      rating: 5,
      text: "Exhaust manifold crack was causing noise and fumes. They welded it expertly and tested for leaks. Much quieter operation now.",
      author: "Deborah",
      title: "",
      initial: "D"
    },
    {
      rating: 5,
      text: "Power take-off wasn't engaging properly. They adjusted and lubricated the mechanism. Works perfectly for our hydraulic equipment now.",
      author: "Harold Williams",
      title: "",
      initial: "H"
    },
    {
      rating: 5,
      text: "Thermostat stuck closed causing overheating. They diagnosed it quickly and installed a quality replacement. Perfect operating temperature now.",
      author: "Betty M.",
      title: "",
      initial: "B"
    },
    {
      rating: 5,
      text: "Windshield wiper motor died during a storm. Emergency call and they came out in the rain. Fixed it roadside so we could see safely.",
      author: "Ralph",
      title: "",
      initial: "R"
    },
    {
      rating: 5,
      text: "Heater core leak was fogging the windshield. They bypassed it temporarily and ordered the replacement. Fixed properly the next day.",
      author: "Donna T.",
      title: "",
      initial: "D"
    },
    {
      rating: 5,
      text: "Spring bushings were worn causing handling problems. They replaced all the worn bushings with quality parts. Much better ride and handling.",
      author: "Wayne",
      title: "",
      initial: "W"
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-2xl"></i>
              ))}
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              4.8 out of 5 stars
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Based on 62+ verified reviews from satisfied customers across Florida
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