// Cálculos fiscales para autónomos en España. Funciones puras: sin DOM ni red,
// para poder probarlas con `node --test` y reutilizarlas en cualquier sitio.
import {
  GASTOS_GENERICOS,
  PORCENTAJE_130,
  RETA_TRAMOS,
  TARIFA_PLANA,
  type TramoReta,
} from './fiscal-es.ts';

export interface CuotaInput {
  ingresos: number;
  gastos: number;
  societario?: boolean;
  tarifaPlana?: boolean;
}

export interface CuotaResult {
  rendimientoNeto: number;
  rendimientoComputable: number;
  rendimientoMensual: number;
  tramo: number;
  tabla: TramoReta['tabla'];
  cuotaTramo: number;
  cuota: number;
  costeAnual: number;
}

export function cuotaAutonomos({ ingresos, gastos, societario = false, tarifaPlana = false }: CuotaInput): CuotaResult {
  const rendimientoNeto = Math.max(0, ingresos - gastos);
  const deduccion = societario ? GASTOS_GENERICOS.societario : GASTOS_GENERICOS.personaFisica;
  const rendimientoComputable = rendimientoNeto * (1 - deduccion);
  const rendimientoMensual = rendimientoComputable / 12;
  const idx = RETA_TRAMOS.findIndex((t) => rendimientoMensual <= t.hasta);
  const t = RETA_TRAMOS[idx];
  const cuota = tarifaPlana ? TARIFA_PLANA : t.cuota;
  return {
    rendimientoNeto,
    rendimientoComputable,
    rendimientoMensual,
    tramo: idx + 1,
    tabla: t.tabla,
    cuotaTramo: t.cuota,
    cuota,
    costeAnual: cuota * 12,
  };
}

/** Añade o quita IVA. `tipo` en porcentaje (21, 10, 4). */
export function iva(importe: number, tipo: number, incluido = false) {
  const t = tipo / 100;
  const base = incluido ? importe / (1 + t) : importe;
  const cuota = base * t;
  return { base, cuota, total: base + cuota };
}

/** Factura con IVA y retención de IRPF. Si `desdeTotal`, `importe` es lo que se quiere cobrar. */
export function factura(importe: number, tipoIva: number, tipoRetencion: number, desdeTotal = false) {
  const i = tipoIva / 100;
  const r = tipoRetencion / 100;
  const base = desdeTotal ? importe / (1 + i - r) : importe;
  return { base, iva: base * i, retencion: base * r, total: base * (1 + i - r) };
}

export interface Modelo130Input {
  ingresos: number;
  gastos: number;
  retenciones?: number;
  pagosAnteriores?: number;
}

/** Pago fraccionado del modelo 130 (estimación directa), con cifras acumuladas del año. */
export function modelo130({ ingresos, gastos, retenciones = 0, pagosAnteriores = 0 }: Modelo130Input) {
  const rendimiento = ingresos - gastos;
  const cuotaBruta = Math.max(0, rendimiento) * (PORCENTAJE_130 / 100);
  const resultado = cuotaBruta - retenciones - pagosAnteriores;
  return { rendimiento, cuotaBruta, resultado, aIngresar: Math.max(0, resultado) };
}
