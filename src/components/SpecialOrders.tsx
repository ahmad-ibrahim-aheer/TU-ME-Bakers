import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, MessageSquare, Plus, CheckCircle2, ChevronRight, Cake, AlertCircle, Loader2 } from 'lucide-react';
import { Product } from '../types';

interface SpecialOrdersProps {
  onAddCustomCakeToCart: (customCakeProduct: Product, customNotes: string) => void;
}

export default function SpecialOrders({ onAddCustomCakeToCart }: SpecialOrdersProps) {
  // Cake builder state
  const [flavor, setFlavor] = React.useState('Chocolate Fudge');
  const [weight, setWeight] = React.useState(1.5); // in kg
  const [occasion, setOccasion] = React.useState('Birthday');
  const [cakeText, setCakeText] = React.useState('');
  const [extraToppings, setExtraToppings] = React.useState<string[]>([]);
  const [isAdded, setIsAdded] = React.useState(false);

  // AI recommendations state
  const [aiPrompt, setAiPrompt] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState('');
  const [loadingAi, setLoadingAi] = React.useState(false);
  const [errorAi, setErrorAi] = React.useState('');

  const toppingsOptions = [
    { name: 'Extra Fudge Layer', price: 150 },
    { name: 'Edible Gold Leaf Trim', price: 250 },
    { name: 'Chocolate Chip Filling', price: 100 },
    { name: 'Fresh Fruits Topping', price: 200 },
  ];

  const basePricePerKg = 1800;
  const toppingsPrice = extraToppings.reduce((total, toppingName) => {
    const option = toppingsOptions.find(o => o.name === toppingName);
    return total + (option ? option.price : 0);
  }, 0);

  const estimatedPrice = Math.round((basePricePerKg * weight) + toppingsPrice);

  const handleToppingToggle = (name: string) => {
    if (extraToppings.includes(name)) {
      setExtraToppings(extraToppings.filter(t => t !== name));
    } else {
      setExtraToppings([...extraToppings, name]);
    }
  };

  const handleAddCakeToOrder = () => {
    const customCakeId = `custom-cake-${Date.now()}`;
    const customNotes = `Occasion: ${occasion} | Inscription: "${cakeText || 'None'}" | Toppings: ${extraToppings.join(', ') || 'None'}`;
    
    const cakeProduct: Product = {
      id: customCakeId,
      name: `Custom ${flavor} ${occasion} Cake (${weight}kg)`,
      price: estimatedPrice,
      description: `Custom baked order cake tailored for ${occasion}. Sponge flavor: ${flavor}. ${customNotes}`,
      category: 'Custom Cakes',
      type: 'bakery',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      unit: 'kg'
    };

    onAddCustomCakeToCart(cakeProduct, customNotes);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const getAiSuggestions = async () => {
    if (!aiPrompt.trim()) return;
    setLoadingAi(true);
    setErrorAi('');
    setAiResponse('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Give me a stunning professional cake customization idea. The customer wants a cake for: "${aiPrompt}". Please recommend: 1) The perfect sponge flavor & fillings, 2) Visual design/decor elements, 3) Suggested cake weight based on typical guest count, 4) An estimate of completion time. Format your response beautifully with bullet points.`,
          history: []
        }),
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAiResponse(data.text);
    } catch (err: any) {
      setErrorAi(err.message || 'Unable to load AI suggestions. Please try again.');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <section id="special" className="py-16 md:py-24 bg-white border-b border-stone-100 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase block mb-2">
            Tailor-made celebrations
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#482015] font-serif">
            Custom Cake Builder & Orders
          </h2>
          <p className="text-stone-500 text-sm md:text-base mt-2">
            Make your events unforgettable. Build your dream cake below to calculate pricing, or get AI advice for your special design ideas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Side - Cake Builder (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-100 text-left">
            <h3 className="text-lg font-bold text-[#482015] flex items-center gap-2 mb-6">
              <Cake className="w-5 h-5 text-amber-600" />
              <span>Step-by-Step Cake Customization</span>
            </h3>

            <div className="space-y-6">
              {/* Flavor Selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-2">1. Select Cake Sponge Flavor</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['Chocolate Fudge', 'Red Velvet', 'Vanilla Bean', 'Pineapple Delight'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFlavor(f)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold border cursor-pointer transition-all ${
                        flavor === f
                          ? 'bg-amber-700 text-white border-amber-700 shadow-sm'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold uppercase text-stone-500">2. Select Cake Weight</label>
                  <span className="text-sm font-extrabold text-[#482015] bg-white px-2.5 py-1 rounded-md border border-stone-100 shadow-xs">
                    {weight} kg <span className="text-xs text-stone-400 font-medium">({Math.round(weight * 2.2)} lbs)</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.5"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-700"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-medium mt-1 px-1">
                  <span>1 kg (feeds 6-8)</span>
                  <span>2.5 kg (feeds 15-20)</span>
                  <span>4 kg (feeds 30+)</span>
                  <span>6 kg (Large Party)</span>
                </div>
              </div>

              {/* Occasion and Inscription Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2">3. Celebration Occasion</label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-white text-stone-800 text-sm p-3 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-500 shadow-xs"
                  >
                    <option>Birthday</option>
                    <option>Wedding</option>
                    <option>Anniversary</option>
                    <option>Baby Shower</option>
                    <option>Corporate Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-2">4. Writing on Cake (Max 30 chars)</label>
                  <input
                    type="text"
                    maxLength={30}
                    placeholder="e.g. Happy Birthday Hamza!"
                    value={cakeText}
                    onChange={(e) => setCakeText(e.target.value)}
                    className="w-full bg-white text-stone-800 text-sm p-3 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-500 shadow-xs"
                  />
                </div>
              </div>

              {/* Extra toppings */}
              <div>
                <label className="block text-xs font-bold uppercase text-stone-500 mb-2.5">5. Premium Add-ons / Fillings</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {toppingsOptions.map((topping) => (
                    <button
                      key={topping.name}
                      onClick={() => handleToppingToggle(topping.name)}
                      className={`flex justify-between items-center p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        extraToppings.includes(topping.name)
                          ? 'bg-amber-50/70 border-amber-600/30 text-amber-900 shadow-xs'
                          : 'bg-white border-stone-100 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${extraToppings.includes(topping.name) ? 'text-amber-700' : 'text-stone-300'}`} />
                        <span>{topping.name}</span>
                      </div>
                      <span className="text-stone-400 font-bold">+Rs. {topping.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing details and submission */}
              <div className="bg-[#482015] text-white p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-md mt-8">
                <div className="text-center sm:text-left">
                  <span className="text-stone-300 text-[10px] uppercase font-bold tracking-wider">Estimated Cake Pricing</span>
                  <div className="text-3xl font-extrabold text-amber-400 mt-0.5">Rs. {estimatedPrice}</div>
                  <span className="text-[10px] text-stone-300 font-medium block mt-1">Based on Rs. {basePricePerKg}/kg + custom add-ons</span>
                </div>

                <button
                  onClick={handleAddCakeToOrder}
                  className={`w-full sm:w-auto font-bold py-3.5 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-amber-400 hover:bg-amber-300 text-[#482015] transform hover:-translate-y-0.5'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Added to cart!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add custom cake to order</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Prompt Side - AI Recommendation (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-stone-50/60 p-6 md:p-8 rounded-3xl border border-stone-100 text-left h-full flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100/70 text-amber-800 text-[10px] font-bold rounded-full mb-4 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-amber-700" />
                <span>Gemini Cake Concierge</span>
              </div>
              
              <h3 className="text-lg font-bold text-[#482015] mb-2 font-serif">
                Instant AI Cake Suggester
              </h3>
              
              <p className="text-stone-500 text-xs leading-relaxed mb-6">
                Not sure about flavors or decorations? Tell our AI Assistant who the cake is for, your guest count, or any custom theme you have in mind!
              </p>

              {/* Inquiries form */}
              <div className="space-y-4 mb-6">
                <textarea
                  placeholder="e.g., A cartoon Spiderman cake for a 5-year-old boy's birthday, feeding 15 people. What design and size do you recommend?"
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full bg-white text-stone-800 text-xs p-3.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-500 shadow-inner resize-none leading-relaxed"
                />
                <button
                  onClick={getAiSuggestions}
                  disabled={loadingAi || !aiPrompt.trim()}
                  className="w-full flex items-center justify-center gap-2 bg-[#482015] hover:bg-amber-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingAi ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Consulting Chef...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Get AI Suggestions</span>
                    </>
                  )}
                </button>
              </div>

              {/* Output block */}
              <AnimatePresence mode="wait">
                {aiResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white p-5 rounded-2xl border border-stone-150/70 shadow-xs max-h-72 overflow-y-auto"
                  >
                    <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold mb-2.5 pb-2 border-b border-stone-50">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Recommended Customization Spec</span>
                    </div>
                    <div className="text-stone-600 text-xs space-y-2 leading-relaxed whitespace-pre-line text-left">
                      {aiResponse}
                    </div>
                  </motion.div>
                )}

                {errorAi && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-2 text-xs text-red-800"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{errorAi}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Simulated Event Planning CTA */}
            <div className="pt-6 border-t border-stone-100 mt-6 text-xs text-stone-400 flex items-center justify-between">
              <span>Need special venue catering?</span>
              <a href="tel:+923037041468" className="text-amber-700 font-bold flex items-center gap-0.5 hover:underline">
                <span>Call Sargodha Cantt</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
