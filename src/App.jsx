/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './data/games.json';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import { Gamepad2, Search, Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Retro'];

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-black border-b-2 border-white p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#00FF00] p-2 text-black rotate-[-3deg]">
              <Gamepad2 size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none">
                NEXUS<span className="text-[#00FF00]">GAMES</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">
                Premium Unblocked Entertainment
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#00FF00] transition-colors" size={18} />
              <input
                type="text"
                placeholder="SEARCH_CATALOG..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border-2 border-white/20 focus:border-[#00FF00] text-white px-10 py-2 outline-none w-full md:w-64 font-mono text-sm transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Categories Rail */}
      <nav className="bg-black border-b border-white/10 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 flex gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1 text-xs uppercase tracking-widest font-black transition-all ${
                activeCategory === cat 
                  ? 'bg-[#00FF00] text-black -rotate-1' 
                  : 'text-white hover:text-[#00FF00]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game) => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  onSelect={setSelectedGame} 
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/10 opacity-50">
            <Filter size={48} className="mb-4" />
            <p className="font-mono text-sm uppercase tracking-widest">No_Matches_Found</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 p-8 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
          <p>© 2026 NEXUS SYSTEMS • ALL RIGHTS RESERVED</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
          <p>EST_2026_BY_AI_STUDIO</p>
        </div>
      </footer>

      {/* Game Player Overlay */}
      <AnimatePresence>
        {selectedGame && (
          <GamePlayer 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
