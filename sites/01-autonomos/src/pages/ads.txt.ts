import type { APIRoute } from 'astro';
import { adsTxt } from '@paginasweb/theme/endpoints';
import { SITE } from '../site.config';

export const GET: APIRoute = () => adsTxt(SITE);
