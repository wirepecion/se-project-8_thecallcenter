import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  variant?: 'primary'; // you can add more variants later
}

export default function SlideArrowButton({ direction, onClick, variant = 'primary' }: SlideArrowButtonProps) {
  let variantClass = '';

  if (variant === 'primary') {
    variantClass = 'bg-white/70 hover:bg-white text-black';
  } // you can add more variants later

  return (
    <div
      onClick={onClick}
      className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg backdrop-blur-md cursor-pointer transition-all duration-300 transform hover:scale-110 ${variantClass}`}
    >
      {direction === 'left' ? (
        <ChevronLeft className="w-6 h-6" />
      ) : (
        <ChevronRight className="w-6 h-6" />
      )}
    </div>
  );
}
