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
  "meta.ogDescription": "Fecha, lugar, código de vestimenta y confirmación de asistencia.",

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

  "rsvp.eyebrow": (date: string) => `Confirma antes del ${date}`,
  "rsvp.title": "¿Nos acompañas?",
  "rsvp.attendance": "Asistencia",
  "rsvp.yes": "Sí, ahí estaré",
  "rsvp.no": "No podré asistir",
  "rsvp.name": "Nombre o familia",
  "rsvp.namePlaceholder": "Ej. Familia Pérez Hernández",
  "rsvp.nameError": "Escribe tu nombre para saber quién confirma.",
  "rsvp.guests": "Número de personas",
  "rsvp.less": "Quitar una persona",
  "rsvp.more": "Agregar una persona",
  "rsvp.message": (name: string) => `Mensaje para ${name}`,
  "rsvp.optional": "(opcional)",
  "rsvp.messagePlaceholder": "Tus buenos deseos…",
  "rsvp.submit": "Confirmar por WhatsApp",
  "rsvp.cta": "Confirmar asistencia",
  "rsvp.person": "persona",
  "rsvp.people": "personas",
  "rsvp.wa.title": (name: string) => `Confirmación — XV Años de ${name}`,
  "rsvp.wa.guest": "Invitado",
  "rsvp.wa.attendance": "Asistencia",
  "rsvp.wa.yes": (people: string) => `Sí, ${people}`,
  "rsvp.wa.no": "No podré asistir",
  "rsvp.wa.message": "Mensaje",

  "pass.eyebrow": "Se actualiza con tu confirmación",
  "pass.title": "Tu pase",
  "pass.brand": "XV AÑOS",
  "pass.for": (name: string) => `Pase para: ${name}`,
  "pass.defaultGuest": "Invitado especial",
  "pass.passes": "Pases:",

  "family.label": "Padres y padrinos",
  "family.parents": "Mis padres",
  "family.godparents": "Mis padrinos",

  "footer.share": "Comparte tus fotos con",
  "footer.blessing": "Gracias por formar parte de este día que quedará por siempre en mi corazón.",
  "footer.love": "Con amor,",
};

export type UI = typeof es;

const en: UI = {
  "meta.title": (name) => `${name}'s 15th Birthday`,
  "meta.description": (parents, name) => `${parents} invite you to celebrate ${name}'s 15th Birthday.`,
  "meta.ogDescription": "Date, venue, dress code and RSVP.",

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

  "rsvp.eyebrow": (date) => `Please reply by ${date}`,
  "rsvp.title": "Will you join us?",
  "rsvp.attendance": "Attendance",
  "rsvp.yes": "Yes, I'll be there",
  "rsvp.no": "Sorry, I can't make it",
  "rsvp.name": "Name or family",
  "rsvp.namePlaceholder": "e.g. The Pérez Family",
  "rsvp.nameError": "Please enter your name so we know who's replying.",
  "rsvp.guests": "Number of guests",
  "rsvp.less": "Remove one guest",
  "rsvp.more": "Add one guest",
  "rsvp.message": (name) => `Message for ${name}`,
  "rsvp.optional": "(optional)",
  "rsvp.messagePlaceholder": "Your best wishes…",
  "rsvp.submit": "Reply via WhatsApp",
  "rsvp.cta": "RSVP",
  "rsvp.person": "guest",
  "rsvp.people": "guests",
  "rsvp.wa.title": (name) => `RSVP — ${name}'s 15th Birthday`,
  "rsvp.wa.guest": "Guest",
  "rsvp.wa.attendance": "Attending",
  "rsvp.wa.yes": (people) => `Yes, ${people}`,
  "rsvp.wa.no": "Can't make it",
  "rsvp.wa.message": "Message",

  "pass.eyebrow": "Updates with your RSVP",
  "pass.title": "Your pass",
  "pass.brand": "SWEET 15",
  "pass.for": (name) => `Pass for: ${name}`,
  "pass.defaultGuest": "Special guest",
  "pass.passes": "Passes:",

  "family.label": "Parents and godparents",
  "family.parents": "My parents",
  "family.godparents": "My godparents",

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
