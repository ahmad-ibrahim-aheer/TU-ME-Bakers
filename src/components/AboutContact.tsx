import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Clock, Mail, Award, Check, Send, CheckCircle2 } from 'lucide-react';
import { Review } from '../types';

interface AboutContactProps {
  reviews: Review[];
}

export default function AboutContact({ reviews }: AboutContactProps) {
  // Contact form state
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('General Inquiry');
  const [message, setMessage] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="scroll-mt-10">
      {/* About Us Section */}
      <section id="about" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-stone-100 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story block */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase block">
                Who we are
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#482015] font-serif tracking-tight">
                Sargodha’s Favorite Bakery & Grocery Mart
              </h2>
              
              <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                At <span className="font-semibold text-amber-700">TU & ME MART AND BAKERS</span>, we take pride in being a absolute staple in Cantt View, Sargodha. For years, we have brought smiles to families across Sargodha with our exceptionally fresh baked items, delicate pastries, loaded pizzas, and daily grocery items.
              </p>

              <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                We believe a great business is built on two simple principles: **uncompromising quality** and **unmatched hospitality**. That's why our baking team starts before sunrise each day to prepare fresh buttery croissants and signature chocolate fudge pastries, while our mart attendants keep shelves beautifully clean and perfectly stocked with local dairy, snacks, and pure honey.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-2">
                  <div className="p-1 bg-amber-100 text-amber-800 rounded-md mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 text-sm block">100% Fresh Daily</span>
                    <span className="text-stone-400 text-xs">Baked from scratch every day.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-1 bg-amber-100 text-amber-800 rounded-md mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 text-sm block">Pristine Hygiene</span>
                    <span className="text-stone-400 text-xs">Clean, disinfected shop space.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-1 bg-amber-100 text-amber-800 rounded-md mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 text-sm block">Polite Staff</span>
                    <span className="text-stone-400 text-xs">Helpful, professional greetings.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="p-1 bg-amber-100 text-amber-800 rounded-md mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 text-sm block">Reasonable Prices</span>
                    <span className="text-stone-400 text-xs">Premium taste at local rates.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Cards Group from the user's reference video (lg:col-span-6) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1: Hours & Give Call */}
              <div className="space-y-6 flex flex-col justify-between">
                
                {/* Opening hours */}
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-xs text-left">
                  <div className="p-3 bg-amber-50 text-amber-800 rounded-xl w-fit mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-stone-800 text-base mb-1">Opening Hours</h3>
                  <span className="text-stone-400 text-xs font-semibold block mb-2">Open 7 days a week</span>
                  <span className="text-[#482015] font-extrabold text-sm">Until 12:00 AM Midnight daily</span>
                </div>

                {/* Give Us a Call */}
                <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-xs text-left">
                  <div className="p-3 bg-amber-50 text-amber-800 rounded-xl w-fit mb-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-stone-800 text-base mb-1">Give Us a Call</h3>
                  <span className="text-stone-400 text-xs font-semibold block mb-2">Speak directly with Sargodha Cantt branch</span>
                  <a href="tel:+923037041468" className="text-[#482015] hover:text-amber-700 font-extrabold text-sm hover:underline">
                    +92 303 7041468
                  </a>
                </div>

              </div>

              {/* Card 2: Featured croissants image with custom overlay from the reference video */}
              <div className="relative rounded-2xl shadow-md overflow-hidden bg-stone-100 aspect-square sm:aspect-auto h-full min-h-[300px] flex flex-col justify-end group">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
                  alt="Fresh flaky bakery croissants"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#482015]/90 via-[#482015]/40 to-transparent" />
                
                {/* Text overlay exactly like reference video */}
                <div className="relative p-6 text-left text-white">
                  <h3 className="text-lg font-bold tracking-tight mb-1 font-serif text-white uppercase">
                    TU & ME MART AND BAKERS
                  </h3>
                  <p className="text-xs text-stone-200">
                    Mushaf Ali Mir Rd, Cantt View, Sargodha
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contact" className="py-16 md:py-24 bg-white scroll-mt-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details & Info Card (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-amber-600 uppercase block mb-2">
                  Get in Touch
                </span>
                <h2 className="text-3xl font-extrabold text-[#482015] font-serif">
                  Visit Our Store In Sargodha
                </h2>
                <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed">
                  Have a custom birthday/wedding cake inquiry or need grocery items delivered? Drop by our store in Sargodha Cantt or leave a message.
                </p>
              </div>

              {/* Details stack */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-stone-50 border border-stone-100 text-amber-700 rounded-xl flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">Store Address</h4>
                    <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Mushaf Ali Mir Rd, Cantt View, Sargodha 40100, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-stone-50 border border-stone-100 text-amber-700 rounded-xl flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">Phone Number</h4>
                    <p className="text-stone-500 text-xs sm:text-sm mt-1">
                      <a href="tel:+923037041468" className="hover:underline hover:text-amber-700">
                        +92 303 7041468
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-stone-50 border border-stone-100 text-amber-700 rounded-xl flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">Working Hours</h4>
                    <p className="text-stone-500 text-xs sm:text-sm mt-1 leading-relaxed">
                      Open 7 Days a week<br />
                      Daily 11:00 AM - 12:00 AM Midnight
                    </p>
                  </div>
                </div>
              </div>

              {/* Clean Map Graphic/Card representing Google Maps location info */}
              <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-stone-800 text-sm mb-1">Located in Cantt View</h4>
                  <p className="text-stone-400 text-xs leading-relaxed mb-4">
                    Our shop is conveniently situated right on Mushaf Ali Mir road with beautiful spacious parking and immediate access.
                  </p>
                </div>
                <div className="h-28 rounded-xl overflow-hidden border border-stone-200 relative">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13528.736023766873!2d72.66955745541992!3d32.037210500000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3921792dff03997b%3A0xa18b5291b262afa8!2sTU%20%26%20ME%20MART%20AND%20BAKERS!5e0!3m2!1sen!2s!4v1783265931985!5m2!1sen!2s"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      title="TU & ME Mart and Bakers Location"
    />
  </div>
              </div>
            </div>

            {/* Contact Inquiry Form (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-stone-50 p-6 md:p-8 rounded-3xl border border-stone-100">
              <h3 className="text-lg font-bold text-[#482015] mb-6">Send Us a Direct Message</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ahmad"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white text-stone-800 text-xs p-3.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-500 shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. ahmad@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white text-stone-800 text-xs p-3.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-500 shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">What is this about?</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white text-stone-800 text-xs p-3.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-500 shadow-xs"
                  >
                    <option>General Inquiry</option>
                    <option>Custom Birthday Cake Reservation</option>
                    <option>Wedding/Anniversary Event Catering</option>
                    <option>Grocery Mart Delivery / Pricing</option>
                    <option>Feedback & Suggestions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-500 mb-1.5">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your request, details, or custom order requirements here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white text-stone-800 text-xs p-3.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-amber-500 shadow-xs resize-none leading-relaxed"
                  />
                </div>

                <div className="relative pt-2">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-2.5 text-emerald-800 text-xs font-semibold"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span>Thank you! Your inquiry was sent successfully. We will get back to you within 30 minutes!</span>
                      </motion.div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#482015] hover:bg-amber-800 text-white font-bold py-3 px-6 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                      >
                        <Send className="w-3.5 h-3.5 text-amber-400" />
                        <span>Send Inquiry Message</span>
                      </button>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
