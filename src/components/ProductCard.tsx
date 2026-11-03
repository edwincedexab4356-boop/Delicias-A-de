import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Plus, Check, Clock, Users, Eye, Sparkles, Scale } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Default selected preparation if available
  const [selectedPrep, setSelectedPrep] = useState<string>(() => {
    return product.preparationOptions && product.preparationOptions.length > 0
      ? product.preparationOptions[0]
      : '';
  });

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    const success = addToCart({
      product,
      quantity: 1,
      preparation: selectedPrep || undefined,
    });

    if (success) {
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 1300);
    }
  };

  return (
    <article
      onClick={() => onOpenModal(product)}
      className="group relative bg-[#0B192C]/90 hover:bg-[#0F223D] border border-[#162C46] hover:border-[#C5A880]/70 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1"
    >
      <div>
        {/* Image Container with Aspect Ratio and Zoom */}
        <div className="relative aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-[#081321]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-transparent to-black/30" />

          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
            <div className="flex flex-col gap-1.5">
              {product.featured && (
                <span className="inline-flex items-center gap-1 bg-[#C5A880] text-[#081321] text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded shadow-md backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 fill-current" />
                  <span>Destacado</span>
                </span>
              )}

              {product.badge && (
                <span className="inline-block bg-[#081321]/90 border border-[#C5A880]/50 text-[#C5A880] text-[9.5px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 bg-[#081321]/80 backdrop-blur-sm p-2 rounded-full text-[#E7DFD5] hover:text-[#C5A880] pointer-events-auto">
              <Eye className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <div>
              {product.requiresPriceConfirmation ? (
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C5A880] bg-[#10223B] px-2 py-0.5 rounded border border-[#C5A880]/40 w-fit flex items-center gap-1">
                    <Scale className="w-3 h-3" />
                    <span>Precio según tamaño</span>
                  </span>
                  <span className="text-xs text-[#B8A58E] italic mt-1">Por confirmar con cocina</span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-[#C5A880] font-sans">
                  ${product.price}{' '}
                  <span className="text-xs font-normal text-[#B8A58E]">USD</span>
                </span>
              )}
            </div>

            {product.servings && (
              <div className="flex items-center gap-1 text-[11px] text-[#B8A58E] shrink-0">
                <Users className="w-3 h-3 text-[#C5A880]/70" />
                <span>{product.servings}</span>
              </div>
            )}
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-[#FAF8F5] font-medium leading-snug group-hover:text-[#C5A880] transition-colors mb-2">
            {product.name}
          </h3>

          <p className="text-xs sm:text-[13px] text-[#D2C4B2]/85 leading-relaxed font-light line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Preparation selector */}
          {product.preparationOptions && product.preparationOptions.length > 0 && (
            <div className="mb-3.5 pt-2 border-t border-[#162C46]/60" onClick={(e) => e.stopPropagation()}>
              <span className="text-[10px] uppercase tracking-wider text-[#B8A58E] font-semibold block mb-1.5">
                Elige tu preparación:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {product.preparationOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedPrep(opt)}
                    className={`text-[11px] py-1.5 px-2 rounded-lg font-medium transition-all text-center truncate ${
                      selectedPrep === opt
                        ? 'bg-[#C5A880] text-[#081321] font-bold shadow-sm'
                        : 'bg-[#10223B] text-[#D2C4B2] border border-[#183355] hover:border-[#C5A880]/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.prepTime && (
            <div className="flex items-center gap-1.5 text-[11px] text-[#A8875B] pt-2 border-t border-[#162C46]/50">
              <Clock className="w-3 h-3" />
              <span>Cocción estimada: {product.prepTime}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 pt-0">
        <button
          onClick={handleAdd}
          className={`w-full py-3 px-4 rounded-xl text-xs sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 touch-manipulation cursor-pointer ${
            justAdded
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
              : 'bg-[#10223B] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#081321] border border-[#C5A880]/35 hover:border-[#C5A880] shadow-sm active:scale-98'
          }`}
          aria-label={`Agregar ${product.name} al pedido`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 animate-scale-in" />
              <span>¡Agregado al Pedido!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>
                Agregar {selectedPrep ? `(${selectedPrep.split(' ')[0]})` : ''}{' '}
                {!product.requiresPriceConfirmation ? `· $${product.price} USD` : '(Por cotizar)'}
              </span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};
