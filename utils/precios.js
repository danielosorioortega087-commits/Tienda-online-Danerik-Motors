
export const TASA_IVA = 0.19

/** valorConDescuento = valor × (1 − descuento / 100) */
export function calcularValorConDescuento(producto) {
  return Math.round(producto.valor * (1 - producto.descuento / 100))
}

/** Totales de una lista de ítems { producto, cantidad } */
export function calcularTotales(items) {
  const subtotal = items.reduce((t, i) => t + i.producto.valor * i.cantidad, 0)
  const totalDescuentos = items.reduce(
    (t, i) => t + (i.producto.valor - calcularValorConDescuento(i.producto)) * i.cantidad,
    0,
  )
  const base = subtotal - totalDescuentos
  const iva = Math.round(base * TASA_IVA)
  return { subtotal, totalDescuentos, base, iva, totalPagar: base + iva }
}
