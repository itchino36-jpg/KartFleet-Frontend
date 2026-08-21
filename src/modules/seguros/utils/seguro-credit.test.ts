import assert from "node:assert/strict";
import test from "node:test";
import { calculateSeguroCredit } from "./seguro.utils.ts";

const cases = [
  { valorAsegurado: 145_000, prima: 5_800, adicional: 580, totalPagar: 6_380, montoCuota: 890, pagoInicial: 1_930 },
  { valorAsegurado: 90_000, prima: 3_600, adicional: 360, totalPagar: 4_900, montoCuota: 685, pagoInicial: 1_475 },
  { valorAsegurado: 110_000, prima: 4_400, adicional: 440, totalPagar: 4_900, montoCuota: 685, pagoInicial: 1_475 },
  { valorAsegurado: 135_000, prima: 5_400, adicional: 540, totalPagar: 5_940, montoCuota: 830, pagoInicial: 1_790 },
  { valorAsegurado: 175_000, prima: 7_000, adicional: 700, totalPagar: 7_700, montoCuota: 1_075, pagoInicial: 2_325 },
  { valorAsegurado: 230_000, prima: 9_200, adicional: 920, totalPagar: 10_120, montoCuota: 1_415, pagoInicial: 3_045 },
];

test("calcula los ejemplos de seguro a crédito y conserva el total", () => {
  for (const expected of cases) {
    const result = calculateSeguroCredit(expected.valorAsegurado);
    assert.ok(result);
    assert.equal(result.prima, expected.prima);
    assert.equal(result.adicional, expected.adicional);
    assert.equal(result.totalPagar, expected.totalPagar);
    assert.equal(result.montoCuota, expected.montoCuota);
    assert.equal(result.pagoInicial, expected.pagoInicial);
    assert.equal(result.pagoInicial + result.montoCuota * result.cantidadCuotas, result.totalPagar);
    assert.equal(result.montoCuota % 5, 0);
  }
});

test("rechaza valores asegurados inválidos", () => {
  for (const value of [0, -1, "", "texto", Number.NaN]) {
    assert.equal(calculateSeguroCredit(value), null);
  }
});
