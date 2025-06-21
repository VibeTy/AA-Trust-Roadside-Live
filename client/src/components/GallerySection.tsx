import truck1 from "@assets/image_1750232639530.jpeg";
import truck2 from "@assets/image_1750233313706.jpeg";
// Direct path to attached assets
const technicianImage = "/attached_assets/D51BAF30-01DB-4D89-A56B-6A2135C674B4_1750487527873.PNG";

export default function GallerySection() {
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

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Trusted. Local. Ready.</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See our professional heavy duty service units and team in action
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg">
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white font-semibold text-lg">{image.title}</h3>
              </div>
            </div>
          ))}
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