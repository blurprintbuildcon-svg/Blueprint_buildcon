/**
 * Utility for formatting and opening WhatsApp with enquiries and referrals
 */
export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '9561186693';
  const clean = raw.replace(/[^0-9]/g, '');
  if (clean.length === 10) return `91${clean}`;
  return clean || '919561186693';
}

export function openWhatsApp(message: string, targetNumber?: string) {
  const number = targetNumber
    ? (targetNumber.replace(/[^0-9]/g, '').length === 10
      ? `91${targetNumber.replace(/[^0-9]/g, '')}`
      : targetNumber.replace(/[^0-9]/g, ''))
    : getWhatsAppNumber();

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encoded}`;

  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
