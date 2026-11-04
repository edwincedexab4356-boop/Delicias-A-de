import React, { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { MenuSection } from './components/MenuSection';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ReservationSection } from './components/ReservationSection';
import { Footer } from './components/Footer';
import { CATEGORIES, PRODUCTS } from './data/menuData';
import { CategoryId, Product } from './types';
import { ShoppingBag, Sparkles, FilterX, CheckCircle, ChevronRight, BookOpen } from 'lucide-react';

function MenuContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { totalItems, subtotal, total, setIsCartOpen, lastAddedItem } = useCart();

  // Scroll smoothly to catalog section
  const handleExploreClick = () => {
    const el = document.getElementById('catalogo-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      mariscos: 0,
      pescados: 0,
      bandejas: 0,
      pollo: 0,
    };
    PRODUCTS.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });
    return counts;
  }, []);

  // Filter categories to display
  const categoriesToDisplay = useMemo(() => {
    if (activeCategory === 'all') return CATEGORIES;
    return CATEGORIES.filter((c) => c.id === activeCategory);
  }, [activeCategory]);

  // Group products by category, filtering by search query if present
  const productsByCategory = useMemo(() => {
    const map: Record<string, Product[]> = {};

    CATEGORIES.forEach((cat) => {
      map[cat.id] = PRODUCTS.filter((p) => {
        if (p.category !== cat.id) return false;
        if (!searchQuery.trim()) return true;

        const q = searchQuery.toLowerCase();
        const inName = p.name.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inIngredients = p.ingredients?.some((ing) => ing.toLowerCase().includes(q));
        const inPreps = p.preparationOptions?.some((prep) => prep.toLowerCase().includes(q));

        return inName || inDesc || inIngredients || inPreps;
      });
    });

    return map;
  }, [searchQuery]);

  const totalMatchingProducts = useMemo(() => {
    let total = 0;
    categoriesToDisplay.forEach((cat) => {
      total += productsByCategory[cat.id]?.length || 0;
    });
    return total;
  }, [categoriesToDisplay, productsByCategory]);

  return (
    <div className="min-h-screen bg-[#081321] text-[#EDE7DE] selection:bg-[#C5A880]/30 selection:text-[#FAF8F5] relative">
      {/* Top Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero onExploreClick={handleExploreClick} />

      {/* Main Menu Catalog Section (CARTA GASTRONÓMICA DIGITAL) */}
      <main
        id="catalogo-section"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20"
      >
        {/* Subtle decorative badge */}
        <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-6">
          <BookOpen className="w-4 h-4" />
          <span>CARTA GASTRONÓMICA OFICIAL</span>
          <BookOpen className="w-4 h-4" />
        </div>

        {/* Interactive Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSearchQuery('');
          }}
          categoryCounts={categoryCounts}
          totalCount={PRODUCTS.length}
        />

        {/* Active Search Notification Banner if searching */}
        {searchQuery.trim() && (
          <div className="mb-10 flex items-center justify-between p-3.5 rounded-xl bg-[#10223B]/80 border border-[#C5A880]/30 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-[#FAF8F5]">
              <span className="text-[#B8A58E]">Resultados para:</span>
              <span className="font-semibold text-[#C5A880]">&ldquo;{searchQuery}&rdquo;</span>
              <span className="text-xs text-[#B8A58E]">({totalMatchingProducts} encontrados)</span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#C5A880] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
            >
              Borrar búsqueda
            </button>
          </div>
        )}

        {/* Render Each Category Section as a Luxury Restaurant Menu Page */}
        {totalMatchingProducts > 0 ? (
          <div>
            {categoriesToDisplay.map((cat) => {
              const catProducts = productsByCategory[cat.id] || [];
              if (catProducts.length === 0) return null;

              return (
                <MenuSection
                  key={cat.id}
                  category={cat}
                  products={catProducts}
                  onOpenModal={setSelectedProduct}
                />
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="py-20 text-center flex flex-col items-center justify-center bg-[#0B192C]/40 border border-[#162C46] rounded-2xl p-8 mb-16">
            <FilterX className="w-12 h-12 text-[#C5A880]/60 mb-4" />
            <h3 className="font-serif text-2xl text-[#FAF8F5] mb-2 font-medium">
              No encontramos platos con ese criterio
            </h3>
            <p className="text-sm text-[#B8A58E] max-w-md mb-6 font-light">
              Prueba buscando por pulpo, camarones, pargo, corvina, langosta o selecciona otra categoría de la carta.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-6 py-2.5 rounded-full bg-[#10223B] hover:bg-[#183355] text-[#FAF8F5] border border-[#C5A880]/40 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Ver toda la carta
            </button>
          </div>
        )}

        {/* Sensory Culinary Experience Highlight Banner */}
        <div className="p-8 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0B192C] via-[#10223B] to-[#081321] border border-[#C5A880]/30 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-[#C5A880]/10 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A880] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Cocina de Autor Costera
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FAF8F5] mt-2 mb-3 font-normal">
              ¿Deseas personalizar tu plato o una preparación especial?
            </h3>
            <p className="text-xs sm:text-sm text-[#D2C4B2]/90 leading-relaxed font-light mb-6">
              Todos nuestros platos son preparados al instante. Si prefieres tus mariscos con un
              nivel especial de ajillo, salsas separadas o acompañamiento adicional de patacones
              dorados, háznoslo saber al momento de ordenar.
            </p>
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C5A880] hover:text-[#FAF8F5] transition-colors group cursor-pointer"
            >
              <span>Ver comanda en curso ({totalItems} platos)</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </main>

      {/* Apartado Especial: Reservas, Pesca Fresca, Horarios y Ubicación */}
      <ReservationSection />

      {/* Floating Action Button for Cart (Mobile & Desktop) */}
      {totalItems > 0 && (
        <>
          {/* Mobile bottom bar with safe-area spacing */}
          <div className="fixed bottom-4 inset-x-3 sm:hidden z-30 animate-in slide-in-from-bottom-4 pb-[env(safe-area-inset-bottom,0px)]">
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#C5A880] text-[#081321] font-bold text-xs uppercase tracking-wider shadow-2xl shadow-black/80 flex items-center justify-between cursor-pointer active:scale-98 touch-manipulation border border-[#D8BD93]"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Ver Pedido ({totalItems})</span>
              </div>
              <span className="font-mono text-sm font-bold">${total.toFixed(2)} USD</span>
            </button>
          </div>

          {/* Desktop floating button */}
          <div className="fixed bottom-8 right-8 hidden sm:flex z-30 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsCartOpen(true)}
              className="group flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#D8BD93] text-[#081321] font-bold text-xs uppercase tracking-wider shadow-2xl shadow-black/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Abrir pedido"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#081321]" />
                <span className="absolute -top-1.5 -right-2 bg-[#081321] text-[#FAF8F5] text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <span>Tu Pedido</span>
              <span className="font-mono text-sm ml-1 border-l border-[#081321]/30 pl-2.5">
                ${total.toFixed(2)} USD
              </span>
            </button>
          </div>
        </>
      )}

      {/* Quick feedback toast notification when product is added */}
      {lastAddedItem && Date.now() - lastAddedItem.timestamp < 2800 && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0B192C]/98 border border-[#C5A880] text-[#FAF8F5] shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-[#C5A880] shrink-0" />
          <div className="text-xs">
            <span className="font-semibold block truncate max-w-[220px]">
              {lastAddedItem.product.name}
            </span>
            <span className="text-[#C5A880] text-[11px] block">
              {lastAddedItem.preparation ? `Opción: ${lastAddedItem.preparation} · ` : ''}Agregado al pedido
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 px-2.5 py-1 rounded bg-[#10223B] text-xs text-[#FAF8F5] hover:text-[#C5A880] border border-[#162C46] font-semibold cursor-pointer shrink-0"
          >
            Ver
          </button>
        </div>
      )}

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer
        onCheckout={() => setIsConfirmationOpen(true)}
      />

      <OrderConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MenuContent />
    </CartProvider>
  );
}
