# Invitación XV Años

Invitación digital hecha con [Astro](https://astro.build), en inglés (`/`) y español (`/es/`).

## Editar los datos

El contenido del evento (nombres, fecha, lugares, itinerario y WhatsApp) vive en un solo archivo:

```
src/data/event.ts
```

Los textos de la interfaz en cada idioma están en `src/i18n/ui.ts`.

Mientras un lugar no tenga nombre, la invitación muestra "Lugar por confirmar" y oculta los botones de mapas.

Las imágenes están en `src/assets/`. Astro las convierte a WebP y genera tamaños para móvil al compilar.

## Comandos

| Comando           | Acción                                   |
| :---------------- | :--------------------------------------- |
| `npm install`     | Instala dependencias                     |
| `npm run dev`     | Servidor local en `localhost:4321`       |
| `npm run build`   | Genera el sitio estático en `./dist/`    |
| `npm run preview` | Sirve la versión compilada localmente    |

## Publicar en Cloudflare Pages

Cloudflare da una dirección gratis del tipo `nombre.pages.dev`; no hace falta comprar dominio.

### Opción A: subir la carpeta (sin GitHub)

1. `npm run build`
2. En [dash.cloudflare.com](https://dash.cloudflare.com): **Workers & Pages → Create → Pages → Upload assets**.
3. Nombre del proyecto: `karenxv` (si está ocupado, Cloudflare sugiere otro).
4. Arrastra la carpeta `dist/` y publica.

Para actualizar después: vuelve a compilar y sube `dist/` otra vez en el mismo proyecto.

### Opción B: conectar GitHub (se actualiza solo con cada cambio)

1. Sube este repositorio a GitHub.
2. En Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** y elige el repositorio.
3. Configuración de compilación:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - La versión de Node la toma del archivo `.node-version` (22).

### Si la dirección final no es `karenxv.pages.dev`

La dirección se usa para que la vista previa al compartir por WhatsApp muestre la imagen. Cámbiala en `astro.config.mjs` (`site`), o en Cloudflare agrega la variable de entorno `SITE_URL` con la dirección completa (por ejemplo `https://karenxv.com`) y vuelve a publicar.

### Dominio propio

En el proyecto de Cloudflare Pages: **Custom domains → Set up a custom domain**. Si el dominio se compra en Cloudflare, se conecta solo.

## Antes de enviar la invitación

- [ ] Número de WhatsApp real en `src/data/event.ts` (con código de país; EE. UU. es `1`). Mientras sea el de ejemplo, `npm run build` muestra un aviso.
- [ ] Nombre y dirección de la iglesia y del salón en Charlotte.
- [ ] Dirección final en `site` (ver arriba).
- [ ] Probar el link en un celular: abrir el sobre, confirmar por WhatsApp y agregar al calendario (Google y iPhone).

## Privacidad

La invitación no se indexa en buscadores (`robots.txt`, `noindex` y el encabezado `X-Robots-Tag` en `public/_headers`). Solo la ve quien tiene el link.
