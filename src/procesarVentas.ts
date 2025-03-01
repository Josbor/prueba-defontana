import { obtenerVentas } from "./ventas";

async function procesarVentas(): Promise<void> {
  const ventas = await obtenerVentas();
  if (ventas.length === 0) return;

  // Total de ventas y cantidad
  const totalVentas = ventas.reduce((sum, v) => sum + v.TotalLinea, 0);
  const cantidadVentas = ventas.length;

  // Venta más alta
  const ventaMasAlta = ventas.reduce((max, v) => (v.Total > max.Total ? v : max), ventas[0]);

  // Producto con mayor monto total de ventas
  const productoMasVendido = ventas.reduce<Record<string, number>>((acc, v) => {
    acc[v.Producto] = (acc[v.Producto] || 0) + v.TotalLinea;
    return acc;
  }, {});
  const productoMayorVenta = Object.entries(productoMasVendido).sort((a, b) => b[1] - a[1])[0];

  // Local con mayor monto de ventas
  const localMasVendido = ventas.reduce<Record<string, number>>((acc, v) => {
    acc[v.Local] = (acc[v.Local] || 0) + v.TotalLinea;
    return acc;
  }, {});
  const localMayorVenta = Object.entries(localMasVendido).sort((a, b) => b[1] - a[1])[0];

  // Marca con mayor margen de ganancia
  const margenMarcas = ventas.reduce<Record<string, number>>((acc, v) => {
    const margen = (v.Cantidad * v.PrecioUnitario) - (v.Cantidad * v.Costo);
    acc[v.Marca] = (acc[v.Marca] || 0) + margen;
    return acc;
  }, {});
  const marcaMayorMargen = Object.entries(margenMarcas).sort((a, b) => b[1] - a[1])[0];

  // Producto más vendido por local
  const productosPorLocal = ventas.reduce<Record<string, Record<string, number>>>((acc, v) => {
    acc[v.Local] = acc[v.Local] || {};
    acc[v.Local][v.Producto] = (acc[v.Local][v.Producto] || 0) + v.Cantidad;
    return acc;
  }, {});
  const productoMasVendidoPorLocal = Object.keys(productosPorLocal).map(local => ({
    local,
    producto: Object.entries(productosPorLocal[local]).sort((a, b) => b[1] - a[1])[0]
  }));

  // Imprimir resultados
  console.log("\n📊 **Resultados**:");
  console.log(`🔹 Total de ventas en los últimos 30 días: ${totalVentas} (Cantidad: ${cantidadVentas})`);
  console.log(`🔹 Venta más alta: ${ventaMasAlta.Total} en ${ventaMasAlta.Fecha}`);
  console.log(`🔹 Producto con mayor monto en ventas: ${productoMayorVenta[0]} (${productoMayorVenta[1]})`);
  console.log(`🔹 Local con mayor monto de ventas: ${localMayorVenta[0]} (${localMayorVenta[1]})`);
  console.log(`🔹 Marca con mayor margen de ganancia: ${marcaMayorMargen[0]} (${marcaMayorMargen[1]})`);
  console.log(`🔹 Producto más vendido por local:`, productoMasVendidoPorLocal);
}

procesarVentas();
