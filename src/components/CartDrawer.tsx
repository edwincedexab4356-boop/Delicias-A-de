import React, { useEffect, useState } from 'react';
import { useCart, getItemKey } from '../context/CartContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Utensils,
  Scale,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    total,
    totalItems,
    hasItemsWithPendingPrice,
  } = useCart();

  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setConfirmClear(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleClearConfirm = () => {
    clearCart();
    setConfirmClear(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsCartOpen(false);
          setConfirmClear(false);
        }}
        className="fixed inset-0 bg-[#050C16]/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        {/* Drawer Panel */}
        <aside className="w-screen max-w-full sm:max-w-md bg-[#081321] border-l border-[#C5A880]/30 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#162C46] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#10223B] border border-[#C5A880]/40 text-[#C5A880]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl text-[#FAF8F5] font-medium">
                  Tu Pedido
                </h3>
                <p className="text-xs text-[#B8A58E]">
                  {totalItems} {totalItems === 1 ? 'plato seleccionado' : 'platos seleccionados'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setConfirmClear(false);
              }}
              className="p-2 rounded-full text-[#D2C4B2] hover:text-[#FAF8F5] hover:bg-[#10223B] transition-colors cursor-pointer"
              aria-label="Cerrar panel de pedido"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#10223B] border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] mb-4">
                  <Utensils className="w-7 h-7 stroke-1" />
                </div>
                <h4 className="font-serif text-lg text-[#FAF8F5] mb-2 font-medium">
                  Tu pedido está vacío
                </h4>
                <p className="text-xs sm:text-sm text-[#B8A58E] max-w-xs mb-6 font-light leading-relaxed">
                  Aún no has agregado ninguna delicia a tu comanda. Explora nuestra carta y selecciona tus platos preferidos.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#C5A880] text-[#081321] text-xs font-semibold uppercase tracking-wider hover:bg-[#D8BD93] transition-colors cursor-pointer"
                >
                  Explorar la carta
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const key = getItemKey(item);
                const itemTotal = item.itemPrice * item.quantity;

                return (
                  <div
                    key={key}
                    className="p-4 rounded-xl bg-[#0B192C] border border-[#162C46] flex gap-3.5 items-start transition-colors hover:border-[#C5A880]/40"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover shrink-0 bg-[#081321] border border-[#162C46]"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      {/* Name & Delete Button */}
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm sm:text-base font-medium text-[#FAF8F5] leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(key)}
                          className="text-[#B8A58E] hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="Eliminar plato del pedido"
                          aria-label={`Eliminar ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Selected Preparation */}
                      {item.selectedPreparation && (
                        <div className="mt-1">
                          <span className="inline-block text-[10.5px] px-2 py-0.5 rounded bg-[#10223B] border border-[#C5A880]/40 text-[#C5A880] font-medium">
                            Preparación: {item.selectedPreparation}
                          </span>
                        </div>
                      )}

                      {/* Unit Price */}
                      <div className="mt-1 text-xs text-[#B8A58E]">
                        {item.requiresPriceConfirmation ? (
                          <span className="text-[#C5A880] flex items-center gap-1 font-medium">
                            <Scale className="w-3 h-3" />
                            <span>Precio según tamaño (por confirmar)</span>
                          </span>
                        ) : (
                          <span>
                            Precio unitario:{' '}
                            <strong className="text-[#FAF8F5] font-sans">
                              ${item.itemPrice.toFixed(2)} USD
                            </strong>
                          </span>
                        )}
                      </div>

                      {/* Special instructions */}
                      {item.specialInstructions && (
                        <p className="text-[11px] text-[#B8A58E] italic mt-1 line-clamp-1 bg-[#10223B]/60 px-2 py-0.5 rounded">
                          Nota: {item.specialInstructions}
                        </p>
                      )}

                      {/* Quantity Controls & Product Subtotal */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#162C46]/60">
                        {/* Quantity Counter */}
                        <div className="flex items-center bg-[#10223B] border border-[#183355] rounded-md">
                          <button
                            onClick={() => updateQuantity(key, -1)}
                            className="px-2 py-1 text-[#D2C4B2] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                            aria-label="Disminuir cantidad"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-[#FAF8F5] font-mono min-w-[1.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(key, 1)}
                            className="px-2 py-1 text-[#D2C4B2] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                            aria-label="Aumentar cantidad"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Subtotal per product */}
                        <div className="text-right">
                          <span className="text-[10px] text-[#B8A58E] uppercase tracking-wider block">
                            Subtotal
                          </span>
                          {item.requiresPriceConfirmation ? (
                            <span className="text-xs font-bold text-[#C5A880]">Por confirmar</span>
                          ) : (
                            <span className="text-xs font-bold text-[#FAF8F5] font-sans">
                              ${itemTotal.toFixed(2)} USD
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer with Calculations & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-[#162C46] bg-[#050C16]/95 space-y-3.5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))]">
              {/* Notice for Lobster price confirmation */}
              {hasItemsWithPendingPrice && (
                <div className="p-3 rounded-lg bg-[#10223B] border border-[#C5A880]/40 text-xs text-[#FAF8F5] flex items-start gap-2">
                  <Scale className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#C5A880]">Aviso de precio:</span> Tu pedido
                    incluye langosta con precio según tamaño. El restaurante confirmará el valor final
                    exacto según el peso disponible antes de prepararlo.
                  </div>
                </div>
              )}

              {/* Exact calculations in USD (no invented additional fees or taxes) */}
              <div className="space-y-1.5 text-xs text-[#D2C4B2]">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
                  <span className="font-sans font-medium text-[#FAF8F5]">
                    ${subtotal.toFixed(2)} USD
                  </span>
                </div>

                <div className="flex justify-between items-baseline text-base font-semibold text-[#FAF8F5] pt-2 border-t border-[#162C46]">
                  <span className="font-serif">Total General</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-[#C5A880] font-sans">
                      ${total.toFixed(2)} USD
                    </span>
                    {hasItemsWithPendingPrice && (
                      <span className="text-[10.5px] text-[#B8A58E] block">
                        + Langosta por confirmar
                      </span>
                    )}
                    <span className="text-[10px] text-[#C5A880]/90 block mt-0.5">
                      Efectivo en local &middot; Yappy (6293-8233)
                    </span>
                  </div>
                </div>
              </div>

              {/* Clear Cart Confirmation Dialog */}
              {confirmClear ? (
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs text-rose-300 font-medium">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>¿Deseas vaciar todos los productos del pedido?</span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleClearConfirm}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Sí, vaciar
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-[#10223B] hover:bg-[#183355] text-[#D2C4B2] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                /* Primary Actions */
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onCheckout();
                    }}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#C5A880] hover:bg-[#D8BD93] text-[#081321] text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#C5A880]/20 flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
                  >
                    <span>Finalizar Pedido</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => setConfirmClear(true)}
                      className="text-[11px] text-[#B8A58E] hover:text-rose-400 transition-colors uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Vaciar pedido</span>
                    </button>
                    <span className="text-[11px] text-[#B8A58E]">
                      Sin cargos adicionales ocultos
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
