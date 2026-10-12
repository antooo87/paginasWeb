import type { APIRoute } from 'astro';
import { robotsTxt } from '@paginasweb/theme/endpoints';
import { SITE } from '../site.config';

export const GET: APIRoute = () => robotsTxt(SITE);
