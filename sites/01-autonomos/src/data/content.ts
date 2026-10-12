import type { Tool } from '@paginasweb/theme/site';

export const CALCULADORAS: Tool[] = [
  { href: '/calculadoras/cuota-autonomos/', label: 'Cuota de autónomos', desc: 'Tu tramo y tu cuota mensual según tus ingresos reales.', icon: 'wallet' },
  { href: '/calculadoras/factura-retencion/', label: 'Factura con IVA y retención', desc: 'Total a cobrar con IVA e IRPF, o la base desde el neto.', icon: 'receipt' },
  { href: '/calculadoras/modelo-130/', label: 'Modelo 130', desc: 'Pago fraccionado trimestral del IRPF en estimación directa.', icon: 'coins' },
  { href: '/calculadoras/iva/', label: 'Añadir o quitar IVA', desc: 'Desglosa precios al 21 %, 10 % y 4 % en un segundo.', icon: 'percent' },
];

export const GUIAS: Tool[] = [
  { href: '/guias/alta-autonomo/', label: 'Cómo darse de alta como autónomo', desc: 'Hacienda, Seguridad Social y tarifa plana, paso a paso.', icon: 'clipboard' },
  { href: '/guias/calendario-fiscal-autonomos/', label: 'Calendario fiscal del autónomo', desc: 'Qué modelos presentar y cuándo, trimestre a trimestre.', icon: 'calendar' },
  { href: '/guias/gastos-deducibles-autonomos/', label: 'Gastos deducibles del autónomo', desc: 'Qué puedes deducir, con qué límites y cómo justificarlo.', icon: 'book' },
];
