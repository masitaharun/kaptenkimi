
import React from 'react';
import { Task } from '../types';
import { Check, X, AlertCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  isCompleted: boolean;
  onAction: (taskId: number, success: boolean) => void;
  onPenalty: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isCompleted, onAction, onPenalty }) => {
  return (
    <div className={`
      relative group overflow-hidden rounded-3xl p-5 transition-all duration-300 border-2 flex flex-col h-full
      ${isCompleted 
        ? 'bg-green-500/10 border-green-500/50 scale-[0.98]' 
        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}
    `}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">{task.icon}</span>
        <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-yellow-300">
          +{task.points} M
        </span>
      </div>

      <h3 className="text-lg font-bold mb-6 flex-grow leading-tight">
        {task.label}
      </h3>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => onAction(task.id, true)}
          disabled={isCompleted}
          className={`
            w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-black transition-all
            ${isCompleted 
              ? 'bg-green-600 cursor-default opacity-80' 
              : 'bg-green-500 hover:bg-green-400 active:scale-95 text-white shadow-lg shadow-green-500/30'}
          `}
        >
          <Check size={20} strokeWidth={3} />
          {isCompleted ? 'Selesai' : 'Berjaya'}
        </button>
        
        <button
          onClick={onPenalty}
          className="w-full py-2 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 flex items-center justify-center gap-2 text-red-400 font-bold text-xs transition-all active:scale-95"
        >
          <AlertCircle size={14} />
          Kesalahan (-5)
        </button>

        {isCompleted && (
          <button
            onClick={() => onAction(task.id, false)}
            className="text-[10px] text-gray-500 hover:text-gray-300 underline mt-1"
          >
            Reset Tugasan
          </button>
        )}
      </div>

      {isCompleted && (
        <div className="absolute top-2 right-2 animate-bounce">
          <div className="bg-yellow-400 rounded-full p-1 border-2 border-white shadow-lg">
            <Check size={12} className="text-black" strokeWidth={4} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
