export default function GallerySection() {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1632823469092-073d9dc6b043?w=400&h=300&fit=crop",
      alt: "AA Trust Roadside service truck",
      title: "Mobile Service Unit"
    },
    {
      src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
      alt: "Emergency roadside assistance",
      title: "Emergency Response"
    },
    {
      src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
      alt: "Professional mechanic at work",
      title: "Expert Service"
    },
    {
      src: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&h=300&fit=crop",
      alt: "Diagnostic equipment",
      title: "Advanced Diagnostics"
    }
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Trusted. Local. Ready.</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See our professional mobile service units and team in action
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
            Need help right now? We're standing by 24/7
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