import type { APIRoute } from 'astro';
import { icsCalendar } from '../../data/event';

export const GET: APIRoute = () =>
  new Response(icsCalendar('es'), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
