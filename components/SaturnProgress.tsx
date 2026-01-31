
import React from 'react';
import { Rocket } from 'lucide-react';

interface SaturnProgressProps {
  score: number;
}

const SaturnProgress: React.FC<SaturnProgressProps> = ({ score }) => {
  const percentage = Math.min(100, (score / 100) * 100);

  return (
    <div className="relative w-full h-16 bg-white/5 rounded-full border border-white/20 p-2 flex items-center">
      {/* Target: Saturn */}
      <div className="absolute right-[-10px] top-[-10px] z-10">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg" 
          alt="Saturn" 
          className={`w-20 h-14 object-contain transition-all duration-700 rounded-full border-2 border-transparent ${score >= 100 ? 'scale-125 brightness-125 border-yellow-400 shadow-[0_0_30px_#FFA500]' : 'opacity-70 grayscale-[50%]'}`}
        />
      </div>

      {/* Progress Bar Track */}
      <div className="flex-1 h-full bg-gray-800 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-500 transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Animated Background effects inside the bar */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>
      </div>

      {/* Moving Rocket */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out z-20"
        style={{ left: `calc(${percentage}% - 15px)` }}
      >
        <div className="relative">
          <Rocket className="text-white fill-white w-8 h-8 rotate-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          {/* Flame effect */}
          {percentage > 0 && (
            <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 flex items-center gap-1">
              <div className="w-4 h-2 bg-orange-500 rounded-full blur-[2px] animate-pulse"></div>
              <div className="w-2 h-1 bg-yellow-400 rounded-full blur-[1px] animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SaturnProgress;
