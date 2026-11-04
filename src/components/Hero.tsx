import React from 'react';
import { ArrowDown, Waves, Sparkles, Clock } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-12 sm:pb-16">
      {/* Background Image with layered gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-11-03_at_02.34.27__1__c4feba61.jpeg"
          alt="Alta gastronomía y terraza frente al mar en DELICIAS ADE"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.62] contrast-[1.08]"
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
        {/* Main Restaurant Brand Name */}
        <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[0.05em] sm:tracking-[0.06em] text-[#FAF8F5] leading-[1.12] sm:leading-[1.08] mb-3 sm:mb-4">
          DELICIAS ADE
        </h1>

        {/* Mandatory Tagline */}
        <p className="font-display italic text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#C5A880] tracking-wide mb-4 sm:mb-6 font-normal">
          &ldquo;El auténtico sabor del mar&rdquo;
        </p>

        {/* Editorial Descriptive Paragraph */}
        <p className="max-w-2xl text-xs sm:text-base md:text-lg text-[#E7DFD5]/90 font-light leading-relaxed mb-8 sm:mb-10 text-balance">
          Una propuesta gastronómica costera de excelencia. Seleccionamos cada día los mejores
          mariscos y pescados frescos de aguas profundas, fusionando la tradición marinera con
          técnicas de alta cocina contemporánea.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#C5A880] hover:bg-[#D8BD93] text-[#081321] font-semibold text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-all duration-300 shadow-lg shadow-[#C5A880]/20 hover:shadow-[#C5A880]/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explorar menú</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <a
            href="#apartado-reservas"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#10223B]/80 hover:bg-[#183355] text-[#FAF8F5] border border-[#C5A880]/40 hover:border-[#C5A880] font-medium text-xs sm:text-sm uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4 text-[#C5A880]" />
            <span>Horarios & Reservas</span>
          </a>
        </div>

        {/* Minimalist Editorial Indicators */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-[#C5A880]/20 grid grid-cols-3 gap-2 sm:gap-12 w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <span className="font-serif text-sm xs:text-base sm:text-xl text-[#FAF8F5] font-medium">100% Fresco</span>
            <span className="text-[9px] xs:text-[10px] sm:text-xs text-[#B8A58E] tracking-wider uppercase mt-1">
              Captura Diaria
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-[#C5A880]/15 px-1 sm:px-2">
            <span className="font-serif text-sm xs:text-base sm:text-xl text-[#FAF8F5] font-medium">Sazón Única</span>
            <span className="text-[9px] xs:text-[10px] sm:text-xs text-[#B8A58E] tracking-wider uppercase mt-1">
              Recetas de Autor
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-serif text-sm xs:text-base sm:text-xl text-[#FAF8F5] font-medium">Frente al Mar</span>
            <span className="text-[9px] xs:text-[10px] sm:text-xs text-[#B8A58E] tracking-wider uppercase mt-1">
              Servicio Selecto
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
