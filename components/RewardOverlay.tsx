
import React, { useEffect, useState } from 'react';
import { X, Tv, Trophy, Zap } from 'lucide-react';

interface RewardOverlayProps {
  score: number;
  onClose: () => void;
}

const RewardOverlay: React.FC<RewardOverlayProps> = ({ score, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const isLevelComplete = score >= 100;
  const isTVReward = score >= 80 && score < 100;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" onClick={onClose} />
      
      <div className={`
        relative w-full max-w-md bg-gray-900 border-4 rounded-[3rem] p-8 text-center shadow-[0_0_50px_rgba(255,165,0,0.4)]
        ${isLevelComplete ? 'border-yellow-400' : 'border-blue-400'}
        transform transition-all duration-700 ${isAnimating ? 'scale-100 rotate-0' : 'scale-50 rotate-12'}
      `}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
        >
          <X size={24} />
        </button>

        {isLevelComplete ? (
          <div className="space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg" 
                alt="Saturn" 
                className="w-48 h-32 object-contain mx-auto rounded-full relative z-10"
              />
            </div>
            
            <h2 className="text-4xl font-black text-yellow-400 leading-tight">TAHNIAH!<br/>MISI BERJAYA</h2>
            <p className="text-xl font-bold text-white">Anda telah berjaya mendarat di Planet Zuhal!</p>
            
            <div className="bg-white/10 rounded-2xl p-4 border border-white/20 flex items-center justify-center gap-3">
              <Trophy className="text-yellow-400" size={32} />
              <span className="text-2xl font-black uppercase">Astronaut Terbilang</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl opacity-40"></div>
              <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center relative z-10 shadow-xl border-4 border-white/20">
                <Tv size={80} className="text-white drop-shadow-lg" />
              </div>
            </div>
            
            <h2 className="text-3xl font-black text-blue-300">HADIAH TELEVISYEN!</h2>
            <p className="text-lg font-bold text-gray-200">Waktu rehat anda bermula sekarang. Hebatlah kapten!</p>
            
            <div className="flex justify-center gap-2">
              {[1, 2, 3].map(i => (
                <Zap key={i} className="text-yellow-400 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-black text-xl shadow-lg hover:shadow-orange-500/50 active:scale-95 transition-all"
        >
          TERUSKAN PERJALANAN!
        </button>
      </div>
    </div>
  );
};

export default RewardOverlay;
