export default function TestimonialsSection() {
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

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Don't just take our word for it - hear from satisfied customers across Florida
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">{testimonial.rating}.0</span>
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 mb-4">
                "{testimonial.text}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[hsl(221,83%,53%)] rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.initial}
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
