import { sql, connectDB } from "./db";
import { Venta } from "./models/ventas.model";


export async function obtenerVentas(): Promise<Venta[]> {
  await connectDB();

  try {
    const result = await sql.query<Venta>(`
	 DECLARE @ultima_fecha DATE = CONVERT(DATE,(Select top 1 fecha from venta order by fecha desc)
);
	 SELECT 
        v.ID_Venta, v.Fecha, v.Total,
        vd.ID_Producto, vd.TotalLinea, vd.Cantidad, vd.Precio_Unitario as PrecioUnitario, p.Costo_Unitario as Costo,
        p.Nombre AS Producto, m.Nombre as Marca,
        l.Nombre AS Local
      FROM Venta v
      JOIN VentaDetalle vd ON v.ID_Venta = vd.ID_Venta
      JOIN Producto p ON vd.ID_Producto = p.ID_Producto
      JOIN Local l ON v.ID_Local = l.ID_Local
	  JOIN Marca m ON p.ID_Marca= m.ID_Marca
	WHERE v.fecha >= DATEADD(DAY, -30, @ultima_fecha)
  AND v.fecha <= @ultima_fecha
		ORDER BY v.fecha desc

    `);

    return result.recordset;
  } catch (error) {
    console.error("❌ Error al obtener ventas:", error);
    return [];
  }
}
