// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Dirección pública de la invitación. Se usa para que la vista previa al
  // compartir el link (WhatsApp, iMessage) encuentre la imagen.
  // Si el nombre en Cloudflare queda distinto o compras un dominio, cámbialo aquí
  // o define la variable de entorno SITE_URL al compilar.
  site: process.env.SITE_URL || 'https://karenxv.pages.dev',

  // El inglés es el idioma por defecto (/). Los links viejos a /en/ siguen funcionando.
  redirects: {
    '/en': '/',
  },
});
