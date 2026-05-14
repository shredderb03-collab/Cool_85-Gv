import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function GameCard({ game, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-black border-2 border-white overflow-hidden aspect-square cursor-pointer"
      onClick={() => onSelect(game)}
    >
      <img
        src={game.thumbnail}
        alt={game.title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
      />
      
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#00FF00] font-bold mb-1 block">
              {game.category}
            </span>
            <h3 className="text-white font-black text-xl italic leading-none truncate">
              {game.title}
            </h3>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-[#00FF00] p-2 text-black"
          >
            <Play size={20} fill="currentColor" />
          </motion.div>
        </div>
      </div>
      
      {/* Brutalist border highlight */}
      <div className="absolute top-0 left-0 w-1 h-0 bg-[#00FF00] group-hover:h-full transition-all duration-300" />
      <div className="absolute bottom-0 right-0 w-0 h-1 bg-[#00FF00] group-hover:w-full transition-all duration-300" />
    </motion.div>
  );
}
