import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface BakeryMenuProps {
  products: Product[];
  onAddToOrder: (product: Product) => void;
}

export default function BakeryMenu({ products, onAddToOrder }: BakeryMenuProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="bakery" className="py-16 md:py-24 bg-white border-b border-stone-100 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <span className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase block mb-2">
              Baked fresh each morning
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#482015] font-serif">
              Our Bakery Specialties
            </h2>
            <p className="text-stone-500 text-sm md:text-base max-w-xl mt-2">
              From cheesy chicken tikka pizza slices to layers of rich chocolate fudge pastries. Explore our master baker's signature selections.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search bakery items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 text-stone-800 text-sm pl-10 pr-4 py-2.5 rounded-full border border-stone-200 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-100 pb-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-xs md:text-sm font-medium rounded-full cursor-pointer transition-all ${
                selectedCategory === category
                  ? 'bg-[#482015] text-white shadow-sm'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
            <p className="text-stone-500 text-sm font-medium">No yummy products found matching your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-amber-700 text-xs font-semibold hover:underline mt-2 cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-stone-100 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                >
                  {/* Product Image Overlay */}
                  <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.isPopular && (
                      <span className="absolute top-3 left-3 flex items-center gap-1 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Best Seller</span>
                      </span>
                    )}
                    <span className="absolute bottom-3 right-3 bg-[#482015] text-white text-xs font-extrabold px-3 py-1 rounded-md shadow-sm">
                      Rs. {product.price}
                      {product.unit ? ` / ${product.unit}` : ''}
                    </span>
                  </div>

                  {/* Details Card */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-amber-600 uppercase block mb-1">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-stone-800 text-base mb-1.5 group-hover:text-[#482015] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-stone-500 text-xs leading-relaxed line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Order Action Button */}
                    <div className="mt-5 pt-4 border-t border-stone-50">
                      <button
                        onClick={() => onAddToOrder(product)}
                        className="w-full flex items-center justify-center gap-2 bg-stone-50 hover:bg-amber-600 group-hover:bg-amber-50 group-hover:text-amber-800 text-stone-700 font-bold py-2 px-4 rounded-xl text-xs transition-all duration-300 transform group-hover:-translate-y-0.5 shadow-xs hover:shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-600 group-hover:text-amber-800" />
                        <span>Add to Order</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
