import React from 'react';
import {
  MapPin,
  Clock,
  Phone,
  ArrowUp,
  Award,
  Wallet,
  MessageCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import {
  RESTAURANT_WHATSAPP_PHONE,
  RESTAURANT_WHATSAPP_DISPLAY,
  RESTAURANT_YAPPY_PHONE,
  RESTAURANT_MAPS_URL,
  RESTAURANT_SCHEDULE,
  RESTAURANT_NAME,
} from '../config/restaurantConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappDirectUrl = `https://wa.me/${RESTAURANT_WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Hola ${RESTAURANT_NAME}, deseo hacer una consulta / reserva.`
  )}`;

  return (
    <footer id="footer-section" className="relative bg-[#050C16] border-t border-[#C5A880]/20 pt-16 pb-12 text-[#EDE7DE]">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-[#162C46]">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-[#C5A880] tracking-[0.25em] text-[11px] font-semibold uppercase">
                Restaurante Costero
              </span>
              <span className="font-serif text-3xl tracking-[0.08em] font-medium text-[#FAF8F5]">
                {RESTAURANT_NAME}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#D2C4B2]/80 font-light leading-relaxed">
              Especialistas en pescados frescos, mariscos y comida del mar de alta categoría.
              Atención exclusiva bajo reserva previa: pescamos directamente del mar para cada comensal.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[#C5A880] text-xs">
              <Award className="w-4 h-4 shrink-0" />
              <span className="tracking-wider uppercase text-[10px] font-semibold text-[#FAF8F5]">
                Pesca Fresca Garantizada al 100%
              </span>
            </div>
          </div>

          {/* Col 2: Horarios Oficiales */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-[#FAF8F5] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C5A880]" />
              <span>Horarios de Atención</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#D2C4B2]/90 font-light">
              <li className="flex justify-between pb-1.5 border-b border-[#162C46]/60">
                <span className="text-[#FAF8F5] font-normal">Jueves a Domingo</span>
                <span className="text-[#C5A880] font-mono font-semibold">6:30 a 9:00</span>
              </li>
              <li className="flex justify-between text-[#B8A58E] italic pt-1">
                <span>Lunes a Miércoles</span>
                <span>Cerrado (Faena marina)</span>
              </li>
            </ul>
            <div className="p-3 rounded-xl bg-[#10223B]/60 border border-[#C5A880]/30 text-[11px] text-[#FAF8F5] flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
              <span>
                <strong>Solo por reserva:</strong> Favor avisar antes de llegar para preparar tu mesa y coordinar la pesca fresca.
              </span>
            </div>
          </div>

          {/* Col 3: Ubicación y Google Maps */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-[#FAF8F5] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              <span>Ubicación</span>
            </h4>
            <div className="text-xs text-[#D2C4B2]/90 space-y-2 font-light leading-relaxed">
              <p className="text-[#FAF8F5] font-medium">Restaurante DELICIAS A DE</p>
              <p className="text-[#B8A58E]">
                Frente a la costa marina con brisa y terraza con vista al mar.
              </p>
            </div>
            <a
              href={RESTAURANT_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#10223B] hover:bg-[#183355] text-xs text-[#FAF8F5] hover:text-[#C5A880] border border-[#C5A880]/30 transition-colors font-medium group"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
            </a>
          </div>

          {/* Col 4: Contacto & Métodos de Pago */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-[#FAF8F5] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C5A880]" />
              <span>Contacto & Pagos</span>
            </h4>
            <div className="space-y-2.5 text-xs text-[#D2C4B2]">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-[#C5A880] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                <span className="font-mono text-sm font-semibold text-[#FAF8F5]">
                  {RESTAURANT_WHATSAPP_DISPLAY}
                </span>
                <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">
                  (WhatsApp)
                </span>
              </a>

              <div className="p-3 rounded-xl bg-[#10223B]/60 border border-[#162C46] space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-[#C5A880] font-semibold">
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Métodos de Pago:</span>
                </div>
                <p className="text-[#FAF8F5] leading-snug">
                  &bull; <strong>Efectivo</strong> en el local
                </p>
                <p className="text-[#FAF8F5] leading-snug">
                  &bull; <strong>Yappy</strong> al <span className="font-mono font-bold text-[#C5A880]">{RESTAURANT_YAPPY_PHONE}</span> (enviar comprobante)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8A58E]">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {RESTAURANT_NAME}. Todos los derechos reservados.</span>
            <span>&middot;</span>
            <span className="text-[#C5A880]">El auténtico sabor del mar</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10223B] hover:bg-[#183355] text-[#FAF8F5] border border-[#C5A880]/30 hover:border-[#C5A880] transition-all text-xs cursor-pointer"
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
