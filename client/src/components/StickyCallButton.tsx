export default function StickyCallButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <a 
        href="tel:+15551234567"
        className="bg-[hsl(0,84%,60%)] hover:bg-red-700 text-white font-semibold w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 animate-pulse"
        aria-label="Call for emergency service"
      >
        <i className="fas fa-phone text-xl"></i>
      </a>
    </div>
  );
}