import React from 'react';
import {
  Compass,
  Crown,
  Briefcase,
  CalendarDays,
  Building2,
  Users,
  Palmtree,
  Mountain
} from 'lucide-react';
import { CATEGORIES } from '../../data/categoriesData';
import { useApp } from '../../context/AppContext';

const ICON_MAP = {
  Compass,
  Crown,
  Briefcase,
  CalendarDays,
  Building2,
  Users,
  Palmtree,
  Mountain
};

export const CategoryPills = () => {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <div className="w-full py-4 border-b border-slate-200/60 bg-white sticky top-[80px] z-30 shadow-xs">
      <div className="w-full px-[4%] mx-auto box-border">
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Compass;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-coral-500 text-white shadow-md shadow-coral-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
                onClick={() => setSelectedCategory(cat.id)}
                title={cat.description}
              >
                <IconComponent size={15} className={isActive ? 'text-white' : 'text-coral-500'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPills;
