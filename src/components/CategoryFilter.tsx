import React from 'react';
import { CategoryId } from '../types';
import { CATEGORIES } from '../data/menuData';
import { Shell, Fish, UtensilsCrossed, Flame, Compass } from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  categoryCounts: Record<string, number>;
  totalCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
  totalCount,
}) => {
  const getIcon = (id: CategoryId) => {
    switch (id) {
      case 'mariscos':
        return <Shell className="w-4 h-4" />;
      case 'pescados':
        return <Fish className="w-4 h-4" />;
      case 'bandejas':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'pollo':
        return <Flame className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  const currentCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="w-full mb-10">
      {/* Editorial Header before tabs */}
      <div className="text-center mb-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A880]">
          Nuestra Carta
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] mt-1 font-normal">
          Selección Gastronómica
        </h2>
        <p className="text-sm text-[#D2C4B2]/80 mt-2 max-w-xl mx-auto font-light">
          {currentCategoryObj
            ? currentCategoryObj.tagline
            : 'Explore nuestras especialidades marinas, bandejas para compartir y platos a la brasa.'}
        </p>
      </div>

      {/* Filter Tabs / Segmented Controller */}
      <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar pb-2 px-2 gap-2 sm:gap-3">
        {/* 'Todos' Tab */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 ${
            activeCategory === 'all'
              ? 'bg-[#C5A880] text-[#081321] font-bold shadow-md shadow-[#C5A880]/20'
              : 'bg-[#10223B]/70 hover:bg-[#183355] text-[#E7DFD5] border border-[#183355] hover:border-[#C5A880]/40'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Todos los Platos</span>
          <span className="text-[10px] opacity-75 font-mono">({totalCount})</span>
        </button>

        {/* Dynamic Categories from Specification */}
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-[#C5A880] text-[#081321] font-bold shadow-md shadow-[#C5A880]/20'
                  : 'bg-[#10223B]/70 hover:bg-[#183355] text-[#E7DFD5] border border-[#183355] hover:border-[#C5A880]/40'
              }`}
            >
              {getIcon(cat.id)}
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-75 font-mono">({count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
