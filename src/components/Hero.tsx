import React from 'react';
import { ArrowDown, Waves, Sparkles, Clock, Anchor } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Image with layered gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=2400&q=85"
          alt="Alta gastronomía de mariscos y pescados en DELICIAS A DE"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.7] contrast-[1.05]"
        />
        {/* Editorial Gradients: Deep ocean blues, subtle gold tone warming, vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081321] via-[#081321]/60 to-[#050C16]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#081321]/40 to-[#081321]/90" />
      </div>

      {/* Decorative Golden Line Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#081321] to-transparent pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Subtle Pre-header Kicker */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#10223B]/60 backdrop-blur-md border border-[#C5A880]/30 mb-6">
          <Anchor className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#FAF8F5]/90">
            Cocina del Mar &middot; Temporada 2026
          </span>
          <Sparkles className="w-3 h-3 text-[#C5A880]" />
        </div>

        {/* Main Restaurant Brand Name */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.06em] text-[#FAF8F5] leading-[1.08] mb-4">
          DELICIAS A DE
        </h1>

        {/* Mandatory Tagline */}
        <p className="font-display italic text-2xl sm:text-3xl md:text-4xl text-[#C5A880] tracking-wide mb-6 font-normal">
          &ldquo;El auténtico sabor del mar&rdquo;
        </p>

        {/* Editorial Descriptive Paragraph */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#E7DFD5]/90 font-light leading-relaxed mb-10 text-balance">
          Una propuesta gastronómica costera de excelencia. Seleccionamos cada día los mejores
          mariscos y pescados frescos de aguas profundas, fusionando la tradición marinera con
          técnicas de alta cocina contemporánea.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#D8BD93] text-[#081321] font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] transition-all duration-300 shadow-lg shadow-[#C5A880]/20 hover:shadow-[#C5A880]/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explorar menú</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <a
            href="#footer-section"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#10223B]/80 hover:bg-[#183355] text-[#FAF8F5] border border-[#C5A880]/40 hover:border-[#C5A880] font-medium text-xs sm:text-sm uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4 text-[#C5A880]" />
            <span>Horarios & Reservas</span>
          </a>
        </div>

        {/* Minimalist Editorial Indicators */}
        <div className="mt-14 pt-8 border-t border-[#C5A880]/20 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <span className="font-serif text-lg sm:text-xl text-[#FAF8F5] font-medium">100% Fresco</span>
            <span className="text-[11px] sm:text-xs text-[#B8A58E] tracking-wider uppercase mt-1">
              Captura Diaria
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-[#C5A880]/15 px-2">
            <span className="font-serif text-lg sm:text-xl text-[#FAF8F5] font-medium">Sazón Única</span>
            <span className="text-[11px] sm:text-xs text-[#B8A58E] tracking-wider uppercase mt-1">
              Recetas de Autor
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-lg sm:text-xl text-[#FAF8F5] font-medium">Ambiente Costero</span>
            <span className="text-[11px] sm:text-xs text-[#B8A58E] tracking-wider uppercase mt-1">
              Servicio Selecto
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
