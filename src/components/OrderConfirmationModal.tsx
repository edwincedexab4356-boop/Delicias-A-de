import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_WHATSAPP_PHONE, RESTAURANT_NAME } from '../config/restaurantConfig';
import {
  X,
  CheckCircle,
  MessageCircle,
  Store,
  UtensilsCrossed,
  AlertCircle,
  Scale,
  User,
  FileText,
} from 'lucide-react';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { cart, total, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [diningOption, setDiningOption] = useState<'comer-en-el-lugar' | 'retirar-en-el-local'>('comer-en-el-lugar');
  const [orderNotes, setOrderNotes] = useState('');

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (cart.length === 0) {
      errors.cart = 'El pedido está vacío. Agrega platos antes de continuar.';
    }

    if (!customerName.trim()) {
      errors.name = 'El nombre del cliente es obligatorio.';
    }

    if (!customerPhone.trim()) {
      errors.phone = 'El número de teléfono es obligatorio.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const generatedId = `DEL-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);

    // Build the formatted detail lines
    const detailLines = cart
      .map((item) => {
        const prepLine = item.selectedPreparation
          ? `\nPreparación: ${item.selectedPreparation}`
          : '';
        const instructionLine = item.specialInstructions?.trim()
          ? `\nDescripción: ${item.specialInstructions.trim()}`
          : '';
        const subtotalText = item.requiresPriceConfirmation
          ? 'Precio según tamaño (por confirmar con cocina)'
          : `$${(item.itemPrice * item.quantity).toFixed(2)} USD`;

        return `${item.product.name} x ${item.quantity}${prepLine}${instructionLine}\nSubtotal: ${subtotalText}`;
      })
      .join('\n\n');

    // Total format
    const hasLobster = cart.some((i) => i.requiresPriceConfirmation);
    const formattedTotal = hasLobster
      ? `$${total.toFixed(2)} USD (+ Langosta precio según tamaño a confirmar)`
      : `$${total.toFixed(2)} USD`;

    const modalidadText =
      diningOption === 'comer-en-el-lugar'
        ? 'Comer en el lugar'
        : 'Retirar en el local';

    // Base order message
    let message = `${RESTAURANT_NAME} - NUEVO PEDIDO

Cliente: ${customerName.trim()}
Teléfono: ${customerPhone.trim()}
Modalidad: ${modalidadText}

DETALLE:
${detailLines}

TOTAL: ${formattedTotal}`;

    // Incluir descripción / observaciones únicamente si el cliente las especificó
    if (orderNotes.trim()) {
      message += `\n\nObservaciones: ${orderNotes.trim()}`;
    }

    // Clean phone number (strip spaces, +, -, parentheses)
    const cleanPhone = RESTAURANT_WHATSAPP_PHONE.replace(/[^0-9]/g, '');

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    setOrderSubmitted(true);
  };

  const handleFinish = () => {
    clearCart();
    setOrderSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#050C16]/85 backdrop-blur-md transition-opacity"
      />

      <div className="relative bg-[#081321] border border-[#C5A880]/40 rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 my-2 sm:my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#162C46] flex items-center justify-between bg-[#0B192C]/70">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg sm:text-2xl text-[#FAF8F5] font-medium">
              {orderSubmitted ? '¡Pedido Enviado!' : 'Checkout · Finalizar Pedido'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#D2C4B2] hover:text-[#FAF8F5] hover:bg-[#10223B] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSubmitted ? (
          /* Success Screen */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/50">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                Comanda Despachada
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mt-1 font-normal">
                ¡Gracias por tu pedido, {customerName}!
              </h3>
              <p className="text-xs text-[#B8A58E] mt-1 font-mono">Orden de Referencia: #{orderId}</p>
            </div>

            <p className="text-xs sm:text-sm text-[#D2C4B2] max-w-md mx-auto leading-relaxed font-light">
              Tu pedido ha sido preformateado y enviado a la línea oficial de WhatsApp de{' '}
              <strong className="text-[#C5A880]">{RESTAURANT_NAME}</strong>. Nuestro equipo de cocina
              te confirmará la recepción y los tiempos estimados de preparación.
            </p>

            {/* Order summary snapshot */}
            <div className="p-4 rounded-xl bg-[#0B192C] border border-[#162C46] text-left text-xs space-y-2.5 max-w-lg mx-auto">
              <div className="flex justify-between font-medium text-[#FAF8F5] pb-2 border-b border-[#162C46]">
                <span>Modalidad seleccionada</span>
                <span className="text-[#C5A880] font-semibold">
                  {diningOption === 'comer-en-el-lugar'
                    ? 'Comer en el lugar'
                    : 'Retirar en el local'}
                </span>
              </div>
              <div className="space-y-1.5 text-[#D2C4B2] max-h-36 overflow-y-auto">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <span>
                        {item.quantity}x {item.product.name}
                      </span>
                      {item.selectedPreparation && (
                        <span className="text-[10px] text-[#C5A880] ml-1">
                          ({item.selectedPreparation})
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[#FAF8F5] ml-2">
                      {item.requiresPriceConfirmation
                        ? 'Por confirmar'
                        : `$${(item.itemPrice * item.quantity).toFixed(2)} USD`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-sm text-[#FAF8F5] pt-2 border-t border-[#162C46]">
                <span>Total General</span>
                <span className="text-[#C5A880] font-mono">${total.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleFinish}
                className="w-full max-w-md py-3.5 px-6 rounded-xl bg-[#10223B] hover:bg-[#183355] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-colors border border-[#C5A880]/30 cursor-pointer"
              >
                Cerrar y nuevo pedido
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form & Order Summary */
          <form onSubmit={handleSendWhatsApp} className="p-5 sm:p-8 space-y-6">
            {/* Global validation message if empty */}
            {validationErrors.cart && (
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{validationErrors.cart}</span>
              </div>
            )}

            {/* 1. Datos del Cliente */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>1. Datos del Cliente</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs uppercase tracking-widest text-[#B8A58E] font-medium mb-1.5"
                  >
                    Nombre completo *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (validationErrors.name) {
                        setValidationErrors((prev) => ({ ...prev, name: '' }));
                      }
                    }}
                    placeholder="Ej: Sofía Velásquez"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border text-base sm:text-sm text-[#FAF8F5] placeholder-[#B8A58E]/40 outline-none transition-colors ${
                      validationErrors.name
                        ? 'border-rose-500 focus:border-rose-400'
                        : 'border-[#183355] focus:border-[#C5A880]'
                    }`}
                  />
                  {validationErrors.name && (
                    <span className="text-[11px] text-rose-400 mt-1 block">
                      {validationErrors.name}
                    </span>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs uppercase tracking-widest text-[#B8A58E] font-medium mb-1.5"
                  >
                    Número de teléfono *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => {
                      setCustomerPhone(e.target.value);
                      if (validationErrors.phone) {
                        setValidationErrors((prev) => ({ ...prev, phone: '' }));
                      }
                    }}
                    placeholder="Ej: +507 6123-4567"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border text-base sm:text-sm text-[#FAF8F5] placeholder-[#B8A58E]/40 outline-none transition-colors ${
                      validationErrors.phone
                        ? 'border-rose-500 focus:border-rose-400'
                        : 'border-[#183355] focus:border-[#C5A880]'
                    }`}
                  />
                  {validationErrors.phone && (
                    <span className="text-[11px] text-rose-400 mt-1 block">
                      {validationErrors.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Modalidad de Entrega */}
            <div className="space-y-4 pt-2 border-t border-[#162C46]">
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold flex items-center gap-2">
                <Store className="w-4 h-4" />
                <span>2. Modalidad del Pedido</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDiningOption('comer-en-el-lugar')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                    diningOption === 'comer-en-el-lugar'
                      ? 'bg-[#10223B] border-[#C5A880] shadow-md ring-1 ring-[#C5A880]/40'
                      : 'bg-[#0B192C] border-[#183355] hover:border-[#C5A880]/40'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FAF8F5]">
                    <UtensilsCrossed
                      className={`w-4 h-4 ${
                        diningOption === 'comer-en-el-lugar' ? 'text-[#C5A880]' : 'text-[#B8A58E]'
                      }`}
                    />
                    <span>Comer en el lugar</span>
                  </div>
                  <span className="text-[11px] text-[#B8A58E] font-light">
                    Servicio en salón o terraza
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDiningOption('retirar-en-el-local')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                    diningOption === 'retirar-en-el-local'
                      ? 'bg-[#10223B] border-[#C5A880] shadow-md ring-1 ring-[#C5A880]/40'
                      : 'bg-[#0B192C] border-[#183355] hover:border-[#C5A880]/40'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FAF8F5]">
                    <Store
                      className={`w-4 h-4 ${
                        diningOption === 'retirar-en-el-local' ? 'text-[#C5A880]' : 'text-[#B8A58E]'
                      }`}
                    />
                    <span>Retirar en el local</span>
                  </div>
                  <span className="text-[11px] text-[#B8A58E] font-light">
                    Para llevar / Pick-up en barra
                  </span>
                </button>
              </div>
            </div>

            {/* Observaciones adicionales */}
            <div>
              <label
                htmlFor="checkout-notes"
                className="block text-xs uppercase tracking-widest text-[#B8A58E] font-medium mb-1.5 flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Descripción u observaciones (opcional)</span>
              </label>
              <textarea
                id="checkout-notes"
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Ej: Salsa aparte, llamar al llegar, especificaciones, etc..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B192C] border border-[#183355] focus:border-[#C5A880] text-base sm:text-sm text-[#FAF8F5] placeholder-[#B8A58E]/40 outline-none transition-colors resize-none"
              />
            </div>

            {/* 3. RESUMEN DEL PEDIDO */}
            <div className="space-y-3 pt-3 border-t border-[#162C46]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                  3. Resumen del Pedido
                </h4>
                <span className="text-[11px] text-[#B8A58E]">
                  {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
                </span>
              </div>

              {/* Items List */}
              <div className="p-4 rounded-xl bg-[#0B192C] border border-[#162C46] space-y-3 max-h-52 overflow-y-auto">
                {cart.map((item, idx) => {
                  const itemSubtotal = item.itemPrice * item.quantity;

                  return (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-3 text-xs pb-2.5 border-b border-[#162C46]/60 last:border-b-0 last:pb-0"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#FAF8F5] font-serif">
                            {item.product.name}
                          </span>
                          <span className="text-xs font-mono text-[#C5A880] font-bold">
                            &times; {item.quantity}
                          </span>
                        </div>

                        {item.selectedPreparation && (
                          <span className="text-[10px] text-[#C5A880] block mt-0.5 font-medium">
                            Preparación: {item.selectedPreparation}
                          </span>
                        )}

                        {item.specialInstructions && (
                          <span className="text-[10px] text-[#D2C4B2] block mt-0.5 italic">
                            Nota: {item.specialInstructions}
                          </span>
                        )}

                        <span className="text-[11px] text-[#B8A58E] block mt-0.5">
                          {item.requiresPriceConfirmation ? (
                            'Precio unitario: según tamaño'
                          ) : (
                            `Precio unitario: $${item.itemPrice.toFixed(2)} USD`
                          )}
                        </span>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-[#B8A58E] block">Subtotal</span>
                        {item.requiresPriceConfirmation ? (
                          <span className="text-xs font-semibold text-[#C5A880]">Por confirmar</span>
                        ) : (
                          <span className="font-sans font-bold text-xs text-[#FAF8F5]">
                            ${itemSubtotal.toFixed(2)} USD
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Notice for Lobster in order */}
              {cart.some((i) => i.requiresPriceConfirmation) && (
                <div className="p-3 rounded-xl bg-[#10223B]/80 border border-[#C5A880]/30 text-xs text-[#FAF8F5] flex items-start gap-2">
                  <Scale className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#C5A880]">Aviso de langosta:</span> Su precio
                    se confirmará según el peso disponible al recibir este pedido.
                  </div>
                </div>
              )}

              {/* Total Calculation */}
              <div className="p-4 rounded-xl bg-[#10223B] border border-[#162C46] flex items-center justify-between">
                <div>
                  <span className="text-xs font-serif text-[#FAF8F5] font-semibold block">
                    TOTAL ESTIMADO
                  </span>
                  <span className="text-[11px] text-[#B8A58E]">Sin cargos ocultos ni comisiones</span>
                </div>
                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-bold font-sans text-[#C5A880]">
                    ${total.toFixed(2)} USD
                  </span>
                  {cart.some((i) => i.requiresPriceConfirmation) && (
                    <span className="text-[10px] text-[#B8A58E] block">
                      + Langosta por confirmar
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 4. BOTÓN WHATSAPP */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-1/3 py-3.5 px-4 rounded-xl bg-[#10223B] hover:bg-[#183355] text-[#D2C4B2] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Volver a la carta
              </button>

              <button
                type="submit"
                className="w-full sm:w-2/3 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2.5 cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Enviar pedido por WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
