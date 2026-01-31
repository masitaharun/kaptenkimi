
import React, { useState, useEffect } from 'react';
import { TASKS, MAX_DAILY_POINTS, STORAGE_KEY } from './constants';
import { UserProgress } from './types';
import TaskCard from './components/TaskCard';
import SaturnProgress from './components/SaturnProgress';
import RewardOverlay from './components/RewardOverlay';
import GalaxyBackground from './components/GalaxyBackground';
import { Rocket, Star, Info, AlertTriangle, Save } from 'lucide-react';

const App: React.FC = () => {
  // 1. Inisialisasi: Ambil data dari LocalStorage jika ada dan tarikhnya masih sama
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as UserProgress;
        const lastDate = new Date(parsed.lastUpdated).toDateString();
        const currentDate = new Date().toDateString();
        
        // Hanya guna data lama jika hari masih sama
        if (lastDate === currentDate) return parsed;
      } catch (e) {
        console.error("Gagal membaca data tersimpan", e);
      }
    }
    // Jika hari baru atau data rosak, mula dari 0
    return {
      score: 0,
      completedTaskIds: [],
      lastUpdated: new Date().toISOString()
    };
  });

  const [showReward, setShowReward] = useState(false);
  const [celebrated100, setCelebrated100] = useState(false);
  const [celebrated80, setCelebrated80] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 2. Simpan setiap kali progress berubah
  useEffect(() => {
    setIsSaving(true);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    const timer = setTimeout(() => setIsSaving(false), 1000);
    return () => clearTimeout(timer);
  }, [progress]);

  // 3. Logik Reset Automatik (Setiap 30 saat semakan dibuat)
  useEffect(() => {
    const checkReset = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      const lastDate = new Date(progress.lastUpdated).toDateString();
      const currentDate = now.toDateString();

      // Syarat Reset: Hari bertukar ATAU tepat jam 23:59
      if (lastDate !== currentDate || (hours === 23 && minutes === 59)) {
        console.log("Masa tamat! Reset misi harian...");
        setProgress({
          score: 0,
          completedTaskIds: [],
          lastUpdated: new Date().toISOString()
        });
        setCelebrated100(false);
        setCelebrated80(false);
        setShowReward(false);
      }
    };

    const interval = setInterval(checkReset, 10000); // Semak setiap 10 saat untuk lebih ketepatan
    return () => clearInterval(interval);
  }, [progress.lastUpdated]);

  const handleTaskAction = (taskId: number, success: boolean) => {
    const task = TASKS.find(t => t.id === taskId);
    if (!task) return;

    setProgress(prev => {
      let newScore = prev.score;
      let newCompleted = [...prev.completedTaskIds];

      if (success) {
        if (!newCompleted.includes(taskId)) {
          newScore += task.points;
          newCompleted.push(taskId);
        }
      } else {
        if (newCompleted.includes(taskId)) {
          newScore -= task.points;
          newCompleted = newCompleted.filter(id => id !== taskId);
        }
      }

      newScore = Math.min(MAX_DAILY_POINTS, Math.max(0, newScore));
      return { 
        ...prev, 
        score: newScore, 
        completedTaskIds: newCompleted, 
        lastUpdated: new Date().toISOString() 
      };
    });
  };

  const handlePenalty = () => {
    setProgress(prev => {
      const newScore = Math.max(0, prev.score - 5);
      return { ...prev, score: newScore, lastUpdated: new Date().toISOString() };
    });
  };

  useEffect(() => {
    if (progress.score >= 100 && !celebrated100) {
      // @ts-ignore
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFA500', '#FFD700', '#FF4500', '#FFFFFF']
      });
      setCelebrated100(true);
      setShowReward(true);
    } 
    else if (progress.score >= 80 && progress.score < 100 && !celebrated80) {
      setCelebrated80(true);
      setShowReward(true);
    }
  }, [progress.score, celebrated100, celebrated80]);

  return (
    <div className="relative min-h-screen pb-24 overflow-hidden">
      <GalaxyBackground />

      <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-md p-4 shadow-xl border-b border-white/10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-orange-500 to-yellow-300 p-2 rounded-full shadow-lg animate-pulse">
              <Rocket className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-200 uppercase">
                MISI KAPTEN HAKIMI KE ZUHAL
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-400 font-bold">Kapten: Hakimi</p>
                {isSaving && (
                  <span className="flex items-center gap-1 text-[10px] text-green-400 animate-pulse">
                    <Save size={10} /> Menyimpan...
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/20 flex flex-col items-center shadow-inner">
            <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">Markah</span>
            <span className="text-2xl font-black text-yellow-400 leading-tight">
              {progress.score} <span className="text-sm text-gray-400">/ 100</span>
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="mb-10 bg-white/5 p-6 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" />
              <h2 className="text-lg font-bold uppercase tracking-wider">Peta Perjalanan Angkasa</h2>
            </div>
            <div className="text-[10px] text-gray-500 font-mono">
              Auto-reset: 23:59
            </div>
          </div>
          <SaturnProgress score={progress.score} />
          
          <div className="mt-8 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-tighter">
            <span>Bumi (Mula)</span>
            <div className="flex flex-col items-center">
              <span className={`transition-all duration-500 ${progress.score >= 80 ? 'text-yellow-400 scale-110' : ''}`}>
                🎁 Hadiah TV
              </span>
              <div className={`h-2 w-2 rounded-full mt-1 ${progress.score >= 80 ? 'bg-yellow-400 shadow-[0_0_10px_yellow]' : 'bg-gray-700'}`}></div>
            </div>
            <span>Planet Zuhal</span>
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <button 
            onClick={handlePenalty}
            className="group flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-900/40 active:scale-95 transition-all border-b-4 border-red-800"
          >
            <AlertTriangle size={24} className="group-hover:animate-bounce" />
            KESALAHAN (-5 MARKAH)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TASKS.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              isCompleted={progress.completedTaskIds.includes(task.id)}
              onAction={handleTaskAction}
              onPenalty={handlePenalty}
            />
          ))}
        </div>
      </main>

      {showReward && (
        <RewardOverlay 
          score={progress.score} 
          onClose={() => setShowReward(false)} 
        />
      )}

      <div className="fixed bottom-4 right-4 z-40">
        <button className="bg-gray-800 text-white p-3 rounded-full shadow-2xl border border-white/20 hover:bg-gray-700 transition-colors" title="Info Misi">
          <Info size={20} />
        </button>
      </div>
    </div>
  );
};

export default App;
