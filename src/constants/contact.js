export const CONTACT_PHONE_E164 = "971545546341";
export const CONTACT_PHONE_DISPLAY = "+971 54 554 6341";

export const CONTACT_WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_E164}`;
export const CONTACT_TEL_URL = `tel:+${CONTACT_PHONE_E164}`;

export function buildWhatsAppUrl(prefilledText = "") {
  if (!prefilledText) return CONTACT_WHATSAPP_URL;
  return `${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(prefilledText)}`;
}
