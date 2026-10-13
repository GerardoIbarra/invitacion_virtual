// Única fuente de verdad para los datos de la invitación.
// Edita este archivo para cambiar nombres, fechas o lugares.

import { languages, useTranslations, type Lang } from "../i18n/ui";

export const event = {
  quinceName: "Karen",
  quinceSurname: "Arce",
  parents: "Rebecca y Daniel Arce",
  godparents: "Freddy y Nidia García",
  hashtag: "#KarenXVEnLila",

  // Charlotte, NC. El 7 de noviembre de 2026 ya terminó el horario de verano,
  // así que el desfase es -05:00 (EST). Si cambia la fecha, revisa el desfase.
  timeZone: "America/New_York",

  // Hora local del evento (inicio de la ceremonia) y fin aproximado de la fiesta.
  startsAt: "2026-11-07T17:00:00-05:00",
  endsAt: "2026-11-08T02:00:00-05:00",

  // Lugares pendientes. Mientras el nombre esté vacío, la invitación muestra
  // "Lugar por confirmar" y no enseña los botones de mapas.
  church: {
    name: "",
    address: "Mooresville, NC",
    appleMapsUrl: "",
  },
  salon: {
    name: "Heritage House",
    address: "494 E Plaza Dr, Mooresville, NC 28115",
    appleMapsUrl: "https://maps.apple/p/NJP-y4oFYVaD6H",
  },

  itinerary: [
    {
      time: "5:00 PM", venue: "church",
      title: { es: "Ceremonia religiosa", en: "Religious ceremony" },
    },
    {
      time: "7:00 PM", venue: "salon",
      title: { es: "Recepción y cóctel", en: "Reception & cocktails" },
    },
    {
      time: "8:30 PM",
      title: { es: "Entrada y vals", en: "Grand entrance & waltz" },
      desc: { es: "Con papás, padrinos y chambelanes.", en: "With parents, godparents and court of honor." },
    },
    {
      time: "9:30 PM",
      title: { es: "Cena", en: "Dinner" },
      desc: { es: "Banquete y brindis de honor.", en: "Banquet and toast." },
    },
    {
      time: "10:30 PM",
      title: { es: "Fiesta", en: "Party" },
      desc: { es: "Música en vivo hasta el cierre.", en: "Live music until the end of the night." },
    },
  ],
} as const;

export type EventData = typeof event;

export function formatParents(lang: Lang): string {
  return lang === "en" ? "Rebecca & Daniel Arce" : "Rebecca y Daniel Arce";
}

export function formatGodparents(lang: Lang): string {
  return lang === "en" ? "Freddy & Nidia García" : "Freddy y Nidia García";
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
  const primaryVenue = event.church.name ? event.church : event.salon;
  return {
    title: t("calendar.title")(event.quinceName),
    details: t("calendar.details")(event.quinceName, formatParents(lang)),
    location: [primaryVenue.name, primaryVenue.address].filter(Boolean).join(", "),
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
