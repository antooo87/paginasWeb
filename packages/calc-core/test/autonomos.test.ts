import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cuotaAutonomos, factura, iva, modelo130 } from '../src/index.ts';

const near = (a: number, b: number) => assert.ok(Math.abs(a - b) < 0.005, `${a} ≠ ${b}`);

test('cuota: ejemplo de la página (30.000 ingresos, 6.000 gastos) cae en el tramo 8, 370 €', () => {
  const r = cuotaAutonomos({ ingresos: 30000, gastos: 6000 });
  near(r.rendimientoComputable, 22320);
  near(r.rendimientoMensual, 1860);
  assert.equal(r.tramo, 8);
  assert.equal(r.cuota, 370);
});

test('cuota: sin beneficios va al tramo 1 de la tabla reducida', () => {
  const r = cuotaAutonomos({ ingresos: 1000, gastos: 5000 });
  assert.equal(r.rendimientoNeto, 0);
  assert.equal(r.tramo, 1);
  assert.equal(r.tabla, 'reducida');
});

test('cuota: el límite superior de un tramo pertenece a ese tramo', () => {
  // 670 €/mes exactos tras el 7 %: 670 * 12 / 0.93
  const r = cuotaAutonomos({ ingresos: (670 * 12) / 0.93, gastos: 0 });
  assert.equal(r.tramo, 1);
});

test('cuota: rendimientos muy altos van al último tramo', () => {
  assert.equal(cuotaAutonomos({ ingresos: 500000, gastos: 0 }).cuota, 590);
});

test('cuota: societario aplica el 3 % y la tarifa plana fija 80 €', () => {
  near(cuotaAutonomos({ ingresos: 10000, gastos: 0, societario: true }).rendimientoComputable, 9700);
  assert.equal(cuotaAutonomos({ ingresos: 90000, gastos: 0, tarifaPlana: true }).cuota, 80);
});

test('iva: añadir y quitar son inversos', () => {
  near(iva(100, 21).total, 121);
  near(iva(121, 21, true).base, 100);
  near(iva(110, 10, true).cuota, 10);
});

test('factura: 1.000 € con 21 % de IVA y 15 % de retención', () => {
  const f = factura(1000, 21, 15);
  near(f.total, 1060);
  near(factura(1060, 21, 15, true).base, 1000);
});

test('modelo 130: 20 % del rendimiento acumulado menos retenciones y pagos', () => {
  const r = modelo130({ ingresos: 15000, gastos: 4000, retenciones: 300, pagosAnteriores: 1000 });
  near(r.cuotaBruta, 2200);
  near(r.aIngresar, 900);
});

test('modelo 130: con pérdidas no sale a ingresar', () => {
  const r = modelo130({ ingresos: 1000, gastos: 3000 });
  assert.equal(r.aIngresar, 0);
});
