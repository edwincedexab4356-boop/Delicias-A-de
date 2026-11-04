import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Compass, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CategoryId } from '../types';

interface HeaderProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories: { id: CategoryId; label: string }[] = [
    { id: 'all', label: 'Todo el Menú' },
    { id: 'mariscos', label: 'Mariscos' },
    { id: 'pescados', label: 'Pescados' },
    { id: 'bandejas', label: 'Bandejas y Especialidades' },
    { id: 'pollo', label: 'Pollo' },
  ];

  const handleNavClick = (id: CategoryId) => {
    onSelectCategory(id);
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const targetId = id === 'all' ? 'catalogo-section' : `section-${id}`;
      const element = document.getElementById(targetId) || document.getElementById('catalogo-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#081321]/92 backdrop-blur-md border-b border-[#C5A880]/20 py-3 shadow-xl shadow-black/40'
          : 'bg-gradient-to-b from-[#050C16]/95 via-[#081321]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a
            href="#"
            className="flex flex-col group focus:outline-none min-w-0"
            aria-label="DELICIAS ADE - Inicio"
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[#C5A880] tracking-[0.2em] sm:tracking-[0.25em] text-[10px] sm:text-xs font-semibold uppercase">
                Restaurante Costero
              </span>
              <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#C5A880]/60 inline-block"></span>
            </div>
            <span className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.06em] sm:tracking-[0.08em] font-medium text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors truncate">
              DELICIAS ADE
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick(cat.id)}
                  className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all relative ${
                    isActive
                      ? 'text-[#C5A880] font-semibold'
                      : 'text-[#D2C4B2]/80 hover:text-[#FAF8F5]'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[1.5px] bg-[#C5A880] rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
            <a
              href="#apartado-reservas"
              className="px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold text-[#C5A880] hover:text-[#FAF8F5] transition-colors"
            >
              Reservas
            </a>
          </nav>

          {/* Right Actions: Search + Cart + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            {/* Search Input Toggle */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center bg-[#10223B]/95 border border-[#C5A880]/50 rounded-full px-2.5 sm:px-3 py-1.5 text-xs text-[#FAF8F5] w-36 xs:w-48 sm:w-64 transition-all shadow-lg">
                  <Search className="w-3.5 h-3.5 text-[#C5A880] mr-1.5 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar plato..."
                    autoFocus
                    className="bg-transparent border-none outline-none text-xs text-[#FAF8F5] placeholder-[#B8A58E]/60 w-full"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="text-[#D2C4B2] hover:text-[#FAF8F5] p-1 cursor-pointer"
                    aria-label="Cerrar búsqueda"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-[#D2C4B2] hover:text-[#C5A880] transition-colors rounded-full hover:bg-[#10223B]/60 cursor-pointer"
                  aria-label="Abrir buscador"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#10223B]/80 hover:bg-[#183355] border border-[#C5A880]/30 hover:border-[#C5A880] transition-all text-[#FAF8F5] group shadow-sm hover:shadow-[#C5A880]/10"
              aria-label={`Ver carrito de compras, ${totalItems} productos`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#C5A880] group-hover:scale-105 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C5A880] text-[#081321] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-medium tracking-wide">
                {totalItems > 0 ? `$${subtotal.toFixed(2)}` : 'Pedido'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#FAF8F5] hover:text-[#C5A880] transition-colors"
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#081321]/98 backdrop-blur-xl border-b border-[#C5A880]/20 px-6 py-6 animate-in slide-in-from-top-2">
          <p className="text-[11px] font-semibold text-[#C5A880] uppercase tracking-[0.2em] mb-3">
            Explora por Categoría
          </p>
          <div className="flex flex-col space-y-2">
            {navCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavClick(cat.id)}
                className={`flex items-center justify-between text-left py-2.5 px-3 rounded-lg text-sm tracking-wide transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#10223B] text-[#C5A880] font-semibold border-l-2 border-[#C5A880]'
                    : 'text-[#EDE7DE] hover:bg-[#10223B]/40 hover:text-[#C5A880]'
                }`}
              >
                <span>{cat.label}</span>
                <Compass className="w-4 h-4 opacity-40" />
              </button>
            ))}
            <a
              href="#apartado-reservas"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-left py-2.5 px-3 rounded-lg text-sm tracking-wide font-semibold text-[#C5A880] bg-[#10223B]/70 border border-[#C5A880]/30 hover:bg-[#183355]"
            >
              <span>Reservas, Horarios y Ubicación</span>
              <span className="text-[10px] uppercase tracking-wider bg-[#C5A880] text-[#081321] px-1.5 py-0.5 rounded font-bold">Info</span>
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-[#183355] flex items-center justify-between text-xs text-[#B8A58E]">
            <span>Pesca Fresca Diaria</span>
            <span className="text-[#C5A880]">DELICIAS ADE</span>
          </div>
        </div>
      )}
    </header>
  );
};
