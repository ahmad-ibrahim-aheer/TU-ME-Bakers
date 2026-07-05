import React from 'react';
import { Phone, Clock, Star, ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  onCartToggle: () => void;
  cartCount: number;
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Header({ onCartToggle, cartCount, activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Bakery Menu', id: 'bakery' },
    { label: 'Mart Products', id: 'mart' },
    { label: 'Special Orders', id: 'special' },
    { label: 'About Us', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full z-40 sticky top-0 bg-white shadow-sm border-b border-stone-100">
      {/* Top Banner Contact Bar */}
      <div className="bg-[#482015] text-stone-100 text-xs py-2 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="tel:+923037041468" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>+92 303 7041468</span>
          </a>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Open daily 11:00 AM - 12:00 AM</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-amber-400">5.0</span>
          <div className="flex items-center text-amber-400">
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
            <Star className="w-3 h-3 fill-amber-400" />
          </div>
          <span className="text-stone-300">21 Google Reviews</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
        {/* Logo brand */}
        <button onClick={() => handleNavClick('hero')} className="flex flex-col items-start cursor-pointer group text-left">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#482015] font-serif group-hover:text-amber-700 transition-colors">
            TU & ME
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-amber-600">
            MART AND BAKERS
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors cursor-pointer pb-1 relative ${
                activeSection === item.id
                  ? 'text-amber-700 font-semibold'
                  : 'text-stone-600 hover:text-amber-700'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <button
            onClick={onCartToggle}
            className="p-2 text-stone-700 hover:text-amber-700 hover:bg-stone-50 rounded-full transition-all relative"
            aria-label="Toggle Shopping Cart"
          >
            <ShoppingBag className="w-5.5 h-5.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* CTA Order Button */}
          <button
            onClick={() => handleNavClick('bakery')}
            className="hidden sm:inline-flex bg-amber-600 hover:bg-[#482015] text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
          >
            Order Fresh Today
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-amber-700 rounded-md hover:bg-stone-50"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-4 py-3 space-y-2 animate-fadeIn shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-amber-50 text-amber-800 font-semibold'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-amber-700'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                handleNavClick('bakery');
                onCartToggle();
              }}
              className="flex items-center justify-center gap-2 w-full bg-amber-600 hover:bg-[#482015] text-white text-sm font-bold py-2.5 rounded-full transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Cart ({cartCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
