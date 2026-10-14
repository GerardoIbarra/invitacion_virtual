// Textos de la interfaz en cada idioma. Los datos del evento (nombres,
// lugares, fechas) viven en src/data/event.ts.

export const languages = {
  es: { label: "Español", short: "ES", locale: "es-MX", path: "/es/" },
  en: { label: "English", short: "EN", locale: "en-US", path: "/" },
} as const;

export type Lang = keyof typeof languages;

const es = {
  "meta.title": (name: string) => `XV Años de ${name}`,
  "meta.description": (parents: string, name: string) => `${parents} te invitan a celebrar los XV años de ${name}.`,
  "meta.ogDescription": "Fecha, lugar y código de vestimenta.",

  "lang.switch": "Idioma",

  "welcome.to": "Te invito a mis",
  "welcome.title": "XV Años",
  "welcome.hint": "Toca el moño para abrir",
  "welcome.open": "Abrir invitación",

  "hero.pretitle": "Con la bendición de Dios y el amor de mi familia",
  "hero.titleBefore": "Mis",
  "hero.titleXV": "XV",
  "hero.titleAfter": "Años",
  "hero.photoAlt": "Corona de quinceañera sobre seda lila",
  "hero.badge": "15 Primaveras",
  "hero.quote":
    "Hay momentos que se guardan en el corazón, y compartirlos con las personas que más quiero los hace eternos. Hoy dejo atrás mi niñez para comenzar una nueva etapa llena de sueños.",

  "countdown.title": "Faltan",
  "countdown.days": "Días",
  "countdown.hours": "Horas",
  "countdown.minutes": "Min",
  "countdown.seconds": "Seg",
  "countdown.calendar": "Agregar al calendario",
  "calendar.title": (name: string) => `XV Años de ${name}`,
  "calendar.details": (name: string, parents: string) => `Celebración de los XV años de ${name}. Con el cariño de ${parents}.`,

  "itinerary.eyebrow": "Dónde y cuándo",
  "itinerary.title": "Itinerario",
  "itinerary.directions": "Cómo llegar",
  "itinerary.venueTbd": "Lugar por confirmar",

  "dress.eyebrow": "Código de Vestimenta",
  "dress.title": "Formal",
  "dress.ladies": "Damas: vestido largo.",
  "dress.gentlemen": "Caballeros: traje o esmoquin.",
  "dress.reservedTitle": "Se reserva el color lila",
  "dress.reservedText": "para la quinceañera. Te pedimos con cariño evitar este tono.",
  "dress.palette": "Colores sugeridos",
  "dress.colors": ["Azul noche", "Negro", "Dorado", "Vino"],

  "family.label": "Padres y padrinos",
  "family.parents": "Mis padres",
  "family.godparents": "Mis padrinos",

  "gift.eyebrow": "Sugerencia de regalo",
  "gift.title": "Lluvia de sobres",
  "gift.text": (name: string) => `Tu presencia es nuestro mejor regalo. Si deseas tener un detalle con ${name}, en la recepción habrá una caja para sobres.`,

  "rsvp.calendarAlt": "Calendario con corazón",
  "rsvp.title": "Confirmar asistencia",
  "rsvp.eyebrow": "POR FAVOR CONFIRMA TU ASISTENCIA LO MÁS ANTES POSIBLE",
  "rsvp.nameLabel": "Tu nombre o familia",
  "rsvp.namePlaceholder": "Ej. Familia Martínez",
  "rsvp.guestsLabel": "¿Cuántas personas asistirán?",
  "rsvp.button": "CONFIRMAR AQUÍ",
  "rsvp.shareIntro": "Los mejores recuerdos se crean con personas especiales como ustedes.",
  "rsvp.shareTag": "Hashtag, etiqueta y comparte:",
  "rsvp.hope": "Esperamos contar con tu presencia",
  "rsvp.thanks": "¡MUCHAS GRACIAS!",
  "rsvp.whatsappMsg": (quince: string, count: number) => {
    return count === 1
      ? `¡Hola Rebecca! Confirmo mi asistencia a los XV Años de ${quince} 🎉\n\nAsistirá: 1 persona.\n\n¡Muchas gracias!`
      : `¡Hola Rebecca! Confirmo nuestra asistencia a los XV Años de ${quince} 🎉\n\nPersonas que asistiremos: ${count}\n\n¡Muchas gracias!`;
  },

  "footer.share": "Comparte tus fotos con",
  "footer.blessing": "Gracias por formar parte de este día que quedará por siempre en mi corazón.",
  "footer.love": "Con amor,",
};

