import { Phone } from 'lucide-react';

export default function ChatbotWidget() {
  return (
    <div className="fixed bottom-20 left-4 z-50 md:bottom-28 md:left-6">
      <a
        href="tel:+13863728412"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-16 h-16 md:w-24 md:h-24 rounded-full shadow-2xl flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-110 animate-pulse"
        aria-label="Call now for emergency roadside service"
      >
        <Phone className="w-6 h-6 md:w-8 md:h-8 mb-1" />
        <span className="text-xs font-bold">CALL</span>
      </a>
    </div>
  );
}