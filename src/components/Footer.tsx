import React from 'react';
import { MapPin, Clock, Phone, Mail, ArrowUp, Waves, Award, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="relative bg-[#050C16] border-t border-[#C5A880]/20 pt-16 pb-12 text-[#EDE7DE]">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#162C46]">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-[#C5A880] tracking-[0.25em] text-[11px] font-semibold uppercase">
                Restaurante Costero
              </span>
              <span className="font-serif text-3xl tracking-[0.08em] font-medium text-[#FAF8F5]">
                DELICIAS A DE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#D2C4B2]/80 font-light leading-relaxed">
              Especialistas en pescados, mariscos y comida del mar de alta categoría. Tradición culinaria
              frente al océano con los más estrictos estándares de frescura y técnica artesanal.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#C5A880] text-xs">
              <Award className="w-4 h-4" />
              <span className="tracking-wider uppercase text-[10px] font-semibold text-[#FAF8F5]">
                Pesca Sostenible Certificada
              </span>
            </div>
          </div>

          {/* Col 2: Horarios */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-[#FAF8F5] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A880]" />
              <span>Horarios de Servicio</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#D2C4B2]/90 font-light">
              <li className="flex justify-between pb-1.5 border-b border-[#162C46]/60">
                <span className="text-[#FAF8F5] font-normal">Martes a Viernes</span>
                <span className="text-[#C5A880] font-mono">12:00 PM – 11:00 PM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-[#162C46]/60">
                <span className="text-[#FAF8F5] font-normal">Sábados</span>
                <span className="text-[#C5A880] font-mono">11:30 AM – 11:30 PM</span>
              </li>
              <li className="flex justify-between pb-1.5 border-b border-[#162C46]/60">
                <span className="text-[#FAF8F5] font-normal">Domingos</span>
                <span className="text-[#C5A880] font-mono">12:00 PM – 9:00 PM</span>
              </li>
              <li className="flex justify-between text-[#B8A58E] italic pt-1">
                <span>Lunes</span>
                <span>Cerrado (Selección en Lonja)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Ubicación y Salones */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-[#FAF8F5] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              <span>Ubicación Costera</span>
            </h4>
            <div className="text-xs text-[#D2C4B2]/90 space-y-2 font-light leading-relaxed">
              <p className="text-[#FAF8F5] font-medium">Paseo de la Marina, Muelle Central #120</p>
              <p>Frente a la Bahía de Aguas Azules</p>
              <p className="text-[#B8A58E]">
                Zona de parqueo privado y terraza frente al mar con vista panorámica.
              </p>
            </div>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#C5A880]">
              <Waves className="w-4 h-4" />
              <span>Servicio de Terraza & Salón Privado</span>
            </div>
          </div>

          {/* Col 4: Contacto & Reservaciones */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-[#FAF8F5] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span>Reservas & Pedidos</span>
            </h4>
            <div className="space-y-2.5 text-xs text-[#D2C4B2]">
              <a
                href="tel:+15553827426"
                className="flex items-center gap-2.5 hover:text-[#C5A880] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-mono">+1 (555) 382-7426</span>
              </a>
              <a
                href="mailto:reservas@deliciasade.com"
                className="flex items-center gap-2.5 hover:text-[#C5A880] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>reservas@deliciasade.com</span>
              </a>
            </div>
            <div className="p-3 rounded-lg bg-[#10223B]/60 border border-[#183355] text-[11px] text-[#B8A58E]">
              Atención inmediata para eventos familiares, mesas ejecutivas y pedidos para llevar.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8A58E]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} DELICIAS A DE. Todos los derechos reservados.</span>
            <span>&middot;</span>
            <span className="text-[#C5A880]">El auténtico sabor del mar</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10223B] hover:bg-[#183355] text-[#FAF8F5] border border-[#C5A880]/30 hover:border-[#C5A880] transition-all text-xs"
            aria-label="Volver al inicio"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C5A880]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