export type UI = typeof es;

const en: UI = {
  "meta.title": (name) => `${name}'s 15th Birthday`,
  "meta.description": (parents, name) => `${parents} invite you to celebrate ${name}'s 15th Birthday.`,
  "meta.ogDescription": "Date, venue and dress code.",

  "lang.switch": "Language",

  "welcome.to": "You're invited to celebrate",
  "welcome.title": "Sweet 15",
  "welcome.hint": "Tap the bow to open",
  "welcome.open": "Open invitation",

  "hero.pretitle": "With God's blessing and the love of my family",
  "hero.titleBefore": "Sweet",
  "hero.titleXV": "15",
  "hero.titleAfter": "Birthday",
  "hero.photoAlt": "Quinceañera tiara on lilac silk",
  "hero.badge": "Sweet 15",
  "hero.quote":
    "Some moments are kept in the heart, and sharing them with the people I love most makes them last forever. Today I leave my childhood behind to begin a new chapter full of dreams.",

  "countdown.title": "Counting down",
  "countdown.days": "Days",
  "countdown.hours": "Hours",
  "countdown.minutes": "Min",
  "countdown.seconds": "Sec",
  "countdown.calendar": "Add to calendar",
  "calendar.title": (name) => `${name}'s 15th Birthday`,
  "calendar.details": (name, parents) => `Celebrating ${name}'s 15th Birthday. With love, ${parents}.`,

  "itinerary.eyebrow": "When & where",
  "itinerary.title": "Schedule",
  "itinerary.directions": "Directions",
  "itinerary.venueTbd": "Venue to be announced",

  "dress.eyebrow": "Dress Code",
  "dress.title": "Formal",
  "dress.ladies": "Ladies: floor-length dress.",
  "dress.gentlemen": "Gentlemen: suit or tuxedo.",
  "dress.reservedTitle": "Lilac is reserved",
  "dress.reservedText": "for the quinceañera. We kindly ask you to avoid this shade.",
  "dress.palette": "Suggested colors",
  "dress.colors": ["Midnight blue", "Black", "Gold", "Burgundy"],

  "family.label": "Parents and godparents",
  "family.parents": "My parents",
  "family.godparents": "My godparents",

  "gift.eyebrow": "Gift suggestion",
  "gift.title": "Envelope shower",
  "gift.text": (name) => `Your presence is the greatest gift. If you'd like to give ${name} something, there will be a box for envelopes at the reception.`,

  "rsvp.calendarAlt": "Calendar with heart",
  "rsvp.title": "Confirm attendance",
  "rsvp.eyebrow": "PLEASE CONFIRM YOUR ATTENDANCE AS SOON AS POSSIBLE",
  "rsvp.nameLabel": "Your name or family",
  "rsvp.namePlaceholder": "e.g. Martinez Family",
  "rsvp.guestsLabel": "How many guests will attend?",
  "rsvp.button": "CONFIRM HERE",
  "rsvp.shareIntro": "The best memories are created with special people like you.",
  "rsvp.shareTag": "Hashtag, tag & share:",
  "rsvp.hope": "We look forward to celebrating with you",
  "rsvp.thanks": "THANK YOU SO MUCH!",
  "rsvp.whatsappMsg": (quince: string, count: number) => {
    return count === 1
      ? `Hello Rebecca! Confirming my attendance for ${quince}'s Sweet 15 🎉\n\n1 guest attending.\n\nThank you!`
      : `Hello Rebecca! Confirming our attendance for ${quince}'s Sweet 15 🎉\n\nGuests attending: ${count}\n\nThank you!`;
  },

  "footer.share": "Share your photos with",
  "footer.blessing": "Thank you for being part of a day that will stay in my heart forever.",
  "footer.love": "With love,",
};

export const ui: Record<Lang, UI> = { es, en };

export function useTranslations(lang: Lang) {
  return <K extends keyof UI>(key: K): UI[K] => ui[lang][key];
}

export function isLang(value: string | undefined): value is Lang {
  return !!value && value in languages;
}
