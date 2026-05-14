import { motion } from 'motion/react';
import { X, Maximize2, RotateCcw } from 'lucide-react';

export default function GamePlayer({ game, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
    >
      {/* Player Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#00FF00] hover:text-black transition-colors"
          >
            <X size={24} />
          </button>
          <div>
            <h2 className="text-white font-black italic tracking-tighter text-2xl leading-none">
              {game.title}
            </h2>
            <p className="text-[#00FF00] text-[10px] uppercase font-bold tracking-widest">
              Now Playing • {game.category}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => window.location.reload()}
            className="p-2 text-white/50 hover:text-white transition-colors"
            title="Reload App"
          >
            <RotateCcw size={20} />
          </button>
          <button 
            className="p-2 text-white/50 hover:text-white transition-colors"
            title="Fullscreen"
            onClick={() => document.documentElement.requestFullscreen()}
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      {/* Game Iframe Container */}
      <div className="flex-1 relative bg-zinc-900 overflow-hidden">
        <iframe
          src={game.iframeUrl}
          title={game.title}
          className="w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Control Footer */}
      <div className="p-2 px-4 bg-black border-t border-white/20 flex justify-between items-center">
        <div className="flex gap-4">
          {game.tags.map(tag => (
            <span key={tag} className="text-white/40 text-[10px] uppercase tracking-widest font-mono">
              #{tag}
            </span>
          ))}
        </div>
        <div className="text-white/20 text-[10px] font-mono italic">
          NEXUS_STREAM_V1.0
        </div>
      </div>
    </motion.div>
  );
}
