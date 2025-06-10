export default function WhyChooseUsSection() {
  const features = [
    {
      icon: "fas fa-bolt",
      title: "Fast Response",
      description: "Average 30-45 minute response time for emergency calls",
      color: "text-[hsl(43,96%,56%)]"
    },
    {
      icon: "fas fa-truck",
      title: "Mobile Team",
      description: "Fully equipped service trucks come directly to your location",
      color: "text-[hsl(221,83%,53%)]"
    },
    {
      icon: "fas fa-dollar-sign",
      title: "Honest Pricing",
      description: "Transparent, competitive rates with no hidden fees",
      color: "text-green-600"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Licensed & Insured",
      description: "Fully licensed technicians with comprehensive insurance coverage",
      color: "text-[hsl(0,84%,60%)]"
    },
    {
      icon: "fas fa-clock",
      title: "24/7 Availability",
      description: "Emergency service available around the clock, 7 days a week",
      color: "text-purple-600"
    },
    {
      icon: "fas fa-thumbs-up",
      title: "Satisfaction Guaranteed",
      description: "100% satisfaction guarantee on all repairs and services",
      color: "text-[hsl(43,96%,56%)]"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Florida Diesel Pro?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            When your diesel vehicle breaks down, you need reliable service you can trust. Here's why thousands of customers choose us for their diesel repair needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                  <i className={`${feature.icon} text-2xl ${feature.color}`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/quote"
            className="bg-[hsl(221,83%,53%)] hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            <i className="fas fa-clipboard-list mr-2"></i>
            Get Your Free Quote Today
          </a>
        </div>
      </div>
    </section>
  );
}