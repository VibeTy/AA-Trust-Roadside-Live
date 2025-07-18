export default function StickyCallButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <a 
        href="tel:+13863728412"
        className="bg-red-600 hover:bg-red-700 text-white font-bold w-16 h-16 rounded-full shadow-2xl flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-110 animate-pulse"
        aria-label="Call now for emergency roadside service"
      >
        <i className="fas fa-phone text-sm mb-1"></i>
        <span className="text-xs font-bold">CALL</span>
      </a>
    </div>
  );
}