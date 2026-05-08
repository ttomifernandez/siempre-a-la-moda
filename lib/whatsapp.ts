import { CartItem } from '@/data/pulseras';

export function generateWhatsAppMessage(items: CartItem[]): string {
  const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  
  let message = '✨ *SIEMPRE A LA MODA* ✨\n\n';
  message += '📋 *PEDIDO*\n';
  message += '━━━━━━━━━━━━━━━━\n\n';
  
  items.forEach((item, idx) => {
    message += `${idx + 1}. 💎 *${item.nombre}*\n`;
    message += `   Color: ${item.color}\n`;
    message += `   Cantidad: ${item.cantidad}x\n`;
    message += `   Precio: $${item.precio.toLocaleString('es-AR')}\n`;
    message += `   Subtotal: $${(item.precio * item.cantidad).toLocaleString('es-AR')}\n\n`;
  });
  
  message += '━━━━━━━━━━━━━━━━\n';
  message += `🎯 *TOTAL: $${total.toLocaleString('es-AR')}*\n\n`;
  message += '✅ ¡Gracias por tu compra!\n';
  message += '🚚 Consulta nuestros métodos de envío\n';
  message += '💳 Aceptamos todas las formas de pago';
  
  return message;
}

export function getWhatsAppLink(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
