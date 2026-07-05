import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquareCode, Award, ShieldCheck, Sparkles, Smile } from 'lucide-react';
import { Review } from '../types';

interface HeroProps {
  reviews: Review[];
  onOpenReviewModal: () => void;
  onNavigate: (id: string) => void;
}

export default function Hero({ reviews, onOpenReviewModal, onNavigate }: HeroProps) {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  const tags = [
    { name: 'Fresh bakery items', color: 'bg-amber-100 text-amber-800' },
    { name: 'Delicious pizza', color: 'bg-red-100 text-red-800' },
    { name: 'Friendly staff', color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Clean shop', color: 'bg-sky-100 text-sky-800' },
    { name: 'Great prices', color: 'bg-purple-100 text-purple-800' }
  ];

  const filteredReviews = selectedTag
    ? reviews.filter((r) => r.tag === selectedTag)
    : reviews.slice(0, 3); // Top 3 default reviews

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="hero" className="relative bg-gradient-to-b from-[#FAF7F2] to-white py-12 md:py-20 overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          {/* Welcome Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sargodha's Supreme Bakery & grocery Mart</span>
          </motion.div>

          {/* Main Display Typography */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#482015] tracking-tight font-serif mb-6 leading-tight"
          >
            Pristine Quality & Fresh Taste,<br className="hidden sm:block" /> Every Single Day.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-stone-600 max-w-2xl mb-10 leading-relaxed"
          >
            Welcome to <span className="font-semibold text-amber-700">TU & ME MART AND BAKERS</span>. We serve the freshest, most delicious pizza slices, melt-in-the-mouth chocolate pastries, and daily groceries right in Cantt View, Sargodha.
          </motion.p>

          {/* Massive 5.0 Google Reviews Badge Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="w-full max-w-lg bg-white border border-stone-100 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all mb-10 flex flex-col items-center"
          >
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-amber-400 text-amber-400 drop-shadow-sm" />
              ))}
            </div>
            <div className="text-5xl font-extrabold text-[#482015] tracking-tight mb-1">
              5.0
            </div>
            <div className="text-stone-500 text-sm font-medium mb-4">
              Perfect rating based on 21 Google Reviews
            </div>

            {/* Filter Pill Tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {tags.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => setSelectedTag(selectedTag === tag.name ? null : tag.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-sm ${
                    selectedTag === tag.name
                      ? 'bg-amber-600 text-white ring-2 ring-amber-300 ring-offset-1'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-xs text-amber-700 font-semibold hover:underline mt-3"
              >
                Clear filter
              </button>
            )}
          </motion.div>

          {/* Core USP icons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl mb-16"
          >
            <div className="flex items-center gap-2.5 bg-white/70 p-3.5 rounded-xl border border-stone-50 shadow-xs">
              <Award className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span className="text-stone-700 text-xs sm:text-sm font-semibold text-left">Freshly Baked Daily</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/70 p-3.5 rounded-xl border border-stone-50 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-stone-700 text-xs sm:text-sm font-semibold text-left">Pristine Cleanliness</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/70 p-3.5 rounded-xl border border-stone-50 shadow-xs">
              <Smile className="w-5 h-5 text-sky-600 flex-shrink-0" />
              <span className="text-stone-700 text-xs sm:text-sm font-semibold text-left">Polite & Friendly Staff</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/70 p-3.5 rounded-xl border border-stone-50 shadow-xs">
              <MessageSquareCode className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <span className="text-stone-700 text-xs sm:text-sm font-semibold text-left">Verified 5-Star Service</span>
            </div>
          </motion.div>

          {/* Customer Reviews Section */}
          <motion.div variants={itemVariants} className="w-full text-center">
            <h3 className="text-xl font-bold text-[#482015] mb-6">What Sargodha Loves About Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white p-6 rounded-2xl border border-stone-100 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-0.5 mb-2.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed italic mb-4">
                      "{review.text}"
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-stone-50">
                    <div>
                      <span className="font-bold text-stone-800 text-sm block">{review.author}</span>
                      <span className="text-[11px] text-stone-400">{review.date}</span>
                    </div>
                    {review.tag && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-md">
                        {review.tag}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
              <button
                onClick={() => onNavigate('bakery')}
                className="w-full sm:w-auto bg-amber-600 hover:bg-[#482015] text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-sm cursor-pointer"
              >
                Browse Bakery & Mart Items
              </button>
              <button
                onClick={onOpenReviewModal}
                className="w-full sm:w-auto bg-white border border-stone-200 hover:bg-stone-50 text-[#482015] font-bold py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all text-sm cursor-pointer"
              >
                Write A Review
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
