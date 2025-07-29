import React from 'react';

interface TransitionOverlayProps {
  isVisible: boolean;
  direction: 'in' | 'out';
}

const TransitionOverlay = ({ isVisible, direction }: TransitionOverlayProps) => {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[9998] pointer-events-none transition-all duration-500 ease-in-out ${
      direction === 'in' 
        ? 'opacity-0 translate-y-full' 
        : 'opacity-100 translate-y-0'
    }`}>
      {/* Overlay com gradiente Basquiat */}
                   <div className="absolute inset-0 bg-gradient-to-br from-data-blue/20 via-data-cyan/15 to-data-purple/20" />
      
      {/* Linhas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
                               className={`absolute h-1 bg-gradient-to-r from-transparent via-data-blue to-transparent transform transition-all duration-700 delay-${i * 100}`}
            style={{
              top: `${20 + i * 15}%`,
              left: direction === 'in' ? '-100%' : '0%',
              width: '100%',
              transform: direction === 'in' ? 'translateX(0%)' : 'translateX(100%)',
            }}
          />
        ))}
      </div>

      {/* Partículas de transição */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
                               className={`absolute w-2 h-2 rounded-full bg-data-blue/60 transition-all duration-1000 delay-${i * 150}`}
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
              transform: direction === 'in' 
                ? 'scale(0) rotate(0deg)' 
                : 'scale(1) rotate(360deg)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TransitionOverlay; 