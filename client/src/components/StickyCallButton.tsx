export default function StickyCallButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <a 
        href="tel:+13863728412"
        className="bg-[hsl(0,84%,60%)] hover:bg-red-700 text-white font-bold w-20 h-20 rounded-full shadow-2xl flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-110 animate-pulse"
        aria-label="Call now for emergency roadside service"
      >
        <i className="fas fa-phone text-lg mb-1"></i>
        <span className="text-xs">📞 CALL</span>
      </a>
    </div>
  );
}