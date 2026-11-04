import React from 'react';
import {
  CalendarClock,
  MapPin,
  MessageCircle,
  Fish,
  Wallet,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import {
  RESTAURANT_WHATSAPP_PHONE,
  RESTAURANT_WHATSAPP_DISPLAY,
  RESTAURANT_YAPPY_PHONE,
  RESTAURANT_MAPS_URL,
  RESTAURANT_SCHEDULE,
  RESTAURANT_NAME,
} from '../config/restaurantConfig';

export const ReservationSection: React.FC = () => {
  const whatsappReserveUrl = `https://wa.me/${RESTAURANT_WHATSAPP_PHONE}?text=${encodeURIComponent(
    `Hola ${RESTAURANT_NAME}, me gustaría consultar disponibilidad y hacer una reserva previa.`
  )}`;

  return (
    <section
      id="apartado-reservas"
      className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 scroll-mt-24"
    >
      {/* Decorative top anchor */}
      <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-4">
        <Fish className="w-4 h-4" />
        <span>EXPERIENCIA EXCLUSIVA DEL MAR</span>
        <Fish className="w-4 h-4" />
      </div>

      {/* Main Feature Box */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0B192C] via-[#091524] to-[#050C16] border-2 border-[#C5A880]/40 overflow-hidden shadow-2xl p-6 sm:p-10 md:p-12">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-900/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header with Important Notice */}
        <div className="relative z-10 max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/50 text-[#C5A880] text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Atención Exclusiva Solo por Reserva</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#FAF8F5] font-normal tracking-tight leading-tight">
            Pescamos Directamente Para Ti
          </h2>

          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#10223B]/80 border border-[#C5A880]/30 text-left sm:text-center text-xs sm:text-sm text-[#E7DFD5] leading-relaxed font-light">
            <p className="flex items-start sm:items-center justify-center gap-2 text-[#FAF8F5] font-medium mb-1.5 text-sm sm:text-base">
              <ShieldAlert className="w-5 h-5 text-[#C5A880] shrink-0" />
              <span>Es indispensable avisar antes de llegar</span>
            </p>
            <p className="text-[#D2C4B2]">
              En <strong className="text-[#C5A880] font-semibold">{RESTAURANT_NAME}</strong> no
              utilizamos mariscos congelados de días pasados. Cada pescado y fruto del mar se pesca
              directamente de las aguas para cada persona y comanda. Por esta razón, solicitamos a
              nuestros apreciados clientes reservar con anticipación su visita para garantizar la
              pesca más fresca y tener su mesa preparada.
            </p>
          </div>
        </div>

        {/* 4 Informative Pillar Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
          {/* Card 1: Horario */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#081321]/90 border border-[#162C46] flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#10223B] border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mb-4">
                <CalendarClock className="w-5 h-5" />
              </div>
              <h3 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                Días y Horarios de Servicio
              </h3>
              <p className="font-serif text-xl sm:text-2xl text-[#FAF8F5] font-normal mb-2">
                {RESTAURANT_SCHEDULE}
              </p>
              <div className="space-y-1.5 text-xs text-[#D2C4B2]/90 font-light">
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Abierto: Jueves, Viernes, Sábado y Domingo (6:30 a 9:00)</span>
                </div>
                <div className="flex items-center gap-2 text-[#B8A58E]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8A58E]/60 ml-1" />
                  <span>Lunes a Miércoles: Cerrado (faena y preparación de pesca)</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#162C46] text-[11px] text-[#B8A58E]">
              * Recuerda avisar tu hora aproximada de llegada al reservar.
            </div>
          </div>

          {/* Card 2: Métodos de Pago */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#081321]/90 border border-[#162C46] flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#10223B] border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mb-4">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                Métodos de Pago Aceptados
              </h3>
              <p className="font-serif text-xl sm:text-2xl text-[#FAF8F5] font-normal mb-2">
                Efectivo & Yappy
              </p>
              <div className="space-y-2.5 text-xs text-[#D2C4B2] font-light">
                <div className="p-2.5 rounded-xl bg-[#10223B]/60 border border-[#162C46] flex items-center justify-between">
                  <div>
                    <strong className="text-[#FAF8F5] font-medium block">1. Pago en Efectivo:</strong>
                    <span className="text-[11px] text-[#B8A58E]">Pagas directamente al visitar el restaurante</span>
                  </div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    En el local
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#10223B]/60 border border-[#C5A880]/30 flex items-center justify-between">
                  <div>
                    <strong className="text-[#FAF8F5] font-medium block">2. Pago por Yappy:</strong>
                    <span className="text-xs font-mono font-bold text-[#C5A880]">{RESTAURANT_YAPPY_PHONE}</span>
                    <span className="text-[10px] text-[#B8A58E] block">Enviar comprobante/captura por WhatsApp</span>
                  </div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#C5A880] bg-[#C5A880]/15 px-2 py-0.5 rounded border border-[#C5A880]/30">
                    Yappy
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#162C46] text-[11px] text-[#B8A58E]">
              * Al pagar por Yappy, adjunta la captura en el chat de WhatsApp con tu pedido.
            </div>
          </div>

          {/* Card 3: Ubicación y Google Maps */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#081321]/90 border border-[#162C46] flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#10223B] border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                Ubicación del Restaurante
              </h3>
              <p className="font-serif text-xl sm:text-2xl text-[#FAF8F5] font-normal mb-2">
                Frente al Mar · Acceso Directo
              </p>
              <p className="text-xs text-[#D2C4B2]/90 font-light leading-relaxed mb-4">
                Encuéntranos en Google Maps con la ruta exacta para llegar sin contratiempos.
                Disponemos de ambiente frente a las olas con brisa marina natural.
              </p>
            </div>
            <a
              href={RESTAURANT_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#10223B] hover:bg-[#183355] text-[#FAF8F5] hover:text-[#C5A880] border border-[#C5A880]/40 text-xs font-semibold uppercase tracking-wider transition-all duration-200 group"
            >
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              <span>Ver Ubicación en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Card 4: Reservas Directas por WhatsApp */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#081321]/90 border border-[#162C46] flex flex-col justify-between hover:border-[#C5A880]/40 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold mb-1">
                Línea Oficial de WhatsApp
              </h3>
              <p className="font-serif text-xl sm:text-2xl text-[#FAF8F5] font-normal mb-2 font-mono">
                {RESTAURANT_WHATSAPP_DISPLAY}
              </p>
              <p className="text-xs text-[#D2C4B2]/90 font-light leading-relaxed mb-4">
                Escríbenos directamente para consultar el pescado del día, reservar tu mesa o realizar
                tu pedido. Te responderemos al instante con la atención personalizada que mereces.
              </p>
            </div>
            <a
              href={whatsappReserveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-emerald-950/60"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Avisar y Reservar por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="relative z-10 pt-6 border-t border-[#162C46] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs sm:text-sm text-[#FAF8F5] font-medium">
              Pesca garantizada del día · Cocina costera tradicional hecha con pasión
            </span>
          </div>
          <span className="text-xs text-[#C5A880] font-serif italic">
            &ldquo;El auténtico sabor del mar&rdquo;
          </span>
        </div>
      </div>
    </section>
  );
};
