// Datos fiscales usados por las calculadoras. Revisar cada enero y al publicarse
// cambios en el BOE. Cada bloque indica su fuente y el año al que corresponde.

/** Cuotas mensuales del RETA por tramos de rendimiento neto mensual (tabla de 2025).
 *  Fuente: Seguridad Social, sistema de cotización por ingresos reales (RDL 13/2022). */
export const RETA_YEAR = 2025;
export interface TramoReta { hasta: number; cuota: number; tabla: 'reducida' | 'general' }
export const RETA_TRAMOS: TramoReta[] = [
  { hasta: 670, cuota: 200, tabla: 'reducida' },
  { hasta: 900, cuota: 220, tabla: 'reducida' },
  { hasta: 1166.7, cuota: 260, tabla: 'reducida' },
  { hasta: 1300, cuota: 280, tabla: 'general' },
  { hasta: 1500, cuota: 294, tabla: 'general' },
  { hasta: 1700, cuota: 294, tabla: 'general' },
  { hasta: 1850, cuota: 350, tabla: 'general' },
  { hasta: 2030, cuota: 370, tabla: 'general' },
  { hasta: 2330, cuota: 390, tabla: 'general' },
  { hasta: 2760, cuota: 420, tabla: 'general' },
  { hasta: 3190, cuota: 460, tabla: 'general' },
  { hasta: 3620, cuota: 480, tabla: 'general' },
  { hasta: 4050, cuota: 500, tabla: 'general' },
  { hasta: 6000, cuota: 530, tabla: 'general' },
  { hasta: Infinity, cuota: 590, tabla: 'general' },
];
export const TARIFA_PLANA = 80;
/** Deducción por gastos genéricos sobre el rendimiento neto para calcular el tramo. */
export const GASTOS_GENERICOS = { personaFisica: 0.07, societario: 0.03 };

/** Tipos de IVA (Ley 37/1992). */
export const IVA_TIPOS = [
  { valor: 21, label: 'General (21 %)' },
  { valor: 10, label: 'Reducido (10 %)' },
  { valor: 4, label: 'Superreducido (4 %)' },
];

/** Retención de IRPF en facturas de actividades profesionales (art. 101.5 LIRPF). */
export const RETENCION_GENERAL = 15;
export const RETENCION_INICIO = 7;

/** Pago fraccionado del modelo 130 en estimación directa (art. 110 RIRPF). */
export const PORCENTAJE_130 = 20;
