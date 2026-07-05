import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { Review } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export default function ReviewModal({ isOpen, onClose, onSubmitReview }: ReviewModalProps) {
  const [author, setAuthor] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [text, setText] = React.useState('');
  const [tag, setTag] = React.useState('Fresh bakery items');
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const [isDone, setIsDone] = React.useState(false);

  const tagsList = [
    'Fresh bakery items',
    'Delicious pizza',
    'Friendly staff',
    'Clean shop',
    'Great prices'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text) return;

    onSubmitReview({
      author,
      rating,
      text,
      tag
    });

    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      setAuthor('');
      setText('');
      setRating(5);
      setTag('Fresh bakery items');
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 p-6 overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-stone-100 mb-6">
              <h3 className="text-lg font-bold text-[#482015] font-serif">Write a Google Review</h3>
              <button
                onClick={onClose}
                className="p-1 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isDone ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col items-center text-center space-y-4"
                >
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-[#482015] text-base">Review Submitted!</h4>
                  <p className="text-stone-500 text-xs max-w-xs leading-relaxed">
                    Thank you so much! Your feedback helps our family business grow in Sargodha Cantt.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 text-left"
                >
                  {/* Rating selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-2">Select Star Rating</label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating ?? rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ahmad Ibrahim"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 text-xs p-3.5 rounded-xl focus:outline-hidden focus:border-amber-500 text-stone-800"
                    />
                  </div>

                  {/* Highlights tag */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">What did you love most?</label>
                    <div className="flex flex-wrap gap-1.5">
                      {tagsList.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTag(t)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                            tag === t
                              ? 'bg-amber-700 text-white'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-600'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">Your Review Comments</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe your experience with our fresh pizza slices, chocolate pastries, grocery mart, cleanliness, or friendly staff..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 text-xs p-3.5 rounded-xl focus:outline-hidden focus:border-amber-500 text-stone-800 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Action */}
                  <div className="pt-4 flex justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2.5 bg-stone-50 hover:bg-stone-100 text-stone-500 font-bold rounded-xl text-xs uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#482015] hover:bg-amber-800 text-white font-bold rounded-xl text-xs uppercase shadow-xs cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
