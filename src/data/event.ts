// Única fuente de verdad para los datos de la invitación.
// Edita este archivo para cambiar nombres, fechas o lugares.

import { languages, useTranslations, type Lang } from "../i18n/ui";

export const event = {
  quinceName: "Karen",
  quinceSurname: "Arce",
  parents: "Daniel y Rebecca Arce",
  godparents: "Freddy y Nidia Garcia",
  hashtag: "#KarenXVEnLila",

  rsvp: {
    phone: "17047494020",
    displayPhone: "+1 (704) 749-4020",
    recipientName: "Rebecca",
  },

  // Charlotte, NC. El 7 de noviembre de 2026 ya terminó el horario de verano,
  // así que el desfase es -05:00 (EST). Si cambia la fecha, revisa el desfase.
  timeZone: "America/New_York",

  // Hora local del evento (llegada de invitados) y fin aproximado de la fiesta.
  startsAt: "2026-11-07T17:00:00-05:00",
  endsAt: "2026-11-08T02:00:00-05:00",

  // Mientras el nombre esté vacío, la invitación muestra "Lugar por confirmar"
  // y no enseña los botones de mapas.
  salon: {
    name: "Heritage House",
    address: "494 E Plaza Dr, Mooresville, NC 28115",
    appleMapsUrl: "https://maps.apple/p/NJP-y4oFYVaD6H",
  },

  itinerary: [
    {
      time: "5:00 PM", venue: "salon",
      title: { es: "Llegada de invitados", en: "Guests arrive" },
    },
    {
      time: "5:30 PM",
      title: { es: "Entrada de la quinceañera", en: "Grand entrance" },
    },
    {
      time: "5:30 PM",
      title: { es: "Cena", en: "Dinner is served" },
      desc: { es: "Se sirve hasta las 7:00 PM.", en: "Served until 7:00 PM." },
    },
    {
      time: "7:00 PM",
      title: { es: "Coronación, cambio de zapatillas y última muñeca", en: "Coronation, change of shoes & last doll" },
      desc: { es: "Tradiciones que simbolizan su paso a mujer, seguidas del brindis.", en: "Traditions that symbolize the passage into womanhood, followed by a toast." },
    },
    {
      time: "7:30 PM",
      title: { es: "Baile con papá", en: "Father–daughter dance" },
      desc: { es: "Después, baile con la familia, el vals y un baile sorpresa.", en: "Followed by the family dance, the waltz and a surprise dance." },
    },
    {
      time: "8:30 PM",
      title: { es: "¡A festejar!", en: "Time to party" },
    },
  ],
} as const;

export type EventData = typeof event;

export function formatParents(lang: Lang): string {
  return lang === "en" ? "Daniel & Rebecca Arce" : "Daniel y Rebecca Arce";
}

export function formatGodparents(lang: Lang): string {
  return lang === "en" ? "Freddy & Nidia Garcia" : "Freddy y Nidia Garcia";
}

const localeOf = (lang: Lang) => languages[lang].locale;

export function formatLongDate(iso: string, lang: Lang): string {
  const s = new Date(iso).toLocaleDateString(localeOf(lang), {
    weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: event.timeZone,
  });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Hora en UTC con el formato que usan Google Calendar e iCalendar: 20261107T220000Z
function toUtcStamp(iso: string | Date): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function calendarEvent(lang: Lang) {
  const t = useTranslations(lang);
  return {
    title: t("calendar.title")(event.quinceName),
    details: t("calendar.details")(event.quinceName, formatParents(lang)),
    location: [event.salon.name, event.salon.address].filter(Boolean).join(", "),
    start: toUtcStamp(event.startsAt),
    end: toUtcStamp(event.endsAt),
  };
}

export function googleCalendarUrl(lang: Lang): string {
  const c = calendarEvent(lang);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: c.title,
    details: c.details,
    location: c.location,
    dates: `${c.start}/${c.end}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// Ruta del archivo .ics de cada idioma (lo generan src/pages/calendar.ics.ts y src/pages/es/calendar.ics.ts).
export function icsPath(lang: Lang): string {
  return `${languages[lang].path}calendar.ics`;
}

// Archivo iCalendar para Apple Calendar (iPhone/Mac), Outlook y otros.
export function icsCalendar(lang: Lang): string {
  const c = calendarEvent(lang);
  // En iCalendar, comas, punto y coma, diagonales y saltos de línea van escapados.
  const text = (s: string) => s.replace(/[\\;,]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//XV Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    // Mismo UID en ambos idiomas: si alguien agrega los dos, el calendario lo trata como un solo evento.
    `UID:xv-${event.quinceName.toLowerCase().replace(/\W+/g, "-")}-${c.start}@invitation`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${c.start}`,
    `DTEND:${c.end}`,
    `SUMMARY:${text(c.title)}`,
    `DESCRIPTION:${text(c.details)}`,
    `LOCATION:${text(c.location)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${text(c.title)}`,
    "TRIGGER:-P1D",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].map(foldLine).join("\r\n") + "\r\n";
}

// iCalendar limita cada línea a 75 bytes; las más largas continúan en la
// siguiente línea empezando con un espacio. Se cuenta en bytes UTF-8 para no
// partir letras con acento a la mitad.
function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  let limit = 75;
  for (const char of line) {
    if (encoder.encode(current + char).length > limit) {
      parts.push(current);
      current = "";
      limit = 74; // la línea de continuación ya ocupa 1 byte con el espacio
    }
    current += char;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

export function mapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function appleMapsUrl(address: string, customUrl?: string): string {
  if (customUrl) return customUrl;
  return `https://maps.apple.com/?q=${encodeURIComponent(address)}`;
}

export function wazeUrl(address: string): string {
  return `https://waze.com/ul?q=${encodeURIComponent(address)}&navigate=yes`;
}

export function rsvpSmsUrl(lang: Lang, count = 2): string {
  const t = useTranslations(lang);
  const text = t("rsvp.message")(event.quinceName, count);
  const phone = event.rsvp.phone.startsWith("+") ? event.rsvp.phone : `+${event.rsvp.phone}`;
  return `sms:${phone}?&body=${encodeURIComponent(text)}`;
}

export const rsvpWhatsAppUrl = rsvpSmsUrl;

