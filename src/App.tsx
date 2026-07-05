import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BakeryMenu from './components/BakeryMenu';
import MartProducts from './components/MartProducts';
import SpecialOrders from './components/SpecialOrders';
import AboutContact from './components/AboutContact';
import CartDrawer from './components/CartDrawer';
import AIChatBot from './components/AIChatBot';
import ReviewModal from './components/ReviewModal';

import { Product, CartItem, Review } from './types';
import { BAKERY_PRODUCTS, MART_PRODUCTS, INITIAL_REVIEWS } from './data';
import { Award, CheckCircle2, ShoppingBag, Star, Phone, Clock, MapPin } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [activeSection, setActiveSection] = React.useState('hero');
  const [cartOpen, setCartOpen] = React.useState(false);
  const [reviewModalOpen, setReviewModalOpen] = React.useState(false);

  // Initialize reviews from localStorage or initial mock data
  React.useEffect(() => {
    const savedReviews = localStorage.getItem('tu_me_reviews');
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  // Update active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'bakery', 'mart', 'special', 'about', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddToOrder = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    // Open cart drawer immediately to provide clear feedback
    setCartOpen(true);
  };

  const handleAddCustomCakeToCart = (cakeProduct: Product, customNotes: string) => {
    setCartItems((prevItems) => [
      ...prevItems,
      { product: cakeProduct, quantity: 1, customNotes }
    ]);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: Math.max(1, nextQty) };
          }
          return item;
        })
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const handleSubmitReview = (newReviewData: Omit<Review, 'id' | 'date'>) => {
    const freshReview: Review = {
      ...newReviewData,
      id: `review-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    const updated = [freshReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('tu_me_reviews', JSON.stringify(updated));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 antialiased selection:bg-amber-100 selection:text-amber-900">
      
      {/* Header and top communication rails */}
      <Header
        onCartToggle={() => setCartOpen(!cartOpen)}
        cartCount={cartCount}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main sections */}
      <main>
        {/* Dynamic hero display with reviews highlight */}
        <Hero
          reviews={reviews}
          onOpenReviewModal={() => setReviewModalOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Bakery menu with interactive catalog card layout */}
        <BakeryMenu
          products={BAKERY_PRODUCTS}
          onAddToOrder={handleAddToOrder}
        />

        {/* Grocery Mart essential catalog */}
        <MartProducts
          products={MART_PRODUCTS}
          onAddToOrder={handleAddToOrder}
        />

        {/* Custom Special Event cake builder and planning inquiry specs */}
        <SpecialOrders
          onAddCustomCakeToCart={handleAddCustomCakeToCart}
        />

        {/* Stories, Hours, Give Call, Location, Inquiries forms */}
        <AboutContact
          reviews={reviews}
        />
      </main>

      {/* Slide-out cart side-pane drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Floating conversational virtual assistant */}
      <AIChatBot />

      {/* Review Submission Popup Dialog Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

      {/* Elegant Footer Block exactly as shown in reference video */}
      <footer className="bg-[#482015] text-stone-100 py-16 px-4 sm:px-6 lg:px-8 text-left border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1: Brand description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold tracking-tight text-white font-serif flex flex-col">
              <span>TU & ME</span>
              <span className="text-[10px] tracking-[0.2em] text-amber-500 font-bold font-sans">MART AND BAKERS</span>
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Sargodha's favorite bakery and mart — fresh pastries, pizza, cakes, and daily essentials. Quality you can trust, prices you'll love.
            </p>
            <div className="flex gap-1 items-center pt-2">
              <span className="text-amber-400 font-extrabold text-sm">5.0</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-stone-400 text-xs">21 Google Reviews</span>
            </div>
          </div>

          {/* Col 2: Quick navigation */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase text-amber-500 mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-stone-300 text-xs sm:text-sm">
              <li>
                <button onClick={() => handleNavigate('bakery')} className="hover:text-amber-400 cursor-pointer transition-colors text-left">
                  Bakery Menu
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('mart')} className="hover:text-amber-400 cursor-pointer transition-colors text-left">
                  Mart Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('special')} className="hover:text-amber-400 cursor-pointer transition-colors text-left">
                  Special Orders
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('about')} className="hover:text-amber-400 cursor-pointer transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('contact')} className="hover:text-amber-400 cursor-pointer transition-colors text-left">
                  Hours & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company values / highlights */}
          <div>
            <h4 className="font-bold text-sm tracking-wider uppercase text-amber-500 mb-4">Our Standards</h4>
            <ul className="space-y-2.5 text-stone-300 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Double-Hygiene Checked</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Polite, Attentive Behavior</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Freshly Sourced Local Milk</span>
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Clean & Organised Mart Aisles</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Reach us */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider uppercase text-amber-500 mb-4">Get In Touch</h4>
            <ul className="space-y-3 text-stone-300 text-xs sm:text-sm">
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Mushaf Ali Mir Rd, Cantt View, Sargodha 40100, Pakistan</span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <a href="tel:+923037041468" className="hover:text-amber-400">
                  +92 303 7041468
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>Open daily from 11:00 AM until 12:00 AM Midnight</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => handleNavigate('bakery')}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-[#482015] font-bold px-5 py-2.5 rounded-full text-xs transition-colors cursor-pointer uppercase tracking-wider"
              >
                Order Fresh Today
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="max-w-7xl mx-auto border-t border-stone-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-stone-500 text-xs gap-4">
          <span>&copy; {new Date().getFullYear()} TU & ME MART AND BAKERS. All rights reserved.</span>
          <div className="flex gap-1.5 items-center">
            <span>5.0</span>
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
              ))}
            </div>
            <span>21 Reviews on Google Maps</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
