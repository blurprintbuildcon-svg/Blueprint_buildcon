/**
 * Clean and format an Indian or international mobile number for WhatsApp (wa.me)
 * Always guarantees 10-digit Indian numbers get a single '91' country code
 * and eliminates double-prefix bugs like '91919028346900'.
 */
export function formatWhatsAppNumber(input?: string): string {
  const defaultNumber = '919028346900';
  if (!input) return defaultNumber;

  let digits = input.replace(/\D/g, '');
  if (!digits) return defaultNumber;

  // Prevent double 91 prefixes (e.g. 91919028346900 -> 919028346900)
  while (digits.startsWith('9191') && digits.length >= 14) {
    digits = digits.slice(2);
  }

  // Exactly 10 digits (e.g. 9028346900) -> prepend 91
  if (digits.length === 10) {
    return `91${digits}`;
  }

  // 12 digits starting with 91 (e.g. 919028346900) -> return as is
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }

  // 11 digits starting with 0 (e.g. 09028346900) -> strip 0 and prepend 91
  if (digits.length === 11 && digits.startsWith('0')) {
    return `91${digits.slice(1)}`;
  }

  // If longer than 10 digits, keep the last 10 digits with a single 91
  if (digits.length > 10) {
    return `91${digits.slice(-10)}`;
  }

  return `91${digits}`;
}

export const MAIN_WHATSAPP_NUMBER = '919028346900';
export const ENQUIRY_WHATSAPP_NUMBER = '919028087659';

/**
 * General WhatsApp number used for the floating action button & direct contacts (+91 9028346900)
 */
export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || process.env.Whatsup_Number || '9028346900';
  return formatWhatsAppNumber(raw);
}

/**
 * Dedicated enquiry receiver WhatsApp number (+91 9028087659)
 */
export function getEnquiryWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_ENQUIRY_WHATSAPP_NUMBER || '9028087659';
  return formatWhatsAppNumber(raw);
}

export function openWhatsApp(message: string, targetNumber?: string) {
  const number = targetNumber ? formatWhatsAppNumber(targetNumber) : getWhatsAppNumber();
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${number}?text=${encoded}`;

  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Open enquiry directly to the dedicated enquiry receiver number (+91 9028087659)
 */
export function openEnquiryWhatsApp(message: string) {
  openWhatsApp(message, getEnquiryWhatsAppNumber());
}
