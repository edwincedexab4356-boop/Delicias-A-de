import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Check, Clock, Users, AlertCircle, Sparkles, Scale } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [selectedPrep, setSelectedPrep] = useState('');
  const [prepError, setPrepError] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setInstructions('');
    setAdded(false);
    setPrepError(false);
    if (product) {
      if (product.preparationOptions && product.preparationOptions.length > 0) {
        setSelectedPrep(product.preparationOptions[0]);
      } else {
        setSelectedPrep('');
      }
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.preparationOptions && product.preparationOptions.length > 0 && !selectedPrep) {
      setPrepError(true);
      return;
    }

    const success = addToCart({
      product,
      quantity,
      preparation: selectedPrep || undefined,
      instructions: instructions.trim() ? instructions.trim() : undefined,
    });

    if (success) {
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
        onClose();
      }, 900);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050C16]/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-[#081321] border border-[#C5A880]/40 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 my-2 sm:my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 p-2 rounded-full bg-[#081321]/80 hover:bg-[#10223B] text-[#FAF8F5] border border-[#C5A880]/30 transition-colors cursor-pointer"
          aria-label="Cerrar detalle del plato"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dish Picture */}
        <div className="relative h-44 xs:h-52 sm:h-72 w-full overflow-hidden bg-black">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
            }}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081321] via-transparent to-black/30" />

          <div className="absolute bottom-3 left-4 sm:bottom-4 sm:left-6 flex flex-wrap gap-1.5 sm:gap-2">
            {product.featured && (
              <div className="bg-[#C5A880] text-[#081321] text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-sm shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                <span>Destacado</span>
              </div>
            )}
            {product.badge && (
              <div className="bg-[#081321]/90 border border-[#C5A880]/60 text-[#C5A880] text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-sm shadow-lg">
                {product.badge}
              </div>
            )}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-8">
          {/* Header & Price */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                DELICIAS ADE &middot; CARTA OFICIAL
              </span>
              <h3 className="font-serif text-xl xs:text-2xl sm:text-3xl text-[#FAF8F5] font-medium mt-0.5 sm:mt-1">
                {product.name}
              </h3>
            </div>
            <div className="text-left sm:text-right shrink-0">
              {product.requiresPriceConfirmation ? (
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#C5A880] block font-semibold flex items-center gap-1 sm:justify-end">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Precio según tamaño</span>
                  </span>
                  <span className="text-xs text-[#B8A58E] italic block mt-0.5">
                    Confirmación con cocina
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-2xl font-bold text-[#C5A880] font-sans">
                    ${product.price}
                  </span>
                  <span className="text-xs text-[#B8A58E] block">USD por porción</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#D2C4B2] leading-relaxed font-light mb-5">
            {product.description}
          </p>

          {/* Alternative preparation selector if applicable */}
          {product.preparationOptions && product.preparationOptions.length > 0 && (
            <div
              className={`mb-5 p-3.5 rounded-xl border transition-colors ${
                prepError
                  ? 'bg-amber-950/20 border-amber-500'
                  : 'bg-[#0B192C] border-[#162C46]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                  Selecciona la preparación requerida:
                </label>
                {prepError && (
                  <span className="text-[11px] text-amber-400 font-medium">Opción obligatoria</span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.preparationOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedPrep(opt);
                      setPrepError(false);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                      selectedPrep === opt
                        ? 'bg-[#C5A880] text-[#081321] shadow-md font-bold'
                        : 'bg-[#10223B] text-[#D2C4B2] border border-[#183355] hover:border-[#C5A880]/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notice for Lobster */}
          {product.requiresPriceConfirmation && (
            <div className="mb-5 p-3 rounded-xl bg-[#10223B]/80 border border-[#C5A880]/40 flex items-start gap-2.5 text-xs text-[#FAF8F5]">
              <Scale className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#C5A880]">Confirmación de precio:</span> El costo
                exacto de la langosta se confirmará según el peso de la pieza disponible antes de preparar
                el pedido.
              </div>
            </div>
          )}

          {/* Details Row: Prep time, servings */}
          <div className="flex flex-wrap items-center gap-6 py-3 border-y border-[#162C46] mb-5 text-xs text-[#E7DFD5]">
            {product.prepTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C5A880]" />
                <span>Tiempo de cocina: {product.prepTime}</span>
              </div>
            )}
            {product.servings && (
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C5A880]" />
                <span>Sugerido: {product.servings}</span>
              </div>
            )}
          </div>

          {/* Ingredients list if available */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-2">
                Ingredientes Principales
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#10223B] border border-[#183355] text-[#FAF8F5]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Allergens Notice if available */}
          {product.allergens && product.allergens.length > 0 && (
            <div className="mb-5 p-2.5 rounded-lg bg-[#10223B]/60 border border-amber-900/30 flex items-start gap-2 text-xs text-amber-200/90">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Información de alérgenos:</span> Contiene{' '}
                {product.allergens.join(', ')}.
              </div>
            </div>
          )}

          {/* Special Instructions Note */}
          <div className="mb-6">
            <label
              htmlFor="special-instructions"
              className="block text-xs uppercase tracking-widest text-[#B8A58E] font-medium mb-1.5"
            >
              Instrucciones especiales para cocina (opcional)
            </label>
            <input
              id="special-instructions"
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Ej: Acompañado de patacones, salsa aparte, etc..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B192C] border border-[#183355] focus:border-[#C5A880] text-base sm:text-sm text-[#FAF8F5] placeholder-[#B8A58E]/50 outline-none transition-colors"
            />
          </div>

          {/* Quantity Selector + Add Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#162C46]">
            {/* Quantity Controls */}
            <div className="flex items-center justify-between bg-[#10223B] border border-[#183355] rounded-lg px-2 py-1 w-full sm:w-auto">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-[#D2C4B2] hover:text-[#FAF8F5] transition-colors disabled:opacity-30 cursor-pointer"
                disabled={quantity <= 1}
                aria-label="Reducir cantidad"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-base font-semibold text-[#FAF8F5] font-mono min-w-[2.5rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-[#D2C4B2] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 w-full py-3.5 px-6 rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#C5A880] hover:bg-[#D8BD93] text-[#081321] shadow-lg shadow-[#C5A880]/20'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>¡Plato Agregado!</span>
                </>
              ) : (
                <>
                  <span>
                    Agregar al pedido {selectedPrep ? `(${selectedPrep})` : ''}
                  </span>
                  {!product.requiresPriceConfirmation ? (
                    <span className="font-mono font-bold">(${totalPrice} USD)</span>
                  ) : (
                    <span className="font-bold text-[11px]">(Precio según tamaño)</span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
