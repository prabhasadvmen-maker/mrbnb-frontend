import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PropertyCard } from './PropertyCard';
import { FiltersBar } from './FiltersBar';
import { useApp } from '../../context/AppContext';
import { Sparkles, Compass } from 'lucide-react';

export const PropertyGrid = () => {
  const { filteredProperties, selectedCategory, setSelectedCategory } = useApp();
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out'
        }
      );
    }
  }, [filteredProperties.length, selectedCategory]);

  return (
    <section id="properties-section" className="py-14 bg-white border-b border-slate-100">
      <div className="w-full px-[4%] mx-auto box-border">
        {/* Section Heading */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-coral-600 text-xs font-black uppercase tracking-wider mb-1">
            <Sparkles size={14} />
            <span>Verified Sanctuaries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Handpicked Accommodations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Explore verified luxury villas, business lofts and serviced apartments.
          </p>
        </div>

        {/* Filter Toolbar */}
        <FiltersBar />

        {/* Property Grid or Empty State */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-5 md:gap-7" ref={gridRef}>
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 p-8 max-w-md mx-auto">
            <Compass size={44} className="text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No stays found matching your current filters
            </h3>
            <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto">
              Try broadening your search destination, loosening price boundaries or clearing amenities.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
            >
              View All Properties
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyGrid;
