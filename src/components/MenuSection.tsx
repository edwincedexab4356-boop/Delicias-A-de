import React, { useState } from 'react';
import { Category, Product } from '../types';
import { useCart } from '../context/CartContext';
import { Plus, Check, Sparkles, AlertCircle, Scale } from 'lucide-react';

interface MenuSectionProps {
  category: Category;
  products: Product[];
  onOpenModal: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  category,
  products,
  onOpenModal,
}) => {
  const { addToCart } = useCart();
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);
  const [missingPrepProductId, setMissingPrepProductId] = useState<string | null>(null);

  // Selected preparation per product ID (default to first option so customer has a convenient default, but can freely switch)
  const [selectedPreps, setSelectedPreps] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    products.forEach((p) => {
      if (p.preparationOptions && p.preparationOptions.length > 0) {
        initial[p.id] = p.preparationOptions[0];
      }
    });
    return initial;
  });

  const handleSelectPrep = (productId: string, prep: string) => {
    setSelectedPreps((prev) => ({ ...prev, [productId]: prep }));
    if (missingPrepProductId === productId) {
      setMissingPrepProductId(null);
    }
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();

    // Check preparation if required
    const prep = selectedPreps[product.id];
    if (product.preparationOptions && product.preparationOptions.length > 0 && !prep) {
      setMissingPrepProductId(product.id);
      setTimeout(() => {
        setMissingPrepProductId(null);
      }, 3000);
      return;
    }

    const success = addToCart({
      product,
      quantity: 1,
      preparation: prep,
    });

    if (success) {
      const key = `${product.id}_${prep || 'def'}`;
      setAddedItemKey(key);
      setTimeout(() => {
        setAddedItemKey(null);
      }, 1400);
    }
  };

  return (
    <section
      id={`section-${category.id}`}
      className="mb-20 sm:mb-28 scroll-mt-24 transition-all"
    >
      {/* 1. Large Panoramic Category Photograph */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#C5A880]/30 group mb-8 sm:mb-12 bg-[#050C16]">
        <img
          src={category.image}
          alt={`Gastronomía de ${category.name} en DELICIAS A DE`}
          loading="lazy"
          className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] transition-transform duration-1000 ease-out group-hover:scale-103"
        />

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081321] via-[#081321]/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#081321]/90 via-[#081321]/30 to-transparent" />

        {/* Text Overlay inside the Panoramic Frame */}
        <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col justify-end">
          <div className="max-w-2xl">
            {/* Section Number & Kicker */}
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs sm:text-sm font-bold text-[#C5A880] tracking-[0.25em] uppercase px-2.5 py-0.5 rounded bg-[#081321]/80 border border-[#C5A880]/40 backdrop-blur-sm">
                SECCIÓN {category.sectionNumber}
              </span>
              <span className="h-px w-10 sm:w-16 bg-[#C5A880]/50" />
              <span className="text-[11px] sm:text-xs text-[#FAF8F5]/80 uppercase tracking-widest hidden sm:inline">
                {category.subtitle}
              </span>
            </div>

            {/* Category Title */}
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF8F5] tracking-wide font-normal leading-tight">
              {category.name}
            </h2>

            {/* Tagline */}
            <p className="text-xs sm:text-sm md:text-base text-[#E7DFD5]/90 mt-2 font-light line-clamp-2 max-w-xl">
              {category.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* 2. The Luxury Menu Sheet (Carta Gastronómica Elegante) */}
      <div className="relative bg-[#0B192C]/90 border border-[#162C46] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl shadow-black/40">
        {/* Decorative Golden Corner Accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C5A880]/30 pointer-events-none rounded-tl-sm" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C5A880]/30 pointer-events-none rounded-tr-sm" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#C5A880]/30 pointer-events-none rounded-bl-sm" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#C5A880]/30 pointer-events-none rounded-br-sm" />

        {/* Editorial Subheader before items */}
        <div className="text-center pb-8 border-b border-[#162C46]/80 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#C5A880]">
            CARTA OFICIAL &middot; DELICIAS A DE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-normal mt-1">
            Platos y Especialidades de {category.name}
          </h3>
          <p className="text-xs text-[#B8A58E] mt-1 italic font-serif">
            Elaborados al momento con ingredientes frescos del océano
          </p>
        </div>

        {/* Dishes List (Listado alineado estilo carta de lujo) */}
        <div className="space-y-6 sm:space-y-7">
          {products.map((product) => {
            const currentPrep = selectedPreps[product.id];
            const isItemAdded = addedItemKey === `${product.id}_${currentPrep || 'def'}`;
            const hasMissingPrep = missingPrepProductId === product.id;

            return (
              <div
                key={product.id}
                className={`group relative pb-6 border-b transition-colors ${
                  hasMissingPrep
                    ? 'border-amber-500/80 bg-amber-950/20 p-3 rounded-xl'
                    : 'border-[#162C46]/60 hover:border-[#C5A880]/30'
                }`}
              >
                {/* Main Row: Dish name + Leader Dots + Price + Discrete Add Button */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4">
                  {/* Left: Dish Name & Badges */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        onClick={() => onOpenModal(product)}
                        className="font-serif text-lg sm:text-xl md:text-[21px] text-[#FAF8F5] font-medium tracking-wide group-hover:text-[#C5A880] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <span>{product.name}</span>
                      </h4>

                      {/* Featured or Specialty Tags */}
                      {product.featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30">
                          <Sparkles className="w-2.5 h-2.5 fill-current" />
                          <span>Destacado</span>
                        </span>
                      )}

                      {product.badge && (
                        <span className="text-[10px] font-medium tracking-wider uppercase text-[#B8A58E] px-1.5 py-0.5 rounded bg-[#10223B]/80 border border-[#162C46]">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Brief Elegant Description */}
                    <p className="text-xs sm:text-[13px] text-[#D2C4B2]/80 leading-relaxed font-light mt-1 max-w-2xl">
                      {product.description}
                    </p>
                  </div>

                  {/* Middle Dotted Leader Line (Visible on tablet/desktop) */}
                  <div className="hidden md:block flex-1 border-b border-dotted border-[#183355]/80 mx-2 self-center" />

                  {/* Right: Price & Discrete Add Control */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 shrink-0 mt-2 sm:mt-0">
                    {/* Price Display */}
                    <div className="text-left sm:text-right">
                      {product.requiresPriceConfirmation ? (
                        <div className="flex flex-col items-start sm:items-end">
                          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#C5A880] flex items-center gap-1">
                            <Scale className="w-3.5 h-3.5" />
                            <span>Precio según tamaño</span>
                          </span>
                          <span className="text-[11px] text-[#B8A58E] italic">
                            Confirmación con cocina
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="font-sans text-xl sm:text-2xl font-bold text-[#C5A880]">
                            ${product.price}
                          </span>
                          <span className="text-xs text-[#B8A58E] font-normal">USD</span>
                        </div>
                      )}
                    </div>

                    {/* Discrete Action Button */}
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className={`h-9 px-3.5 sm:px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer touch-manipulation shadow-sm ${
                        isItemAdded
                          ? 'bg-emerald-600 text-white shadow-emerald-950/40'
                          : 'bg-[#10223B] hover:bg-[#C5A880] text-[#FAF8F5] hover:text-[#081321] border border-[#C5A880]/35 hover:border-[#C5A880]'
                      }`}
                      aria-label={`Agregar ${product.name} al pedido`}
                    >
                      {isItemAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 animate-scale-in" />
                          <span>¡Agregado!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Agregar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Sub-selector for dishes with multiple preparation options */}
                {product.preparationOptions && product.preparationOptions.length > 0 && (
                  <div className="mt-3 pt-2.5 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-[#B8A58E] uppercase tracking-wider font-semibold mr-1">
                      Preparación:
                    </span>
                    {product.preparationOptions.map((opt) => {
                      const isSelected = currentPrep === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelectPrep(product.id, opt)}
                          className={`text-xs py-1 px-3 rounded-lg font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#C5A880] text-[#081321] font-bold shadow-sm'
                              : 'bg-[#10223B] text-[#D2C4B2] border border-[#183355] hover:border-[#C5A880]/50'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}

                    {hasMissingPrep && (
                      <span className="text-xs text-amber-300 flex items-center gap-1 ml-2 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        Selecciona una opción para agregar al pedido
                      </span>
                    )}
                  </div>
                )}

                {/* Notice for Lobster price confirmation */}
                {product.requiresPriceConfirmation && (
                  <div className="mt-3 pt-2 flex items-center gap-2 text-xs text-[#C5A880]/90 bg-[#10223B]/60 border border-[#C5A880]/30 px-3 py-1.5 rounded-lg max-w-xl">
                    <Scale className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      Este plato requiere confirmación de precio según el peso exacto disponible antes
                      de despachar el pedido.
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
