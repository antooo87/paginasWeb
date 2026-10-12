import { defineSite } from '@paginasweb/theme/site';
import { CALCULADORAS } from './data/content';

export const SITE = defineSite({
  name: 'Autónomo Claro',
  mark: '€',
  tagline: 'Calculadoras y guías fiscales para autónomos en España',
  description: 'calculadoras y guías gratuitas sobre la fiscalidad y la cotización de los autónomos en España.',
  adviceTopic: 'fiscal, contable ni laboral',
  nav: [
    { href: '/calculadoras/', label: 'Calculadoras' },
    { href: '/guias/', label: 'Guías' },
    { href: '/sobre-nosotros/', label: 'Sobre nosotros' },
    { href: '/contacto/', label: 'Contacto' },
  ],
  tools: CALCULADORAS,
  cta: { href: '/calculadoras/cuota-autonomos/', label: 'Calcular mi cuota' },
  lastLegalUpdate: '2026-10-12',
});
