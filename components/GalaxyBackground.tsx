
import React from 'react';

const GalaxyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div className="star-field">
        <div className="twinkling"></div>
      </div>
      
      {/* Animated Nebulas */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse opacity-30"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[150px] animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-orange-900/10 rounded-full blur-[100px] animate-pulse opacity-20" style={{ animationDelay: '4s' }}></div>

      {/* Floating small stars */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="absolute bg-white rounded-full animate-ping opacity-20"
          style={{
            width: Math.random() * 4 + 'px',
            height: Math.random() * 4 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDuration: Math.random() * 5 + 3 + 's'
          }}
        />
      ))}
    </div>
  );
};

export default GalaxyBackground;
