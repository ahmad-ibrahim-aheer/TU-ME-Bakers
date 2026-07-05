import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: CartDrawerProps) {
  const [customerName, setCustomerName] = React.useState('');
  const [deliveryAddress, setDeliveryAddress] = React.useState('');
  const [orderType, setOrderType] = React.useState<'delivery' | 'pickup'>('pickup');

  const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const deliveryCharges = orderType === 'delivery' ? 100 : 0;
  const grandTotal = subtotal + deliveryCharges;

  const handleCheckoutViaWhatsApp = () => {
    if (cartItems.length === 0) return;

    // Compile items text
    let itemsText = `*New Order Request from website*\n`;
    itemsText += `--------------------------------------\n`;
    itemsText += `👤 *Customer:* ${customerName || 'Valued Guest'}\n`;
    itemsText += `🏪 *Type:* ${orderType === 'delivery' ? '🚗 Home Delivery' : '🏪 Self-Pickup'}\n`;
    if (orderType === 'delivery' && deliveryAddress) {
      itemsText += `📍 *Address:* ${deliveryAddress}\n`;
    }
    itemsText += `--------------------------------------\n`;
    itemsText += `📦 *Items Ordered:*\n`;

    cartItems.forEach((item, idx) => {
      itemsText += `${idx + 1}. *${item.product.name}* (x${item.quantity}) - Rs. ${item.product.price * item.quantity}\n`;
      if (item.customNotes) {
        itemsText += `   _Note: ${item.customNotes}_\n`;
      }
    });

    itemsText += `--------------------------------------\n`;
    if (deliveryCharges > 0) {
      itemsText += `🚚 *Delivery Fee:* Rs. ${deliveryCharges}\n`;
    }
    itemsText += `💰 *Grand Total:* *Rs. ${grandTotal}*\n`;
    itemsText += `--------------------------------------\n`;
    itemsText += `Please confirm availability and completion details. Thank you!`;

    const encodedText = encodeURIComponent(itemsText);
    const whatsappUrl = `https://wa.me/923037041468?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <div className="flex items-center gap-2 text-[#482015] font-serif text-lg font-bold">
                <ShoppingBag className="w-5 h-5 text-amber-700" />
                <span>Your Selected Order</span>
                <span className="text-xs font-sans text-stone-400 font-normal bg-stone-200/55 px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-200/50 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart list / details */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <ShoppingBag className="w-16 h-16 text-stone-200 mb-4 stroke-1 animate-pulse" />
                  <p className="text-stone-500 text-sm font-semibold">Your shopping bag is completely empty.</p>
                  <p className="text-stone-400 text-xs mt-1 max-w-xs">Browse our fresh pizza slices, pastries, or mart items to populate your order!</p>
                  <button
                    onClick={onClose}
                    className="mt-6 bg-[#482015] hover:bg-amber-700 text-white text-xs font-bold py-2.5 px-6 rounded-full transition-colors cursor-pointer"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-3 bg-stone-50 p-3 rounded-xl border border-stone-100/50 relative group"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0 bg-stone-150"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-stone-800 text-xs sm:text-sm truncate group-hover:text-[#482015] transition-colors">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-stone-400 hover:text-red-500 p-0.5 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider block mt-0.5">
                          {item.product.category}
                        </span>
                        
                        {item.customNotes && (
                          <span className="text-[10px] text-amber-800 bg-amber-50/50 px-2 py-0.5 rounded-md border border-amber-100/30 block mt-1 italic">
                            {item.customNotes}
                          </span>
                        )}

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border border-stone-200 rounded-full bg-white scale-90 -ml-1">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="p-1 text-stone-500 hover:text-amber-700 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-stone-700">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="p-1 text-stone-500 hover:text-amber-700 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-extrabold text-[#482015] text-xs sm:text-sm">
                            Rs. {item.product.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Checkout Details Section */}
                  <div className="border-t border-stone-100 pt-5 space-y-4">
                    <h5 className="font-bold text-[#482015] text-xs uppercase tracking-wider">
                      Fulfillment details
                    </h5>
                    
                    {/* Order type */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setOrderType('pickup')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                          orderType === 'pickup'
                            ? 'bg-amber-700 text-white border-amber-700'
                            : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        🏪 Self-Pickup
                      </button>
                      <button
                        onClick={() => setOrderType('delivery')}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border cursor-pointer transition-all ${
                          orderType === 'delivery'
                            ? 'bg-amber-700 text-white border-amber-700'
                            : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        🚗 Home Delivery
                      </button>
                    </div>

                    {/* Form Details */}
                    <div className="space-y-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 text-xs p-3 rounded-xl focus:outline-hidden focus:border-amber-500 text-stone-800"
                        />
                      </div>
                      {orderType === 'delivery' && (
                        <div>
                          <textarea
                            placeholder="Full Delivery Address in Sargodha Cantt / Cantt View / City area..."
                            rows={2}
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 text-xs p-3 rounded-xl focus:outline-hidden focus:border-amber-500 text-stone-800 resize-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary & checkout */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t border-stone-100 bg-stone-50 text-left">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>Items Subtotal</span>
                    <span>Rs. {subtotal}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-xs text-stone-500">
                      <span>Delivery Fee (Sargodha area)</span>
                      <span>Rs. 100</span>
                    </div>
                  )}
                  <div className="flex justify-between items-end pt-2 border-t border-stone-200/50">
                    <span className="font-bold text-stone-800 text-sm">Estimated Total</span>
                    <span className="font-extrabold text-xl text-[#482015]">Rs. {grandTotal}</span>
                  </div>
                </div>

                {/* Direct WhatsApp Action */}
                <button
                  onClick={handleCheckoutViaWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-transparent" />
                  <span>Submit Order via WhatsApp</span>
                </button>
                <div className="flex items-center gap-1.5 justify-center mt-3 text-[10px] text-stone-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct submission to official store number</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
