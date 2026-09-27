import React from 'react';
import { CategoryType, CATEGORIES } from '../types/article';

interface CategoryTabsProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  articleCounts?: Record<string, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  articleCounts,
}) => {
  return (
    <div className="border-b border-neutral-200/90 bg-[#F8F9FA]/95 backdrop-blur-md sticky top-[68px] sm:top-[74px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-3">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count = articleCounts ? articleCounts[category] : undefined;

            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`whitespace-nowrap px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-150 shrink-0 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C84323] ${
                  isActive
                    ? 'bg-[#111215] text-white font-semibold shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                }`}
              >
                <span>{category}</span>
                {count !== undefined && (
                  <span className={`text-[11px] font-mono tabular-nums px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-600'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
